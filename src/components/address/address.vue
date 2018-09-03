<template>
  <div class="addressWrap">
    <top-header :title="title" :operation="operation" @doRight="newAddress"></top-header>
    <div class="contentWrap" ref="contentWrap">
      <ul class="list">
        <li v-for="(item, index) in addressList" :key="index">
          <div class="left" @click="selectAddress(item)">
            <div class="info">
              <span class="defaultFlag" v-if="item.isDef">默认地址</span>
              <span class="addressee">收件人：{{item.consigneeName}}</span>
              <span class="phoneNumber">{{item.consigneeTel}}</span>
            </div>
            <div class="detailAddress">{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.address}}</div>
          </div>
          <router-link :to="{path: '/address/modify', query: {id: item.id}}"></router-link>
        </li>
      </ul>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';
  import {getStore} from '../../config/mUtils';
  import {getAreaList, getAddressList} from '../../service/getData';
  import {mapState, mapMutations} from 'vuex';

  export default {
      data() {
          return {
              title: '地址管理',
              operation: '新建',
              detailAddress: '',
              token: '',
              hasArea: [],
              type: 0 // 1表示从确认订单过来， 0表示地址管理
          };
      },
      computed: {
        ...mapState([
            'areaList', 'addressList'
        ])
      },
      created() {
          this.token = getStore('token');
          this.type = this.$route.query.type;
          this.$nextTick(() => {
              this.getArea();
              this.initAddress();
          });
      },
      methods: {
        ...mapMutations([
            'SET_AREA_LIST', 'SET_ADDRESS', 'SET_CONFIRM_ADDRESS'
        ]),
        selectAddress(addr) {
            if (this.type === 1) {
                console.log('000');
              this.SET_CONFIRM_ADDRESS(addr);
              this.$router.go(-1);
            }
        },
        newAddress() {
            this.$router.push('/address/new');
        },
        async initAddress() {
            let getAddressListResult = await getAddressList(this.token);
            if (getAddressListResult.msg === '成功') {
              this.SET_ADDRESS(getAddressListResult.data.addressList);
//              for (var i = 0; i < this.addressList.length; i++) {
//                this.hasAreaList[i] = this.getAreaName(this.addressList[i].provinceId, this.addressList[i].cityId, this.addressList[i].districtId);
//                console.log('this.addressList[i].provinceId = ' + this.addressList[i].provinceId);
//                console.log('this.addressList[i].cityId = ' + this.addressList[i].cityId);
//                console.log('this.addressList[i].districtId = ' + this.addressList[i].districtId);
//                console.log('this.hasAreaList[i]' + this.getAreaName(this.addressList[i].provinceId, this.addressList[i].cityId, this.addressList[i].districtId));
//              }
            } else {
                alert(getAddressListResult.msg);
            }
        },
        async getArea() {
            let getAreaListResult = await getAreaList();
            if (getAreaListResult.msg === '成功') {
               this.SET_AREA_LIST(getAreaListResult.data.areaList);
            } else {
              alert(getAreaListResult.msg);
          }
        }
//        getAreaName(provinceId, cityId, districtId) {
//          let provinceName = '';
//          let cityName = '';
//          let districtName = '';
//          for (var i = 0; i < this.areaList.length; i++) {
//              console.log('888');
//            if (this.areaList[i].id === parseInt(provinceId)) {
//                alert('aaa');
//              provinceName = this.areaList[i].name;
//              for (var j = 0; j < this.areaList[i].childList.length; j++) {
//                if (this.areaList[i].childList[j].id === cityId) {
//                  cityName = this.areaList[i].childList[j].name;
//                  for (var k = 0; k < this.areaList[i].childList[j].childList.length; k++) {
//                    if (this.areaList[i].childList[j].childList[k].id === districtId) {
//                      districtName = this.areaList[i].childList[j].childList[k].name;
//                    }
//                  }
//                }
//              }
//            }
//          }
//          return provinceName + cityName + districtName;
//        }
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
        display: flex
        align-items: center
        margin-bottom: 40px
        background: url(./right.png) right center no-repeat
        background-size: 9px 15px
        height: 57px
        .left
          flex: 1
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
        a
          display: block
          width: 30px
          height: 100%
</style>
