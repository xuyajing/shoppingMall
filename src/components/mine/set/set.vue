<template>
  <transition name="move">
    <div class="setWrap">
      <top-header :title="title"></top-header>
      <div class="contentWrap">
        <ul>
          <li>
            <router-link to="/mine/set/aboutus" class="border-1px">
              <span class="text">关于我们</span>
              <span class="rightArrow"></span>
            </router-link>
          </li>
          <li>
            <span class="text">当前版本</span>
            <span class="value">V.1.1.2</span>
          </li>
        </ul>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';

  export default {
      data() {
          return {
              title: '系统设置'
          };
      },
      components: {
        topHeader
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
.setWrap
  position: fixed
  top: 0
  left: 0
  z-index: 40
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
    left: 0
    width: 100%
    ul
      li
        height: 45px
        margin: 0 12px
        padding-left: 15px
        line-height: 45px
        border-bottom-1px(#e9e9e9)
        box-sizing: border-box
        font-size: 0
        a
          display: flex
          align-items: center
          justify-content: space-between
          .text
            font-size: 14px
            color: #2b2b2b
          .rightArrow
            width: 9px
            height: 15px
            background-image: url(../right.png)
            background-size: 100%
            background-repeat: no-repeat
        .text
          display: inline-block
          width: 50%
          font-size: 14px
          color: #2b2b2b
        .value
          display: inline-block
          width: 50%
          padding-right: 13px
          text-align: right
          box-sizing: border-box
          font-size: 14px
          color: #999
</style>
