<template>
  <div></div>
</template>

<script type="text/ecmascript-6">
  import {setStore} from '../../config/mUtils';
  import {loginByWeChat} from '@/service/getData';

  export default {
      data() {
          return {
              code: ''
          };
      },
      activated() {
          console.log('ddd');
        if (this.$route.query.code) {
          this.code = this.$route.query.code;
          this.login();
        }
      },
      methods: {
          async login() {
              let loginByWeChatResult = await loginByWeChat(this.code);
              if (loginByWeChatResult.code === 0) {
                  setStore('token', loginByWeChatResult.data.token);
                  this.$router.push('/');
              }
          }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
