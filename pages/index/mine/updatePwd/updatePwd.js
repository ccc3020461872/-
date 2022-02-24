// pages/updatePwd/updatePwd.js
import {
  updatePassword
} from "../../../../utils/api";
let userName;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userName = options.userName;
    console.log(options)
  },
  formSubmit(e) {
    const oldPwd = e.detail.value.oldPwd;
    const newPwd = e.detail.value.newPwd;
    const rightPwd = e.detail.value.rightPwd;
    if (oldPwd == '' || oldPwd == 'undefined') {
      wx.showToast({
        title: '旧密码为空',
        icon: 'none'
      })
      return false
    }
    if (newPwd == '' || newPwd == 'undefined') {
      wx.showToast({
        title: '新密码为空',
        icon: 'none'
      })
      return false
    }
    if (rightPwd == '' || rightPwd == 'undefined') {
      wx.showToast({
        title: '请确认新密码',
        icon: 'none'
      })
      return false
    }
    if (newPwd != rightPwd) {
      wx.showToast({
        title: '密码不一致',
        icon: 'none'
      })
      return false
    }
    if (newPwd.length < 6 || rightPwd.length < 6) {
      wx.showToast({
        title: '您的密码少于6位',
        icon: 'none'
      })
      return false
    }
    if (oldPwd == newPwd) {
      wx.showToast({
        title: '旧密码和新密码一致',
        icon: 'none'
      })
      return false
    }
    updatePassword({
      userName: userName,
      oldPassword: oldPwd,
      newPassword: newPwd
    }).then(data => {
      console.log(data, "修改密码")
      if (data.result == "success") {
        wx.showToast({
          title: '修改密码成功',
          success: function () {
            wx.navigateBack({
              delta: 2 //返回上一级页面
            })
          },
        })
      } else if (data.result == "error") {
        wx.showToast({
          title: data.data,
          icon: 'none'
        })
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