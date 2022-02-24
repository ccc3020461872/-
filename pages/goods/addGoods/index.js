// pages/goods/addGoods/index.js
import toPage from '../../../utils/common/toPage'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    selected: null, //左边商品大类文字选中样式
    className: ['酸汤面','油泼辣子面'],
    currentIndex: 0,
  },
  toOtherPage(e){
    const {currentTarget: {dataset: {url}}} = e
    toPage(url)
  },
  // 点击左边的大类
  chooseClass(e){
    const {currentTarget: {dataset: {index}}} = e;
    console.log(index);
    this.setData({
      currentIndex: index
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
    const {globalData: {color,}} = app;
    const selected = `color: ${color}`
    this.setData({
      color,
      selected
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