// pages/goods/addGoods/photes/photes.js
import toPage from '../../.././../utils/common/toPage'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     color: null,
  },
  toOtherPage(e){
    const {currentTarget: {dataset: {url,img}}} = e
    const data = {
      data: img,
    }
    console.log(e);
    toPage(url,data)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const {globalData: {color}} = app;
    this.setData({
      color
    })
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