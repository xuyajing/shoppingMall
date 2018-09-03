<template>
  <div class="searchWrap">
    <div class="topBar border-1px">
      <a class="btnBack" @click.stop.prevent="goBack"></a>
      <div class="searchBar">
          <span class="iconSearch">
            <img src="./search.png" width="100%"/>
          </span>
        <input class="searchTxt" type="text" placeholder="搜索你想要的商品" @keyup.enter="search" v-model="searchTxt"/>
      </div>
    </div>
    <div class="contentWrap" ref="contentWrap">
      <scroll ref="scroll"
              :dataList="productList"
              :scrollbar="scrollbar"
              :pullUpLoad="pullUpLoad"
              :beforePullUpWord="beforePullUpWord"
              :startY="parseInt(startY)"
              @onPullUp="onPullingUp">
        <ul class="goodsList">
          <li class="border-1px" v-for="(item, index) in productList" :key="index">
            <router-link :to="{name: 'goodDetail', params: {id: item.id}}">
              <img :src="item.thumb" width="120px" height="90px"/>
              <span class="title">{{item.name}}</span>
              <span class="price">¥{{item.price}}</span>
            </router-link>
          </li>
        </ul>
      </scroll>
      <div class="noResultWrap" v-show="hasNone">
        <img src="./noresult.png" />
        <span class="txt">无搜索结果</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import scroll from '../common/scroll/scroll.vue';
  import {searchProduct} from '@/service/getData';
  import {getStore} from '../../config/mUtils';

  export default {
    data() {
        return {
            productList: [],
            searchTxt: '',
            hasNone: false,
            hasSearched: false,
            token: '',
            hasMore: true,
            page: 1,
            pageSize: 10,
            pullDownRefresh: {
              threshold: 90,
              stop: 40
            },
            pullUpLoad: {
              threshold: -50
            },
            scrollbar: true,
            startY: 0,
            beforePullUpWord: ''
        };
    },
    created() {
      this.token = getStore('token');
    },
    computed: {
      showResult() {
//        if (this.searchResult.length > 0) {
//          return true;
//        }
        return true;
      }
    },
    methods: {
      goBack() {
          this.$router.go(-1);
      },
      async search() {
          this.productList = [];
          this.hasSearched = true;
          let searchResult = await searchProduct(this.searchTxt, this.token, this.page, this.pageSize);
          if (searchResult.data.productList.length === 0) {
              this.hasNone = true;
          } else {
              this.hasNone = false;
              this.productList = searchResult.data.productList;
          }
      },
      async onPullingUp() {
          if (this.hasMore) {
              this.$refs.scroll.beforePullUp();
              this.page = this.page + 1;
              let searchResult = await searchProduct(this.searchTxt, this.token, this.page, this.pageSize);
              if (searchResult.data.productList.length < this.pageSize) {
                  this.hasMore = false;
              }
              setTimeout(function() {
                  if (searchResult.data.productList.length > 0) {
                      this.productList = this.productList.concat(searchResult.data.productList);
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
      scroll
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
.searchWrap
  .topBar
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 50px
    display: flex
    align-items: center
    border-bottom-1px(#dfdfdf)
    .btnBack
      display: block
      width: 10px
      height: 17px
      margin: 0 12px 0 16px
      background-image: url(./back.png)
      background-size: 100%
      background-repeat: no-repeat
    .searchBar
      display: flex
      align-items: center
      position: relative
      flex: 1
      height: 28px
      margin-right: 12px
      border-radius: 20px
      background: #f4f4f4
      .iconSearch
        width: 15px
        margin: 4px 11px 0 18px
      input
        flex: 1
        margin-right: 10px
        font-size: 14px
        color: #f53663
        &::-webkit-input-placeholder {
          color: #f53663;
        }
        &:-moz-placeholder {
          color: #f53663;
        }
        &::-moz-placeholder {
          color: #f53663;
        }
        &:-ms-input-placeholder {
          color:#f53663;
        }
  .contentWrap
    position: absolute
    top: 60px
    bottom: 0
    left: 0
    width: 100%
    background: #fff
    .goodsList
      margin: 0 12px
      li
        border-bottom-1px(#ccc)
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
            width: 115px
          .title
            display: block
            height: 34px
            padding: 10px 10px 20px 12px
            line-height: 17px
            font-size: 14px
            text-overflow: ellipsis
            color: #1a1a1a
            overflow: hidden
          .price
            display: block
            line-height: 17px
            margin-left: 127px
            font-size: 15px
            color: #f53663
    .noResultWrap
      padding-top: 65px
      text-align: center
      img
        width: 68px
      .txt
        display: block
        padding-top: 20px
        font-size: 15px
        text-align: center
        color: #666
</style>
