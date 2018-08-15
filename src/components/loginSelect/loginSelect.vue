<template>
  <div class="loginSelectWrap">
    <span class="avatar"></span>
    <a class="btn btnPhone">手机密码登录</a>
    <a class="btn btnWeChat">微信登录</a>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
.loginSelectWrap
  margin: 0 28px
  .avatar
    display: block
    margin: 82px auto 60px
    width: 96px
    height: 96px
    border-radius: 50%
    background: #ff7596
  .btn
    display: block
    width: 100%
    height: 38px
    margin-bottom: 17px
    line-height: 38px
    text-align: center
    border-radius: 30px
    color: #fff
    font-size: 14px
    &.btnPhone
      background: #fa6334
    &.btnWeChat
      background: #f53663

</style>
