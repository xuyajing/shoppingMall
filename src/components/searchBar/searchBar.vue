<template>
  <div class="searchBarWrap border-1px">
    <router-link to="/search">
      <div class="searchBar">
          <span class="iconSearch">
            <img src="./search.png" width="100%"/>
          </span>
        <span class="searchTxt">搜索</span>
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .searchBarWrap
    display: flex
    align-items: center
    position: fixed
    z-index: 20
    top: 0
    left: 0
    width: 100%
    height: 50px
    background: #fff
    border-bottom-1px(#dfdfdf)
    box-sizing: border-box
    a
      display: block
      width: 100%
      .searchBar
        display: flex
        align-items: center
        width: 95%
        height: 28px
        margin: 10px auto
        padding-left: 16px
        border-radius: 20px
        background: #f4f4f4
        box-sizing: border-box
        .iconSearch
          width: 13.5px
          height: 14px
          margin-right: 10px
        .searchTxt
          font-size: 14px
          color: #c5c5c5
</style>
