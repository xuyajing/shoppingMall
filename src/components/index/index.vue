<template>
  <div class="indexWrap">
    <search-bar></search-bar>
    <div class="contentWrap"  ref="contentWrap">
      <div>
        <div class="swiperWrap">
          <div class="swiper-container" v-if="bannerList.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in bannerList" :key="index">
                <router-link :to="{name: 'goodDetail', params: {id: item.id}}" :key="item.id" class="link_to_food">
                  <img :src="item.image" width="100%" height="160px" />
                </router-link>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <div class="goodsListWrap">
          <scroll ref="scroll"
                  :dataList="productList"
                  :scrollbar="scrollbar"
                  :pullUpLoad="pullUpLoad"
                  :beforePullUpWord="beforePullUpWord"
                  :startY="parseInt(startY)"
                  @onPullUp="onPullingUp">
            <ul v-if="productList">
              <li v-for="(item, index) in productList" :key="index" :class="{'border-1px': !(productList.length%2 ===1 && index === (productList.length-1))}">
                <router-link :to="{name: 'goodDetail', params: {id: item.id}}">
                  <img :src="item.thumb" width="100%" />
                  <span class="title">{{item.name}}</span>
                  <span class="price">￥{{item.price}}</span>
                </router-link>

              </li>
            </ul>
          </scroll>
        </div>
      </div>
    </div>
    <footer-guide></footer-guide>
    <keep-alive><router-view></router-view></keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import footerGuide from 'components/footerGuide/footerGuide';
  import Swiper from 'swiper';
  import searchBar from 'components/searchBar/searchBar';
  import scroll from '../common/scroll/scroll.vue';
  import {getBannerList, getMainData} from '@/service/getData';
  import {getStore} from '@/config/mUtils';
  export default {
    data() {
        return {
          bannerList: [],
          productList: [],
          code: '',
          token: '',
          hasMore: true,
          pullDownRefresh: {
            threshold: 90,
            stop: 40
          },
          pullUpLoad: {
            threshold: -50
          },
          scrollbar: true,
          startY: 0,
          beforePullUpWord: '加载更多',
          page: 1,
          pageSize: 4
        };
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
    activated() {
        this.page = 1;
        this.pageSize = 4;
        this.token = getStore('token');
        this.init();
    },
    methods: {
      async init() {
        let getBannerResult = await getBannerList(this.token);
        if (getBannerResult.code === 0) {
          this.bannerList = getBannerResult.data.bannerList;
        } else {
            alert(getBannerResult.msg);
        }

        let getMainDataResult = await getMainData(this.token, this.page, this.pageSize);
        if (getMainDataResult.code === 0) {
          this.productList = getMainDataResult.data.productList;
        } else {
            alert(getMainDataResult.msg);
        }
      },
      async onPullingUp() {
        if (this.hasMore) {
            this.$refs.scroll.beforePullUp();
            this.page = this.page + 1;
            let getMainDataResult = await getMainData(this.token, this.page, this.pageSize);
            if (getMainDataResult.data.productList.length < this.pageSize) {
                this.hasMore = false;
            }
            setTimeout(function() {
              if (getMainDataResult.data.productList > 0) {
                this.productList = this.productList.concat(getMainDataResult.data.productList);
              } else {
                  this.beforePullUpWord = '没有更多了';
                  this.$refs.scroll.disable();
              }
              this.$refs.scroll.finish('PullUp');
            }.bind(this), 2000);
        }
      }
    },
    components: {
      footerGuide,
      searchBar,
      scroll
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
      position: absolute
      top: 160px
      bottom: 0
      width: 100%
      margin: 10px 12px
      overflow: hidden
      ul
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        li
          display: inline-block
          width: 163px
          padding-bottom: 10px
          margin-bottom: 10px
          &:nth-child(even)
            border-bottom-1px(#dfdfdf)
            &:after
              width: 500%
              left: -250%
          a
            display: block
            width: 100%
            img
              display: block
              margin-bottom: 6px
              width: 100%
              height: 122px
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
