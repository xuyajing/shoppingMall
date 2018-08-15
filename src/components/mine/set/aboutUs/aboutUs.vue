<template>
  <transition name="move">
    <div class="aboutUsWrap">
      <top-header :title="title"></top-header>
      <div class="contentWrap">
        <section>
          <h2 class="title">本商城是为了</h2>
          <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        </section>
        <section>
          <h2 class="title">我们致力于</h2>
          <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        </section>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';

  export default {
    data() {
        return {
            title: '关于我们'
        };
    },
    components: {
      topHeader
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.aboutUsWrap
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
  .contentWrap
    section
      padding: 0 34px 0 27px
      margin: 20px auto 40px
      h2
        line-height: 17px
        font-size: 14px
        color: #2b2b2b
      p
        word-break: break-all
        line-height: 17px
</style>
