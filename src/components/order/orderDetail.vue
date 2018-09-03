<template>
  <transition name="move">
    <div class="orderDetailWrap">
      <top-header :title="title"></top-header>
      <div class="contentWrap">
        <div class="main" ref="main">
          <div class="topMessageWrap">
            <div class="toPay topMessage" v-show="type===1">
              <span class="icon"></span>
              <div class="messageWrap">
                <strong class="state">等待买家付款</strong>
                <p class="info">剩23小时48分自动关闭</p>
              </div>
            </div>
            <div class="toDeliver topMessage" v-show="type===2">
              <span class="icon"></span>
              <strong class="state">等待卖家发货</strong>
            </div>
            <div class="toReceipt topMessage" v-show="type===3">
              <span class="icon"></span>
              <div class="logisticsWrap">物流单号<span>{{orderDetail.shippingNo}}</span></div>
            </div>
            <div class="completed topMessage" v-show="type===4">
              <span class="icon"></span>
              <div class="messageWrap">
                <strong class="state">交易完成</strong>
                <p class="info">物流单号<span>{{orderDetail.shippingNo}}</span></p>
              </div>
            </div>
          </div>
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
                <span class="addressee">收件人：{{orderDetail.shippingName}}</span>
                <span class="phoneNumber">{{orderDetail.shippingPhone}}</span>
              </div>
              <div class="address">{{orderDetail.shippingAddress}}</div>
            </div>
            <span class="rightArrow"></span>
          </div>
          <ul class="orderList">
            <li v-for="(item, index) in orderDetail.products" :key="index">
              <img :src="item.thumb" class="thumb" />
              <div class="infoWrap">
                <div class="title">{{item.name}}</div>
                <span class="type" v-for="(v, k) in item.optionValueList" :key="k">{{v.valueName}}</span>
                <div class="foot">
                  <span class="count">发货数量：<em>{{item.quantity}}</em></span>
                  <span class="total">￥{{item.price}}</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="numberWrap border-1px">
            <ul>
              <li v-show="type!==1">
                <span class="text">兑换码</span>
                <span class="value">￥{{orderDetail.redeemValue}}</span>
              </li>
              <li :class="type===1 ? 'total' : ''">
                <span class="text">订单总价</span>
                <span class="value">￥{{orderDetail.total}}</span>
              </li>
              <li v-show="type!==1">
                <span class="text">实付</span>
                <span class="value">￥{{orderDetail.actualPay}}</span>
              </li>
            </ul>
          </div>
          <div class="orderInfoWrap">
            <ul>
              <li>订单编号：{{orderDetail.tradeNo}}</li>
              <li>创建时间：{{orderDetail.createdDate}}</li>
              <li v-show="type!==1">交易流水号：{{orderDetail.outTradeNo}}</li>
              <li v-show="type!==1">付款时间：{{orderDetail.paymentTime}}</li>
            </ul>
          </div>
          <div class="footBtnWrap" v-show="type===1 && isShowBtn">
            <a class="btnCancel btn" @click.stop.prevent="showDialog(orderDetail.id, 1)">取消订单</a>
            <a class="btnContinue btn" @click.stop.prevent="continuePay">继续兑换</a>
          </div>
          <div class="footBtnWrap" v-show="type===3">
            <a class="btnConfirm btn" @click.stop.prevent="showDialog(orderDetail.id, 0)">确认收货</a>
          </div>
        </div>
      </div>
      <!--<div class="popupWrap" v-show="showPopupGot">-->
        <!--<div class="title">提醒</div>-->
        <!--<div class="content">您确认已经收到货了吗？</div>-->
        <!--<div class="btnWrap border-1px">-->
          <!--<a class="btnCancel btn" @click.stop.prevent="hidePopup">取消</a>-->
          <!--<a class="btnConfirm btn" @click.stop.prevent="confirmTrade">确定</a>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="mask" v-show="showMask" @click.stop.prevent="hidePopup"></div>-->
      <!--<div class="stickFootWrap">-->
        <!--<transition name="fold">-->
          <!--<form class="cancelOrderWrap" v-show="isShowCancelOrder">-->
            <!--<a class="btnClose" @click.stop.prevent="hideCancelWrap">取消</a>-->
            <!--<div class="selectReasonWrap border-1px">-->
              <!--<span class="text">取消原因</span>-->
              <!--<div class="optionWrap">-->
                <!--<span class="value">{{cancelReason}}</span>-->
                <!--<span class="icon"></span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="addReasonWrap">-->
              <!--<span class="text">补充说明</span>-->
              <!--<textarea :v-model="addReason" placeholder="请输入原因"></textarea>-->
            <!--</div>-->
            <!--<a class="btnConfirm">确定</a>-->
          <!--</form>-->
        <!--</transition>-->
      <!--</div>-->
      <div class="tips" v-show="isShowTips">{{tipsTxt}}</div>
      <tip-dialog :title="dialogTitle" :content="confirmDialogContent" @cancel="cancelTrade" @confirm="confirmCancelTrade" v-if="isShowCancelTradeDialog"></tip-dialog>
      <tip-dialog :title="dialogTitle" :content="cancelConfirmDialogContent" @cancel="cancelTrade" @confirm="confirmCancelTrade" v-if="isShowCancelTradeDialog"></tip-dialog>
      <wechat-pay :showPaymentMethod="showPaymentMethod"
                  :isFirstStep="isFirstStep"
                  :totalPrice="orderDetail.total"
                  :wxCode="wxCode"
                  :confirmAddress="confirmAddress"
                  :tradeProductList=null
                  @hidePanel="hidePanel"></wechat-pay>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';
  import {getOrderDetail, confirmTrade, cancelTrade, repay} from '../../service/getData';
  import {getStore} from '../../config/mUtils';
  import tipDialog from 'components/common/tipdialog/tipdialog';
  import wechatPay from 'components/common/weChatPay/weChatPay.vue';

  export default {
      data() {
         return {
           title: '订单详情',
           type: 1, // 1:待兑换，2:待发货，3:待收货，4:已完成
           isPayed: true, // 是否已付款
           hasNoAddr: false,
           cancelReason: '不想拍了',
           addReason: '',
           isShowCancelOrder: false,
           tradeId: '',
           orderDetail: {},
           dialogTitle: '提醒',
           confirmDialogContent: '您确认已经收到货了吗？',
           cancelConfirmDialogContent: '确认要取消订单？',
           isShowCancelTradeDialog: false,
           isShowConfirmDialog: false,
           isShowTips: false,
           tipsTxt: '',
           isShowBtn: true,
           showPaymentMethod: false,
           isFirstStep: false,
           wxCode: '',
           confirmAddress: {},
           appId: '',
           timeStamp: '',
           nonceStr: '',
           package: '',
           paySign: '',
           signType: ''
         };
      },
      activated() {
          this.token = getStore('token');
          this.tradeId = this.$route.query.id;
          this.wxCode = this.$route.query.code;
          this.$nextTick(() => {
//              this.type = this.$route.query.type;
          });
          this.initOrderDetail();
      },
      watch: {
        $route() {
          this.token = getStore('token');
          this.tradeId = this.$route.query.id;
          this.initOrderDetail();
        }
      },
      computed: {
//        tradeProductList() {
//          let result = [];
//          for (let i = 0; i < this.orderDetail.products.length; i++) {
//            result[i] = {
//              productOptionValueId: this.orderDetail.products[i].productOptionValueId,
//              quantity: this.orderDetail.products[i].num
//            };
//          }
//          return result;
//        }
      },
      methods: {
          async initOrderDetail() {
              let getOrderDetailResult = await getOrderDetail(this.token, this.tradeId);
              if (getOrderDetailResult.code === 0) {
                  this.orderDetail = getOrderDetailResult.data.tradeDetail;
                  this.type = this.orderDetail.status;
              }
          },
          showDialog(id, type) {
            this.tradeId = id;
            if (type === 0) { // 0表示确认收货， 1表示取消订单
              this.isShowConfirmDialog = true;
            } else if (type === 1) {
              this.isShowCancelTradeDialog = true;
            }
          },
          cancelConfirmTrade() {
            this.isShowConfirmDialog = false;
          },
          cancelTrade() {
            this.isShowCancelTradeDialog = false;
          },
          // 确认收货弹框
          async confirmTrade() {
            let confirmTradeResult = await confirmTrade(this.token, this.tradeId);
            if (confirmTradeResult.code === 0) {
              this.isShowConfirmDialog = false;
              this.isShowConfirmDialog = false;
              this.isShowTips = true;
              this.tipsTxt = '确认收货成功';
              setTimeout(() => {
                this.isShowTips = false;
                this.$router.push({path: '/orders', query: {type: this.type}});
              }, 2000);
            }
          },
          // 取消订单弹框
          async confirmCancelTrade() {
            let confirmCancelTradeResult = await cancelTrade(this.token, this.tradeId);
            if (confirmCancelTradeResult.code === 0) {
              this.isShowCancelTradeDialog = false;
              this.isShowCancelTradeDialog = false;
              this.isShowTips = true;
              this.tipsTxt = '取消订单成功';
              this.isShowBtn = false;
              setTimeout(() => {
                this.isShowTips = false;
                this.$router.push({path: '/orders', query: {type: this.type}});
              }, 2000);
            }
          },
          // 去兑换
          async continuePay() {
              let repayResult = await repay(this.token, this.tradeId);
              if (repayResult.code === 0) {
                  console.log('repayResult.data = ' + repayResult);
                  this.appId = repayResult.data.appId;
                  this.nonceStr = repayResult.data.nonceStr;
                  this.package = repayResult.data.package;
                  this.paySign = repayResult.data.paySign;
                  this.signType = repayResult.data.signType;
                  this.timeStamp = repayResult.data.timeStamp;
                  this.weChatPay();
              }
//            this.showPaymentMethod = true;
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
//                  self.$router.push({path: '/orders/detail', query: {type: 1, id: this.tradeId}});
//                  alert(JSON.stringify(res));
                }
  //              else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
  //                alert("支付过程中用户取消");
  //
  //              }
              });
          },
          hidePanel() {
            this.showPaymentMethod = false;
          }
      },
      components: {
        topHeader,
        tipDialog,
        wechatPay
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
.orderDetailWrap
  position: fixed
  top: 0
  left: 0
  z-index: 105
  width: 100%
  height: 100%
  background: #fff
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .contentWrap
    position: absolute
    top: 50px
    bottom: 0
    left: 0
    width: 100%
    .main
      .topMessage
        display: flex
        align-items: center
        height: 45px
        padding: 0 24px
        box-sizing: border-box
        background: #f53663
        color: #fff
        &.toPay
          .icon
            background-image: url(./countdown.png)
        &.toDeliver
          .icon
            width: 22px
            height: 18px
            background-image: url(./delivered_tbd.png)
          .state
            font-size: 14px
        &.toReceipt
          .icon
            width: 22px
            height: 18px
            background-image: url(./receipt.png)
          .logisticsWrap
            font-size: 14px
            span
              padding-left: 6px
        &.completed
            .icon
              background-image: url(./completed.png)
        .icon
          width: 22px
          height: 22px
          margin-right: 15px
          background-size: 100%
          background-repeat: no-repeat
        .messageWrap
          .state
            font-size: 14px
          .info
            padding-top: 4px
            font-size: 12px
            span
              padding-left: 6px
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
          width: 22px
          height: 25px
          margin: 0 15px 0 12px
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
        margin: 0 12px
        li
          display: flex
          padding: 20px 12px
          box-sizing: border-box
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
              display: inline-block
              margin-right: 5px
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
                  color: #999
              .total
                font-size: 12px
                color: #999
      .numberWrap
        border-top-1px(#dfdfdf)
        border-bottom-1px(#dfdfdf)
        ul
          padding: 5px 12px 5px 24px
          li
            display: flex
            align-items: center
            justify-content: space-between
            line-height: 34px
            box-sizing: border-box
            font-size: 12px
            color: #333
            .value
              font-size: 14px
              color: #999
            &:last-child
              .value
                color: #f53663
            &:nth-child(2)
              &.total
                .value
                  color: #f53663
      .orderInfoWrap
        border-bottom-1px(#dfdfdf)
        ul
          padding: 10px 24px
          li
            line-height: 24px
            font-size: 12px
            color: #999
      .footBtnWrap
        border-top-1px(#dfdfdf)
        position: fixed
        bottom: 0
        left: 0
        width: 100%
        height: 50px
        display: flex
        align-items: center
        justify-content: flex-end
        background: #fff
        .btn
          width: 80px
          height: 32px
          text-align: center
          line-height: 32px
          border-radius: 20px
          font-size: 12px
          color: #fff
          &.btnCancel
            margin-right: 12px
            background: #fa6334
          &.btnContinue, &.btnConfirm
            margin-right: 14px
            background: #f53663
  .popupWrap
    position: fixed
    z-index: 35
    top: 50%
    left: 50%
    margin-left: -150px
    margin-top: -95px
    width: 300px
    height: 190px
    text-align: center
    border-radius: 10px
    background: #fff
    .title
      padding: 20px 0 45px
      font-size: 15px
      color: #1b1b1b
    .content
      padding-bottom: 45px
      font-size: 14px
      color: #1b1b1b
    .btnWrap
      display: flex
      align-items: center
      height: 52px
      border-top-1px(#dfdfdf)
      .btn
        display: block
        position: relative
        flex: 1
        height: 100%
        line-height: 52px
        box-sizing: border-box
        font-size: 15px
        &.btnCancel
          &:after
            display: block
            content: ''
            position: absolute
            right: 0
            top: 12px
            width: 0
            height: 28px
            border-right: 1px solid #dfdfdf
        &.btnConfirm
          color: #f53663
  .mask
    position: fixed
    top: 0
    left: 0
    z-index: 10
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.8)
  .stickFootWrap
    position: fixed
    bottom: 0
    left: 0
    z-index: 200
    width: 100%
    .cancelOrderWrap
      position: absolute
      top: 0
      left: 0
      width: 100%
      padding: 0 25px
      box-sizing: border-box
      background: #ffffff
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.2s linear
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0, 0)
      .btnClose
        position: absolute
        right: 20px
        top: 20px
        font-size: 15px
        color: #2b2b2b
      .selectReasonWrap
        border-bottom-1px(#e9e9e9)
        display: flex
        align-items: center
        justify-content: space-between
        height: 45px
        margin-top: 58px
        .text
          font-size: 14px
          color: #2b2b2b
        .optionWrap
          position: relative
          font-size: 0
          .value
            display: inline-block
            margin-right: 10px
            font-size: 14px
            color: #999
          .icon
            display: inline-block
            width: 15px
            height: 8px
            background-image: url(./down.png)
            background-size: 100%
            background-repeat: no-repeat
      .addReasonWrap
        margin-bottom: 25px
        .text
          display: block
          line-height: 45px
          font-size: 14px
        textarea
          display: block
          width: 100%
          height: 110px
          padding: 10px
          box-sizing: border-box
          font-size: 12px
          line-height: 17px
          background: #f7f7f7
          border: none
          outline: none
      .btnConfirm
        display: block
        width: 100%
        height: 40px
        margin-bottom: 45px
        text-align: center
        line-height: 40px
        border-radius: 20px
        background: #f53663
        color: #fff
        font-size: 14px
  .tips
    position: fixed
    top: 50%
    left: 50%
    margin-top: -25px
    margin-left: -50px
    width: 100px
    height: 50px
    text-align: center
    line-height: 50px
    background: rgba(0, 0, 0, 0.7)
    border-radius: 8px
    color: #fff
    font-size: 12px
</style>
