// index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setList: [{
        title: '门店公告',
        img: '/img/s1.png',
        url: "../shopSet/oneNotice/oneNotice"
      },
      {
        title: '推荐商品',
        img: '/img/s2.png',
        url: '../shopSet/setProduct/setProduct'
      },
      {
        title: '订单备注',
        img: '/img/s3.png',
        url: '../shopSet/setOrder/setOrder'
      },
      {
        title: '取餐号',
        img: '/img/s4.png',
        url: '../shopSet/setNumber/setNumber'

      },
      {
        title: '打烊时间',
        img: '/img/s4.png',
        url: '../shopSet/setTime/setTime'

      }
    ]
  },
  toPage(e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
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