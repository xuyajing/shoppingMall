<template>
  <div class="topHeaderWrap border-1px">
    <a class="btnBack" @click.prevent.stop="goback"></a>
    <h1 class="border-1px">{{title}}</h1>
    <a class="btnNew topBtn" @click.prevent.stop="$emit('doRight')">{{operation}}</a>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          title: {
            type: String
          },
          operation: {
              type: String
          }
      },
    methods: {
      goback() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
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
    .btnNew
      position: absolute
      right: 12px
      color: #f53663
      font-size: 13px
</style>
