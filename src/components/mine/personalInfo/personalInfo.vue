<template>
  <transition name="move">
    <div class="personalInfoWrap">
      <top-header :title="title"></top-header>
      <div class="infoWrap">
        <ul>
          <li class="border-1px" @click.stop.prevent="showSelectAvatar">
            <span class="text">个人头像</span>
            <span class="avatar">
              <img :src="userInfo.avatar" />
            </span>
            <span class="rightArrow"></span>
          </li>
          <li class="border-1px">
            <router-link to="/mine/personalInfo/name">
              <span class="text">姓名昵称</span>
              <span class="value">{{userInfo.nickname}}</span>
              <span class="rightArrow"></span>
            </router-link>
          </li>
          <li class="border-1px" @click.stop.prevent="showSelectSex">
            <span class="text">性别</span>
            <span class="value">{{userInfo.gender}}</span>
            <span class="rightArrow"></span>
          </li>
          <li class="border-1px">
            <router-link to="/mine/personalInfo/telephone">
              <span class="text">电话</span>
              <span class="value">{{userInfo.phone}}</span>
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
              <li class="border-1px selectAvatar">
                <form ref="form">
                  <input type="file" name="file" accept="image/*" @change="handleUploadAvatar" ref="file" class="uploadAvatar" />
                </form>
                  <!--<croppa v-model="myCroppa" class="uploadAvatar"></croppa>-->
                <span>相册</span>
              </li>
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
              <li class="border-1px" @click.stop.prevent="updateGender('男')">男</li>
              <li class="border-1px" @click.stop.prevent="updateGender('女')">女</li>
              <li class="cancel" @click.stop.prevent="cancelSelect">取消</li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="mask" v-show="isShowMask" @click.stop.prevent="cancelSelect"></div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';
  import {mapState, mapMutations} from 'vuex';
  import {getStore} from '../../../config/mUtils';
  import {getUserInfo, updateGender, updateAvatar} from '../../../service/getData';

  export default {
      data() {
          return {
            title: '个人信息',
            isShowSeletAvatar: false,
            isShowSelectSex: false,
            isShowMask: false,
            token: '',
            avatar: ''
          };
      },
      computed: {
        ...mapState([
            'userInfo'
        ])
      },
      created() {
        this.token = getStore('token');
        this.$nextTick(() => {
            this.initUserInfo();
        });
      },
      methods: {
        ...mapMutations([
          'SET_USERINFO', 'UPDATE_USERINFO'
        ]),
        async initUserInfo() {
          let userInfoResult = await getUserInfo(this.token);
          if (userInfoResult.msg === '成功') {
              let info = userInfoResult.data.information;
            this.SET_USERINFO({
                avatar: info.avatar,
                gender: info.gender ? '女' : '男',
                nickname: info.name === 'undefined' ? '' : info.nickname,
                phone: info.phone
            });
          } else {
              alert(userInfoResult.msg);
          }
        },
        async updateGender(genderStr) {
            let gender = genderStr === '男' ? 0 : 1;
            let updateGenderResult = await updateGender(this.token, gender);
            if (updateGenderResult.msg === '成功') {
                this.UPDATE_USERINFO({gender: genderStr});
                this.cancelSelect();
            } else {
                alert(updateGenderResult.msg);
            }
        },
        async handleUploadAvatar() {
            let uploadFile = this.$refs.file.files[0];
            if (uploadFile.type !== 'image/jpeg' && uploadFile.type !== 'image/png' && uploadFile.type !== 'image/gif') {
              alert('不是有效的图片文件!');
              return;
            }
            if (uploadFile.size > 1048576) {
              alert('请选择1M以内的图片！');
              return false;
            }
            let form = new FormData();
            form.append('file', uploadFile, uploadFile.name);
            console.log('form = ' + form);
            await fetch('/api/information/uploadAvatar', {
                method: 'POST',
                body: form
            }).then(res => res.json())
              .then((response) => {
              if (response.msg === '成功') {
                this._updateAvatar(response.data.path);
              } else {
                alert(response.msg);
              }
            });
        },
        async _updateAvatar(avatar) {
          let updateAvatarResult = await updateAvatar(avatar, this.token);
          if (updateAvatarResult.msg === '成功') {
            this.UPDATE_USERINFO({avatar: avatar});
            this.isShowMask = false;
            this.isShowSeletAvatar = false;
          } else {
              alert(updateAvatarResult.msg);
          }
        },
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
          &.selectAvatar
            position: relative
            width: 100%
            height: 100%
            .uploadAvatar
              position: absolute
              top: 0
              left: 0
              width: 100%
              height: 100%
              opacity: 0
              z-index: 10
  .mask
    position: fixed
    top: 0
    left: 0
    z-index: 30
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.8)
</style>
