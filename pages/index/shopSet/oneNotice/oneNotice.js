// pages/index/shopSet/oneNotice/oneNotice.js
import {
  setShopNotice
} from '../../../../utils/api';
const app = getApp()
let shopid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commnote: '直接返回后，刚对门店公告的修改将不会保存。',
    list: [{
        text: '亲爱的顾客下单完成后，请注意取单号。',
      },
      {
        text: '请您下单后到出餐口取餐，谢谢合作！',
      }, {
        text: '面条免费添加，请不要浪费！',
      }, {
        text: '新鲜食材，当天售卖！',
      }, {
        text: '饮料为定制产品，出餐后概不退换，敬请谅解',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    if (options.title != undefined && options.title != 'undefined') {
      this.setData({
        title: options.title
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


  getTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  tochoose(e) {
    this.setData({
      title: e.currentTarget.dataset.title
    })
  },
  toSubmit(e) {
    console.log(e.detail.value)
    let title = e.detail.value.title
    if (title == '') {
      wx.showToast({
        title: '填写或选择门店公告',
        icon: 'none',
        duration: 2000
      });
      return false
    }
    setShopNotice({
      TITLE: title,
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
    const {
      globalData: {
        color
      }
    } = app;
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