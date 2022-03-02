// pages/index/shopSet/setNumber/setNumber.js
import {
  setTableNumber,
  imgUrl
} from '../../../../utils/api';
let shopid = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:imgUrl,
    commnote: '直接返回后，此次操作将不会保存。',
    minNum: 1,
    maxNum: 100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    if (options.minNum != 'undefined' && options.minNum != undefined) {
      that.setData({
        minNum: options.minnum,
        maxNum: options.maxnum
      })
    }
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
  getmin(e) {
    this.setData({
      minNum: e.detail.value,
    })
  },
  getmax(e) {
    this.setData({
      maxNum: e.detail.value,
    })
  },
  tochoose(e) {
    this.setData({
      title: e.currentTarget.dataset.title
    })
  },
  toSubmit(e) {
    console.log(e.detail.value)
    let minNum = e.detail.value.minNum
    let maxNum = e.detail.value.maxNum
    if (minNum == '') {
      wx.showToast({
        title: '填写最小取餐号',
        icon: 'none',
        duration: 2000
      });
      return false
    }
    if (maxNum == '') {
      wx.showToast({
        title: '填写最大取餐号',
        icon: 'none',
        duration: 2000
      });
      return false
    }
    setTableNumber({
      PICK_UP_NUMBER_START: minNum,
      PICK_UP_NUMBER_END: maxNum,
      SHOP_ID: shopid
    }).then(res => {
      console.log('保存', res);
      if (res.STATUS == "SUCCESS") {
        wx.showToast({
          title: '设置成功',
          duration: 2000
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 2000)
      } else {
        wx.showToast({
          title: res.INFO,
          icon: 'none',
          duration: 2000
        });
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