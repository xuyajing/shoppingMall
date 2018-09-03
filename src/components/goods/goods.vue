<template>
  <div class="goodsWrap">
    <search-bar></search-bar>
    <div class="contentWrap" ref="contentWrap">

      <scroll ref="scroll"
              :dataList = "productList"
              :scrollbar="scrollbar"
              :pullDownRefresh="pullDownRefresh"
              :pullUpLoad="pullUpLoad"
              :beforePullUpWord="beforePullUpWord"
              :startY="parseInt(startY)"
              @onPullDown="onPullingDown"
              @onPullUp="onPullingUp">
        <ul class="goodsList">
          <li class="border-1px" v-for="(item, index) in productList" :key="index">
            <router-link :to="{name: 'goodDetail', params: {id: item.id}}">
              <img :src="item.thumb" width="120px" height="90px" />
              <span class="title">{{item.name}}</span>
              <span class="price">¥{{item.price}}</span>
            </router-link>
          </li>
        </ul>
      </scroll>
    </div>
    <footer-guide></footer-guide>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import searchBar from 'components/searchBar/searchBar';
  import footerGuide from 'components/footerGuide/footerGuide';
  import scroll from '../common/scroll/scroll.vue';
  import {getProductList} from '@/service/getData';
  import {getStore} from '@/config/mUtils';

  export default {
      data() {
          return {
              productList: [],
              token: '',
              page: 1,
              pageSize: 10,
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
              beforePullUpWord: '加载更多'
          };
      },
      activated() {
          this.token = getStore('token');
          this.page = 1;
          this.loadData();
          this.productList = [];
          this.beforePullUpWord = '加载更多';
          this.hasMore = true;
      },
      methods: {
          async loadData() {
              let getProductListResult = await getProductList(this.token, this.page, this.pageSize);
              if (getProductListResult.data.productList.length > 0) {
                this.productList = this.productList.concat(getProductListResult.data.productList);
              }
//              if (getProductListResult.data.productList.length < this.pageSize) {
//                  this.hasMore = false;
//                  this.beforePullUpWord = '没有更多了';
//              }
          },
          // 上拉加载
          async onPullingUp() {
              if (this.hasMore) {
                this.$refs.scroll.beforePullUp();
                this.page = this.page + 1;
                let getProductListResult = await getProductList(this.token, this.page, this.pageSize);

                if (getProductListResult.data.productList.length < this.pageSize) {
                  this.hasMore = false;
                }
                setTimeout(() => {
                  if (getProductListResult.data.productList.length > 0) {
                    this.productList = this.productList.concat(getProductListResult.data.productList);
                  } else {
                      this.beforePullUpWord = '没有更多了';
                      this.$refs.scroll.disable();
                  }
                  this.$refs.scroll.finish('PullUp');
                }, 2000);
              }
          },
          async onPullingDown() {
            // 下拉刷新
            this.page = 1;
            let getProductListResult = await getProductList(this.token, this.page, this.pageSize);
            setTimeout(() => {
              this.$refs.scroll.finish('PullDown');
              this.productList = getProductListResult.data.productList;
            }, 2000);
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
  @import '../../common/stylus/mixin.styl';
.goodsWrap
  .contentWrap
    position: absolute
    top: 60px
    bottom: 50px
    left: 0
    width: 100%
    background: #fff
    .goodsList
      margin: 0 12px
      li
        border-bottom-1px(#dfdfdf)
        margin-bottom: 10px
        padding-bottom: 10px
        &:last-child
          &:after
            border: none
        a
          display: block
          overflow: hidden
          img
            float: left
            width: 120px
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
</style>
