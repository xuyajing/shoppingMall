<template>
  <div class="orderDetailWrap">
    <top-header :title="title"></top-header>
    <div class="contentWrap">
      <div class="main" ref="main">
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
        <div class="orderInfoWrap border-1px">
          <div class="orderNumber">订单编号：767676678899099009900</div>
          <div class="createdTime">创建时间：2018-07-19 09:09:09</div>
        </div>
        <div class="orderTotalWrap">
          <span class="txt">订单总价</span>
          <span class="value">￥720</span>
        </div>
        <div class="footBtnWrap border-1px">
          <a class="btn btnCancel">取消订单</a>
          <a class="btn btnContinue">继续兑换</a>
        </div>
      </div>
    </div>
    <div class="popupFailWrap" v-show="showPopupFail">
      <div class="title">提醒</div>
      <div class="content">确定要取消订单？</div>
      <div class="btnWrap border-1px">
        <a class="btnCancel btn">取消</a>
        <a class="btnConfirm btn">确定</a>
      </div>
    </div>
    <div class="mask" v-show="showMask"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';

  export default {
    data() {
      return {
        title: '订单详情',
        showPopupFail: true,
        showMask: true
      };
    },
    components: {
      topHeader
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .contentWrap
    position: absolute
    top: 50px
    left: 0
    width: 100%
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
    .orderInfoWrap
      height: 74px
      line-height: 17px
      padding: 20px 0 0 23px
      box-sizing: border-box
      color: #999
      font-size: 12px
      border-top-1px(#dfdfdf)
      border-bottom-1px(#dfdfdf)
      .orderNumber
        padding-bottom: 7px
    .orderTotalWrap
      display: flex
      align-items: center
      justify-content: space-between
      height: 50px
      padding: 0 23px
      border-bottom-1px(#dfdfdf)
      .txt
        font-size: 12px
        color: #333
      .value
        font-size: 14px
        color: #f53663
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
      .btn
        width: 80px
        height: 32px
        text-align: center
        line-height: 32px
        color: #ffffff
        border-radius: 20px
        font-size: 12px
        &.btnCancel
          margin-right: 12px
          background: #fa6334
        &.btnContinue
          margin-right: 14px
          background: #f53663
  .popupFailWrap
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
</style>
