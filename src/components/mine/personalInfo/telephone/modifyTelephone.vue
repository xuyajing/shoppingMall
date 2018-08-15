<template>
  <transition name="move">
    <div class="modifyTelephoneWrap">
      <top-header :title="title"></top-header>
      <form class="modifyTelForm">
        <span class="txt">当前号码</span>
        <p class="currentTel">135-0001-0002</p>
        <div class="inputWrap telWrap">
          <span class="icon"></span>
          <input type="text" placeholder="请输入手机号码" maxlength="11" v-model="phoneNumber" />
        </div>
        <div class="codeWrap">
          <div class="inputCodeWrap">
            <span class="iconCode"></span>
            <input type="text" placeholder="请输入验证码" maxlength="4" v-model="mobileCode" />
          </div>
          <section>
            <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime" class="btnGetCode">短信验证码</button>
            <button  @click.prevent v-show="computedTime" class="btnTime">{{computedTime}}S</button>
          </section>
        </div>
        <div class="inputWrap passwordWrap">
          <span class="icon"></span>
          <input type="password" placeholder="请输入密码">
        </div>
        <a class="btnConfirm">确定</a>
      </form>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';

  export default {
      data() {
          return {
              title: '电话修改'
          };
      },
      components: {
        topHeader
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.modifyTelephoneWrap
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #ffffff
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .modifyTelForm
    position: absolute
    top: 50px
    left: 0
    width: 100%
    .txt
      display: block
      width: 100%
      padding: 30px 0 10px
      text-align: center
      font-size: 14px
      color: #333
    .currentTel
      width: 100%
      margin-bottom: 25px
      text-align: center
      font-size: 19px
      color: #f53663
      font-family: 'SimHei'
    .inputWrap, .codeWrap
      width: 83vw
      margin: 0 auto 17px
      display: flex
      align-items: center
      height: 40px
      box-sizing: border-box
    .codeWrap
      box-sizing: border-box
      .inputCodeWrap
        flex: 1
        height: 100%
        margin-right: 9px
        box-sizing: border-box
        border: 1px solid #999999
        border-radius: 20px
        font-size: 0
        .iconCode
          display: inline-block
          width: 17px
          height: 18px
          margin: 11px 7px 0 17px
          background: url(./code.png)
          background-size: 100%
          background-repeat: no-repeat
        input
          display: inline-block
          width: 70%
          height: 100%
          vertical-align: top
          font-size: 14px
      section
        position: relative
        height: 100%
        button
          display: block
          width: 110px
          height: 100%
          text-align: center
          font-size: 14px
          border-radius: 30px
          color: #fff
          box-shadow: none
          border: none
          &.btnGetCode
            background: #f53663
          &.btnTime
            background: #fa9ab1
    .inputWrap
      border: 1px solid #999999
      border-radius: 20px
      &.telWrap
        .icon
          width: 14px
          height: 19px
          margin: 0 9px 0 18px
          background: url(./number.png)
          background-size: 100%
          background-repeat: no-repeat
        input
          flex: 1
      &.passwordWrap
        .icon
          width: 16px
          height: 18px
          margin: 0 8px 0 17px
          background: url(./password.png)
          background-size: 100%
          background-repeat: no-repeat
        input
          flex: 1
    .btnConfirm
      display: block
      width: 83vw
      margin: 50px auto
      height: 40px
      text-align: center
      line-height: 40px
      border-radius: 20px
      color: #ffffff
      background: #f53663
</style>
