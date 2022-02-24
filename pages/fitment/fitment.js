// pages/goods/classify/add/add.js
import toPage from '../../utils/common/toPage'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    colorList: ['#15748c','#124654','#11659a','#1e5051'], //装修风格
    currentColor: '#15748c',
    swiperPopShow: false,
    popType: null,
  },
  toOtherPage(e){
    const {currentTarget: {dataset: {url}}} = e
    toPage(url)
  },
  // 颜色选择
  colorItemTap(e){
    const {currentTarget: {dataset: {color}}} = e;
    console.log(color);
    this.setData({
      currentColor: color
    })
  },
  showPop(e){
    const {currentTarget: {dataset: {type: popType}}} = e
    this.setData({
      swiperPopShow: true,
      popType,
    })
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