// pages/index/reserveTable/setReserve/setReserve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commnote: '直接返回后，此次操作将不会保存。',
    list: [{
        text: '仅当天',
        note: '顾客在当天的营业时间内，可以 提前点餐。'
      },
      {
        text: '可提前一天',
        note: '顾客既可以提前1天，也可以在当 天点餐。'
      }
    ],
    currTab: 0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.ORDER_BEFORE_TIME != undefined) {
      this.setData({
        currTab: options.ORDER_BEFORE_TIME
      })
    }
  },

  tochoose(e) {
    this.setData({
      currTab: e.currentTarget.id
    })

  },
  tomodel() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      ORDER_BEFORE_TIME: this.data.currTab,
      isUpdete: true
    })
    wx.navigateBack({
      delta: 1,
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