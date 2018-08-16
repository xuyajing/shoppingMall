<template>
  <div class="mineWrap">
    <div class="contentWrap">
      <div class="personInfoWrap">
        <img src="./avatar.png" class="avatar"/>
        <div class="info">
          <span class="name"><em></em>吴彦祖</span>
          <span class="phoneNumber"><em></em>18121000000</span>
        </div>
      </div>
      <div class="allOrdersWrap">
        <router-link :to="{path: '/orders', query: {type: 0}}" class="border-1px">
          <span class="icon"></span>
          <span class="text">全部订单</span>
          <span class="rightArrow"></span>
        </router-link>
      </div>
      <ul class="tabs">
        <li>
          <router-link :to="{path: '/orders', query: {type: 1}}">
            <span class="icon">
              <img src="./exchange.png" width="28px"/>
            </span>
            <em class="number" v-show="messagesNumber[0] > 0"></em>
            <span class="txt">待兑换</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{path: '/orders', query: {type: 2}}">
            <span class="icon">
              <img src="./tobeDelivered.png" width="24px" />
            </span>
            <em class="number" v-show="messagesNumber[1] > 0">3</em>
            <span class="txt">待发货</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{path: '/orders', query: {type: 3}}">
            <span class="icon">
              <img src="./pendingReceipt.png" width="29px"/>
            </span>
            <em class="number" v-show="messagesNumber[2] > 0"></em>
            <span class="txt">待收货</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{path: '/orders', query: {type: 4}}">
            <span class="icon">
              <img src="./completed.png" width="22px"/>
            </span>
            <em class="number" v-show="messagesNumber[3] > 0"></em>
            <span class="txt">已完成</span>
          </router-link>
        </li>
      </ul>
      <ul class="linkWrap">
        <li>
          <router-link to="/mine/personalInfo">
            <span class="icon iconInfo"></span>
            <span class="text">个人信息</span>
            <span class="rightArrow"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/mine/collect">
            <span class="icon iconCollect"></span>
            <span class="text">收藏宝贝</span>
            <span class="rightArrow"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/address">
            <span class="icon iconManage"></span>
            <span class="text">地址管理</span>
            <span class="rightArrow"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/mine/set">
            <span class="icon iconSet"></span>
            <span class="text">系统设置</span>
            <span class="rightArrow"></span>
          </router-link>
        </li>
      </ul>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <footer-guide></footer-guide>
  </div>
</template>

<script type="text/ecmascript-6">
  import footerGuide from 'components/footerGuide/footerGuide';
  export default {
      data() {
          return {
            messagesNumber: [0, 3, 0, 0]
          };
      },
      components: {
        footerGuide
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
.mineWrap
  .contentWrap
    .personInfoWrap
      display: flex
      align-items: center
      padding-left: 27px
      width: 100%
      height: 41vw
      background-image: url(./rect.png)
      background-size: 100%
      background-repeat: no-repeat
      .avatar
        width: 80px
        margin-right: 20px
      .info
        .name
          display: flex
          align-items: center
          padding-bottom: 12px
          color: #fff
          em
            width: 14px
            height: 14px
            margin-right: 11px
            background: url(./username.png)
            background-size: 100%
            background-repeat: no-repeat
        .phoneNumber
            display: flex
            align-items: center
            color: #fff
            em
              width: 13px
              height: 14px
              margin-right: 12px
              background-image: url(./tel.png)
              background-size: 100%
              background-repeat: no-repeat

    .allOrdersWrap
      a
        display: flex
        align-items: center
        height: 40px
        margin: 0 12px
        border-bottom-1px(#dfdfdf)
        .icon
          width: 16px
          height: 19px
          margin: 0 11px 0 15px
          background-image: url(./order.png)
          background-size: 100%
          background-repeat: no-repeat
        .text
          flex: 1
          font-size: 14px
          color: #2b2b2b
        .rightArrow
          width: 9px
          height: 15px
          margin-right: 6px
          background-image: url(./right.png)
          background-size: 100%
          background-repeat: no-repeat
    .tabs
      display: flex
      align-items: center
      justify-content: space-between
      margin-top: 15px
      padding: 0 27px 14px 27px
      border-bottom-1px(#e9e9e9)
      li
        width: 50px
        &:nth-child(1)
          a
            .icon
              background: #d45f78
        &:nth-child(2)
          a
            .icon
              background: #b542df
        &:nth-child(3)
          a
            .icon
              background: #df8142
        &:last-child
          margin-right: 0
          a
            .icon
              background: #4297df
        a
          display: block
          position: relative
          width: 100%
          .icon
            display: flex
            align-items: center
            justify-content: center
            width: 100%
            height: 50px
            margin-bottom: 9px
            border-radius: 50%
          .number
            position: absolute
            right: 0
            top: 0
            width: 17px
            height: 17px
            text-align: center
            line-height: 17px
            border-radius: 50%
            background: #ff1414
            font-size: 12px
            color: #fff
            font-style: normal
          .txt
            display: block
            text-align: center
            font-size: 12px
            color: #2b2b2b

    .linkWrap
      li
        height: 45px
        padding: 0 19px 0 23px
        a
          display: flex
          align-items: center
          height: 100%
          .iconInfo
            width: 17px
            height: 18px
            margin-right: 10px
            background-image: url(./information.png)
            background-size: 100%
            background-repeat: no-repeat
          .iconCollect
            width: 19px
            height: 18px
            margin-right: 8px
            background-image: url(./collect.png)
            background-size: 100%
            background-repeat: no-repeat
          .iconManage
            width: 16px
            height: 19px
            margin-right: 11px
            background-image: url(./address.png)
            background-size: 100%
            background-repeat: no-repeat
          .iconSet
            width: 19px
            height: 18px
            margin-right: 8px
            background-image: url(./setting.png)
            background-size: 100%
            background-repeat: no-repeat
          .text
            flex: 1
            font-size: 14px
            color: #2b2b2b
          .rightArrow
            width: 9px
            height: 15px
            background-image: url(./right.png)
            background-size: 100%
            background-repeat: no-repeat
</style>
