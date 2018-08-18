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
      <ul class="goodsList" v-show="showSearchResult">
        <li class="border-1px">
          <router-link to="/goods/detail/1">
            <img src="./img2.png" />
            <span class="title">sofina苏菲娜隔离霜防晒妆前乳控油持久裸妆保湿遮瑕日版</span>
            <span class="price">¥120</span>
          </router-link>
        </li>
      </ul>
      <div class="noResultWrap" v-show="hasNone">
        <img src="./noresult.png" />
        <span class="txt">无搜索结果</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  export default {
    data() {
        return {
            searchResult: [],
            searchTxt: '',
            showSearchResult: false,
            hasNone: false
        };
    },
    created() {
        this.$nextTick(() => {
            this._initScroll();
        });
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
      _initScroll() {
          if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.contentWrap, {
                  click: true
              });
          } else {
              this.scroll.refresh();
          }
      },
      goBack() {
          this.$router.go(-1);
      },
      search() {
          if (this.searchTxt === '111') {
            this.showSearchResult = true;
            this.hasNone = false;
          } else {
            this.showSearchResult = false;
            this.hasNone = true;
          }
      }
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
    bottom: 46px
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
