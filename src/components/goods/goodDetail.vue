<template>
  <transition name="move">
    <div class="goodDetailWrap">
      <div class="contentWrap" ref="contentWrap">
          <div class="main">
            <div class="topBar">
              <a class="btnBack" @click.stop.prevent="goback"></a>
              <a class="btnShare" @click.stop.prevent="showShare"></a>
            </div>
            <div class="content">
              <div class="detailImg">
                <img src="./detailImg1.png" width="100%"/>
              </div>
              <div class="info border-1px">
                <span class="price">￥320</span>
                <span class="goodNumber">商品编码：<em>SW12122222222</em></span>
              </div>
              <div class="selectWrap border-1px" @click.prevent.stop="selectType">
                <span class="txt">规格</span>
                <a class="selectType">选择分类</a>
                <span class="rightArrow"></span>
              </div>
              <div class="detail">
                <p>
                  <span class="title">商品详情</span>
                </p>
                <img src="./detailImg2.png" width="100%"/>
              </div>
            </div>
          </div>
      </div>
      <div class="footBarWrap">
        <div class="collectWrap" :class="{'active': isCollect}" @click.prevent="toggleCollect">
          <span class="icon iconCollect"></span>
          <p class="txt">{{collectTxt}}</p>
        </div>
        <div class="shopCartWrap">
          <span class="icon iconShopCart"></span>
          <p class="txt">购物车</p>
        </div>
        <a class="btn btnAddToShopCart" @click.prevent="addToShopCart">加入购物车</a>
        <a class="btn btnExchange">立即兑换</a>
      </div>
      <div class="stickTypeWrap">
        <transition name="fold">
          <div class="typeWrap" v-show="isFold">
            <a class="btnClose" @click="hideSelectType"></a>
            <div class="infoWrap clearfix">
              <img src="./typeThumb1.png" class="thumb" width="95px"/>
              <span class="title">YSL圣罗兰莹亮纯魅唇膏圆管</span>
              <span class="price">￥320</span>
            </div>
            <div class="typeCategoryWrap" ref="typeCategoryWrap">
              <div class="main">
                <dl class="type">
                  <dt>颜色分类</dt>
                  <dd>
                    <ul class="typeList">
                      <li class="active">N°6</li>
                      <li>N°8</li>
                      <li>N°9</li>
                      <li>N°12</li>
                      <li>N°13</li>
                      <li>N°41</li>
                      <li>N°42</li>
                      <li>N°43</li>
                    </ul>
                  </dd>
                </dl>
                <dl class="type">
                  <dt>型号分类</dt>
                  <dd>
                    <ul class="typeList">
                      <li>大</li>
                      <li>中</li>
                      <li>小</li>
                    </ul>
                  </dd>
                </dl>
                <div class="buyNumberWrap">
                  <span class="txt">购买数量</span>
                  <cart-control></cart-control>
                </div>
              </div>
            </div>
            <div class="footButtonWrap">
              <a class="btn btnAdd">加入购物车</a>
              <a class="btn btnExchange">立即兑换</a>
            </div>
          </div>
        </transition>
      </div>
      <message-tip :title="messageTxt" :isShowMessage="isShowMessage"></message-tip>
      <div class="shareWrap" v-show="isShowShare">
        <div class="share">
          <div class="title">分享</div>
          <ul>
            <li>
              <span class="iconWrap">
                <img src="./friends.png" width="50%"/>
              </span>
              <span class="txt">朋友圈</span>
            </li>
            <li>
              <span class="iconWrap">
                <img src="./wechat.png" width="50%"/>
              </span>
              <span class="txt">微信</span>
            </li>
            <li>
              <span class="iconWrap">
                <img src="./qq.png" width="40%" />
              </span>
              <span class="txt">QQ</span>
            </li>
          </ul>
          <a class="foot border-1px" @click.stop.prevent="hideShare">取消</a>
        </div>
      </div>
      <div class="mask" v-show="isFold" @click.stop.prevent="hideSelectType"></div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import messageTip from 'components/messageTip/messageTip';
  import cartControl from 'components/cartControl/cartControl';

  export default {
      data() {
        return {
            isCollect: false, // 是否已收藏
            isAddToShopCart: false, // 是否加入购物车
            messageTxt: '收藏成功',
            collectTxt: '收藏',
            isShowMessage: false,
            collectTimeout: null,
            addToShopCartTimeout: false,
            isFold: false,
            isShowShare: false
        };
      },
      created() {
          this.$nextTick(() => {
              this._initScroll();
          });
      },
      methods: {
        _initScroll() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.contentWrap, {
                    click: true
                });
            } else {
                this.scroll.refresh();
            }
        },
        goback() {
            this.$router.go(-1);
        },
        toggleCollect() {
            clearTimeout(this.collectTimeout);
            clearTimeout(this.addToShopCartTimeout);
            this.isCollect = !this.isCollect;
            this.isShowMessage = true;
            if (this.isCollect) {
              this.messageTxt = '收藏成功';
              this.collectTxt = '已收藏';
            } else {
                this.messageTxt = '取消收藏成功';
                this.collectTxt = '收藏';
            }
            this.collectTimeout = setTimeout(() => {
              this.isShowMessage = false;
            }, 2000);
        },
        addToShopCart() {
          clearTimeout(this.collectTimeout);
          clearTimeout(this.addToShopCartTimeout);
          this.isAddToShopCart = true;
          this.isShowMessage = this.isAddToShopCart;
          this.messageTxt = '购物车添加成功';
          this.addToShopCartTimeout = setTimeout(() => {
            this.isShowMessage = false;
          }, 2000);
        },
        selectType() {
            this.isFold = true;
        },
        hideSelectType() {
            this.isFold = false;
        },
        showShare() {
            this.isShowShare = true;
        },
        hideShare() {
            this.isShowShare = false;
        }
      },
      components: {
        messageTip,
        cartControl
      }

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
.goodDetailWrap
  position: fixed
  z-index: 20
  top: 0
  left: 0
  width: 100%
  height: 100%
  transform: translate3d(0, 0, 0)
  background: #fff
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .mask
    position: fixed
    top: 0
    left: 0
    z-index: 25
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.7)
  .contentWrap
    position: absolute
    top: 0
    left: 0
    bottom: 46px
    .topBar
      position: fixed
      z-index: 30
      left: 0
      top: 11px
      width: 100%
      height: 30px
      a
        display: block
        position: absolute
        top: 0
        width: 30px
        height: 30px
        background-size: 100%
        background-repeat: no-repeat
        &.btnBack
          left: 11px
          background-image: url(./back.png)
        &.btnShare
          right: 11px
          background-image: url(./share.png)
    .content
      .detailImg
        position: relative
        width: 100%
        padding-top: 75%
        height: 0
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .info
        display: flex
        align-items: center
        width: 100%
        height: 48px
        padding: 0 12px
        box-sizing: border-box
        border-bottom-1px(#dfdfdf)
        .price
          flex: 1
          fonts-size: 17px
          color: #f53663
          font-family: 'Arial'
          font-weight: bold
        .goodNumber
          flex: 2
          text-align: right
          font-size: 12px
          color: #686868
          font-family: 'SimHei'
          em
            font-style: normal
            font-family: 'Arial'
      .selectWrap
        display: flex
        align-items: center
        width: 100%
        height: 48px
        padding: 0 12px
        box-sizing: border-box
        border-bottom-1px(#dfdfdf)
        font-family: 'SimHei'
        .txt
          padding-right: 46px
          font-size: 14px
          color: #686868
        .selectType
          flex: 1
          font-size: 14px
          color: #f53663
        .rightArrow
          width: 8px
          height: 13px
          background-image: url(./right.png)
          background-repeat: no-repeat
          background-size: 100%

      .detail
        p
          padding-top: 20px
          text-align: center
          .title
            display: inline-block
            margin-bottom: 10px
            padding-bottom: 5px
            border-bottom: 2px solid #c93756
            font-size: 12px
            color: #f53663
            font-family: 'SimHei'
  .footBarWrap
    display: flex
    align-items: center
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    padding: 0 12px
    box-sizing: border-box
    background: #fff
    font-family: 'SimHei'
    .collectWrap
      position: relative
      width: 48px
      height: 100%
      text-align: center
      overflow: hidden
      &.active
        .icon
          background-image: url(./collect_active.png)
        .txt
          color: #f53663
      .icon
        display: block
        width: 20px
        height: 19px
        margin: 5px auto
        background: url(./collect.png)
        background-size: 100%
        background-repeat: no-repeat
      .txt
        position: absolute
        bottom: 6px
        left: 0
        width: 100%
        margin: 0
        font-size: 10px
        text-align: center
        color: #686868
    .shopCartWrap
      position: relative
      width: 52px
      height: 100%
      text-align: center
      overflow: hidden
      .icon
        display: block
        width: 21px
        height: 20px
        margin: 5px 0 0 13px
        background: url(./shoppingCart.png)
        background-size: 100%
        background-repeat: no-repeat
      .txt
        position: absolute
        bottom: 6px
        left: 0
        width: 100%
        margin: 0
        font-size: 10px
        text-align: center
        color: #686868
    .btn
      display: block
      margin-left: 7px
      width: 30.5vw
      height: 32px
      line-height: 32px
      border-radius: 20px
      text-align: center
      font-size: 12px
      color: #fff
      &.btnAddToShopCart
        margin-left: 15px
        background: #fa6334
      &.btnExchange
        background: #f53663
  .stickTypeWrap
    position:fixed
    bottom:0
    left: 0
    z-index: 30
    width: 100%
    height: 0
    .typeWrap
      position: absolute
      top: 0
      left: 0
      z-index: 40
      width: 100%
      min-height: 80vh
      box-sizing: border-box
      background: #fff
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.2s linear
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0, 0)
      .btnClose
        position: absolute
        top: 15px
        right: 13px
        width: 20px
        height: 20px
        background-image: url(./close.png)
        background-size: 100%
        background-repeat: no-repeat
      .infoWrap
        width: 100%
        padding: 12px 13px
        margin-bottom: 15px
        .thumb
          float: left
        .title
          display: inline-block
          padding: 10px 15px
          margin-bottom: 30px
          font-size: 15px
        .price
          display: block
          margin-left: 107px
          font-size: 15px
          font-family: 'Arial'
          color: #f53663
      .typeCategoryWrap
        position: absolute
        top: 120px
        bottom: 50px
        width: 100%
        box-sizing: border-box
        .type
          margin-bottom: 10px
          padding: 0 12px
          dt
            padding-bottom: 10px
            font-size: 15px
            color: #363636
            font-weight: bold
            font-family: 'SimHei'
          dd
            ul
              display: flex
              flex-wrap: wrap
              list-style: none
              li
                flex: 23%
                margin-right: 2%
                margin-bottom: 10px
                height: 30px
                line-height: 30px
                border: 1px solid #909090
                box-sizing: border-box
                border-radius: 10px
                text-align: center
                font-size: 12px
                color: #909090
                &:nth-child(4n)
                  margin-right: 0
                &.active
                  border: 1px solid #f53663
                  background: #f53663
                  color: #fff

        .buyNumberWrap
          display: flex
          justify-content: space-between
          align-items: center
          padding: 13px 12px
          border-top-1px(#dfdfdf)
          font-family: 'SimHei'
    .footButtonWrap
      display: flex
      align-items: center
      justify-content: center
      bottom: 0
      left: 0
      width: 100%
      height: 50px
      border-top-1px(#dfdfdf)
      position: fixed
      .btn
        width: 135px
        height: 34px
        line-height: 34px
        border-radius: 20px
        text-align: center
        font-size: 14px
        color: #fff
        &.btnAdd
          margin-right: 10%
          background: #fa6334
        &.btnExchange
          background: #f53663

  .shareWrap
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.7)
    .share
      position: fixed
      top: 25%
      left: 50%
      margin-left: -150px
      width: 300px
      height: 240px
      background: #fff
      border-radius: 10px
      .title
        padding: 20px 0 40px
        text-align: center
        font-size: 15px
        color: #1b1b1b
      ul
        display: flex
        align-items: center
        justify-content: center
        li
          margin-right: 25px
          .iconWrap
            display: flex
            align-items: center
            justify-content: center
            width: 60px
            height: 60px
            border-radius: 50%
            background: #f7f7f7
          &:nth-child(3)
            margin-right: 0
          .txt
            display: block
            padding-top: 10px
            text-align: center
            font-size: 12px
            color: #666
      .foot
        bottom: 0
        left: 0
        width: 100%
        height: 50px
        line-height: 50px
        text-align: center
        border-top-1px(#dfdfdf)
        position: absolute
        color: #f53663
</style>
