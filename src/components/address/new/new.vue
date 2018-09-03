<template>
  <transition name="move">
    <div class="newAddressWrap">
      <top-header :title="title"></top-header>
      <form class="newAddressForm">
        <ul>
          <li class="item">
            <label>收件人</label>
            <div class="inputWrap rightWrap border-1px">
              <input type="text" name="addressee" v-model="name" />
            </div>
          </li>
          <li class="item">
            <label>电话</label>
            <div class="inputWrap rightWrap border-1px">
              <input type="tel" name="phone" maxlength="11" v-model="phone" />
            </div>
          </li>
          <li class="item">
            <label>地址选择</label>
            <div class="areaWrap rightWrap border-1px">
              <span class="areaBox" type="text" name="area" @click.stop.prevent="showSelectArea">{{provinceName}}{{cityName}}{{districtName}}</span>
              <span class="rightArrow"></span>
            </div>
          </li>
          <li class="item detailAddress">
            <label>详细地址</label>
            <div class="textareaWrap">
              <textarea v-model="address"></textarea>
            </div>
          </li>
          <li>
            <label>设为默认</label>
            <div class="rightWrap setDefaultWrap">
              <span :class="isDef ? 'open' : 'close'" @click="toggleDefault"></span>
            </div>
          </li>
        </ul>
        <a class="btnConfirm" @click.stop.prevent="newAddress">确定</a>
      </form>
      <div class="showChose" v-if="isShowSelectArea">
        <section class="address">
          <div class="titleTop border-1px">地址选择</div>
          <a class="btnClose" @click.stop.prevent="closeSelectArea">关闭</a>
          <div class="selectWrap border-1px">
            <div class="area" @click.stop.prevent="provinceSelected()" :class="provinceName!==''?'':'active'" >
              <span>{{provinceName?provinceName:'选择省'}}</span>
            </div>
            <div class="area" @click.stop.prevent="citySelected()" :class="cityName!==''?'':'active'" v-show="provinceName">
              {{cityName?cityName:'选择市'}}
            </div>
            <div class="area" @click.stop.prevent="districtSelected()" :class="districtName!==''?'':'active'" v-show="cityName">
              {{districtName?districtName:'选择区'}}
            </div>
          </div>
          <ul v-show="showProvince">
            <li class="addList" v-for="(item, index) in provinceList" :key="index"
                @click.stop.prevent="getProvinceId(item.id, item.name, index, $event)"
                :class="item.selected === true ? 'active' : ''">{{item.name}}{{item.id}}{{index}}</li>
          </ul>
          <ul v-show="showCity">
            <li class="addList" v-for="(item, index) in showCityList" :key="index"
                @click="getCityId(item.id, item.name, index, $event)"
                :class="item.selected ? 'active' : ''">{{item.name}}</li>
          </ul>
          <ul v-show="showDistrict">
            <li class="addList" v-for="(item, index) in showDistrictList" :key="index"
                @click="getDistrictId(item.id, item.name, index, $event)"
                :class="item.selected ? 'active' : ''">{{item.name}}</li>
          </ul>
        </section>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import topHeader from 'components/topHeader/topHeader';
  import {getStore} from '../../../config/mUtils';
  import {createAddress} from '../../../service/getData';
  import {mapState, mapMutations} from 'vuex';

  export default {
      data() {
          return {
              title: '新建地址',
              isOpen: true,
              addressTableId: 1,
              token: '',
              name: '',
              phone: '',
              address: '',
              isDef: 1,
              isShowSelectArea: false,
              provinceName: '', // name
              cityName: '',
              districtName: '',
              info: [{
                  name: ''
              }],
              provinceId: 1, // id
              cityId: 3,
              districtId: 57,
              showProvince: false, // 是否显示省列表
              showCity: false,
              showDistrict: false,
              showCityList: false, // 市列表
              showDistrictList: false
          };
      },
      created() {
          this.token = getStore('token');
      },
      computed: {
        ...mapState([
            'areaList'
        ]),
        ...mapState({
          provinceList: state => {
              return state.areaList[0].childList;
          }
        })
      },
      methods: {
        ...mapMutations([
          'UPDATE_ADDRESS'
        ]),
        async newAddress() {
            let newAddressResult = await createAddress(this.addressTableId, this.token, this.name, this.phone, this.provinceId, this.cityId, this.districtId, this.address, this.isDef);
            if (newAddressResult.msg === '成功') {
                this.UPDATE_ADDRESS({
                    consigneeName: this.name,
                    consigneeTel: this.phone,
                    provinceId: this.provinceId,
                    provinceName: this.provinceName,
                    cityId: this.cityId,
                    cityName: this.cityName,
                    districtId: this.districtId,
                    districtName: this.districtName,
                    address: this.address,
                    isDef: this.isDef
                });
                this.$router.go(-1);
            } else {
                alert(newAddressResult.msg);
            }
        },
        toggleDefault() {
            if (this.isDef) {
              this.isDef = 0;
            } else {
              this.isDef = 1;
            }
        },
        showSelectArea() {
          this.isShowSelectArea = true;
        },
        _filter(info, type, provinceId) {
          let result = [];
          for (var i = 0; i < info.length; i++) {
              if (provinceId === info[i].id) {
                  result = info[i].childList;
              }
          }
          return result;
        },
        provinceSelected() {
          // 清除市级和区级列表
          this.showCityList = false;
          this.showDistrictList = false;
          // 清除市级和区级选项
          this.cityName = '';
          this.districtName = '';
          // 选项页面的切换
          this.showProvince = true;
          this.showCity = false;
          this.showDistrict = false;
        },
        getProvinceId(id, name, index, event) {
          if (event._constructed) {
            return;
          }
          this.provinceId = id;
          this.provinceName = name;
          console.log('provinceName = ' + this.provinceName + 'provinceId = ' + this.provinceId);
          this.showProvince = false;
          this.showCity = true;
          this.showDistrict = false;
          this.showCityList = this._filter(this.areaList, 'city', this.provinceId);
        },
        citySelected() {
          this.showProvince = false;
          this.showCity = true;
          this.showDistrict = false;
        },
        getCityId: function(id, name, index, event) {
          if (event._constructed) {
            return;
          }
          this.cityId = id;
          this.cityName = name;
          this.showProvince = false;
          this.showCity = false;
          this.showDistrict = true;
          this.showDistrictList = this._filter(this.showCityList, 'district', this.cityId);
        },
        districtSelected() {
          this.showProvince = false;
          this.showCity = false;
          this.showDistrict = true;
        },
        getDistrictId(id, name, index, event) {
            if (event._constructed) {
              return;
            }
            this.districtId = id;
            this.districtName = name;
            this.showProvince = false;
            this.showCity = false;
            this.showDistrict = false;
            this.isShowSelectArea = false;
        },
        closeSelectArea() {
            this.isShowSelectArea = false;
        }
      },
      components: {
        topHeader
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
.newAddressWrap
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #fff
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move.leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .newAddressForm
    position: absolute
    top: 50px
    left: 0
    width: 100%
    ul
      li
        display: flex
        align-items: center
        justify-content: space-between
        height: 45px
        padding: 0 25px
        label
          width: 75px
          font-size: 14px
          color: #999
          font-family: 'PingFang SC', 'SimHei'
        .rightWrap
          flex: 1
          height: 100%
          &.inputWrap, &.areaWrap
            border-bottom-1px(#e9e9e9)
          input
            width: 100%
            height: 100%
            font-size: 14px
            color: #2b2b2b
            font-family: 'PingFang SC', 'SimHei'
          &.areaWrap
            display: flex
            align-items: center
            font-size: 14px
            .areaBox
              flex: 1
              height: 100%
              line-height: 45px
          .rightArrow
            display: inline-block
            width: 9px
            height: 15px
            background-image: url(./right.png)
            background-size: 100%
            background-repeat: no-repeat
          &.setDefaultWrap
            text-align: right
          .open, .close
            display: inline-block
            width: 46px
            height: 24px
            margin-top: 10px
            background-size: 100%
            background-repeat: no-repeat
          .open
            background-image: url(./open.png)
          .close
            background-image: url(./close.png)
        &.detailAddress
          height: 162px
          align-items: flex-start
          label
            width: 75px
            height: 45px
            line-height: 45px
          .textareaWrap
            flex: 1
            height: 100%
            textarea
              width: 100%
              height: 142px
              margin: 10px 0
              padding: 5px
              line-height: 17px
              box-sizing: border-box
              font-size: 14px
              color: #2b2b2b
              background: #f7f7f7
              outline: none
              border: none
              font-family: 'PingFang SC', 'SimHei'
    .btnConfirm
      display: block
      width: 300px
      height: 40px
      text-align: center
      line-height: 40px
      margin: 37px auto
      border-radius: 20px
      color: #fff
      font-size: 14px
      background: #f53663
  .showChose
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.5)
    .address
      position:absolute;
      bottom:0;
      left:0;
      z-index:121;
      background:#fff;
      width:100%;
      height: 430px
      .titleTop
        width: 100%
        height: 30px
        line-height: 30px
        text-align: center
        color: #333
        font-size: 14px
        border-bottom-1px(#dfdfdf)
      .btnClose
        position: absolute
        right: 10px
        top: 10px
        font-size: 14px
      .selectWrap
        height: 36px
        line-height: 36px
        border-bottom-1px(#dfdfdf)
        .area
          display:inline-block;
          font-size:14px;
          margin-left:25px;
          &.active
            color: #f00
            border-bottom:0.02rem solid red;
      ul
        width:95%;
        height:78%;
        overflow:auto;
        li
          margin-left:20px;
          width:85%;
          padding-left:0.32rem;
          font-size:15px;
          line-height:32px;
</style>
