<template>
  <transition name="move">
    <div class="registerWrap">
      <top-header :title="title"></top-header>
      <form class="registerForm">
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
          <li>
            <span class="icon lock"></span>
            <input type="password" minlength="6" maxlength="20" v-model="password" placeholder="请输入密码" />
          </li>
          <li>
            <span class="icon lock"></span>
            <input type="password" minlength="6" maxlength="20" v-model="confirmpassword" placeholder="请再次输入密码" />
          </li>
        </ul>
        <a class="btn btnRegister">确定</a>
      </form>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';

  export default {
    data() {
        return {
          title: '注册',
          phoneNumber: null,
          password: null,
          confirmpassword: null,
          mobileCode: null,
          computedTime: 0 // 倒数记时
        };
    },
    computed: {
      // 判断手机号码
      rightPhoneNumber: function() {
        return /^1\d{10}$/gi.test(this.phoneNumber);
      }
    },
    methods: {
      // 获取短信验证码
//      async getVerifyCode() {
//        if (this.rightPhoneNumber) {
//          this.computedTime = 30;
//          this.timer = setInterval(() => {
//            this.computedTime--;
//            if (this.computedTime === 0) {
//              clearInterval(this.timer);
//            }
//          }, 1000);
//          // 判读用户是否存在
//          let exsis = await checkExsis(this.phoneNumber, 'mobile');
//          if (exsis.message) {
//            this.showAlert = true;
//            this.alertText = exsis.message;
//            return;
//          } else if (!exsis.is_exists) {
//            this.showAlert = true;
//            this.alertText = '您输入的手机号尚未绑定';
//            return;
//          }
//          // 发送短信验证码
//          let res = await mobileCode(this.phoneNumber);
//          if (res.message) {
//            this.showAlert = true;
//            this.alertText = res.message;
//            return;
//          }
//          this.validate_token = res.validate_token;
//        }
//      }
    },
    components: {
        topHeader
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.registerWrap
  position: fixed
  z-index: 10
  top: 0
  left: 0
  width: 100%
  height: 100%
  transform: translated(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .registerForm
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
        line-height: 38px
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
      &.btnRegister
        background: #f53663
</style>
