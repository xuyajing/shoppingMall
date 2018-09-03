<template>
  <div class="weChatWrap">
    <div class="footPopupWrap">
      <transition name="fold">
        <div class="paymentMethodWrap" v-if="showPaymentMethod">
          <div class="inputWrap" v-show="firstStep">
            <a class="btnClose" @click.stop.prevent="hideExchangePanel"></a>
            <input type="text" class="exchangeCode" placeholder="请输入兑换码，可为空" v-model="redeemCode" />
            <a class="btnNextStep btn" @click.stop.prevent="nextStep">下一步</a>
            <p class="tips">如果没有兑换码，请直接点击下一步</p>
          </div>
          <div class="compareWrap" v-show="!firstStep">
            <a class="btnClose" @click.stop.prevent="payFail"></a>
            <p class="total">总价：{{totalPrice}}元</p>
            <p class="codeValue">兑换码：{{redeemCodeValue}}元</p>
            <p class="toPay">实付：{{actualPay}}元</p>
            <a class="btnOrder btn" v-if="totalPrice<=redeemCodeValue" @click.stop.prevent="weChatPay">确定下单</a>
            <a class="btnPay btn" v-if="totalPrice>redeemCodeValue" @click.stop.prevent="weChatPay">微信支付</a>
          </div>
        </div>
      </transition>
    </div>
    <div class="exchangeCodeDisabled" v-show="showDisabled">
      <span class="iconAttention"></span>
      <div>
        <p>兑换码无效</p>
        <span>请检查您的兑换码</span>
      </div>
    </div>
    <div class="mask" v-show="showPaymentMethod"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRedeemCode} from '../../../service/getData';
  import {getStore} from '../../../config/mUtils';

  export default {
      data() {
          return {
              showDisabled: false,
              redeemCodeValue: 0.00, // 兑换码对应金额
              redeemCode: '', // 兑换码
              appId: '',
              timeStamp: '',
              nonceStr: '',
              package: '',
              paySign: '',
              signType: '',
              tradeId: '',
              token: '',
              firstStep: true,
              showPanel: true
          };
      },
      props: {
        showPaymentMethod: {
            type: Boolean,
            default: false
        },
        isFirstStep: {
          type: Boolean,
          default: true
        },
        wxCode: {
          type: String,
          default: ''
        },
        confirmAddress: {
          type: Object,
          default: null
        },
        tradeProductList: {
            type: Array,
            default() {}
        },
        totalPrice: {
            type: Number,
            default: 0
        }
      },
      created() {
          this.token = getStore('token');
          this.firstStep = this.isFirstStep;
      },
      computed: {
        actualPay() {
            return this.totalPrice > this.redeemCodeValue ? (this.totalPrice - this.redeemCodeValue) : 0;
        }
      },
      methods: {
        hideExchangePanel() {
          this.$emit('hidePanel');
        },
        async nextStep() {
          if (this.redeemCode.length > 0) {
            let getRedeemCodeResult = await getRedeemCode(this.redeemCode);
            if (getRedeemCodeResult.msg === '成功') {
              this.redeemCodeValue = getRedeemCodeResult.data.redeemCode.value;
              this.firstStep = false;
              this.showDisabled = false;
              this.createOrder();
            } else {
              this.showDisabled = true;
            }
          } else {
            this.createOrder();
            this.firstStep = false;
            this.showDisabled = false;
          }
        },
        async createOrder() {
          await fetch('/api/trade/create', {
            method: 'POST',
            body: JSON.stringify({
              redeemCode: this.redeemCode,
              shippingAddress: this.confirmAddress.provinceName + this.confirmAddress.cityName + this.confirmAddress.districtName,
              shippingName: this.confirmAddress.consigneeName,
              shippingPhone: this.confirmAddress.consigneeTel,
              tradeProductList: this.tradeProductList,
              wxCode: this.wxCode
            }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'token': this.token
            }
          }).then(res => res.json())
            .then(response => {
              if (response.msg === '成功') {
//                this.$router.push('/confirmOrder/success');
                this.appId = response.data.appId;
                this.nonceStr = response.data.nonceStr;
                this.package = response.data.package;
                this.paySign = response.data.paySign;
                this.signType = response.data.signType;
                this.timeStamp = response.data.timeStamp;
//                this.actualPay = response.data.actualPay;
                this.tradeId = response.data.tradeId;
              } else {
//                this.$router.push({path: '/orders/detail', query: {type: 1}});
                alert('response.msg');
              }
            });
        },
        payFail() {
          this.firstStep = true;
          this.$emit('hidePanel');
          if (this.tradeId) {
            this.$router.push({path: '/orders/detail', query: {type: 1, id: this.tradeId}});
          }
        },
        weChatPay() {
          if (typeof window.WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
          } else {
            this.onBridgeReady();
          }
        },
        onBridgeReady() {
          var self = this;
          window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              'appId': this.appId, // 公众号名称，由商户传入
              'timeStamp': this.timeStamp, // 时间戳，自1970年以来的秒数
              'nonceStr': this.nonceStr, // 随机串
              'package': this.package,
              'signType': this.signType, // 微信签名方式：
              'paySign': this.paySign // 微信签名
            },
            function(res) {
//                alert(res.err_msg);
              if (res.err_msg === 'get_brand_wcpay_request:ok') {
                // 使用以上方式判断前端返回,微信团队郑重提示：
//                 res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                self.$router.push('/confirmOrder/success');
              } else {
                // 支付失败
                self.$router.push({path: '/orders/detail', query: {type: 1, id: this.tradeId}});
                alert(JSON.stringify(res));
              }
//              else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
//                alert("支付过程中用户取消");
//
//              }
            });
        }
      }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .footPopupWrap
    position: fixed
    bottom: 0
    left: 0
    z-index: 20
    width: 100%
    height: 0
    line-height: 0
    .paymentMethodWrap
      position: absolute
      top: 0
      left: 0
      width: 100%
      background: #fff
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.2s linear
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0, 0)
      .btnClose
        position: absolute
        top: 13px
        left: 12px
        width: 14px
        height: 15px
        background-image: url(./close.png)
        background-size: 100%
        background-repeat: no-repeat
      .exchangeCode
        display: block
        width: 83%
        height: 40px
        line-height: 40px
        margin: 50px 30px 18px
        border: 1px solid #999
        border-radius: 20px
        box-sizing: border-box
        text-align: center
        font-size: 14px
        color: #999
      .btn
        display: block
        height: 40px
        margin: 0 30px 10px
        line-height: 40px
        text-align: center
        border-radius: 20px
        box-sizing: border-box
        font-size: 14px
        color: #fff
        background: #f53663
        &.btnOrder, &.btnPay
          margin-bottom: 0
      .tips
        margin-bottom: 32px
        line-height: 17px
        text-align: center
        font-size: 11px
        color: #f53663
      .compareWrap
        padding: 42px 0
        line-height: 17px
        p
          margin: 0 30px 17px
          text-align: right
          font-size: 14px
          color: #303030
          &.toPay
            margin-bottom: 25px
  .exchangeCodeDisabled
    position: fixed
    top: 180px
    left: 50%
    z-index: 30
    display: flex
    align-items: center
    justify-content: center
    width: 200px
    height: 65px
    margin-left: -100px
    border-radius: 10px
    background: rgba(0, 0, 0, 0.8)
    color: #fff
    .iconAttention
      width: 28px
      height: 29px
      margin-right: 17px
      background: url(./attention.png)
      background-size: 100%
      background-repeat: no-repeat
    div
      p
        line-height: 15px
        font-size: 14px
      span
        line-height: 15px
        font-size: 11px

  .mask
    position: fixed
    top: 0
    left: 0
    z-index: 10
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.8)
</style>
