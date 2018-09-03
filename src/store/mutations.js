/**
 * Created by youyu on 2018/8/20.
 */
import {
  RECORD_USERINFO,
  SET_USERINFO,
  UPDATE_USERINFO,
  RECORD_COLLECT,
  CANCEL_COLLECT,
  CLEAN_INVALID_COLLECT_PRODUCT,
  INIT_CART,
  ADD_CART,
  DELETE_CART,
  ADD_SELECT_PRODUCT,
  DELECT_SELECT_PRODUCT,
  ADD_OR_MINUS,
  CLEAR_INVALID_PRODUCT,
  SET_AREA_LIST,
  SET_ADDRESS,
  UPDATE_ADDRESS,
  SET_CONFIRM_ADDRESS,
  SET_REDEEM
} from './mutation-types';

import {setStore, getStore} from '../config/mUtils';

export default {
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
  },
  // 获取用户信息存入vuex
  [SET_USERINFO](state, info) {
    // if (state.userInfo && state.userInfo.phone !== info.phone) return;
    state.userInfo = info;
  },
  //修改昵称、性别
  [UPDATE_USERINFO](state, info) {
    state.userInfo = {...state.userInfo, ...info}
    console.log('state.userInfo.gender = ' + state.userInfo.gender)
  },
  //记录收藏
  [RECORD_COLLECT](state, product) {
    state.collectList.push(product)
  },
  // 取消收藏
  [CANCEL_COLLECT](state, product) {
    state.collectList.filter((item => item.id !== product.id))
  },
  // 清空收藏失效商品
  [CLEAN_INVALID_COLLECT_PRODUCT](state) {
    state.collectList = state.collectList.filter((item) => item.status)
  },
  // 加入购物车
  [ADD_CART](state, product) {
    let has = false;
    state.cartList.forEach((item) => {
      if (item.id === product.id) {
        item.num += product.num
        has = true
      }
    });
    if (!has) {
      console.log('dddd')
      state.cartList.push(product)
    }
    console.log('state.cartList = ' + state.cartList)
  },
  //初始化购物车
  [INIT_CART](state, shopCartList) {
    state.cartList = shopCartList
  },
  // 从购物车中删除
  [DELETE_CART](state, product) {
    state.cartList = state.cartList.filter((item) => item.id !== product.id)
  },
  // 选中商品
  [ADD_SELECT_PRODUCT](state, product) {
    let has = false;
    state.selectProducts.forEach((item) => {
      if (item.id === product.id) {
        item.num = parseInt(item.num) + 1
        has = true
      }
    });
    if (!has) {
      state.selectProducts.push(product)
    }

  },
  // 取消选中商品
  [DELECT_SELECT_PRODUCT](state, product) {
    // let productList = [];
    state.selectProducts = state.selectProducts.filter((item) => item.id !== product.id)
  },
  // 加减商品数量
  [ADD_OR_MINUS](state, {index, num}) {
    let count = parseInt(state.cartList[index].num) + parseInt(num)
    state.cartList[index].num = count
    console.log('state.cartList[index].num = ' + state.cartList[index].num)
    console.log(state.selectProducts.filter(item => item.id === state.cartList[index].id))
  },
  // 清空购物车失效商品
  [CLEAR_INVALID_PRODUCT](state) {
    state.cartList = state.cartList.filter((item) => item.status)
  },
  // 获取省市区列表存入Vuex
  [SET_AREA_LIST](state, areaList) {
    state.areaList = areaList
  },
  // 获取地址列表存入Vuex
  [SET_ADDRESS](state, addressList) {
    state.addressList = addressList
    console.log('state.addressList = ' + state.addressList.length);
  },
  // 修改地址
  [UPDATE_ADDRESS](state, info){
    let has = false;
    for (var i = 0; i < state.addressList.length; i++) {
      if (state.addressList[i].id === info.id) {
        has = true;
        state.addressList[i] = {...state.addressList[i], ...info};
      }
      console.log('state.addressList[i] = ' + state.addressList[i].address);
    }
    if (!has) {
      state.addressList.push(info);
    }
  },
  // 设置确认订单中的地址
  [SET_CONFIRM_ADDRESS](state, address) {
    console.log('aaaaaaa')
    state.confirmAddress = address
    console.log('state.confirmAddress = ' + state.confirmAddress.provinceName)
  }

}
