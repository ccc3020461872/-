// pages/index/shopSet/showShop/showShop.js
import {
  imgUrl
} from '../../../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    promotionGoodsList: [{
      GOODS_IMG: imgUrl+'shop/shop/good.png',
      GOODS_NAME: '商品名称',
      MONTHLY_SALES: 888,
      GOODS_PRICE: 18,
    }, {
      GOODS_IMG: imgUrl+'shop/shop/good.png',
      GOODS_NAME: '商品名称',
      MONTHLY_SALES: 888,
      GOODS_PRICE: 18,
    }, {
      GOODS_IMG: imgUrl+'shop/shop/good.png',
      GOODS_NAME: '商品名称',
      MONTHLY_SALES: 888,
      GOODS_PRICE: 18,
    }, {
      GOODS_IMG: imgUrl+'shop/shop/good.png',
      GOODS_NAME: '商品名称',
      MONTHLY_SALES: 888,
      GOODS_PRICE: 18,
    }, ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shop: JSON.parse(options.shop)
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