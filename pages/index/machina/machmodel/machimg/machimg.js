// pages/index/machina/machmodel/machimg/machimg.js
import {
  imgUrl
} from '../../../../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    var name = ''
    if (options.idx == 0) {
      name = '后厨单'
    } else if (options.idx == 1) {
      name = '前台单'
    } else {
      name = '预点单'
    }
    wx.setNavigationBarTitle({
      title: name + '小票模板',
    })
    this.setData({
      idx: options.idx
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