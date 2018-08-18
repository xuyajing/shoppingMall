<template>
  <div class="indexWrap">
    <search-bar></search-bar>
    <div class="contentWrap"  ref="contentWrap">
      <div>
        <div class="swiperWrap">
          <div class="swiper-container" v-if="pushedGoods.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in pushedGoods" :key="index">
                <router-link to="{path: '/goods/detail/:id', params: {id: 1}}" :key="item.id" class="link_to_food">
                  <img src="./slidImg.png" width="100%" height="160px" :alt="item.alt"/>
                </router-link>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <div class="goodsListWrap">
          <ul v-if="goodsList">
            <li v-for="(item, index) in goodsList" :key="index" :class="{'border-1px': !(goodsList.length%2 ===1 && index === (goodsList.length-1))}">
              <router-link to="/goods/detail/1'">
                <img src="./img1.png" width="100%" />
                <span class="title">{{item.title}}</span>
                <span class="price">￥{{item.price}}</span>
              </router-link>

            </li>
          </ul>
        </div>
      </div>
    </div>
    <footer-guide></footer-guide>
    <keep-alive><router-view></router-view></keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import footerGuide from 'components/footerGuide/footerGuide';
  import BScroll from 'better-scroll';
  import Swiper from 'swiper';
  import searchBar from 'components/searchBar/searchBar';

  export default {
    data() {
        return {
          pushedGoods: [{
              src: '../src/components/index/slidImg.png',
              title: '111'
          }, {
              src: '../src/components/index/slidImg.png',
              title: '222'
          }],
          goodsList: [{
              imgSrc: '',
              title: 'Huawei/华为 P20 全面屏徕卡双摄智能',
              price: 1200,
              id: 1
          }, {
            imgSrc: '',
            title: 'OLAY大红瓶面霜新生塑颜金纯面霜女滋润补水啊啊',
            price: 1200,
            id: 1
          }, {
            imgSrc: '',
            title: 'OLAY大红瓶面霜新生塑颜金纯面霜女滋润补水啊啊',
            price: 1200,
            id: 1
          }, {
            imgSrc: '',
            title: 'OLAY大红瓶面霜新生塑颜金纯面霜女滋润补水啊啊',
            price: 1200,
            id: 1
          }, {
            imgSrc: '',
            title: 'OLAY大红瓶面霜新生塑颜金纯面霜女滋润补水啊啊',
            price: 1200,
            id: 1
          }]
        };
    },
    created() {
        this.$nextTick(() => {
            this._initScroll();
        });
    },
    mounted() {
      /* eslint-disable no-new */
      new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true
      });
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.contentWrap, {
            click: true,
            probeType: 3
          });
        } else {
          this.scroll.refresh();
        }
      },
      loadData() {
//        requestData().then((res) => {
//          this.data = res.data.concat(this.data);
//          this.$nextTick(() => {
//            if (!this.scroll) {
//              this.scroll = new BScroll(this.$refs.wrapper, {});
//              this.scroll.on('touchend', (pos) => {
//                // 下拉动作
//                if (pos.y > 50) {
//                  this.loadData();
//                }
//              });
//            } else {
//              this.scroll.refresh();
//            }
//          });
//        });
      }
    },
    components: {
      footerGuide,
      searchBar
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  @import '../../common/stylus/swiper.min.css'
.indexWrap
  .contentWrap
    position: absolute
    top: 50px
    bottom: 46px
    left: 0
    width: 100%
    .swiperWrap
      width: 100%
      height: 160px
      .swiper-container
        width: 100%
        height: 100%
        .swiper-pagination
          .swiper-pagination-bullet
            width: 9px
            height: 9px
            background: #fff
            opacity: 0.5
            &.swiper-pagination-bullet-active
              background: #f53663
              opacity: 1
    .goodsListWrap
      width: 94%
      margin: 10px auto
      ul
        li
          display: inline-block
          width: 50%
          padding-bottom: 10px
          margin-bottom: 10px
          box-sizing: border-box
          &:nth-child(odd)
            padding-right: 5px
          &:nth-child(even)
            padding-left: 5px
            border-bottom-1px(#dfdfdf)
            &:after
              width: 200%
              left: -100%
          a
            display: block
            img
              display: block
              margin-bottom: 6px
            .title
              display: block
              margin-bottom: 6px
              height: 34px
              line-height: 17px
              font-size: 14px
              color: #303030
              overflow: hidden
              text-overflow: ellipsis
            .price
              display: block
              margin-bottom: 6px
              font-size: 15px
              color: #f53663
              font-family: 'Arial'

</style>
