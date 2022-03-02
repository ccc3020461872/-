// pages/index/about/about.js
import {
  linkMe,
} from '../../../utils/api'
let shopid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videolist: ['', '']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLink()
  },
  showImg(e) {

  },
  call(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id,
    })
  },
  getLink() {
    linkMe().then(res => {
      console.log('联系我们', res)
      if (res.result == 'success') {
        this.setData({
          shop: res
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