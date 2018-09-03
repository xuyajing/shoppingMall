<template>
  <transition name="move">
    <div class="ordersWrap">
      <div class="topHeaderWrap border-1px">
        <a class="btnBack" @click.prevent.stop="gotoMine"></a>
        <h1 class="border-1px">{{title}}</h1>
      </div>
      <ul class="tabs border-1px">
        <li v-for="(tabItem, index) in tabNav" :key="index">
          <a to="/orders/all" :class="status===index ? 'active' : ''" @click.stop.prevent="switchTab(index)">{{tabItem}}</a>
        </li>
      </ul>
      <div class="ordersContentWrap">
        <div class="contentWrap ordersListWrap" ref="ordersListWrap">
          <div class="main">
            <div class="content all">
              <section v-for="(item, index) in ordersList" :key="index">
                <div class="orderNumberWrap">
                  <span class="number">{{item.tradeNo}}</span>
                  <span class="state">{{statusTxt[item.status]}}</span>
                </div>
                <router-link :to="{path: '/orders/detail', query: {type: item.status, id: item.id,}}">
                  <ul>
                    <li v-for="(v, k) in item.products" :key="k">
                      <img :src="v.thumb" class="thumb" />
                      <div class="infoWrap">
                        <div class="title">{{v.name}}</div>
                        <span class="type" v-for="(i, j) in v.optionValueList" :key="j">{{i.valueName}}</span>
                        <div class="foot">
                          <span class="count">发货数量：<em>{{v.quantity}}</em></span>
                          <span class="total">￥{{v.price}}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </router-link>
                <div class="calulateWrap border-1px">
                  <div class="count">共{{item.products.length}}件商品</div>
                  <div class="totalWrap">合计：<span>￥{{item.total}}</span></div>
                </div>
                <div class="footBtnWrap border-1px" v-if="item.status===1">
                  <a class="btnCancel btn" @click.stop.prevent="showDialog(item.id, 1)">取消订单</a>
                  <a class="btnContinue btn">继续兑换</a>
                </div>
                <div class="footBtnWrap border-1px" v-if="item.status===3">
                  <span class="">物流单号：20739564973539569</span>
                  <a class="btnConfirm btn" @click.stop.prevent="showDialog(item.id, 0)">确认收货</a>
                </div>
              </section>
            </div>
          </div>
        </div>
        <tip-dialog :title="dialogTitle" :content="confirmDialogContent" @cancel="cancelConfirmTrade" @confirm="confirmTrade" v-if="isShowConfirmDialog"></tip-dialog>
        <tip-dialog :title="dialogTitle" :content="cancelConfirmDialogContent" @cancel="cancelTrade" @confirm="confirmCancelTrade" v-if="isShowCancelTradeDialog"></tip-dialog>
      </div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';
  import BScroll from 'better-scroll';
  import {getOrderList, getAllOrderList, confirmTrade, cancelTrade} from '../../service/getData';
  import {getStore} from '../../config/mUtils';
  import tipDialog from 'components/common/tipdialog/tipdialog';

  export default {
      data() {
          return {
              title: '订单',
//              type: 0, // 0:全部，1:待兑换，2:待发货，3:待收货，4:已完成
              tabNav: ['全部订单', '待兑换', '待发货', '待收货', '已完成'],
              isValid: false,
              token: '',
              ordersList: [],
              status: 0,
              statusTxt: ['', '待兑换', '已付款', '已发货', '交易完成'],
              dialogTitle: '提醒',
              confirmDialogContent: '您确认已经收到货了吗？',
              cancelConfirmDialogContent: '确认要取消订单？',
              isShowConfirmDialog: false,
              isShowCancelTradeDialog: false,
              tradeId: ''
          };
      },
      activated() {
          this.token = getStore('token');
          this.status = parseInt(this.$route.query.type);
          localStorage.setItem('type', this.$route.query.type);
          this.$nextTick(() => {
            this.initScroll();
          });
          this.initOrderList();
      },
      watch: {
        $route() {
          this.token = getStore('token');
          localStorage.setItem('type', this.$route.query.type);
          this.status = parseInt(localStorage.getItem('type'));
          this.initOrderList();
        }
      },
      methods: {
        async initOrderList() {
          let getOrderListResult;
          if (this.status === 0) {
              getOrderListResult = await getAllOrderList(this.token);
            } else {
              getOrderListResult = await getOrderList(this.token, this.status);
            }
            if (getOrderListResult.code === 0) {
              this.ordersList = getOrderListResult.data.tradeList;
            }
        },
        initScroll() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.ordersListWrap, {
                    click: true,
                    probeType: 3
                });
            } else {
                this.scroll.refresh();
            }
        },
        showDialog(id, type) {
            this.tradeId = id;
            if (type === 0) { // 0表示确认收货， 1表示取消订单
              this.isShowConfirmDialog = true;
            } else if (type === 1) {
                this.isShowCancelTradeDialog = true;
            }
        },
        cancelConfirmTrade() {
          this.isShowConfirmDialog = false;
        },
        cancelTrade() {
            this.isShowCancelTradeDialog = false;
        },
        // 确认收货弹框
        async confirmTrade() {
            let confirmTradeResult = await confirmTrade(this.token, this.tradeId);
            if (confirmTradeResult.code === 0) {
              this.isShowConfirmDialog = false;
              this.initOrderList();
            }
        },
        // 取消订单弹框
        async confirmCancelTrade() {
            let confirmCancelTradeResult = await cancelTrade(this.token, this.tradeId);
            if (confirmCancelTradeResult.code === 0) {
              this.isShowCancelTradeDialog = false;
              this.initOrderList();
            }
        },
        switchTab(index) {
            this.status = index;
            this.$router.push({path: '/orders', query: {type: index}});
        },
        gotoMine() {
            this.$router.push('/mine');
        }
      },
      components: {
        topHeader,
        tipDialog
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
.ordersWrap
  position: fixed
  top: 0
  left: 0
  z-index: 100
  width: 100%
  height: 100%
  background: #ffffff
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .topHeaderWrap
    display: flex
    align-items: center
    border-bottom-1px(#dfdfdf)
    position: fixed
    top: 0
    left: 0
    z-index: 10
    width: 100%
    height: 50px
    background: #fff
    color: #f53663
    .btnBack
      position: absolute
      left: 20px
      top: 15px
      width: 10px
      height: 17px
      background-image: url(./back.png)
      background-size: 100%
      background-repeat: no-repeat
    h1
      flex: 1
      text-align: center
      font-size: 15px
  .tabs
    position: absolute
    top: 50px
    left: 0
    z-index: 10
    width: 100%
    height: 45px
    padding: 0 5px 0 12px
    box-sizing: border-box
    border-bottom-1px(#dfdfdf)
    background: #fff
    display: flex
    align-items: center
    justify-content: space-between
    li
      width: 50px
      text-align: center
      height: 100%
      a
        position: relative
        display: inline-block
        width: 100%
        height: 100%
        line-height: 43px
        box-sizing: border-box
        font-size: 12px
        color: #666
        &.active
          color: #f53663
          &:after
            content: ''
            position: absolute
            bottom: 1px
            left: 0
            width: 100%
            height: 3px
            background: #f53663
            border-radius: 4px
  .ordersContentWrap
    .ordersListWrap
      position: fixed
      top: 95px
      bottom: 0
      left: 0
      z-index: 1
      width: 100%
      background: #fff
      .main
        section
          border-bottom: 5px solid #dfdfdf
          &:last-child
            border-bottom: none
          .orderNumberWrap
            display: flex
            align-items: center
            height: 40px
            padding: 0 12px
            box-sizing: border-box
            .number
              font-size: 12px
              color: #303030
            .state
              flex: 1
              text-align: right
              font-size: 12px
              color: #f53663
          ul
            margin: 0 12px
            background: #f8f8f8
            li
              display: flex
              padding: 20px 12px
              box-sizing: border-box
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
                  display: inline-block
                  margin-right: 5px
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
                      color: #999
                  .total
                    font-size: 12px
                    color: #999
          .calulateWrap, .invalidTipsWrap
            border-bottom-1px(#dfdfdf)
            display: flex
            align-items: center
            justify-content: flex-end
            height: 40px
            margin: 0 12px
            font-size: 12px
            color: #303030
            .count
              margin-right: 25px
            .totalWrap
              span
                color: #f53663
          .footBtnWrap
            border-bottom-1px(#dfdfdf)
            height: 50px
            display: flex
            align-items: center
            justify-content: flex-end
            .btn
              width: 80px
              height: 32px
              text-align: center
              line-height: 32px
              border-radius: 20px
              font-size: 12px
              color: #fff
              &.btnCancel
                margin-right: 12px
                background: #fa6334
              &.btnContinue, &.btnConfirm
                margin-right: 14px
                background: #f53663
            span
              flex: 1
              text-align: left
              padding-left: 12px
              font-size: 12px
              color: #303030
          &.overdue
            .footBtnWrap
              .btnCancel
                background: #f53663
</style>
