// pages/index/machina/machpage/machpage.js
import {
  getOneConfig,
} from '../../../../utils/api';
let shopid
let typee
let P_TYPE
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNum: 1,
    isHidd: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    typee = options.typee
    P_TYPE = typee == 'XINYEYUN' ? 1 : (typee == 'FEIEYUN' ? 2 : 3)
    console.log('1.芯烨2.飞蛾3.易联云', P_TYPE)
    that.getData()
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
  toNext() {
    this.setData({
      isNum: this.data.isNum + 1
    })
  },
  confirm() {
    wx.navigateTo({
      url: '../machadd/machadd?typee=' + typee,
    })
  },
  // 扫描机器二维码
  toScan() {
    var that = this
    // 只允许从相机扫码 
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log('扫描返回', res)
        that.setData({
          P_SN: res.result,
          P_TYPE:P_TYPE,
          isHidd: false
        })
      },
      fail(err) {
        console.log('扫描失败', err)
      },
    })
  },
  // 打票机视频
  getData() {
    getOneConfig({
      code: typee
    }).then(res => {
      console.log('打票机视频', res);
      if (res.STATUS == "SUCCESS") {
        this.setData({
          video: res.configList
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

  conTap(e) {
    this.setData({
      checked: !this.data.checked
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