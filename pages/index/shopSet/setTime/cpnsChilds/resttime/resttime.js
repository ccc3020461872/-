// pages/index/shopSet/setTime/cpnsChilds/resttime/resttime.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    open() {
      wx.showModal({
        title: '确认开始营业？',
        content: '确认后，门店将开始营业。 在营业时间内，顾客扫码后顾客正常 下单，门店接收新订单。',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
  }
})