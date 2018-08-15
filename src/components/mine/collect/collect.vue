<template>
  <transition name="move">
    <div class="collectWrap">
      <top-header :title="title" :operation="operation"></top-header>
      <div class="collectListWrap">
        <ul class="collectList">
          <li class="border-1px">
            <router-link to="">
              <img src="../img2.png" />
              <span class="title">sofina苏菲娜隔离霜防晒妆前乳控油持久裸妆保湿遮瑕日版</span>
              <span class="price">¥120</span>
            </router-link>
          </li>
          <li class="border-1px disabled">
            <router-link to="">
              <img src="../img2.png" />
              <span class="title">sofina苏菲娜隔离霜防晒妆前乳控油持久裸妆保湿遮瑕日版</span>
              <span class="price">¥120</span>
              <div class="disabledFlag" v-show="isDisabled">
                <span>已失效</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="popupDeleteWrap" v-show="showDeleteFail">
        <div class="title">删除提醒</div>
        <div class="content">确定从收藏里删除该宝贝吗？</div>
        <div class="btnWrap border-1px">
          <a class="btnCancel btn">取消</a>
          <a class="btnConfirm btn">确定</a>
        </div>
      </div>
      <div class="mask" v-show="showMask"></div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';

  export default {
      data() {
          return {
              title: '收藏宝贝',
              operation: '清空失效',
              isDisabled: true,
              showDeleteFail: false,
              showMask: false
          };
      },
      components: {
        topHeader
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
.collectWrap
  position: fixed
  top: 0
  left: 0
  z-index: 30
  width: 100%
  height: 100%
  background: #fff
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .collectListWrap
    position: absolute
    top: 60px
    left: 0
    width: 100%
    .collectList
      margin: 0 12px
      li
        border-bottom-1px(#ccc)
        margin-bottom: 10px
        padding-bottom: 10px
        &:last-child
          &:after
            border: none
        &.disabled
          opacity: 0.5
        a
          display: block
          overflow: hidden
          img
            float: left
            width: 115px
            margin-right: 12px
          .title
            display: block
            height: 34px
            padding: 10px 10px 20px 0
            line-height: 17px
            font-size: 14px
            text-overflow: ellipsis
            color: #1a1a1a
            overflow: hidden
          .price
            display: block
            line-height: 17px
            font-size: 15px
            color: #f53663
          .disabledFlag
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            display: flex
            align-items: center
            justify-content: center
            span
              width: 58px
              height: 58px
              border-radius: 50%
              text-align: center
              line-height: 58px
              background: rgba(0, 0, 0, 0.5)
              color: #fff
              font-size: 15px
  .popupDeleteWrap
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
