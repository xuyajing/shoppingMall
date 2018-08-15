<template>
  <div class="orderSuccessWrap">
    <div class="successWrap">
      <span class="icon"></span>
      <p>下单成功</p>
    </div>
    <a class="btn btnHome">返回首页</a>
    <a class="btn btnView">查看订单</a>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
.orderSuccessWrap
  position: fixed
  top: 0
  left: 0
  z-index: 100
  width: 100%
  height: 100%
  background: #fff
  .successWrap
    width: 100%
    margin: 65px auto 60px
    .icon
      display: block
      width: 80px
      height: 80px
      margin: 0 auto 28px
      background-image: url(./completed.png)
      background-size: 100%
      background-repeat: no-repeat
    p
      text-align: center
      font-size: 15px
      color: #333
  .btn
    display: block
    height: 38px
    margin: 0 30px 17px
    line-height: 38px
    text-align: center
    border-radius: 20px
    box-sizing: border-box
    font-size: 14px
    color: #fff
    &.btnHome
      border: 1px solid #fa6334
      color: #fa6334
    &.btnView
      background: #f53663
</style>
