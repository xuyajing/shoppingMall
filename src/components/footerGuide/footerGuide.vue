<template>
  <div class="tabWrap">
    <div class="foot tab border-1px">
      <div class="tabItem">
        <router-link to="/index">
          <span class="icon home"></span>
          <p class="txt">首页</p>
        </router-link>
      </div>
      <div class="tabItem">
        <router-link to="/goods">
          <span class="icon goods"></span>
          <p class="txt">商品</p>
        </router-link>
      </div>
      <div class="tabItem">
        <router-link to="/shopcart">
          <span class="icon shopCart"></span>
          <p class="txt">购物车</p>
        </router-link>
      </div>
      <div class="tabItem">
        <router-link to="/mine">
          <span class="icon mine"></span>
          <p class="txt">我的</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .tabWrap
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 50px
    line-height: 50px
    background: #fff
    .tab
      display: flex
      width: 100%
      height: 100%
      font-size: 10px
      border-top-1px(#ccc)
      .tabItem
        height: 100%
        flex: 1
        text-align: center
        & > a
          position: relative
          display: block
          height: 100%
          font-size: 10px
          color: rgb(77, 85, 93)
          overflow: hidden
          &.active
            color: rgb(240, 20, 20)
            .home
              background-image: url(./home_active.png)
            .goods
              background-image: url(./commodity_active.png)
            .shopCart
              background-image: url(./shoppingCart_active.png)
            .mine
              background-image: url(./mine_active.png)
          .home
            display: block
            width: 20px
            height: 20px
            margin: 7px auto
            background-image: url(./home.png)
            background-size: 100%
            background-repeat: no-repeat
          .goods
            display: block
            width: 21px
            height: 22px
            margin: 6px auto
            background-image: url(./commodity.png)
            background-size: 100%
            background-repeat: no-repeat
          .shopCart
            display: block
            width: 21px
            height: 20px
            margin: 7px auto
            background-image: url(./shoppingCart.png)
            background-size: 100%
            background-repeat: no-repeat
          .mine
            display: block
            width: 19px
            height: 20px
            margin: 7px auto
            background-image: url(./mine.png)
            background-size: 100%
            background-repeat: no-repeat
          .txt
            position: absolute
            width: 100%
            bottom: 5px
            text-align: center
            line-height: 13px
        &:nth-child(3)
          & > a
            .txt
              padding-left: 2px

</style>
