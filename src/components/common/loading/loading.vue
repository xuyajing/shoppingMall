<template>
  <div class="loading-container">
    <img src="./loading.gif">
    <span>{{loadingWord}}</span>
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'loading';
  export default {
    name: COMPONENT_NAME,
    props: {
      loadingWord: {
          type: String
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .loading-container
    display: flex
    align-items: center
    justify-content: center
    z-index: 100;
    width: 100%;
    height:1rem;
    img
        width: 20px
        height: 20px
        display: block
    span
      vertical-align: middle
      margin-left: 0.14rem
      font-size: 12px
</style>
