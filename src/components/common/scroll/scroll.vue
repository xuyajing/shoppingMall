<template>
    <div ref="wrapper" class="list-wrapper">
        <div class="scroll-content">
          <slot></slot>
          <div class="pullup-wrapper">
            <PullingWord v-show="!inPullUp&&dataList.length>0" :loadingWord="beforePullUpWord"></PullingWord>
            <Loading v-show="inPullUp" :loadingWord='PullingUpWord'></Loading>
          </div>
        </div>

        <transition name="pullDown">
          <div class="pulldown-wrapper">
            <Loading class="pullDown" v-show="inPullDown" :loadingWord='PullingDownWord'></Loading>
          </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import Loading from '../loading/loading.vue';
    import PullingWord from '../pullingWord/pullingWord';

    const PullingUpWord = '正在拼命加载中...';
//    const beforePullUpWord = '加载更多';
//    const finishPullUpWord = '加载完成';
    const PullingDownWord = '加载中...';

    export default {
        props: {
          dataList: {
            type: Array
          },
          probeType: {
            type: Number,
            default: 3
          },
          beforePullUpWord: {
              type: String,
              default: ''
          },
          click: {
            type: Boolean,
            default: true
          },
          pullDownRefresh: {
            type: null,
            default: false
          },
          pullUpLoad: {
            type: null,
            default: false
          }
        },
        data() {
          return {
            scroll: null,
            inPullUp: false,
            inPullDown: false,
//            beforePullUpWord,
            PullingUpWord,
            PullingDownWord,
            continuePullUp: true
          };
        },
        mounted() {
          setTimeout(() => {
              this.$nextTick(() => {
                this.initScroll();
                console.log('this.scroll = ' + this.scroll);

                this.scroll.on('pullingUp', () => {
                  if (this.continuePullUp) {
//                this.beforePullUp();
                    this.$emit('onPullUp', '当前状态：上拉加载');
                  }
                });
                this.scroll.on('pullingDown', () => {
                  this.beforePullDown();
                  this.$emit('onPullDown', '当前状态：下拉加载更多');
                });
              });
          }, 20);
        },
        methods: {
          initScroll() {
            if (!this.$refs.wrapper) {
              return;
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
              probeType: this.probeType,
              click: this.click,
              pullDownRefresh: this.pullDownRefresh,
              pullUpLoad: this.pullUpLoad
            });
          },
          beforePullUp() {
            this.PullingUpWord = PullingUpWord;
            this.inPullUp = true;
          },
          beforePullDown() {
            this.disable();
            this.inPullDown = true;
          },
          finish(type) {
            this['finish' + type]();
            this.enable();
            this['in' + type] = false;
          },
          disable() {
            this.scroll && this.scroll.disable();
          },
          enable() {
            this.scroll && this.scroll.enable();
          },
          refresh() {
            this.scroll && this.scroll.refresh();
          },
          finishPullDown() {
            this.scroll && this.scroll.finishPullDown();
          },
          finishPullUp() {
            this.scroll && this.scroll.finishPullUp();
          }
        },
        watch: {
          dataList() {
            this.$nextTick(() => {
              this.refresh();
            });
          }
        },
        components: {
          BScroll,
          Loading,
          PullingWord
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .list-wrapper
      position: absolute
      left: 0
      top: 0
      right: 0
      bottom: 0
      width: 100%
      overflow: hidden
      background: #fff
      .pulldown-wrapper
          position: absolute
          width: 100%
          top: 0
          left: 0
          display: flex
          justify-content center
          align-items center
          transform: translateY(0)
          &.pullDown-enter-active
            transition: all 0.2s
          &.pullDown-enter, &.pullDown-leave-to
            transform: translateY(-100%)
      .pullup-wrapper
          width: 100%
          display: flex
          justify-content center
          align-items center
          padding: 16px 0
          font-size: 12px
</style>
