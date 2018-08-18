<template>
  <transition name="move">
    <div class="bindPhoneNumberWrap">
      <top-header :title="title"></top-header>
      <form class="bindPhoneNumberForm">
        <ul>
          <li>
            <span class="icon phone"></span>
            <input type="tel" maxlength="11" v-model="phoneNumber" placeholder="请输入手机号" />
          </li>
          <li class="mobileCodeLi">
            <div class="mobileCodeWrap">
              <span class="icon safe"></span>
              <input type="text" maxlength="4" v-model="mobileCode" placeholder="请输入验证码">
            </div>
            <section>
              <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime" class="btnGetCode">短信验证码</button>
              <button  @click.prevent v-show="computedTime" class="btnTime">{{computedTime}}S</button>
            </section>
          </li>
        </ul>
        <a class="btn btnBind" @click.stop.prevent="submit">确定</a>
      </form>
      <div class="messageWrap" v-show="showTip">
        <span class="icon"></span>
        <span class="text">该手机号已被其他微信绑定</span>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';

  export default {
      data() {
          return {
              title: '请绑定手机号',
              showTip: false
          };
      },
      methods: {
        submit() {
            this.showTip = true;
        }
      },
      components: {
        topHeader
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.bindPhoneNumberWrap
  position: fixed
  top: 0
  left: 0
  z-index: 30
  width: 100%
  height: 100%
  background: #fff
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .bindPhoneNumberForm
    padding-top: 87px
    margin: 0 28px
    ul
      padding-bottom: 32px
      li
        display: flex
        align-items: center
        position: relative
        width: 100%
        height: 40px
        line-height: 40px
        padding: 10px 15px
        margin-bottom: 17px
        border: 1px solid #999
        border-radius: 30px
        box-sizing: border-box
        &.mobileCodeLi
          justify-content: space-between
          padding: 0
          border: none
          .mobileCodeWrap
            display: flex
            align-items: center
            width: 60%
            height: 100%
            padding: 10px 15px
            border: 1px solid #999
            border-radius: 30px
            box-sizing: border-box
            .safe
              flex-shrink:0
              width: 16px
              height: 17px
              background-image: url(../../common/images/safe.png)
              background-size: 100%
              background-repeat: no-repeat
            input
              flex-shrink: 1
              width: 120px
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
        .phone
          width: 13px
          height: 18px
          background-image: url(../../common/images/phone.png)
          background-size: 100%
          background-repeat: no-repeat
        input
          flex: 1
          text-indent: 10px
    .btn
      display: block
      width: 100%
      height: 40px
      margin-bottom: 17px
      line-height: 38px
      text-align: center
      border-radius: 30px
      color: #fff
      font-size: 14px
      &.btnBind
        background: #f53663
  .messageWrap
    display: flex
    align-items: center
    position: fixed
    top: 20%
    left: 50%
    margin-left: -100px
    width: 200px
    height: 66px
    background: rgba(0, 0, 0, 0.8)
    border-radius: 10px
    color: #fff
    .icon
      display: block
      width: 28px
      height: 29px
      margin: 0 17px 0 33px
      background-image: url(./info.png)
      background-size: 100%
      background-repeat: no-repeat
    .text
      flex: 1
      padding-right: 38px
      line-height: 15px
      font-size: 14px
      color: #fff

</style>
