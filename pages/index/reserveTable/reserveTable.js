// pages/index/reserveTable/reserveTable.js
import {
  selectOrderBefore,
  orderBefore,
  aboutStore,
  updateOrderBefore
} from '../../../utils/api'
const app = getApp()
let shopid
let ORDER_BEFORE_ON = 1
let ORDER_BEFORE_ID = ''
let ORDER_BEFORE_TIME = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '仅当天',
    switch1Checked: false,
    ORDER_BEFORE_TIME: 0,
    isUpdete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'shopid',
      success(res) {
        console.log('缓存中的shop', res.data)
        shopid = res.data
        that.selectOrderBefore()

      }
    })
  },
  selectOrderBefore() {
    selectOrderBefore({
      SHOP_ID: shopid
    }).then(res => {
      console.log('预点餐信息', res)
      if (res.STATUS == 'SUCCESS') {
        this.setData({
          orderBefore: res.orderBefore,
        })
        ORDER_BEFORE_ID = res.orderBefore.ORDER_BEFORE_ID
        ORDER_BEFORE_ON = res.orderBefore.ORDER_BEFORE_ON
        ORDER_BEFORE_TIME = res.orderBefore.ORDER_BEFORE_TIME
        this.setData({
          switch1Checked: ORDER_BEFORE_ON == 1 ? true : false
        })
      } else {

      }
    })
  },
  // 提交保存
  orderBefore() {
    orderBefore({
      SHOP_ID: shopid,
      ORDER_BEFORE_ON, //1启用 0不启用
      ORDER_BEFORE_TIME: this.data.ORDER_BEFORE_TIME, //1提前一天 0当天
      NOTE: '',
    }).then(res => {
      console.log('提交保存', res)
      if (res.STATUS == "SUCCESS") {
        this.selectOrderBefore()
      } else {
        wx.showToast({
          title: res.INFO,
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  switch1Change() {
    this.setData({
      switch1Checked: !this.data.switch1Checked
    })
    ORDER_BEFORE_ON = this.data.switch1Checked ? 1 : 0
    if (ORDER_BEFORE_ID != '' && ORDER_BEFORE_ID != undefined) {
      this.updateOrderBefore()
    } else {
      this.orderBefore()
    }

  },
  toset() {
    wx.navigateTo({
      url: '../reserveTable/setReserve/setReserve?ORDER_BEFORE_TIME=' + ORDER_BEFORE_TIME,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 修改
  updateOrderBefore() {
    updateOrderBefore({
      SHOP_ID: shopid,
      ORDER_BEFORE_ID: ORDER_BEFORE_ID,
      ORDER_BEFORE_ON, //1启用 0不启用
      ORDER_BEFORE_TIME: this.data.ORDER_BEFORE_TIME, //1提前一天 0当天
      NOTE: '',
    }).then(res => {
      console.log('修改', res)
      if (res.STATUS == "SUCCESS") {
        wx.showToast({
          title: '设置成功',
          duration: 2000
        });
        this.selectOrderBefore()
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.isUpdete) {
      console.log('ORDER_BEFORE_TIME', this.data.ORDER_BEFORE_TIME)
      this.updateOrderBefore()
    }

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