<template>
  <transition name="move">
    <div class="collectWrap">
      <top-header :title="title" :operation="operation" @doRight="showDeleteDisabledDialog"></top-header>
      <div class="collectListWrap" ref="collectListWrap">
        <ul class="collectList">
          <li class="border-1px" v-for="(item, index) in collectList" :key="index" :class="{'disabled': !item.status}">
            <router-link :to="{name: 'goodDetail', params: {id: item.id}}">
              <img :src="item.thumb" width="120px" height="90px"/>
              <span class="title">{{item.name}}</span>
              <span class="time">{{item.collectDate}}</span>
              <span class="price">¥{{item.price}}</span>
              <div class="disabledFlag" v-show="!item.status">
                <span>已失效</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <tipdialog :title="tipdialogTitle" :content="tipdialogContent" @cancel="cancelDeleteDisabled" @confirm="deleteDisabled" v-show="showDeleteDisabled"></tipdialog>
      <div class="mask" v-show="showMask"></div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';
  import tipdialog from 'components/common/tipdialog/tipdialog';
  import BScroll from 'better-scroll';
  import {mapState, mapMutations} from 'vuex';
  import {getCollectList, cleanInvalidCollect} from '../../../service/getData';
  import {getStore} from '../../../config/mUtils';

  export default {
      data() {
          return {
              title: '收藏宝贝',
              operation: '清空失效',
              isDisabled: true,
              showDeleteDisabled: false,
              showMask: false,
              tipdialogTitle: '删除',
              tipdialogContent: '确定从收藏里删除该宝贝吗？',
              token: ''
          };
      },
      computed: {
        ...mapState([
            'collectList'
        ])
      },
      created() {
          this.token = getStore('token');
          this.$nextTick(() => {
              this.initCollectList();
              this._initScroll();
          });
      },
      methods: {
        ...mapMutations([
            'RECORD_COLLECT', 'CLEAN_INVALID_COLLECT_PRODUCT'
        ]),
        async initCollectList() {
            let getCollectListResult = await getCollectList(this.token);
            if (getCollectListResult.msg === '成功') {
              for (let i = 0; i < getCollectListResult.data.productList.length; i++) {
                  this.RECORD_COLLECT(getCollectListResult.data.productList[i]);
              }
            } else {
                alert(getCollectListResult.msg);
            }
        },
        _initScroll() {
          if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.collectListWrap, {
                  click: true,
                  probeType: 3
              });
          } else {
              this.scroll.refresh();
          }
        },
        showDeleteDisabledDialog() {
            this.showMask = true;
            this.showDeleteDisabled = true;
        },
        cancelDeleteDisabled() {
            this.showMask = false;
            this.showDeleteDisabled = false;
        },
        async deleteDisabled() {
          this.showMask = false;
          this.showDeleteDisabled = false;
          let cleanInvalidCollectResult = await cleanInvalidCollect(this.token);
          if (cleanInvalidCollectResult.code === 0) {
            this.CLEAN_INVALID_COLLECT_PRODUCT();
          }
        }

      },
      components: {
        topHeader,
        tipdialog
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
.collectWrap
  position: fixed
  top: 0
  left: 0
  z-index: 30
  width: 100%
  height: 100%
  background: #fff
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .collectListWrap
    position: absolute
    top: 60px
    bottom: 0
    left: 0
    width: 100%
    .collectList
      margin: 0 12px
      li
        position: relative
        border-bottom-1px(#ccc)
        margin-bottom: 10px
        padding-bottom: 10px
        &:last-child
          &:after
            border: none
        a
          display: block
          overflow: hidden
          img
            float: left
            width: 120px
            margin-right: 12px
          .title
            display: block
            height: 34px
            padding: 10px 10px 8px 0
            line-height: 17px
            font-size: 14px
            text-overflow: ellipsis
            color: #1a1a1a
            overflow: hidden
          .time
            display: block
            padding-bottom: 5px
            font-size: 12px
            color: #999
          .price
            display: block
            line-height: 17px
            font-size: 15px
            color: #f53663
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
  .mask
    position: fixed
    top: 0
    left: 0
    z-index: 10
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.8)
</style>
