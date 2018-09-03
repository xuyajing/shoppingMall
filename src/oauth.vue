<template>

</template>

<script type="text/ecmascript-6">
  import {getStore, setStore} from '../../config/mUtils';
  import {loginByWeChat} from '@/service/getData';

  export default {
      data() {
          return {
              code: ''
          }
      },
      activated() {
        if (this.$route.query.code) {
          this.code = this.$route.query.code;
          alert('code = ' + this.code);
          this.login();
        }
      },
      methods: {
          async login() {
              let loginByWeChatResult = await loginByWeChat(this.code);
              if (loginByWeChatResult.code === 0) {
                  cosnole.log(loginByWeChatResult.msg);
                  this.$router.push('/');
              }
          }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
