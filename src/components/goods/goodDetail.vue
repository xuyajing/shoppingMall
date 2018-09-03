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
                <img :src="detail.thumb" width="100%"/>
              </div>
              <div class="info border-1px">
                <span class="price">￥{{productPrice === null ? detail.price : productPrice}}</span>
                <span class="goodNumber">商品编码：<em>{{detail.code}}</em></span>
              </div>
              <div class="selectWrap border-1px" @click.prevent.stop="showSelectType">
                <span class="txt">规格</span>
                <a class="selectType">选择分类</a>
                <span class="rightArrow"></span>
              </div>
              <div class="detail">
                <p>
                  <span class="title">商品详情</span>
                </p>
                <img :src="item.image" width="100%" v-for="(item, index) in detail.images" :key="index"/>
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
        <a class="btn btnAddToShopCart" @click.prevent.stop="showSelectType">加入购物车</a>
        <a class="btn btnExchange" @click.prevent="showSelectType">立即兑换</a>
      </div>
      <div class="stickTypeWrap">
        <transition name="fold">
          <div class="typeWrap" v-if="isFold">
            <a class="btnClose" @click="hideSelectType"></a>
            <div class="infoWrap clearfix">
              <img :src="detail.thumb" class="thumb" width="91px" height="91px"/>
              <span class="title">{{detail.name}}</span>
              <span class="price">￥{{productPrice === null ? detail.price : productPrice}}</span>
            </div>
            <div class="typeCategoryWrap" ref="typeCategoryWrap">
              <div class="main">
                <dl class="type" v-for="(item, index) in productOptionList" :key="index">
                  <dt>{{item.name}}分类</dt>
                  <dd>
                    <ul class="typeList">
                      <li v-for="(i, k) in item.optionValueList" :class="{'active': currentIndex[index] === k}" :key="k" @click.stop.prevent="selectType(index, k)">{{i.valueName}}</li>
                    </ul>
                  </dd>
                </dl>
                <div class="buyNumberWrap">
                  <span class="txt">购买数量</span>
                  <div class="cartControlWrap">
                    <span class="cartDecrease" @click.stop.prevent="decreaseCart">
                      <img src="./reduce.png" width="15px"/>
                    </span>
                    <span class="cartCount">{{num}}</span>
                    <span class="cartAdd" @click.stop.prevent="addCart">
                      <img src="./add.png" width="15px"/>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="footButtonWrap">
              <a class="btn btnAdd" @click.stop.prevent="addToShopCart">加入购物车</a>
              <a class="btn btnExchange" @click.stop.prevent="toExchange">立即兑换</a>
            </div>
          </div>
        </transition>
      </div>
      <message-tip :title="messageTxt" :isShowMessage="isShowMessage"></message-tip>
      <div class="shareWrap" v-if="isShowShare">
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
      <div class="mask" v-if="isFold" @click.stop.prevent="hideSelectType"></div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import messageTip from 'components/messageTip/messageTip';
  import cartControl from 'components/cartControl/cartControl';
  import {getProductDetails, collectOrNot, getProductOptions, getProductPrice, addShopCart} from '@/service/getData';
  import {getStore, setStore} from '@/config/mUtils';
  import {mapMutations} from 'vuex';

  export default {
      data() {
        return {
            isAddToShopCart: false, // 是否加入购物车
            isShowMessage: false,
            collectTimeout: null,
            addToShopCartTimeout: false,
            isFold: false,
            isShowShare: false,
            productId: '',
            detail: {},
            productOptionList: [], // 商品属性
            productPriceList: [], // 商品价格列表
            token: '',
            isCollect: false,
            currentIndex: [],
            messageTxt: '',
            collectTxt: '收藏',
            num: 1 // 购买数量
        };
      },
      computed: {
          // 商品属性id组合列表
        optionValueIdListArr() {
            let result = [];
            for (let i = 0; i < this.productPriceList.length; i++) {
              let idList = [];
                for (let j = 0; j < this.productPriceList[i].optionValueList.length; j++) {
                  this.$set(idList, j, this.productPriceList[i].optionValueList[j].id);
                }
              this.$set(result, i, idList);
            }
            return result.length > 0 ? result : null;
        },
        // 选中属性对应id
        selectedOptionValueIdList() {
            let result = [];
            for (let i = 0; i < this.productOptionList.length; i++) {
                result[i] = this.productOptionList[i].optionValueList[this.currentIndex[i]].id;
            }
            return result.length > 0 ? result : null;
        },
        productPriceIndex() {
          if (this.optionValueIdListArr !== null && this.selectedOptionValueIdList !== null) {
              return this.indexOfItem(this.selectedOptionValueIdList, this.optionValueIdListArr);
          }
          return null;
        },
        productPrice() {
            return this.productPriceIndex === null ? null : this.productPriceList[this.productPriceIndex].price;
        },
        productOptionValueId() {
          return this.productPriceIndex === null ? null : this.productPriceList[this.productPriceIndex].id;
        }
      },
      activated() {
        this.productId = this.$route.params.id;
        console.log('this.productId = ' + this.productId);
        this.token = getStore('token');
        this.init();
        this.$nextTick(() => {
          this._initScroll();
        });
      },
      methods: {
        ...mapMutations([
            'ADD_CART', 'RECORD_COLLECT', 'CANCEL_COLLECT'
        ]),
        async init() {
            let getProductDetailsResult = await getProductDetails(this.productId);
            this.detail = getProductDetailsResult.data.productDetails;
            this.isCollect = this.detail.isCollected;
        },
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
       async toggleCollect() {
            let collectOrNotResult = await collectOrNot(this.productId, this.token);
            let product = {id: this.detail.id, name: this.detail.name, num: this.num, price: this.productPrice, status: 1, thumb: this.detail.thumb};
            clearTimeout(this.collectTimeout);
            clearTimeout(this.addToShopCartTimeout);
            if (collectOrNotResult.msg === '成功') {
              this.isCollect = !this.isCollect;
              this.isShowMessage = true;
            }
            if (this.isCollect) {
                this.messageTxt = '收藏成功';
                this.collectTxt = '已收藏';
                this.RECORD_COLLECT(product);
            } else {
                this.messageTxt = '取消收藏成功';
                this.collectTxt = '收藏';
                this.CANCEL_COLLECT(product);
            }
            this.collectTimeout = setTimeout(() => {
              this.isShowMessage = false;
            }, 2000);
        },
        // 加入购物车
        async addToShopCart() {
          clearTimeout(this.collectTimeout);
          clearTimeout(this.addToShopCartTimeout);
          this.isFold = false;
          let addShopCartResult = await addShopCart(this.token, this.detail.id, this.num, this.productOptionValueId);
          if (addShopCartResult.msg === '成功') {
              let product = {id: this.detail.id, name: this.detail.name, num: this.num, price: this.productPrice, status: 1, thumb: this.detail.thumb};
              this.ADD_CART(product);
              this.isAddToShopCart = true;
              this.isShowMessage = this.isAddToShopCart;
              this.messageTxt = '购物车添加成功';
              this.addToShopCartTimeout = setTimeout(() => {
                this.isShowMessage = false;
              }, 2000);
          } else {
//              this.$router.push('/login');
              alert(addShopCartResult.msg);
          }
        },
        // 立即兑换
        toExchange() {
          let product = [{id: this.detail.id, name: this.detail.name, num: this.num, price: this.productPrice, status: 1, thumb: this.detail.thumb}];
          setStore('selectProducts', JSON.stringify(product));
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ec344f8ab4e7b79&redirect_uri=http://yayawork.natapp1.cc/confirmOrder&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
        },
        async showSelectType() {
            this.isFold = true;
            let getProductOptionsResult = await getProductOptions(this.productId);
            let getProductPriceResult = await getProductPrice(this.productId);

            if (getProductOptionsResult.msg === '成功') {
                for (let i = 0; i < getProductOptionsResult.data.optionList.length; i++) {
                    this.$set(this.productOptionList, i, getProductOptionsResult.data.optionList[i]);
                }
                for (let i = 0; i < this.productOptionList.length; i++) {
                  this.currentIndex[i] = 0;
                }
            } else {
                alert(getProductOptionsResult.msg);
            }
            if (getProductPriceResult.msg === '成功') {
              for (let i = 0; i < getProductPriceResult.data.productPriceList.length; i++) {
                this.$set(this.productPriceList, i, getProductPriceResult.data.productPriceList[i]);
              }
            } else {
                alert(getProductPriceResult.msg);
            }
        },
        // 选择属性
        selectType(typeid, index) {
            this.$set(this.currentIndex, typeid, index);
        },
        hideSelectType() {
            this.isFold = false;
        },
        showShare() {
            this.isShowShare = true;
        },
        hideShare() {
            this.isShowShare = false;
        },
        decreaseCart() {
          if (this.num > 1) {
              this.num--;
          } else {
              this.num = 1;
          }
        },
        addCart() {
          this.num++;
        },
        indexOfItem(item, arr) {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].sort().toString() === item.sort().toString()) {
                  return i;
              }
            }
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
    width: 100%
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
        .thumb
          float: left
          margin-right: 15px
        .title
          display: inline-block
          padding: 10px 15px 10px 0
          margin-bottom: 30px
          font-size: 15px
        .price
          display: block
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
              list-style: none
              font-size: 0
              li
                display: inline-block
                width: 23%
                margin-right: 2.3%
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
          .cartControlWrap
            font-family: 'SimHei'
            font-size: 0
            .cartDecrease, .cartAdd
              display: inline-block
              vertical-align: middle
              width: 33px
              height: 26px
              line-height: 26px
              background: #f53663
              text-align: center
              box-sizing: border-box
            .cartAdd
              padding-top: 4px
            .cartCount
              display: inline-block
              vertical-align: middle
              width: 50px
              text-align: center
              height: 26px
              line-height: 26px
              font-size: 14px
              font-family: 'Arial'
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
