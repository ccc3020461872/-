// pages/index/machina/cpnsChilds/machmask/machmask.js
import {
  setPrinter,
} from '../../../../../utils/api';
let shopid
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isHidd: {
      type: Boolean,
      value: true
    },
    P_TYPE: {
      type: Number,
      value: ''
    },
    P_SN: {
      type: String,
      value: ''
    },
    P_NOTE: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    lilist: [58, 80],
    lilist1: ['前台', '后厨'],
    chooseTab1: 0,
    chooseTab: 0,
  },

  lifetimes: {
    created() {
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
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cancel() {
      this.triggerEvent('cancel')
    },
    chooseWidth(e) {
      this.setData({
        chooseTab: e.currentTarget.id
      })
    },
    choose1(e) {
      this.setData({
        chooseTab1: e.currentTarget.id
      })
    },
    confirm() {
      setPrinter({
        SHOP_ID: shopid,
        P_SN: this.data.P_SN,
        P_TYPE: this.data.P_TYPE,
        P_FACTORY: this.data.chooseTab1 + 1,
        P_WIDTH: this.data.chooseTab + 1,
        P_NOTE: this.data.P_NOTE,
      }).then(res => {
        console.log('保存', res);
        if (res.STATUS == "SUCCESS") {
          wx.showToast({
            title: '设置成功',
            duration: 2000
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 2,
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
  }
})