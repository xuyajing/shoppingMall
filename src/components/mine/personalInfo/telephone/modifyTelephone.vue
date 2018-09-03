<template>
  <transition name="move">
    <div class="modifyTelephoneWrap">
      <top-header :title="title"></top-header>
      <form class="modifyTelForm">
        <span class="txt">当前号码</span>
        <p class="currentTel">{{currentPhone}}</p>
        <div class="inputWrap telWrap">
          <span class="icon"></span>
          <input type="text" placeholder="请输入手机号码" maxlength="11" v-model="phone" @change="checkPhone" />
        </div>
        <div class="codeWrap">
          <div class="inputCodeWrap">
            <span class="iconCode"></span>
            <input type="text" placeholder="请输入验证码" v-model="salt" />
          </div>
          <section>
            <button @click.prevent="getMobileCode" v-show="!computedTime" class="btnGetCode">短信验证码</button>
            <button  @click.prevent v-show="computedTime" class="btnTime">{{computedTime}}S</button>
          </section>
        </div>
        <div class="inputWrap passwordWrap">
          <span class="icon"></span>
          <input type="password" v-model="password" placeholder="请输入密码" @change="checkPassword" />
        </div>
        <a class="btnConfirm" @click.stop.prevent="submitForm">确定</a>
      </form>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';
  import {mapState, mapMutations} from 'vuex';
  import {modifyPhone, mobileCode} from '@/service/getData';
  import {getStore} from '@/config/mUtils';

  export default {
      data() {
          return {
              title: '电话修改',
              computedTime: 0,
              phone: '',
              salt: null,
              password: null,
              token: ''
          };
      },
      computed: {
        ...mapState({
            currentPhone: state => {
              let phoneStr = state.userInfo.phone.substr(0, 3) + '-' + state.userInfo.phone.substr(3, 4) + '-' + state.userInfo.phone.substr(7, 4);
              return phoneStr;
            }
        })
      },
      methods: {
        ...mapMutations([
            'UPDATE_USERINFO'
        ]),
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
            let getCode = await mobileCode(this.phone, 3);
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
        async submitForm() {
          this.token = await getStore('token');
          let modifyPhoneResult = await modifyPhone(this.phone, this.password, this.salt, this.token);
          if (modifyPhoneResult.msg === '成功') {
              this.UPDATE_USERINFO({phone: this.phone});
            this.$router.go(-1);
          } else {
            alert(modifyPhoneResult.msg);
          }
        }
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
          outline: none
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
