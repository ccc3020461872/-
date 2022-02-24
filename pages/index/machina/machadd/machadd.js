// pages/index/machina/machadd/machadd.js
import {
  setPrinter,
} from '../../../../utils/api';
let shopid
let typee
let P_TYPE
let P_NOTE
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lilist: [58, 80],
    lilist1: ['前台', '后厨'],
    chooseTab: 0,
    chooseTab1: 0,
    isHidd: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    typee = options.typee
    P_TYPE = typee == 'XINYEYUN' ? 1 : (typee == 'FEIEYUN' ? 2 : 3)
    console.log('1.芯烨2.飞蛾3.易联云', P_TYPE)
    wx.getStorage({
      key: 'shopid',
      success: function (res) {
        console.log('缓存shopid', res.data)
        shopid = res.data
      },
      fail: function (err) {
        console.log('fail', err)
      }
    })
  },
  cancel() {
    this.setData({
      isHidd: true
    })
  },
  formSubmit(e) {
    console.log(e.detail.value)
    let P_SN = e.detail.value.name
    let P_NOTE = e.detail.value.passw
    if (P_SN == '') {
      wx.showToast({
        title: '填写编号',
        icon: 'none',
        duration: 2000
      });
      return false
    }
    if (P_NOTE == '') {
      wx.showToast({
        title: '填写密钥',
        icon: 'none',
        duration: 2000
      });
      return false
    }
    this.setData({
      P_SN: P_SN,
      P_NOTE: P_NOTE,
      P_TYPE: P_TYPE,
      isHidd: false
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