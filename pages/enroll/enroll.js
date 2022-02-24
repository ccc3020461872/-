// pages/goods/classify/add/add.js
import toPage from '../../utils/common/toPage'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    infoList:[{
      img: '/images/test.png',
      title: '门店照片',
      tips: '带有完整牌匾的门头照片和真实店内环境的招聘', 
    },
    {
      img: '/images/test.png',
      title: '门店照片',
      tips: '带有完整牌匾的门头照片和真实店内环境的招聘', 
    },
    {
      img: '/images/test.png',
      title: '门店照片',
      tips: '带有完整牌匾的门头照片和真实店内环境的招聘', 
    },
    {
      img: '/images/test.png',
      title: '门店照片',
      tips: '带有完整牌匾的门头照片和真实店内环境的招聘', 
    },]
  },
  toOtherPage(e){
    const {currentTarget: {dataset: {url}}} = e
    toPage(url)
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