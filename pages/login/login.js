// pages/boss/bossIndex/bossIndex.js
import {
  checkCode,
  sendMassage,
  bossLogin,
} from '../../utils/api';
const app = getApp();
let openid
let telNum = ''
let ccode
let password = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    pwd: '',
    nav: ['账号登录', '手机号登录'],
    currentIndex: 0,
    btnvalue: "获取验证码",
    telNumder: '', //存手机号
    isSelect: true,
    formcolor: true,
    titleType: true,
    currentName:'登录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, "options")
    const that = this;
    that.setData({
      way: options.way //1老板 2 服务员
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        openid = res.data;

      }
    })

    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          account: res.data
        })
        console.log(that.data.account)
      }
    })

  },
  //手机号输入框事件
  telInput: function (e) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    telNum = e.detail.value;
    // console.log(telNum, "telNum")
    if (telNum.length > 0) {
      this.setData({
        telNumder: telNum
      })
    } else if (telNum == '') {
      this.setData({})
    };
  },

  // // 发送验证码
  code: function (e) {
    var that = this;
    that.setData({
      dsb: true
    })
    console.log('发送验证码')
    that.createCode()

  },
  createCode() {
    var that = this
    var myreg = /^1[3456789]\d{9}$/;
    if (myreg.test(telNum)) {
      sendMassage({
        phone: telNum,
        key: 'e295424edf854dac8329dee5a6b7f016'
      }).then(res => {
        console.log('发送验证码返回', res);
        time(that);
        wx.showToast({
          title: '验证码发送中',
          icon: 'success',
          duration: 2000
        });
        if (res.STATUS == "SUCCESS") {
          ccode = res.codeMSg
          that.setData({
            dsb: true
          })
        } else {
          that.setData({
            dsb: false
          })

        }
      })

    } else {
      that.setData({
        dsb: false
      })
      wx.showToast({
        title: '请检查手机号后再试',
        icon: 'none',
      });
    }
  },
  selectAll() {
    this.setData({
      isSelect: !this.data.isSelect
    })

  },
  choose(e) {
    console.log(e)
    // 1.设置最新的index
    this.setData({
      currentIndex: e.currentTarget.dataset.idx
    })
  },
  back() {
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  },
  formSubmit(e) {
    const that = this;
    console.log(e.detail.value)
    if (that.data.currentIndex == 0) {
      const userName = e.detail.value.account;
      password = e.detail.value.pwd;
      if (userName == '' || userName == 'undefined') {
        wx.showToast({
          title: '账户为空',
          icon: 'none'
        })
        return false
      }
      if (password == '' || password == 'undefined') {
        wx.showToast({
          title: '密码为空',
          icon: 'none'
        })
        return false
      }
      that.reqbossLogin(userName, password)
    } else {
      var phone = e.detail.value.phone
      var code = e.detail.value.code;
      var reg = /^1[3456789]\d{9}$/
      if (!reg.test(phone)) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none'
        })
        return false;
      } else if (code == '') {
        wx.showToast({
          title: '验证码为空',
          icon: 'none'
        })
        return false
      } else if (code != ccode) {
        wx.showToast({
          title: '验证码不正确',
          icon: 'none'
        })
        return false
      } else {
        that.setData({
          disform: true
        })
        checkCode({
          phone: telNum,
          code: ccode
        }).then(res => {
          console.log('登录', res);
          if (res.STATUS == "SUCCESS") {
            wx.setStorage({
              key: 'shopid',
              data: res.user.SHOP_ID
            })
            wx.navigateTo({
              url: '/pages/index/index',
            })
          } else {
            wx.showToast({
              title: res.INFO,
              icon: 'none',
              duration: 2000
            });
          }

        })
      }
    }

  },

  // 登录
  async reqbossLogin(userName, password) {
    const data = await bossLogin({
      userName: userName,
      password: password,
    });
    console.log(data, "登录")
    if (data.result == "success") {
      wx.setStorage({
        key: 'shopid',
        data: data.bossUser.SHOP_ID
      })
      if (this.data.isSelect) {
        wx.setStorage({
          key: 'password',
          data: password
        })
      } else {
        wx.setStorage({
          key: 'password',
          data: ''
        })
      }

      wx.showToast({
        title: '登录成功',
        success: function () {
          wx.navigateTo({
            url: '/pages/index/index',
          })
        },
      })
    } else if (data.result == "error") {
      wx.showToast({
        title: data.data,
        icon: 'none'
      })
    }
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
    this.setData({
      account: '',
      pwd: ''
    })
    var that = this
    wx.getStorage({
      key: 'password',
      success: function (res) {
        that.setData({
          password: res.data
        })
        console.log(that.data.pwd)
      }
    })
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

var wait = 60; //重置时间
function time(that) {
  if (wait == 0) {
    that.setData({
      dsb: false, //可以点击
      dsbtel: false,
    })
    that.setData({
      btnvalue: '获取验证码'
    })
    wait = 60;
  } else {
    that.setData({
      dsb: true,
      getCodeFt: "#ffffff",
      btnvalue: '' + wait + '秒后重试',
      dsbtel: true,
    })
    wait--;
    setTimeout(function () {
      time(that)
    }, 1000)
  }
}