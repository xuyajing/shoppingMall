<template>
  <div class="addressWrap">
    <top-header :title="title" :operation="operation" @doRight="newAddress"></top-header>
    <div class="contentWrap" ref="contentWrap">
      <ul class="list">
        <li>
          <router-link to="/address/modify">
            <div class="info">
              <span class="defaultFlag" v-show="selectedNumber === 0">默认地址</span>
              <span class="addressee">收件人：吴彦祖</span>
              <span class="phoneNumber">18121001122</span>
            </div>
            <div class="detailAddress">安徽省芜湖市鸠江区安徽芜湖九江经济开发区 融汇科技产业1栋201亚原子</div>
          </router-link>
        </li>
        <li>
          <router-link to="/address/modify">
            <div class="info">
              <span class="defaultFlag" v-show="selectedNumber === 1">默认地址</span>
              <span class="addressee">收件人：吴彦祖</span>
              <span class="phoneNumber">18121001122</span>
            </div>
            <div class="detailAddress">安徽省芜湖市鸠江区安徽芜湖九江经济开发区 融汇科技产业1栋201亚原子</div>
          </router-link>
        </li>
      </ul>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';

  export default {
      data() {
          return {
              title: '地址管理',
              operation: '新建',
              selectedNumber: 0
          };
      },
      methods: {
        newAddress() {
            this.$router.push('/address/new');
        }
      },
      components: {
        topHeader
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
.addressWrap
  .contentWrap
    position: absolute
    top: 60px
    bottom: 60px
    left: 0
    width: 100%
    .list
      margin-top: 20px
      padding: 0 20px 20px
      li
        margin-bottom: 40px
        padding-right: 30px
        background: url(./right.png) right center no-repeat
        background-size: 9px 15px
        .info
          display: flex
          align-items: center
          margin-bottom: 9px
          .defaultFlag
            margin-right: 5px
            padding: 2px 4px
            border: 1px solid #f53663
            border-radius: 2px
            font-size: 11px
            color: #f53663
          .addressee
            margin-right: 17px
            font-size: 14px
            color: #333
          .phoneNumber
            font-size: 14px
            color: #333
        .detailAddress
          line-height: 17px
          font-size: 12px
          color: #999

</style>
