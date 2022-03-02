// pages/mine/web-view/web-view.js
import {
  appId,
  feedback,
  uploadFileCOS
} from '../../../../utils/api'
let shopid

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    disabled: false,
    imgList1: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.getStorage({
      key: 'shopid',
      success: function (res) {
        shopid = res.data
      }
    })
  },
  del(e) {
    var idx = e.currentTarget.id
    this.data.imgList.splice(idx, 1)
    this.data.imgList1.splice(idx, 1)
    console.log('删除图片')
    this.setData({
      imgList: this.data.imgList,
      imgList1: this.data.imgList1
    })
  },


  formSubmit: function (e) {
    var that = this
    let phone = e.detail.value.phone
    let note = e.detail.value.note
    if (note == '') {
      wx.showToast({
        title: '请输入描述',
        icon: 'none'
      })
      return false;
    }
    if (phone == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return false;
    }
    this.setData({
      disabled: true
    })
    if (that.data.imgList1.length == 0) {
      that.data.imgList1 = ''
    }
    console.log(e.detail.value, that.data.imgList1)
    feedback({
      USER_ID: shopid,
      PHONE: phone,
      IMG: that.data.imgList1, //图片组
    }).then(res => {
      console.log('发布结果', res)
      if (res.STATUS == 'SUCCESS') {
        wx.showModal({
          title: '提交成功！',
          cancelText: '确认',
          confirmText: '返回',
          showCancel: 'false',
          success(res) {
            if (res.cancel) {
              wx.navigateBack({
                delta: 1,
              })
            } else if (res.confirm) {
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        });
        that.setData({
          disabled: false
        })
      }
    })

  },
  //上传图片
  uploadImage() {
    var that = this
    wx.chooseImage({
      count: 3,
      camera: 'back',
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 多张照片上传
        var tempFilePath = res.tempFilePaths[0]
        that.setData({
          imgList: that.data.imgList.concat(res.tempFilePaths)
        })
        console.log('imgList', that.data.imgList)
        uploadFileCOS(tempFilePath)
          .then(data => {
              console.log('服务器地址', typeof (data), data),
                that.data.imgList1.push(data),
                that.setData({
                  imgList1: that.data.imgList1
                }),
                console.log('imgList1', that.data.imgList1)
            }


          )



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