<template>
  <div class="shopcartWrap">
    <div class="topHeader border-1px">
      <h1>购物车</h1>
      <a class="btnEdit topBtn" v-show="!isEdit" @click.stop.prevent="edit">编辑</a>
      <a class="btnComplete topBtn" v-show="isEdit" @click.stop.prevent="complete">完成</a>
    </div>
    <div class="shopcartMain">
      <div class="content" ref="$ref">
        <ul v-show="!isEmpty">
          <li class="border-1px" v-for="(item, index) in goodsList" :key="index">
            <router-link to="/">
              <span class="icon" :class="item.isSelected ? 'selected' : ''" @click.stop.prevent="toggleSelect(index)"></span>
              <img src="./cartShopImg.png"  class="thumb"/>
              <div class="infoWrap">
                <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                <div class="miniCartControlWrap">
                  <span class="txt">发货数量：</span>
                  <div class="cartControl">
                    <span class="cartDecrease">
                      <img src="./reduce.png" width="12px">
                    </span>
                    <span class="cartCount">2</span>
                    <span class="cartAdd">
                      <img src="./add.png" width="12px">
                    </span>
                  </div>
                </div>
                <div class="price">￥120</div>
              </div>
            </router-link>
          </li>
          <li class="border-1px disabled">
            <router-link to="/">
              <span class="icon"></span>
              <img src="./cartShopImg.png"  class="thumb"/>
              <div class="infoWrap">
                <div class="title">YSL圣罗兰莹亮纯魅唇膏圆管</div>
                <div class="miniCartControlWrap">
                  <span class="txt">发货数量:</span>
                  <div class="cartControl">
                    <span class="cartDecrease">
                      <img src="./reduce.png" width="12px">
                    </span>
                    <span class="cartCount">2</span>
                    <span class="cartAdd">
                      <img src="./add.png" width="12px">
                    </span>
                  </div>
                </div>
                <div class="price">￥120</div>
                <div class="disabledFlag" v-show="isDisabled">
                  <span>已失效</span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <div class="noResult" v-show="isEmpty">
          <img src="./empty.png" width="68px" />
          <span class="txt">购物车还没有商品哦</span>
          <a class="btnView">去逛逛</a>
        </div>
      </div>
      <div class="controlBar" v-show="!isEmpty">
        <div class="selectAllWrap">
          <span class="icon"></span>
          <span class="txt">全选</span>
        </div>
        <div class="calulateWrap" v-show="!isEdit">
          <div class="total">合计：<span>￥480</span></div>
          <router-link to="/confirmOrder" class="btnCal">结算</router-link>
        </div>
        <div class="editWrap" v-show="isEdit">
          <a class="btnClearDisabled" @click.stop.prevent="emptyDisabled">清空失效商品</a>
          <a class="btnDelete" @click.stop.prevent="deleteSelected">删除</a>
        </div>
      </div>
    </div>
    <footer-guide></footer-guide>
  </div>
</template>

<script type="text/ecmascript-6">
  import footerGuide from 'components/footerGuide/footerGuide';

  export default {
      data() {
          return {
            isEdit: false,
            isDisabled: true,
            goodsList: [{
                isSelected: false
            }],
            isEmpty: false
          };
      },
      methods: {
        edit() {
            this.isEdit = true;
        },
        complete() {
          this.isEdit = false;
        },
        empty() {

        },
        toggleSelect(index) {
            this.goodsList[index].isSelected = !this.goodsList[index].isSelected;
        }
      },
      components: {
        footerGuide
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
          position: relative
          height: 90px
          margin-bottom: 10px
          padding-bottom: 10px
          border-bottom-1px(#dfdfdf)
          a
            position: relative
            display: flex
            align-items: center
            width: 100%
            height: 100%
            .icon
              width: 22px
              height: 22px
              margin-right: 10px
              background-image: url(./unselected.png)
              background-size: 100%
              background-repeat: no-repeat
              &.selected
                background-image: url(./selected.png)
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
              .miniCartControlWrap
                display: flex
                align-items: center
                margin-bottom: 6px
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
              .price
                font-size: 12px
                color: #f53663
                font-family: 'Arial'
            .disabledFlag
              position: absolute
              top: 0
              left: 0
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
