// 当改变店铺的信息之后,获取最新的店铺信息,并存入缓存中
import {aboutStore} from '../api'
export default () => {
 const SHOP_ID = wx.getStorageSync('shopid')
  aboutStore({
    SHOP_ID
  }).then(res => {
    console.log('店铺信息', res)
    if (res.SHOP) {
      wx.setStorage({
        key: 'shop',
        data: res.SHOP,
      })
    } 
  }).catch(err => console.log(err))
}