<template>
  <div>{{confirmAddress.consigneeName}}</div>
</template>

<script type="text/ecmascript-6">
  import {getStore} from '../../config/mUtils';
  import {mapMutations} from 'vuex';

  export default {
      data() {
          return {
              token: '',
              wxCode: '',
              tradeProductList: [],
              confirmAddress: null,
              redeemCode: '',
              shippingAddress: ''
          };
      },
    activated() {
          this.token = getStore('token');
          this.tradeProductList = getStore('tradeProductList');
          this.redeemCode = getStore('redeemCode');
          this.confirmAddress = getStore('confirmAddress');
          this.shippingAddress = this.confirmAddress.provinceName + this.confirmAddress.cityName + this.confirmAddress.districtName;
          console.log('this.shippingAddress' + this.shippingAddress);
          if (this.$route.query.code) {
              this.wxCode = this.$route.query.code;
              console.log('222confirmAddress = ' + getStore('confirmAddress'));
              this.createOrder();
          }
      },
      computed: {},
      methods: {
        ...mapMutations([
            'DELECT_SELECT_PRODUCT'
        ]),
          async createOrder() {
            console.log('confirmAddress = ' + this.confirmAddress);
          }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
