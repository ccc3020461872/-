// pages/index/stateMent/stateMent.js
import {
  currentData,
  morrDate
} from '../../../utils/util';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navlist: ['营业数据', '菜品销量', '营销效果', '营业指标同环比'],
    currentIndex: 0,
    sdate: currentData(),
    edate: morrDate(),
    startDate: currentData(),
    endDate: morrDate(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindDateChangeStart: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sdate: e.detail.value
    })
    
  },
  bindDateChangeEnd: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      edate: e.detail.value
    })
  },
  choose(e) {
    console.log(e)
    var idx=e.currentTarget.dataset.idx
    // 1.设置最新的index
    this.setData({
      currentIndex: idx
    })
    wx.setNavigationBarTitle({
      title: this.data.navlist[idx],
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