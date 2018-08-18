<template>
  <transition name="move">
    <div class="setPasswordWrap">
      <top-header :title="title"></top-header>
      <form class="setPasswordWrapForm">
        <ul>
          <li>
            <span class="icon lock"></span>
            <input type="password" minlength="6" maxlength="20" v-model="password" placeholder="请输入密码" />
          </li>
          <li>
            <span class="icon lock"></span>
            <input type="password" minlength="6" maxlength="20" v-model="confirmpassword" placeholder="请再次输入密码" />
          </li>
        </ul>
        <a class="btn btnSet">确定</a>
      </form>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';

  export default {
      data() {
          return {
            title: '请设定密码'
          };
      },
      components: {
        topHeader
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .setPasswordWrap
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
    .setPasswordWrapForm
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
        height: 40px
        margin-bottom: 17px
        line-height: 38px
        text-align: center
        border-radius: 30px
        color: #fff
        font-size: 14px
        &.btnSet
          background: #f53663

</style>
