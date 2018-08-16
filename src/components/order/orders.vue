<template>
  <transition name="move">
    <div class="ordersWrap">
      <div class="topHeaderWrap border-1px">
        <a class="btnBack" @click.prevent.stop="gotoMine"></a>
        <h1 class="border-1px">{{title}}</h1>
      </div>
      <ul class="tabs border-1px">
        <li v-for="(tabItem, index) in tabNav" :key="index">
          <a to="/orders/all" :class="type===index ? 'active' : ''" @click.stop.prevent="switchTab(index)">{{tabItem}}</a>
        </li>
      </ul>
      <div class="ordersContentWrap">
        <div class="contentWrap ordersListWrap">
          <div class="main">
            <div class="content all" v-show="type===0">
              <section>
                <div class="orderNumberWrap">
                  <span class="number">20739564973539569</span>
                  <span class="state">待兑换</span>
                </div>
                <router-link :to="{path: '/orders/detail', query: {type: 1}}">
                  <ul>
                    <li>
                      <img src="./confirmOrderImg.png" class="thumb" />
                      <div class="infoWrap">
                        <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                        <span class="type">N°6</span>
                        <div class="foot">
                          <span class="count">发货数量：<em>2</em></span>
                          <span class="total">￥480</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <img src="./confirmOrderImg.png" class="thumb" />
                      <div class="infoWrap">
                        <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                        <span class="type">N°6</span>
                        <div class="foot">
                          <span class="count">发货数量：<em>2</em></span>
                          <span class="total">￥480</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </router-link>
                <div class="calulateWrap border-1px">
                  <div class="count">共2件商品</div>
                  <div class="totalWrap">合计：<span>￥720</span></div>
                </div>
                <div class="footBtnWrap">
                  <a class="btnCancel btn">取消订单</a>
                  <a class="btnContinue btn">继续兑换</a>
                </div>
              </section>
            </div>
            <div class="content toExchange" v-show="type===1">
              <section>
                <div class="orderNumberWrap">
                  <span class="number">20739564973539569</span>
                  <span class="state">待兑换</span>
                </div>
                <router-link :to="{path: '/orders/detail', query: {type: 1}}">
                  <ul>
                    <li>
                      <img src="./confirmOrderImg.png" class="thumb" />
                      <div class="infoWrap">
                        <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                        <span class="type">N°6</span>
                        <div class="foot">
                          <span class="count">发货数量：<em>2</em></span>
                          <span class="total">￥480</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <img src="./confirmOrderImg.png" class="thumb" />
                      <div class="infoWrap">
                        <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                        <span class="type">N°6</span>
                        <div class="foot">
                          <span class="count">发货数量：<em>2</em></span>
                          <span class="total">￥480</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </router-link>
                <div class="calulateWrap border-1px">
                  <div class="count">共2件商品</div>
                  <div class="totalWrap">合计：<span>￥720</span></div>
                </div>
                <div class="footBtnWrap">
                  <a class="btnCancel btn">取消订单</a>
                  <a class="btnContinue btn">继续兑换</a>
                </div>
              </section>
              <section class="overdue">
                <div class="orderNumberWrap">
                  <span class="number">20739564973539569</span>
                  <span class="state">待兑换</span>
                </div>
                <router-link to="/orders/detail">
                  <ul>
                    <li>
                      <img src="./confirmOrderImg.png" class="thumb" />
                      <div class="infoWrap">
                        <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                        <span class="type">N°6</span>
                        <div class="foot">
                          <span class="count">发货数量：<em>2</em></span>
                          <span class="total">￥480</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </router-link>
                <div class="calulateWrap border-1px" v-show="isValid">
                  <div class="count">共2件商品</div>
                  <div class="totalWrap">合计：<span>￥720</span></div>
                </div>
                <div class="invalidTipsWrap">优惠活动已过期，请重新下单</div>
                <div class="footBtnWrap">
                  <a class="btnCancel btn">取消订单</a>
                  <a class="btnContinue btn" v-show="isValid">继续兑换</a>
                </div>
              </section>
            </div>
            <div class="content toDeliver" v-show="type===2">
              <section>
                <div class="orderNumberWrap">
                  <span class="number">20739564973539569</span>
                  <span class="state">已付款</span>
                </div>
                <router-link :to="{path: '/orders/detail', query: {type: 2}}">
                  <ul>
                    <li>
                      <img src="./confirmOrderImg.png" class="thumb" />
                      <div class="infoWrap">
                        <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                        <span class="type">N°6</span>
                        <div class="foot">
                          <span class="count">发货数量：<em>2</em></span>
                          <span class="total">￥480</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <img src="./confirmOrderImg.png" class="thumb" />
                      <div class="infoWrap">
                        <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                        <span class="type">N°6</span>
                        <div class="foot">
                          <span class="count">发货数量：<em>2</em></span>
                          <span class="total">￥480</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </router-link>
                <div class="calulateWrap border-1px">
                  <div class="count">共2件商品</div>
                  <div class="totalWrap">合计：<span>￥720</span></div>
                </div>
                <!--<div class="footBtnWrap" v-show="type===0">-->
                  <!--<a class="btnCancel btn">取消订单</a>-->
                  <!--<a class="btnContinue btn">继续兑换</a>-->
                <!--</div>-->
              </section>
            </div>
            <div class="content toReceipt" v-show="type===3">
              <section>
                <div class="orderNumberWrap">
                  <span class="number">20739564973539569</span>
                  <span class="state">已发货</span>
                </div>
                <router-link :to="{path: '/orders/detail', query: {type: 3}}">
                  <ul>
                    <li>
                      <img src="./confirmOrderImg.png" class="thumb" />
                      <div class="infoWrap">
                        <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                        <span class="type">N°6</span>
                        <div class="foot">
                          <span class="count">发货数量：<em>2</em></span>
                          <span class="total">￥480</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <img src="./confirmOrderImg.png" class="thumb" />
                      <div class="infoWrap">
                        <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                        <span class="type">N°6</span>
                        <div class="foot">
                          <span class="count">发货数量：<em>2</em></span>
                          <span class="total">￥480</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </router-link>
                <div class="calulateWrap border-1px">
                  <div class="count">共2件商品</div>
                  <div class="totalWrap">合计：<span>￥720</span></div>
                </div>
                <div class="footBtnWrap">
                  <span class="">物流单号：20739564973539569</span>
                  <a class="btnConfirm btn">确认收货</a>
                </div>
              </section>
            </div>
            <div class="content completed" v-show="type===4">
              <section>
                <div class="orderNumberWrap">
                  <span class="number">20739564973539569</span>
                  <span class="state">交易完成</span>
                </div>
                <router-link :to="{path: '/orders/detail', query: {type: 4}}">
                  <ul>
                    <li>
                      <img src="./confirmOrderImg.png" class="thumb" />
                      <div class="infoWrap">
                        <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                        <span class="type">N°6</span>
                        <div class="foot">
                          <span class="count">发货数量：<em>2</em></span>
                          <span class="total">￥480</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <img src="./confirmOrderImg.png" class="thumb" />
                      <div class="infoWrap">
                        <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                        <span class="type">N°6</span>
                        <div class="foot">
                          <span class="count">发货数量：<em>2</em></span>
                          <span class="total">￥480</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </router-link>
                <div class="calulateWrap border-1px">
                  <div class="count">共2件商品</div>
                  <div class="totalWrap">合计：<span>￥720</span></div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
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
              title: '订单',
              type: 0, // 0:全部，1:待兑换，2:待发货，3:待收货，4:已完成
              tabNav: ['全部订单', '待兑换', '待发货', '待收货', '已完成'],
              isValid: false
          };
      },
      created() {
          this.$nextTick(() => {
            localStorage.setItem('type', this.$route.query.type);
            this.type = parseInt(localStorage.getItem('type'));
          });
      },
      watch: {
        $route() {
          localStorage.setItem('type', this.$route.query.type);
          this.type = parseInt(localStorage.getItem('type'));
        }
      },
      methods: {
        switchTab(index) {
            this.type = index;
            this.$router.push({path: '/orders', query: {type: index}});
        },
        gotoMine() {
            this.$router.push('/mine');
        }
      },
      components: {
        topHeader
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
    width: 100%
    height: 45px
    padding: 0 5px
    box-sizing: border-box
    border-bottom-1px(#dfdfdf)mv
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
      z-index: 101
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
