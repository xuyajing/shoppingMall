<template>
  <transition name="move">
    <div class="loginWrap">
      <top-header :title="title"></top-header>
      <form class="loginForm">
        <ul>
          <li>
            <span class="icon phone"></span>
            <input type="tel" maxlength="11" v-model="phoneNumber" placeholder="请输入手机号" />
          </li>
          <li>
            <span class="icon lock"></span>
            <input type="password" minlength="6" maxlength="20" v-model="password" placeholder="请输入密码" />
          </li>
        </ul>
        <a @click="gotoAddress({path: '/index'})" class="btn btnLogin">登录</a>
        <a @click="gotoAddress({path: '/register'})" class="btn btnRegister">没有账号？去注册</a>
        <a @click="gotoAddress({path: '/forget'})" class="btnForget">忘记密码？</a>

      </form>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';
  export default {
    data() {
      return {
        title: '登录',
        loginWay: false, // 登录方式，默认手机号码登录
        phoneNumber: null,
        password: null
      };
    },
    methods: {
      gotoAddress(path) {
          this.$router.push(path);
      }
    },
    components: {
      topHeader
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loginWrap
  position: fixed
  z-index: 10
  top: 0
  left: 0
  width: 100%
  height: 100%
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .loginForm
    padding-top: 87px
    margin: 0 28px
    ul
      padding-bottom: 32px
      li
        display: flex
        align-items: center
        position: relative
        width: 100%
        height: 38px
        padding: 10px 15px
        margin-bottom: 17px
        border: 1px solid #999
        border-radius: 30px
        box-sizing: border-box
        .phone
          width: 13px
          height: 18px
          background-image: url(../../common/images/phone.png)
          background-size: 100%
          background-repeat: no-repeat
        .lock
          width: 15px
          height: 17px
          background-image: url(../../common/images/lock.png)
          background-size: 100%
          background-repeat: no-repeat
        input
          flex: 1
          text-indent: 10px
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
      &.btnLogin
        background: #fa6334
      &.btnRegister
        background: #f53663
    .btnForget
      display: block
      text-align: center
      font-size: 12px
      color: #999

</style>
