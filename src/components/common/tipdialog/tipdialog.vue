<template>
  <div class="tipDialogWrap">
      <div class="title">{{title}}提醒</div>
      <div class="content">{{content}}</div>
      <div class="btnWrap border-1px">
        <a class="btnCancel btn" @click.stop.prevent="$emit('cancel')">取消</a>
        <a class="btnConfirm btn" @click.stop.prevent="$emit('confirm')">确定</a>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          title: {
              type: String
          },
          content: {
              type: String
          }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl'
  .tipDialogWrap
    position: fixed
    z-index: 35
    top: 50%
    left: 50%
    margin-left: -150px
    margin-top: -95px
    width: 300px
    height: 190px
    text-align: center
    border-radius: 10px
    background: #fff
    .title
      padding: 20px 0 45px
      font-size: 15px
      color: #1b1b1b
    .content
      padding-bottom: 45px
      font-size: 14px
      color: #1b1b1b
    .btnWrap
      display: flex
      align-items: center
      height: 52px
      border-top-1px(#dfdfdf)
      .btn
        display: block
        position: relative
        flex: 1
        height: 100%
        line-height: 52px
        box-sizing: border-box
        font-size: 15px
        &.btnCancel
          &:after
            display: block
            content: ''
            position: absolute
            right: 0
            top: 12px
            width: 0
            height: 28px
            border-right: 1px solid #dfdfdf
        &.btnConfirm
          color: #f53663
</style>
