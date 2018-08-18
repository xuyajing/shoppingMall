<template>
  <transition name="move">
    <div class="personalInfoWrap">
      <top-header :title="title"></top-header>
      <div class="infoWrap">
        <ul>
          <li class="border-1px" @click.stop.prevent="showSelectAvatar">
            <span class="text">个人头像</span>
            <span class="avatar">
              <img src="" />
            </span>
            <span class="rightArrow"></span>
          </li>
          <li class="border-1px">
            <router-link to="/mine/personalInfo/name">
              <span class="text">姓名昵称</span>
              <span class="value">吴彦祖</span>
              <span class="rightArrow"></span>
            </router-link>
          </li>
          <li class="border-1px" @click.stop.prevent="showSelectSex">
            <span class="text">性别</span>
            <span class="value">男</span>
            <span class="rightArrow"></span>
          </li>
          <li class="border-1px">
            <router-link to="/mine/personalInfo/telephone">
              <span class="text">电话</span>
              <span class="value">18121000000</span>
              <span class="rightArrow"></span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="stickFoot">
        <transition name="fold">
          <div class="selectAvatarWrap selectWrap" v-show="isShowSeletAvatar">
            <ul>
              <li class="title border-1px">
                <strong>更换头像</strong>
              </li>
              <li class="border-1px">拍照</li>
              <li class="border-1px">相册</li>
              <li class="cancel" @click.stop.prevent="cancelSelect">取消</li>
            </ul>
          </div>
        </transition>
        <transition name="fold">
          <div class="selectSexWrap selectWrap" v-show="isShowSelectSex">
            <ul>
              <li class="title border-1px">
                <strong>选择性别</strong>
              </li>
              <li class="border-1px">男</li>
              <li class="border-1px">女</li>
              <li class="cancel" @click.stop.prevent="cancelSelect">取消</li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="mask" v-show="isShowMask"></div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';

  export default {
      data() {
          return {
            title: '个人信息',
            isShowSeletAvatar: false,
            isShowSelectSex: false,
            isShowMask: false
          };
      },
      methods: {
        cancelSelect() {
            this.isShowMask = false;
            this.isShowSeletAvatar = false;
            this.isShowSelectSex = false;
        },
        showSelectAvatar() {
            this.isShowMask = true;
            this.isShowSeletAvatar = true;
        },
        showSelectSex() {
            this.isShowMask = true;
            this.isShowSelectSex = true;
        }
      },
      components: {
        topHeader
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl'
.personalInfoWrap
  position: fixed
  top: 0
  left: 0
  z-index: 30
  width: 100%
  height: 100%
  background: #ffffff
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .infoWrap
    position: absolute
    top: 50px
    left: 0
    width: 100%
    ul
      padding: 0 12px
      li
        display: flex
        align-items: center
        height: 45px
        border-bottom-1px(#e9e9e9)
        &:first-child
          height: 70px
        a
          display: flex
          align-items: center
          width: 100%
          height: 100%
        .text
          padding-left: 13px
          font-size: 14px
          color: #2b2b2b
        .avatar
          flex: 1
          text-align: right
          margin-right: 15px
          img
            display: inline-block
            width: 50px
            height: 50px
            border-radius: 50%
            background: #f0f0f0
        .value
          flex: 1
          text-align: right
          margin-right: 15px
          font-size: 14px
          color: #999
        .rightArrow
          width: 9px
          height: 15px
          background-image: url(../right.png)
          background-size: 100%
          background-repeat: no-repeat
  .stickFoot
    position: fixed
    bottom: 0
    left: 0
    z-index: 99
    width: 100%
    height: 0
    .selectWrap
      position: absolute
      top: 0
      left: 0
      z-index: 100
      width: 100%
      background: #fff
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.2s linear
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      ul
        li
          width: 100%
          height: 50px
          margin: 0 auto
          line-height: 50px
          text-align: center
          border-bottom-1px(#e9e9e9)
          box-sizing: border-box
          font-size: 14px
          color: #999
          &.title
            width: 100%
            height: 53px
            line-height: 53px
          &:nth-child(2)
            width: 93vw
          &:last-child
            &:after
              border: none
            strong
              font-size: 15px
              color: #1b1b1b
          &.cancel
            font-size: 15px
            color: #f53663

  .mask
    position: fixed
    top: 0
    left: 0
    z-index: 30
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.8)
</style>
