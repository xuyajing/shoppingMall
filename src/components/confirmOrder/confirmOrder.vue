<template>
  <div class="confirmOrderWrap">
    <top-header :title="title"></top-header>
    <div class="confirmOrderMain">
      <div class="main" ref="main">
        <div class="addAddressWrap" v-show="hasNoAddr">
          <div class="left">
            <span class="icon"></span>
            <span class="txt">还没有收货地址哦！</span>
          </div>
          <a class="btnAddWrap">
            <span class="txt">点击去添加</span>
            <span class="rightArrow"></span>
          </a>
        </div>
        <div class="addressWrap">
          <span class="icon"></span>
          <div class="main">
            <div class="info">
              <span class="addressee">收件人：吴彦祖</span>
              <span class="phoneNumber">18120000000</span>
            </div>
            <div class="address">安徽省芜湖市鸠江区安徽芜湖九江经济开发区融汇科技产业园1栋201亚原子</div>
          </div>
          <span class="rightArrow"></span>
        </div>
        <ul class="orderList">
          <li>
            <img src="./confirmOrderImg.png" class="thumb" />
            <div class="infoWrap">
              <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
              <span class="type">N°6</span>
              <div class="foot">
                <span class="count">发货数量：<em>2</em></span>
                <span class="total">￥480</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="calulateWrap">
          <div class="total">合计：<span>￥480</span></div>
          <a class="btnExchange" @click.stop.prevent="exchangeGoods">去兑换</a>
        </div>
        <div class="footPopupWrap">
          <transition name="fold">
            <div class="paymentMethodWrap" v-show="showPaymentMethod">
              <div class="inputWrap" v-show="isFirstStep">
                <a class="btnClose" @click.stop.prevent="hideExchangePanel"></a>
                <input type="text" class="exchangeCode" placeholder="请输入兑换码，可为空"/>
                <a class="btnNextStep btn" @click.stop.prevent="nextStep">下一步</a>
                <p class="tips">如果没有兑换码，请直接点击下一步</p>
              </div>
              <div class="compareWrap" v-show="!isFirstStep">
                <a class="btnClose" @click.stop.prevent="payFail"></a>
                <p class="total">总价：{{total}}元</p>
                <p class="codeValue">兑换码：{{exchangeCodeValue}}元</p>
                <p class="toPay">实付：{{toPay}}元</p>
                <a class="btnOrder btn" v-show="total<=exchangeCodeValue">确定下单</a>
                <a class="btnPay btn" v-show="total>exchangeCodeValue" @click.stop.prevent="paySuccess">微信支付</a>
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
        <div class="mask" v-show="showMask"></div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';
  export default {
      data() {
        return {
          title: '确认订单',
          hasNoAddr: false,
          showPaymentMethod: false,
          showMask: false,
          showDisabled: false,
          isFirstStep: true,
          total: 920.00,
          exchangeCodeValue: 800.00
        };
      },
      computed: {
          toPay() {
              if (this.total > this.exchangeCodeValue) {
                  return this.total - this.exchangeCodeValue;
              } else {
                  return 0.00;
              }
          }
      },
      methods: {
        exchangeGoods() {
            this.showPaymentMethod = true;
            this.showMask = true;
        },
        nextStep() {
            this.isFirstStep = false;
        },
        paySuccess() {
          this.$router.push('/confirmOrder/success');
        },
        payFail() {
          this.showPaymentMethod = false;
          this.showMask = false;
          this.$router.push({path: '/orders/detail', query: {type: 1}});
        }
      },
      components: {
        topHeader
      }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

.confirmOrderMain
  position: absolute
  top: 50px
  left: 0
  width: 100%
  .addAddressWrap
    display: flex
    align-items: center
    width: 100%
    height: 90px
    padding: 0 12px
    box-sizing: border-box
    border-bottom-1px(#e9e9e9)
    .left
      flex: 1
      .icon
        display: inline-block
        width: 26px
        height: 30px
        margin: 0 8px 0 12px
        vertical-align: middle
        background-image: url(./address.png)
        background-size: 100%
        background-repeat: no-repeat
      .txt
        font-size: 14px
        color: #333
    .btnAddWrap
      text-align: right
      font-size: 0
      .txt
        display: inline-block
        vertical-align: middle
        padding-right: 10px
        font-size: 12px
        color: #999
      .rightArrow
        display: inline-block
        vertical-align: middle
        width: 9px
        height: 15px
        background-image: url(./right.png)
        background-size: 100%
        background-repeat: no-repeat
  .addressWrap
    display: flex
    align-items: center
    width: 100%
    height: 90px
    padding: 0 12px
    box-sizing: border-box
    border-bottom-1px(#e9e9e9)
    .icon
      display: inline-block
      width: 26px
      height: 30px
      margin: 0 8px 0 12px
      vertical-align: middle
      background-image: url(./address.png)
      background-size: 100%
      background-repeat: no-repeat
    .main
      flex: 1
      .info
        margin-bottom: 5px
        font-size: 14px
        color: #333
        .addressee
          padding-right: 15px
      .address
        line-height: 17px
        font-size: 12px
        color: #999
    .rightArrow
      display: inline-block
      vertical-align: middle
      width: 9px
      height: 15px
      margin-left: 40px
      background-image: url(./right.png)
      background-size: 100%
      background-repeat: no-repeat
  .orderList
    padding: 0 24px
    li
      display: flex
      margin: 20px 0
      .thumb
        width: 80px
        height: 60px
        margin-right: 20px
      .infoWrap
        flex: 1
        .title
          height: 15px
          line-height: 15px
          padding-bottom: 14px
          font-size: 13px
          color: #303030
          overflow: hidden
          text-overflow: ellipsis
        .type
          display: block
          margin-bottom: 8px
          font-size: 12px
          color: #999
        .foot
          display: flex
          justify-content: space-between
          .count
            font-size: 11px
            color: #999
            em
              font-style: normal
              color: #f53663
          .total
            font-size: 12px
            color: #f53663
  .calulateWrap
    border-top-1px(#e9e9e9)
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 50px
    box-sizing: border-box
    display: flex
    justify-content: flex-end
    align-items: center
    .total
      font-size: 12px
      color: #333
      span
        font-size: 14px
        color: #f53663
    .btnExchange
      width: 80px
      height: 32px
      margin: 0 12px
      text-align: center
      line-height: 32px
      border-radius: 20px
      color: #fff
      font-size: 12px;
      background: #f53663
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
        transfom: translate3d(0, 0, 0)
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
        height: 38px
        line-height: 38px
        margin: 50px 30px 18px
        border: 1px solid #999
        border-radius: 20px
        box-sizing: border-box
        text-align: center
        font-size: 14px
        color: #999
      .btn
        display: block
        height: 38px
        margin: 0 30px 10px
        line-height: 38px
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
    background: rgba(0, 0, 0, 0.5)
</style>
