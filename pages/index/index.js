// pages/boss/bossGuide/bossGuide.js
import {
  aboutStore,
} from '../../utils/api'
let shopid
Page({
  /**
   * 页面的初始数据
   */
  data: {
    guide: [{
      img: '/img/index/s4.png',
      choiceimg: '/img/index/n4.png',
      name: '首页'
    }, {
      img: '/img/index/s1.png',
      choiceimg: '/img/index/n1.png',
      name: '店铺装修'
    }, {
      img: '/img/index/s2.png',
      choiceimg: '/img/index/n2.png',
      name: '订单'
    }, {
      img: '/img/index/s3.png',
      choiceimg: '/img/index/n3.png',
      name: '我的'
    }],
    currentIndex: 0,
    formcolor: true,
    titleType: true,
    refreshState: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setStorage({
      key: 'shopid',
      data: '300000027'
    })
    wx.getStorage({
      key: 'shopid',
      success(res) {
        console.log('缓存中的shopid', res.data)
        shopid = res.data
        that.getShop()

      }
    })
  },

  getShop() {
    aboutStore({
      SHOP_ID: shopid
    }).then(res => {
      console.log('店铺信息', res)
      if (res.state == 'success') {
        let shop = res.SHOP
        this.setData({
          shop: shop
        })
        wx.setStorage({
          key: 'shop',
          data: shop
        })
      } else {

      }
    })
  },
  guide(e) {
    console.log(e)
    const _this = this;
    const currentIndex = e.currentTarget.dataset.index;
    const currentName = e.currentTarget.dataset.name;
    _this.setData({
      currentIndex: currentIndex,
      currentName: currentName
    })
  },
  tabarHeight(e) {
    const _this = this;
    // console.log(e, "tabarHeight")
    _this.setData({
      statusBarHeight: e.detail.statusBarHeight,
      statusTop: e.detail.statusTop,
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