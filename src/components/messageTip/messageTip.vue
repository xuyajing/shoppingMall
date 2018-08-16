<template>
  <transition name="fade">
    <div class="messageTipWrap" v-show="isShowMessage">
      <div class="content">
        <span class="icon"></span>
        <span class="txt">{{title}}</span>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          title: {
              type: String
          },
          isShowMessage: {
                type: Boolean
          }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.messageTipWrap
  position: fixed
  top: 40%
  left: 22vw
  width: 56vw
  height: 18vw
  opacity: 1
  background: rgba(0, 0, 0, 0.9)
  border-radius: 10px
  &.fade-enter-active, &.fade-leave-active
    transition: all 0.5s linear
  &.fade-enter, &.fade-leave-to
    opacity: 0
    background: rgba(0, 0, 0, 0)
  .content
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
    .icon
      width: 22px
      height: 15px
      margin-right: 14px
      background-image: url(./correct.png)
      background-size: 100%
      background-repeat: no-repeat
    .txt
      font-size: 14px
      color: #fff
      font-family: 'SimHei'

</style>
