import Vue from 'vue';
import Router from 'vue-router';
import index from 'components/index/index';
import goods from 'components/goods/goods';
import goodDetail from 'components/goods/goodDetail';
import shopcart from 'components/shopcart/shopcart';
import mine from 'components/mine/mine';
import login from 'components/login/login';
import loginSelect from 'components/loginSelect/loginSelect';
import register from 'components/register/register';
import bindPhoneNumber from 'components/bindPhoneNumber/bindPhoneNumber';
import setPassword from 'components/setPassword/setPassword';
import forget from 'components/forget/forget';
import search from 'components/search/search';
import address from 'components/address/address';
import newAddress from 'components/address/new/new';
import modifyAddress from 'components/address/modify/modifyAddress';
import confirmOrder from 'components/confirmOrder/confirmOrder';
import orderSuccess from 'components/confirmOrder/orderSuccess';
import orderFailed from 'components/confirmOrder/orderFailed';
import orderDetail from 'components/order/orderDetail';
import set from 'components/mine/set/set';
import aboutus from 'components/mine/set/aboutUs/aboutUs';
import collect from 'components/mine/collect/collect';
import personalInfo from 'components/mine/personalInfo/personalInfo';
import modifyName from 'components/mine/personalInfo/name/name';
import modifyTelephone from 'components/mine/personalInfo/telephone/modifyTelephone';
import orders from 'components/order/orders';
import App from '../App.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App,
      children: [{
        path: '',
        redirect: 'index'
      }, {
        path: 'index', // 首页
        component: index
      }, {
        path: 'goods', // 商品列表页
        component: goods,
        children: []
      }, {
        path: 'shopcart', // 购物车
        component: shopcart
      }, {
        path: 'mine', // 我的
        component: mine,
        children: [{
          path: 'set',
          component: set,
          children: [{
            path: 'aboutus',
            component: aboutus
          }]
        }, {
          path: 'collect',
          component: collect
        }, {
          path: 'personalInfo',
          component: personalInfo,
          children: [{
            path: 'name',
            component: modifyName
          }, {
            path: 'telephone',
            component: modifyTelephone
          }]
        }]
      }]
    }, {
      path: '/goods/detail/:id', // 商品详情
      component: goodDetail
    }, {
      path: '/login', // 登录
      component: login
    }, {
      path: '/loginSelect', // 登录方式选择
      component: loginSelect
    }, {
      path: '/register', // 注册
      component: register
    }, {
      path: '/bindPhoneNumber',
      component: bindPhoneNumber
    }, {
      path: '/setPassword',
      component: setPassword
    }, {
      path: '/forget', // 忘记密码
      component: forget
    }, {
      path: '/search', // 搜索
      component: search
    }, {
      path: '/address', // 地址页
      component: address,
      children: [{
        path: 'new', // 新建地址
        component: newAddress
      }, {
        path: 'modify',
        component: modifyAddress
      }]
    }, {
      path: '/confirmOrder', // 确认订单
      component: confirmOrder,
      children: [{
        path: 'success',
        component: orderSuccess
      }]
    }, {
      path: '/fail',
      component: orderFailed
    }, {
      path: '/orders',
      component: orders,
      children: [{
        path: 'detail', // 订单详情
        component: orderDetail
      }]
    }
  ],
  linkActiveClass: 'active'
});
