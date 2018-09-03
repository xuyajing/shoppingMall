<template>
  <div class="shopcartWrap">
    <div class="topHeader border-1px">
      <h1>购物车</h1>
      <a class="btnEdit topBtn" v-show="!isEdit" @click.stop.prevent="edit">编辑</a>
      <a class="btnComplete topBtn" v-show="isEdit" @click.stop.prevent="complete">完成</a>
    </div>
    <div class="shopcartMain">
      <div class="content" ref="content">
        <scroll ref="scroll"
                :scrollbar="scrollbar"
                :dataList="cartList"
                :pullUpLoad="pullUpLoad"
                :beforePullUpWord="beforePullUpWord"
                :startY="parseInt(startY)"
                @onPullUp="onPullingUp"
                v-if="!isEmpty">
          <ul>
            <li class="border-1px" v-for="(item, index) in cartList" :key="index" :class="item.status ? '' : 'disabled' ">
              <span class="icon" :class="{selected: selected[item.id]}" @click.stop.prevent="toggleSelect(item, $event)"></span>
              <router-link :to="{name: 'goodDetail', params: {id: item.id}}">

                <img :src="item.thumb"  class="thumb" width="120px" height="90px" />
                <div class="infoWrap">
                  <div class="title">{{item.name}}</div>

                  <div class="price">￥{{item.price}}</div>
                  <div class="disabledFlag" v-show="!item.status">
                    <span>已失效</span>
                  </div>
                </div>
              </router-link>
              <div class="miniCartControlWrap">
                <span class="txt">发货数量：</span>
                <div class="cartControl">
                      <span class="cartDecrease" @click.stop.prevent="addOrMinusAccout(index, 2)">
                        <img src="./reduce.png" width="12px">
                      </span>
                  <span class="cartCount">{{item.num}}</span>
                  <span class="cartAdd" @click.stop.prevent="addOrMinusAccout(index, 1)">
                        <img src="./add.png" width="12px">
                      </span>
                </div>
              </div>
            </li>
          </ul>
        </scroll>
        <div class="noResult" v-if="isEmpty">
          <img src="./empty.png" width="68px" />
          <span class="txt">购物车还没有商品哦</span>
          <router-link to="/goods" class="btnView" >去逛逛</router-link>
        </div>
      </div>
      <div class="controlBar" v-if="!isEmpty">
        <div class="selectAllWrap">
          <span class="icon" @click.stop.prevent="selectAll" :class="this.isSelectedAll ? 'active' : ''"></span>
          <span class="txt">全选</span>
        </div>
        <div class="calulateWrap" v-if="!isEdit">
          <div class="total">合计：<span>￥{{totalPrice}}</span></div>
          <a class="btnCal" href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ec344f8ab4e7b79&redirect_uri=http://yayawork.natapp1.cc/confirmOrder&response_type=code&scope=snsapi_base&state=123#wechat_redirect">结算</a>
        </div>
        <div class="editWrap" v-if="isEdit">
          <a class="btnClearDisabled" @click.stop.prevent="emptyInvalid">清空失效商品</a>
          <a class="btnDelete" @click.stop.prevent="deleteSelected">删除</a>
        </div>
      </div>
    </div>
    <footer-guide></footer-guide>
  </div>
</template>

<script type="text/ecmascript-6">
  import footerGuide from 'components/footerGuide/footerGuide';
  import scroll from '../common/scroll/scroll.vue';
  import {getShopCart, addOrMinus, cleanInvalidShoppingCart, deleteShopCart} from '@/service/getData';
  import {getStore, setStore} from '@/config/mUtils';
  import {mapState, mapMutations} from 'vuex';

  export default {
      data() {
          return {
            isEdit: false,
            isDisabled: true,
            token: '',
            selected: {},
            isSelectedAll: false,
            hasMore: true,
            page: 1,
            pagSize: 10,
            pullDownRefresh: {
              threshold: 90,
              stop: 40
            },
            pullUpLoad: {
              threshold: -50
            },
            scrollbar: true,
            startY: 0,
            beforePullUpWord: '',
            productList: []
          };
      },
      created() {
          this.token = getStore('token');
          this.initCartList();
      },
      mounted() {

      },
      computed: {
          ...mapState([
              'selectProducts', 'cartList'
          ]),
        ...mapState({
            'totalPrice': state => {
              let total = 0;
              state.selectProducts.forEach((item) => {
                  total += item.num * item.price;
              });
              return total;
            },
          'isEmpty': state => {
                return !(state.cartList.length > 0);
          }
        })
      },
      methods: {
        ...mapMutations([
          'ADD_SELECT_PRODUCT', 'DELECT_SELECT_PRODUCT', 'INIT_CART', 'ADD_CART', 'DELETE_CART', 'ADD_OR_MINUS', 'CLEAR_INVALID_PRODUCT'
        ]),
        async initCartList() {
            let getShopCartResult = await getShopCart(this.token, this.page, this.psgeSize);
            if (getShopCartResult.msg === '成功') {
                this.INIT_CART(getShopCartResult.data.shoppingCartList);
            }
        },
        async addOrMinusAccout(index, type) {
            let shoppingCartId = this.cartList[index].id;

            let num = 0;
            if (type === 1) {
                num = 1;
                let addCountResult = await addOrMinus(this.token, shoppingCartId, type);
                console.log('addCountResult = ' + addCountResult.msg);
                this.ADD_OR_MINUS({index, num});
            } else if (type === 2) {
                if (this.cartList[index].num > 1) {
                    num = -1;
                    let minusCountResult = await addOrMinus(this.token, shoppingCartId, type);
                    console.log('minusCountResult = ' + minusCountResult.msg);
                    this.ADD_OR_MINUS({index, num});
                }
            }
        },
        // 全部选中
        selectAll() {
          this.isSelectedAll = !this.isSelectedAll;
          this.cartList.forEach((item) => {
              if (this.isSelectedAll) {
                this.ADD_SELECT_PRODUCT(item);
              } else {
                this.DELECT_SELECT_PRODUCT(item);
              }
            setStore('selectProducts', JSON.stringify(this.selectProducts));
            this.selected[item.id] = this.isSelectedAll;
          });
        },
        edit() {
            this.isEdit = true;
        },
        complete() {
          this.isEdit = false;
        },
        // 清空失效物品
        async emptyInvalid() {
          let cleanInvalidShoppingCartResult = await cleanInvalidShoppingCart(this.token);
          if (cleanInvalidShoppingCartResult.msg === '成功') {
              this.CLEAR_INVALID_PRODUCT();
              setStore('selectProducts', JSON.stringify(this.selectProducts));
          }
        },
        // 从购物车中删除选中物品
        async deleteSelected() {
            let shoppingCartIds = '';
            this.selectProducts.forEach((item) => {
              shoppingCartIds += (item.id + ',');
            });
            shoppingCartIds = shoppingCartIds.substr(0, shoppingCartIds.length - 1);
            let deleteSelectedResult = await deleteShopCart(this.token, shoppingCartIds);
            if (deleteSelectedResult.msg === '成功') {
                this.selectProducts.forEach((item) => {
                    this.DELETE_CART(item);
                    this.DELECT_SELECT_PRODUCT(item);
                    setStore('selectProducts', JSON.stringify(this.selectProducts));
                });
            }
        },
        // 选中或取消选中物品
        toggleSelect(item, event) {
            if (!event._constructed) {
                return;
            }
            if (!this.selected[item.id] || this.selected[item.id] === 'undefined') {
              this.ADD_SELECT_PRODUCT(item);
              this.$set(this.selected, item.id, true);
              setStore('selectProducts', JSON.stringify(this.selectProducts));
            } else {
              this.$set(this.selected, item.id, false);
              this.DELECT_SELECT_PRODUCT(item);
              setStore('selectProducts', JSON.stringify(this.selectProducts));
            }
        },
        // 去兑换
        toPay() {
            if (this.selectProducts.length > 0) {
                this.$router.push('confirmOrder');
            }
        },
        // 上拉加载
        async onPullingUp() {
          if (this.hasMore) {
            this.$refs.scroll.beforePullUp();
            this.page = this.page + 1;
            let getShopCartResult = await getShopCart(this.token, this.page, this.psgeSize);
            if (getShopCartResult.data.shoppingCartList.length < this.pageSize) {
                this.hasMore = false;
            }
            setTimeout(() => {
              if (getShopCartResult.data.shoppingCartList.length > 0) {
                this.ADD_CART(getShopCartResult.data.shoppingCartList);
              } else {
                this.beforePullUpWord = '没有更多了';
                this.$refs.scroll.disable();
              }
              this.$refs.scroll.finish('PullUp');
            });
          }
        }
      },
      components: {
        footerGuide,
        scroll
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
.shopcartWrap
  .topHeader
    top: 0
    left: 0
    width: 100%
    height: 50px
    line-height: 50px
    border-bottom-1px(#dfdfdf)
    position: fixed
    display: flex
    background: #fff
    h1
      flex: 1
      text-align: center
      color: #f53663
      font-size: 15px
    .topBtn
      position: absolute
      right: 12px
      color: #f53663
      font-size: 14px
  .shopcartMain
    position: absolute
    top: 60px
    bottom: 50px
    left: 0
    width: 100%
    .content
      position: absolute
      top: 0
      bottom: 50px
      left: 0
      width: 100%
      ul
        padding: 0 12px
        li
          display: flex
          align-items: center
          position: relative
          height: 90px
          margin-bottom: 10px
          padding-bottom: 10px
          border-bottom-1px(#dfdfdf)
          .icon
            width: 22px
            height: 22px
            margin-right: 10px
            background-image: url(./unselected.png)
            background-size: 100%
            background-repeat: no-repeat
            &.selected
              background-image: url(./selected.png)
          a
            position: relative
            display: flex
            align-items: center
            width: 100%
            height: 100%
            .thumb
              width: 120px
              margin-right: 10px
            .infoWrap
              height: 100%
              .title
                height: 34px
                line-height: 17px
                padding-top: 10px
                font-size: 14px
                color: #303030
                overflow: hidden
                text-overflow: ellipsis
              .price
                padding-top: 24px
                font-size: 12px
                color: #f53663
                font-family: 'Arial'
            .disabledFlag
              position: absolute
              top: 0
              left: 0
              z-index: 100
              width: 100%
              height: 100%
              display: flex
              align-items: center
              justify-content: center
              background: rgba(255, 255, 255, 0.8)
              span
                width: 58px
                height: 58px
                border-radius: 50%
                text-align: center
                line-height: 58px
                background: rgba(0, 0, 0, 0.8)
                opacity: 0.8
                color: #fff
                font-size: 15px
          .miniCartControlWrap
            position: absolute
            left: 162px
            top: 43px
            display: flex
            align-items: center
            .txt
              margin-right: 10px
              font-size: 11px
              color: #999
            .cartControl
              display: flex
              align-items: center
              .cartDecrease, .cartAdd
                display: flex
                align-items: center
                justify-content: center
                width: 20px
                height: 20px
                border: 1px solid #dfdfdf
                box-sizing: border-box
              .cartCount
                width: 27px
                text-align: center
                font-size: 12px
                color: #f53663
                font-family: 'Arial'
      .noResult
        padding-top: 60px
        text-align: center
        .txt
          display: block
          padding-top: 17px
          font-size: 15px
          color: #666
        .btnView
          display: block
          width: 300px
          height: 40px
          margin: 70px auto
          text-align: center
          line-height: 40px
          border-radius: 20px
          color: #ffffff
          font-size: 14px
          background: #f53663
    .controlBar
      display: flex
      align-items: center
      width: 100%
      height: 50px
      border-top-1px(#e9e9e9)
      position: fixed
      left: 0
      bottom: 50px
      background: #fff
      .selectAllWrap
        display: flex
        align-items: center
        height: 100%
        margin-left: 12px
        .icon
          width: 22px
          height: 22px
          margin-right: 6px
          background-image: url(./unselected.png)
          background-size: 100%
          background-repeat: no-repeat
          &.active
            background-image: url(./selected.png)
        .txt
          font-size: 14px
          color: #333

      .calulateWrap
        flex: 1
        display: flex
        align-items: center
        height: 100%
        .total
          flex:1
          text-align: right
          font-size: 12px
          color: #333
          font-family: 'Arial'
          span
            font-size: 14px
            color: #f53663

        .btnCal
          width: 80px
          height: 32px
          margin: 0 12px
          text-align: center
          line-height: 32px
          border-radius: 20px
          color: #fff
          font-size: 12px;
          background: #f53663
      .editWrap
        flex: 1
        height: 100%
        display: flex
        align-items: center
        justify-content: flex-end
        .btnClearDisabled
          width: 110px
          height: 32px
          text-align: center
          line-height: 32px
          color: #fff
          font-size: 12px
          background: #fa6334
          border-radius: 20px
        .btnDelete
          width: 70px
          height: 32px
          margin: 0 12px
          text-align: center
          line-height: 32px
          color: #fff
          font-size: 12px
          background: #f53663
          border-radius: 20px
</style>
