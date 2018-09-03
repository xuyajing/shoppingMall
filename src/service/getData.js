/**
 * Created by youyu on 2018/8/17.
 */
import fetch from '../config/fetch';
// import {getStore} from '../config/mUtils';


/*
注册页
 */
export const register = (phone, password, code, rePassword) => fetch('/api/auth/register', {
  phone,
  password,
  code,
  rePassword
}, 'POST')

/*
  获取短信验证码
 */
export const mobileCode = (phone, type) => fetch('/api/auth/sendSmsCode', {
  phone,
  type
})

/*
  登录
 */
export const login = (phone, password) => fetch('/api/auth/login', {
  phone,
  password
}, 'POST')

/*
  忘记密码
 */
export const forgetPassword = (phone, code, password, rePassword) => fetch('/api/auth/forgetPassword', {
  phone,
  code,
  password,
  rePassword
}, 'POST')

/*
  获取首页banner
 */
export const getBannerList = (token) => fetch('/api/banner', {
  token
})

/*
  获取首页产品
 */
export const getMainData = (token) => fetch('/api/main/mainData', {
  token
})

/*
  获取商品列表
 */
export const getProductList = (token, page, page_size) => fetch('/api/product/productList', {
  token,
  page,
  page_size
})

/*
  获取商品详情
 */
export const getProductDetails = (productId) => fetch('/api/product/productDetails', {
  productId
})

/*
  选择商品属性
 */
export const getProductOptions = (productId) => fetch('/api/product/optionOfProduct', {
  productId
})

/*
  商品价格
 */
export const getProductPrice = (productId) => fetch('/api/product/productPrice', {
  productId
})

/*
  收藏商品
 */
export const collectOrNot = (productId, token) => fetch('/api/userCollect/collectOrNot', {
  productId,
  token
})

/*
  商品搜索
 */
export const searchProduct = (name, token, page, pageSize) => fetch('/api/product/searchProduct', {
  name,
  token,
  page,
  pageSize
})

/*
  查看购物车
 */
export const getShopCart = (token) => fetch('/api/shoppingCart/shoppingCart', {
  token
})

/*
  加入购物车
 */
export const addShopCart = (token, productId, num, productOptionValueId) => fetch('/api/shoppingCart/addShoppingCart', {
  token,
  productId,
  num,
  productOptionValueId
})

/*
  编辑购物车（增加或者减少购物车内商品的数量）
 */
export const addOrMinus = (token, shoppingCartId, type) => fetch('/api/shoppingCart/addOrMinus', {
  token,
  shoppingCartId,
  type
})

/*
  编辑购物车（删除购物车内的商品）
 */
export const deleteShopCart = (token, shoppingCartIds) => fetch('/api/shoppingCart/delete', {
  token,
  shoppingCartIds
})

/*
  删除购物车内的无效商品
 */
export const cleanInvalidShoppingCart = (token) => fetch('/api/shoppingCart/cleanInvalidShoppingCart', {
  token
})

/*
  兑换码信息
 */
export const getRedeemCode = (code) => fetch('/api/redeemCode', {
  code
})

/*
  获取个人中心信息
 */
export const getMine = (token) => fetch('/api/user/findUserAndTradeStatusById', {
  token
})

/*
  个人中心主页
 */
export const getUserInfo = (token) => fetch('/api/information/userInfo', {
  token
}, 'POST')

/*
  个人中心 修改昵称
 */
export const updateNickname = (token, nickname) => fetch('/api/information/updateNickname', {
  token,
  nickname
}, 'POST')

/*
  个人中心 修改性别
 */
export const updateGender = (token, gender) => fetch('/api/information/updateGender', {
  token,
  gender
}, 'POST')

/*
 修改手机号码
 */
export const modifyPhone = (phone, password, salt, token) => fetch('/api/auth/modifyPhone', {
  phone,
  password,
  salt,
  token
}, 'POST')

/*
  上传用户头像
 */
export const uploadAvatar = (file) => fetch('/api/information/uploadAvatar', {
  file
}, 'POST')

/*
  更新用户头像
 */
export const updateAvatar = (avatar, token) => fetch('/api/information/UpdateAvatar', {
  avatar,
  token
})

/*
  关于我们
 */
export const getAboutUs = () => fetch('/api/article/aboutUS')

/*
  地址管理
 */
export const getAddressList = (token) => fetch('/api/user/addressList', {
  token
})

/*
  新建地址
 */
export const createAddress = (addressTableId, token, name, phone, provinceId, cityId, districtId, address, isDef) => fetch('/api/user/createAddress', {
  addressTableId,
  token,
  name,
  phone,
  provinceId,
  cityId,
  districtId,
  address,
  isDef
}, 'POST')

/*
  修改地址
 */
export const updateAddress = (addressTableId, token, name, phone, provinceId, cityId, districtId, address, isDef) => fetch('/api/user/updateAddress', {
  addressTableId,
  token,
  name,
  phone,
  provinceId,
  cityId,
  districtId,
  address,
  isDef
}, 'POST')

/*
  省市区ID地址查询
 */
export const getAreaList = () => fetch('/api/area/allArea')

/*
  获取收藏列表
 */
export const getCollectList = (token) => fetch('/api/userCollect/collectList', {
  token
})

/*
  清空失效收藏
 */
export const cleanInvalidCollect = (token) => fetch('/api/userCollect/cleanInvalidCollection', {
  token
})


/*
  接收授权code
 */
export const loginByWeChat = (code) => fetch('/api/auth/loginByWeChat', {
  code
}, 'POST')

/*
  确认订单
 */
export const createOrder = (redeemCode, shippingAddress, shippingName, shippingPhone, tradeProductList, wxCode, token) => fetch('/api/trade/create', {
  redeemCode,
  shippingAddress,
  shippingName,
  shippingPhone,
  tradeProductList,
  wxCode,
  token
})

/*
  获取全部订单列表
 */
export const getAllOrderList = (token) => fetch('/api/trade/list', {
  token
})

/*
 获取订单列表
 */
export const getOrderList = (token, status) => fetch('/api/trade/list', {
  token,
  status
})

/*
  获取订单详情
 */
export const getOrderDetail = (token, tradeId) => fetch('/api/trade/detail', {
  token,
  tradeId
})

/*
  确认收货
 */
export const confirmTrade = (token, tradeId) => fetch('/api/trade/confirm', {
  token,
  tradeId
})

/*
  取消订单
 */
export const cancelTrade = (token, tradeId) => fetch('/api/trade/cancel', {
  token,
  tradeId
})

/*
  继续兑换
 */
export const repay = (token, tradeId) => fetch('/api/trade/repay', {
  token,
  tradeId
}, 'POST')
