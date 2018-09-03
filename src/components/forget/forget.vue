<template>
  <transition name="move">
    <div class="forgetWrap">
      <top-header :title="title"></top-header>
      <form class="forgetForm">
        <ul>
          <li>
            <span class="icon phone"></span>
            <input type="tel" maxlength="11" v-model="phone" placeholder="请输入手机号" @change="checkPhone"/>
          </li>
          <li class="mobileCodeLi">
            <div class="mobileCodeWrap">
              <span class="icon safe"></span>
              <input type="text" v-model="code" placeholder="请输入验证码" />
            </div>
            <section>
              <button @click.prevent="getMobileCode" v-show="!computedTime" class="btnGetCode">短信验证码</button>
              <button  @click.prevent v-show="computedTime" class="btnTime">{{computedTime}}S</button>
            </section>
          </li>
          <li>
            <span class="icon lock"></span>
            <input type="password" maxlength="20" v-model="password" placeholder="请输入密码" />
          </li>
          <li>
            <span class="icon lock"></span>
            <input type="password" maxlength="20" v-model="rePassword" placeholder="请再次输入密码" />
          </li>
        </ul>
        <a class="btn btnForget" @click.stop.prevent="submit">确定</a>
      </form>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';
  import { forgetPassword, mobileCode } from '@/service/getData';

  export default {
    data() {
      return {
        title: '找回密码',
        phone: null,
        password: null,
        rePassword: null,
        rightPhoneNumber: false,
        code: null,
        computedTime: 0 // 倒数记时
      };
    },
    methods: {
      // 判断输入的电话号码
      checkPhone() {
        if (!this.phone) return;
        if (/^1[34578]\d{9}$/.test(this.phone)) {
          this.rightPhoneNumber = true;
        } else {
          this.rightPhoneNumber = false;
//          this.showAlert = true;
//          this.alertText = '手机号码格式不正确';
          alert('手机号码格式不正确');
        }
      },
      async getMobileCode() {
        if (this.rightPhoneNumber && !this.hasGotCode) {
          this.computedTime = 60;
          this.hasGotCode = true;
          // 倒计时
          this.timer = setInterval(() => {
            this.computedTime--;
            if (this.computedTime === 0) {
              clearInterval(this.timer);
              this.hasGotCode = false;
            }
          }, 1000);
          // 获取验证信息
          let getCode = await mobileCode(this.phone, 2);
          if (!(getCode.msg === '成功')) {
            this.showAlert = true;
            this.alertText = getCode.msg;
            alert(getCode.msg);
          }
        }
      },
      checkPassword() {
        if (!this.password) return;
        if (!(/^[0-9]|(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(this.password))) {
          alert('密码格式不正确');
        }
      },
      confirmPassword() {
        if (!this.rePassword) return;
        if (this.rePassword !== this.password) {
          alert('两次输入密码不一致');
        }
      },
      async submit() {
        console.log('phone = ' + this.phone + 'code = ' + this.code + 'password = ' + this.password + 'rePassword = ' + this.rePassword);
        let forgetResult = await forgetPassword(this.phone, this.code, this.password, this.rePassword);
        if (forgetResult.msg === '成功') {
          this.$router.push('/login');
        } else {
          alert(forgetResult.msg);
        }
      }
    },
    components: {
      topHeader
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .forgetWrap
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
    .forgetForm
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
                outline: none
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
        &.btnForget
          background: #f53663
</style>
