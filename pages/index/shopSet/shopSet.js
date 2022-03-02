// index.js
import {
  aboutStore,
  imgUrl
} from '../../../utils/api'
const app = getApp()
let shopid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setList: [{
        title: '门店公告',
        img: imgUrl + 'shop/shop/s1.png',
        url: "../shopSet/oneNotice/oneNotice"
      },
      {
        title: '推荐商品',
        img: imgUrl + 'shop/shop/s2.png',
        url: '../shopSet/setProduct/setProduct'
      },
      {
        title: '订单备注',
        img: imgUrl + 'shop/shop/s3.png',
        url: '../shopSet/setOrder/setOrder'
      },
      {
        title: '取餐号',
        img: imgUrl + 'shop/shop/s4.png',
        url: '../shopSet/setNumber/setNumber'
      },
      // {
      //   title: '打烊时间',
      //   img:  imgUrl+'shop/shop/s5.png',
      //   url: '../shopSet/setTime/setTime'
      // }
    ]
  },
  toPage(e) {
    var idx = e.currentTarget.dataset.idx
    if (idx == 0) {
      console.log('---------------------', this.data.title)
      wx.navigateTo({
        url: `../shopSet/oneNotice/oneNotice?title=${this.data.title}`
      })
    } else if (idx == 1) {
      wx.navigateTo({
        url: `../shopSet/setProduct/setProduct?PREFERENTIAL_ACTIVITIES=${this.data.shop.PREFERENTIAL_ACTIVITIES	}`
      })
    } else if (idx == 3) {
      console.log('---------------------', this.data.title)
      wx.navigateTo({
        url: `../shopSet/setNumber/setNumber?minnum=${this.data.shop.PICK_UP_NUMBER_START}&maxnum=${this.data.shop.PICK_UP_NUMBER_END}`
      })
    } else {
      wx.navigateTo({
        url: this.data.setList[idx].url,
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getShop() {
    aboutStore({
      SHOP_ID: shopid
    }).then(res => {
      console.log('店铺信息', res)
      if (res.result == 'success') {
        let shop = res.SHOP
        this.setData({
          shop: shop,
          title: shop.TITLE
        })
        console.log('---===----', this.data.title)
        wx.setStorage({
          key: 'shop',
          data: shop
        })
      } else {

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'shopid',
      success(res) {
        console.log('缓存中的shop', res.data)
        shopid = res.data
        that.getShop()

      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})