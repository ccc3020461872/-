// pages/index/machina/machina.js
import {
  setOrderRemarks,
  getOrderRemarks
} from '../../../utils/api';
let shopid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typelist: ['芯烨', '飞鹅', '易联云'],
    goodlist: [{
        text: '芯烨-小票打票机',
        img: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/good.jpg',
        note: '支持全部型号4G/WIFI小 票打票机',
        type: 'XINYEYUN'
      },
      {
        text: '飞鹅-小票打票机',
        img: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/good.jpg',
        note: '支持全部型号4G/WIFI小 票打票机',
        type: 'FEIEYUN'
      },
      {
        text: '易联云-小票打票机',
        img: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/good.jpg',
        note: '支持全部型号4G/WIFI小 票打票机',
        type: 'YILIANYUN'
      },
    ],
    TabCur: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

  },

  tomodel() {
    wx.navigateTo({
      url: '../machina/machmodel/machmodel',
    })
  },
  toDetail() {
    wx.navigateTo({
      url: '../machina/machpage/machpage?typee=' + this.data.goodlist[this.data.TabCur].type,
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,

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