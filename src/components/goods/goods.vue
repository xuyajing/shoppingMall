<template>
  <div class="goodsWrap">
    <search-bar></search-bar>
    <div class="contentWrap" ref="contentWrap">
      <ul class="goodsList">
        <li class="border-1px">
          <router-link to="/goods/detail/1">
            <img src="./img2.png" />
            <span class="title">sofina苏菲娜隔离霜防晒妆前乳控油持久裸妆保湿遮瑕日版</span>
            <span class="price">¥120</span>
          </router-link>
        </li>
        <li class="border-1px">
          <router-link to="/goods/detail/:id">
            <img src="./img2.png" />
            <span class="title">sofina苏菲娜隔离霜防晒妆前乳控油持久裸妆保湿遮瑕日版</span>
            <span class="price">¥120</span>
          </router-link>
        </li>
        <li class="border-1px">
          <router-link to="/goods/detail/:id">
            <img src="./img2.png" />
            <span class="title">sofina苏菲娜隔离霜防晒妆前乳控油持久裸妆保湿遮瑕日版</span>
            <span class="price">¥120</span>
          </router-link>
        </li>
        <li class="border-1px">
          <router-link to="/goods/detail/:id">
            <img src="./img2.png" />
            <span class="title">sofina苏菲娜隔离霜防晒妆前乳控油持久裸妆保湿遮瑕日版</span>
            <span class="price">¥120</span>
          </router-link>
        </li>
        <li class="border-1px">
          <router-link to="/goods/detail/:id">
            <img src="./img2.png" />
            <span class="title">sofina苏菲娜隔离霜防晒妆前乳控油持久裸妆保湿遮瑕日版</span>
            <span class="price">¥120</span>
          </router-link>
        </li>
        <li class="border-1px">
          <router-link to="/goods/detail/:id">
            <img src="./img2.png" />
            <span class="title">sofina苏菲娜隔离霜防晒妆前乳控油持久裸妆保湿遮瑕日版</span>
            <span class="price">¥120</span>
          </router-link>
        </li>
      </ul>
    </div>
    <footer-guide></footer-guide>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import searchBar from 'components/searchBar/searchBar';
  import footerGuide from 'components/footerGuide/footerGuide';
  import BScroll from 'better-scroll';

  export default {
      created() {
          this.$nextTick(() => {
            this._initScroll();
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
          }
      },
      components: {
        footerGuide,
        searchBar
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
