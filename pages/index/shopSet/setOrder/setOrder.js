// pages/index/shopSet/oneNotice/oneNotice.js
import {
  setOrderRemarks,
  getOrderRemarks
} from '../../../../utils/api';
let shopid
let arr = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isShow: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'shopid',
      success: function (res) {
        console.log('缓存shopid', res.data)
        shopid = res.data
        that.getData()
      },
      fail: function (err) {
        console.log('fail', err)
      }
    })
  },
  toAdd() {
    this.setData({
      list: this.data.list.concat(''),
      isShow: false
    })
  },
  getInput(e) {
    console.log('失去焦点', e.detail.value)
    let idx = e.currentTarget.id
    this.data.list[idx] = e.detail.value
    this.setData({
      list: this.data.list
    })
    this.isEmpty(this.data.list)
  },
  isEmpty(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == '' || arr[i] == undefined) {
        this.setData({
          isShow: false
        })
        console.log(this.data.isShow)
        return
      } else {
        this.setData({
          isShow: true
        })
      }
    }
  },
  getData() {
    getOrderRemarks({
      SHOP_ID: shopid
    }).then(res => {
      console.log('备注列表', res);
      if (res.STATUS == "SUCCESS") {
        // console.log(typeof(res.ORDER_REMARKS.replace(/^\"|\"$/g,'')),JSON.parse(res.ORDER_REMARKS) )
        this.setData({
          list: JSON.parse(res.ORDER_REMARKS)
        })
      } else {
        wx.showToast({
          title: res.INFO,
          icon: 'none',
          duration: 2000
        });
      }

    })
  },
  tochoose(e) {
    this.setData({
      title: e.currentTarget.dataset.title
    })
  },
  toSubmit() {
    if (this.data.title == '') {
      wx.showToast({
        title: '填写或选择订单备注',
        icon: 'none',
        duration: 2000
      });
      return false
    }
    setOrderRemarks({
      ORDER_REMARKS: this.data.list,
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
  toDelete(e) {
    var idx = e.currentTarget.id
    this.data.list.splice(idx, 1);
    this.setData({
      list: this.data.list
    })
    console.log(this.data.list);
    this.isEmpty(this.data.list)
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