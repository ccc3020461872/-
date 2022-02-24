// pages/goods/classify/manage/manage.js
import toPage from '../../../utils/common/toPage'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     color: null,
     selectedClass: null,
     currentType: 'order'
  },
  toOtherPage(e){
    const {currentTarget: {dataset: {url}}} = e
    toPage(url)
  },
  // 点击选择的收费类型
  typeChoose(e){
    const {currentTarget: {dataset: {type}}} = e;
    console.log(`当前选择的是${type}`);  
    this.setData({
      currentType: type
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
    const selectedClass =  `background: ${color}; color: #fff`
    this.setData({
      color,
      selectedClass
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