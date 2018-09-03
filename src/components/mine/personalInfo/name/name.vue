<template>
  <transition name="move">
    <div class="modifyNameWrap">
      <top-header :title="title"></top-header>
      <form class="modifyNameForm">
        <div class="inputWrap">
          <span class="icon"></span>
          <input type="text" v-model="nickname" />
        </div>
        <a class="btnSave" @click.stop.prevent="updateNickname">保存</a>
      </form>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';
  import {mapState, mapMutations} from 'vuex';
  import {getStore} from '../../../../config/mUtils';
  import {updateNickname} from '../../../../service/getData';
  export default {
      data() {
          return {
            title: '姓名昵称',
            token: '',
            nickname: ''
          };
      },
      computed: {
        ...mapState([
            'userInfo'
        ])
      },
      created() {
          this.token = getStore('token');
          this.nickname = this.userInfo.nickname;
      },
      methods: {
        ...mapMutations([
            'UPDATE_USERINFO'
        ]),
        async updateNickname() {
            let updateNickNameResult = await updateNickname(this.token, this.nickname);
            if (updateNickNameResult.msg) {
              this.UPDATE_USERINFO({nickname: this.nickname});
              this.$router.go(-1);
            }
        }
      },
      components: {
        topHeader
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.modifyNameWrap
  position: fixed
  top: 0
  left: 0
  z-index: 35
  width: 100%
  height: 100%
  background: #fff
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .modifyNameForm
    position: absolute
    top: 60px
    left: 0
    width: 100%
    .inputWrap
      display: flex
      align-items: center
      height: 40px
      line-height: 40px
      margin: 43px 30px 50px
      border: 1px solid #999
      box-sizing: border-box
      border-radius: 20px
      .icon
        width: 18px
        height: 19px
        margin: 0 9px 0 18px
        background-image: url(./person.png)
        background-size: 100%
        background-repeat: no-repeat
      input
        flex: 1
        font-size: 14px
        color: #333
    .btnSave
      display: block
      margin: 0 30px
      height: 40px
      text-align: center
      line-height: 40px
      border-radius: 20px
      background: #f53663
      color: #ffffff
</style>
