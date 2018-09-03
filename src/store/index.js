/**
 * Created by youyu on 2018/8/16.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  cartList: [], // 加入购物车的商品列表
  selectProducts: [],  // 选中商品
  userInfo: {}, //用户信息
  confirmAddress: null, //确认订单页新的地址
  orderParam: null,//订单的参数
  orderMessage: null, //订单返回的信息
  orderDetail: null, //订单详情
  login: false,//是否登录
  collectList: [], // 收藏列表
  areaList: [], // 省市区,
  addressList: [], // 地址列表
  redeemCode: '' // 兑换码
};

export default new Vuex.Store({
  state,
  mutations
});
