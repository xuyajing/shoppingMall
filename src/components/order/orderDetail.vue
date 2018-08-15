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
              <div class="logisticsWrap">物流单号<span>88284839243975</span></div>
            </div>
            <div class="completed topMessage" v-show="type===4">
              <span class="icon"></span>
              <div class="messageWrap">
                <strong class="state">交易完成</strong>
                <p class="info">物流单号<span>88284839243975</span></p>
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
          <div class="numberWrap border-1px">
            <ul>
              <li v-show="isPayed">
                <span class="text">兑换码</span>
                <span class="value">￥400</span>
              </li>
              <li>
                <span class="text">订单总价</span>
                <span class="value">￥720</span>
              </li>
              <li v-show="isPayed">
                <span class="text">实付</span>
                <span class="value">￥320</span>
              </li>
            </ul>
          </div>
          <div class="orderInfoWrap">
            <ul>
              <li>订单编号：767676678899099009900</li>
              <li>创建时间：2018-07-19 09:09:09</li>
              <li v-show="isPayed">交易流水号：20170909787324637824638</li>
              <li v-show="isPayed">付款时间：2018-07-19 10:00:00</li>
            </ul>
          </div>
          <div class="footBtnWrap" v-show="type===1">
            <a class="btnCancel btn" @click.stop.prevent="showCancelWrap">取消订单</a>
            <a class="btnContinue btn">继续兑换</a>
          </div>
          <div class="footBtnWrap" v-show="type===3">
            <a class="btnConfirm btn" @click.stop.prevent="showPopup">确认收货</a>
          </div>
        </div>
      </div>
      <div class="popupWrap" v-show="showPopupGot">
        <div class="title">提醒</div>
        <div class="content">您确认已经收到货了吗？</div>
        <div class="btnWrap border-1px">
          <a class="btnCancel btn" @click.stop.prevent="hidePopup">取消</a>
          <a class="btnConfirm btn" @click.stop.prevent="hidePopup">确定</a>
        </div>
      </div>
      <div class="mask" v-show="showMask" @click.stop.prevent="hidePopup"></div>
      <div class="stickFootWrap">
        <transition name="fold">
          <form class="cancelOrderWrap" v-show="isShowCancelOrder">
            <a class="btnClose" @click.stop.prevent="hideCancelWrap">取消</a>
            <div class="selectReasonWrap border-1px">
              <span class="text">取消原因</span>
              <div class="optionWrap">
                <span class="value">{{cancelReason}}</span>
                <span class="icon"></span>
              </div>
            </div>
            <div class="addReasonWrap">
              <span class="text">补充说明</span>
              <textarea :v-model="addReason" placeholder="请输入原因"></textarea>
            </div>
            <a class="btnConfirm">确定</a>
          </form>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';

  export default {
      data() {
         return {
           title: '订单详情',
           type: 1, // 1:待兑换，2:待发货，3:待收货，4:已完成
           isPayed: true, // 是否已付款
           hasNoAddr: false,
           showPopupGot: false, // 显示收货提醒
           showMask: false, // 显示遮罩层
           cancelReason: '不想拍了',
           addReason: '',
           isShowCancelOrder: false
         };
      },
      created() {
        this.$nextTick(() => {
            this.type = this.$route.query.type;
        });
      },
      watch: {
        $route() {
          this.type = this.$route.query.type;
        }
      },
      methods: {
          showPopup() {
            this.showPopupGot = true;
            this.showMask = true;
          },
          hidePopup() {
              this.showPopupGot = false;
              this.showMask = false;
          },
          showCancelWrap() {
              this.showMask = true;
              this.isShowCancelOrder = true;
          },
          hideCancelWrap() {
            this.showMask = false;
            this.isShowCancelOrder = false;
          }
      },
      components: {
        topHeader
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
        padding: 0 20px
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
            width: 23px
            height: 19px
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
      .numberWrap
        border-top-1px(#dfdfdf)
        border-bottom-1px(#dfdfdf)
        ul
          padding: 5px 24px
          li
            display: flex
            align-items: center
            justify-content: space-between
            line-height: 34px
            box-sizing: border-box
            font-size: 12px
            color: #333
            .value
              color: #999
            &:last-child
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
    background: rgba(0, 0, 0, 0.5)
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
</style>
