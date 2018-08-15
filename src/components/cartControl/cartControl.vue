<template>
  <div class="cartControlWrap">
    <span class="cartDecrease" @click.stop.prevent="decreaseCart">
      <img src="./reduce.png" width="15px"/>
    </span>
    <span class="cartCount">1</span>
    <span class="cartAdd" @click.stop.prevent="addCart">
      <img src="./add.png" width="15px"/>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartControlWrap
  font-family: 'SimHei'
  font-size: 0
  .cartDecrease, .cartAdd
    display: inline-block
    vertical-align: middle
    width: 33px
    height: 26px
    line-height: 26px
    background: #f53663
    text-align: center
    box-sizing: border-box
  .cartAdd
    padding-top: 4px
  .cartCount
    display: inline-block
    vertical-align: middle
    padding: 0 10px
    height: 26px
    line-height: 26px
    font-size: 14px
    font-family: 'Arial'
</style>
