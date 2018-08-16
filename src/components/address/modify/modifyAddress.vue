<template>
  <transition name="move">
    <div class="modifyAddressWrap">
      <top-header :title="title"></top-header>
      <form class="modifyAddressForm">
        <ul>
          <li class="item">
            <label>收件人</label>
            <div class="inputWrap rightWrap border-1px">
              <input type="text" name="addressee" v-model="addressInfo.addressee"/>
            </div>
          </li>
          <li class="item">
            <label>电话</label>
            <div class="inputWrap rightWrap border-1px">
              <input type="tel" name="phoneNumber" maxlength="11" v-model="addressInfo.tel" />
            </div>
          </li>
          <li class="item">
            <label>地址选择</label>
            <div class="areaWrap rightWrap border-1px">
              <input type="text" name="area" v-model="addressInfo.area" />
              <span class="rightArrow"></span>
            </div>
          </li>
          <li class="item detailAddress">
            <label>详细地址</label>
            <div class="textareaWrap">
              <textarea v-model="addressInfo.detailAddress"></textarea>
            </div>
          </li>
          <li>
            <label>设为默认</label>
            <div class="rightWrap setDefaultWrap">
              <span :class="isOpen ? 'open' : 'close'"></span>
            </div>
          </li>
        </ul>
        <a class="btnConfirm">确定</a>
      </form>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';

  export default {
      data() {
          return {
              title: '修改地址',
              addressInfo: {
                  addressee: '吴彦祖',
                  tel: '18121000000',
                  area: '安徽省 芜湖市 鸠江区',
                  detailAddress: '金域华府10#1002'
              },
              isOpen: false
          };
      },
      components: {
        topHeader
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
.modifyAddressWrap
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #fff
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .modifyAddressForm
    position: absolute
    top: 50px
    left: 0
    width: 100%
    ul
      li
        display: flex
        align-items: center
        justify-content: space-between
        height: 45px
        padding: 0 25px
        label
          width: 75px
          font-size: 14px
          color: #999
          font-family: 'PingFang SC', 'SimHei'
        .rightWrap
          flex: 1
          height: 100%
          &.inputWrap, &.areaWrap
            border-bottom-1px(#e9e9e9)
          input
            width: 100%
            height: 100%
            font-size: 14px
            color: #2b2b2b
            font-family: 'PingFang SC', 'SimHei'
          &.areaWrap
            display: flex
            input
              flex: 1
          .rightArrow
            display: inline-block
            width: 9px
            height: 15px
            margin-top: 15px
            background-image: url(../right.png)
            background-size: 100%
            background-repeat: no-repeat
          &.setDefaultWrap
            text-align: right
          .open, .close
            display: inline-block
            width: 46px
            height: 24px
            margin-top: 10px
            background-size: 100%
            background-repeat: no-repeat
          .open
            background-image: url(../open.png)
          .close
            background-image: url(../close.png)
        &.detailAddress
          height: 162px
          align-items: flex-start
          label
            width: 75px
            height: 45px
            line-height: 45px
          .textareaWrap
            flex: 1
            height: 100%
            textarea
              width: 100%
              height: 142px
              margin: 10px 0
              padding: 5px
              line-height: 17px
              box-sizing: border-box
              font-size: 14px
              color: #2b2b2b
              background: #f7f7f7
              font-family: 'PingFang SC', 'SimHei'
              outline: none
              border: none
    .btnConfirm
      display: block
      width: 300px
      height: 40px
      text-align: center
      line-height: 40px
      margin: 37px auto
      border-radius: 20px
      color: #fff
      font-size: 14px
      background: #f53663
</style>
