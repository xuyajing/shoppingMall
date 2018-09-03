<template>
  <div class="confirmOrderWrap">
    <top-header :title="title"></top-header>
    <div class="confirmOrderMain">
      <div class="main" ref="main">
        <div class="addAddressWrap" v-if="hasNoAddr">
          <div class="left">
            <span class="icon"></span>
            <span class="txt">还没有收货地址哦！</span>
          </div>
          <router-link class="btnAddWrap" :to="{path: '/address', query: {type: 1}}">
            <span class="txt">点击去添加</span>
            <span class="rightArrow"></span>
          </router-link>
        </div>
        <div class="addressWrap" v-if="!hasNoAddr">
          <router-link class="btnAddWrap" :to="{path: '/address', query: {type: 1}}">
            <span class="icon"></span>
            <div class="main">
              <div class="info">
                <span class="addressee">收件人：{{confirmAddress.consigneeName}}</span>
                <span class="phoneNumber">{{confirmAddress.consigneeTel}}</span>
              </div>
              <div class="address">{{confirmAddress.provinceName}}{{confirmAddress.cityName}}{{confirmAddress.districtName}}{{confirmAddress.address}}</div>
            </div>
            <span class="rightArrow"></span>
          </router-link>
        </div>
        <ul class="orderList border-1px">
          <li v-for="(item, index) in productList" :key="index">
            <img :src="item.thumb" class="thumb" />
            <div class="infoWrap">
              <div class="title">{{item.name}}</div>
              <span class="type" v-for="(v, k) in item.optionValueList" :key="k">{{v.valueName}}</span>
              <div class="foot">
                <span class="count">发货数量：<em>{{item.num}}</em></span>
                <span class="total">￥{{item.price}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="calulateWrap">
          <div class="total">合计：<span>￥{{totalPrice}}</span></div>
          <a class="btnExchange" @click.stop.prevent="exchangeGoods">去兑换</a>
        </div>
        <wechat-pay :showPaymentMethod="showPaymentMethod"
                    :isFirstStep="isFirstStep"
                    :totalPrice="totalPrice"
                    :wxCode="wxCode"
                    :confirmAddress="confirmAddress"
                    :tradeProductList="tradeProductList"
                    @hidePanel="hidePanel"></wechat-pay>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';
  import {mapState, mapMutations} from 'vuex';
  import {getAddressList} from '../../service/getData';
  import {getStore} from '../../config/mUtils';
  import wechatPay from '../common/weChatPay/weChatPay.vue';

  export default {
      data() {
        return {
          title: '确认订单',
          showPaymentMethod: false,
          token: '',
          wxCode: '',
          shippingAddress: '',
          productList: [],
          isFirstStep: true
        };
      },
      computed: {
          ...mapState([
              'addressList', 'selectProducts', 'confirmAddress'
          ]),
          totalPrice() {
            let total = 0;
            this.productList.forEach((item) => {
              total += item.num * item.price;
            });
            return total;
          },
          tradeProductList() {
            let i = 0;
            let result = [];
            this.productList.forEach((item) => {
              result[i] = {
                productOptionValueId: item.productOptionValueId,
                quantity: item.num
              };
            });
            return result;
          },
          hasNoAddr() {
              if (this.confirmAddress !== null) {
                  return false;
              } else {
                  return true;
              }
          }
      },
      activated() {
        this.productList = JSON.parse(getStore('selectProducts'));
        if (this.$route.query.code) {
            this.wxCode = this.$route.query.code;
        }
        this.token = getStore('token');
        if (this.addressList.length === 0) {
            this.initAddress();
        }
      },
      methods: {
        ...mapMutations([
            'SET_CONFIRM_ADDRESS', 'SET_ADDRESS', 'SET_REDEEM'
        ]),
        async initAddress() {
          let getAddressListResult = await getAddressList(this.token);
          if (getAddressListResult.msg === '成功') {
            this.SET_ADDRESS(getAddressListResult.data.addressList);
            //              for (var i = 0; i < this.addressList.length; i++) {
            //                this.hasAreaList[i] = this.getAreaName(this.addressList[i].provinceId, this.addressList[i].cityId, this.addressList[i].districtId);
            //                console.log('this.addressList[i].provinceId = ' + this.addressList[i].provinceId);
            //                console.log('this.addressList[i].cityId = ' + this.addressList[i].cityId);
            //                console.log('this.addressList[i].districtId = ' + this.addressList[i].districtId);
            //                console.log('this.hasAreaList[i]' + this.getAreaName(this.addressList[i].provinceId, this.addressList[i].cityId, this.addressList[i].districtId));
            //              }
            for (var i = 0; i < this.addressList.length; i++) {
              if (this.addressList[i].isDef) {
                this.SET_CONFIRM_ADDRESS(this.addressList[i]);
              }
            }
          } else {
            alert(getAddressListResult.msg);
          }
        },
        // 去兑换
        exchangeGoods() {
            this.showPaymentMethod = true;
        },
        hidePanel() {
            this.showPaymentMethod = false;
        }
      },
      components: {
        topHeader,
        wechatPay
      }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

.confirmOrderMain
  position: absolute
  top: 50px
  left: 0
  width: 100%
  .addAddressWrap
    display: flex
    align-items: center
    width: 100%
    height: 90px
    padding: 0 12px
    box-sizing: border-box
    border-bottom-1px(#e9e9e9)
    .left
      flex: 1
      .icon
        display: inline-block
        width: 26px
        height: 30px
        margin: 0 8px 0 12px
        vertical-align: middle
        background-image: url(./address.png)
        background-size: 100%
        background-repeat: no-repeat
      .txt
        font-size: 14px
        color: #333
    .btnAddWrap
      text-align: right
      font-size: 0
      .txt
        display: inline-block
        vertical-align: middle
        padding-right: 10px
        font-size: 12px
        color: #999
      .rightArrow
        display: inline-block
        vertical-align: middle
        width: 9px
        height: 15px
        background-image: url(./right.png)
        background-size: 100%
        background-repeat: no-repeat
  .addressWrap
    width: 100%
    height: 90px
    a
      display: flex
      align-items: center
      width: 100%
      height: 100%
      padding: 0 12px
      box-sizing: border-box
      border-bottom-1px(#e9e9e9)
      .icon
        display: inline-block
        width: 26px
        height: 30px
        margin: 0 8px 0 12px
        vertical-align: middle
        background-image: url(./address.png)
        background-size: 100%
        background-repeat: no-repeat
      .main
        flex: 1
        .info
          margin-bottom: 5px
          font-size: 14px
          color: #333
          .addressee
            padding-right: 15px
        .address
          line-height: 17px
          font-size: 12px
          color: #999
      .rightArrow
        display: inline-block
        vertical-align: middle
        width: 9px
        height: 15px
        margin-left: 40px
        background-image: url(./right.png)
        background-size: 100%
        background-repeat: no-repeat
  .orderList
    padding: 0 24px
    border-bottom-1px(#dfdfdf)
    overflow: hidden
    li
      display: flex
      padding-top: 20px
      margin-bottom: 20px
      .thumb
        width: 80px
        height: 60px
        margin-right: 20px
      .infoWrap
        flex: 1
        .title
          height: 15px
          line-height: 15px
          padding-bottom: 14px
          font-size: 13px
          color: #303030
          overflow: hidden
          text-overflow: ellipsis
        .type
          display: block
          margin-bottom: 8px
          font-size: 12px
          color: #999
        .foot
          display: flex
          justify-content: space-between
          .count
            font-size: 11px
            color: #999
            em
              font-style: normal
              color: #f53663
          .total
            font-size: 12px
            color: #f53663
  .calulateWrap
    border-top-1px(#e9e9e9)
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 50px
    box-sizing: border-box
    display: flex
    justify-content: flex-end
    align-items: center
    .total
      font-size: 12px
      color: #333
      span
        font-size: 14px
        color: #f53663
    .btnExchange
      width: 80px
      height: 32px
      margin: 0 12px
      text-align: center
      line-height: 32px
      border-radius: 20px
      color: #fff
      font-size: 12px;
      background: #f53663
  .footPopupWrap
    position: fixed
    bottom: 0
    left: 0
    z-index: 20
    width: 100%
    height: 0
    line-height: 0
    .paymentMethodWrap
      position: absolute
      top: 0
      left: 0
      width: 100%
      background: #fff
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.2s linear
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0, 0)
      .btnClose
        position: absolute
        top: 13px
        left: 12px
        width: 14px
        height: 15px
        background-image: url(./close.png)
        background-size: 100%
        background-repeat: no-repeat
      .exchangeCode
        display: block
        width: 83%
        height: 40px
        line-height: 40px
        margin: 50px 30px 18px
        border: 1px solid #999
        border-radius: 20px
        box-sizing: border-box
        text-align: center
        font-size: 14px
        color: #999
      .btn
        display: block
        height: 40px
        margin: 0 30px 10px
        line-height: 40px
        text-align: center
        border-radius: 20px
        box-sizing: border-box
        font-size: 14px
        color: #fff
        background: #f53663
        &.btnOrder, &.btnPay
          margin-bottom: 0
      .tips
        margin-bottom: 32px
        line-height: 17px
        text-align: center
        font-size: 11px
        color: #f53663
      .compareWrap
        padding: 42px 0
        line-height: 17px
        p
          margin: 0 30px 17px
          text-align: right
          font-size: 14px
          color: #303030
          &.toPay
            margin-bottom: 25px
  .exchangeCodeDisabled
    position: fixed
    top: 180px
    left: 50%
    z-index: 30
    display: flex
    align-items: center
    justify-content: center
    width: 200px
    height: 65px
    margin-left: -100px
    border-radius: 10px
    background: rgba(0, 0, 0, 0.8)
    color: #fff
    .iconAttention
      width: 28px
      height: 29px
      margin-right: 17px
      background: url(./attention.png)
      background-size: 100%
      background-repeat: no-repeat
    div
      p
        line-height: 15px
        font-size: 14px
      span
        line-height: 15px
        font-size: 11px

  .mask
    position: fixed
    top: 0
    left: 0
    z-index: 10
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.8)
</style>
