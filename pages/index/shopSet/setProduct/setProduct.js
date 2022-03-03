// pages/index/shopSet/setProduct/setProduct.js
import {
  imgUrl,
  setMyGoods,
  getHotGoods,
  setHot,
  goodsList
} from '../../../../utils/api'
import {
  toPage,
  getShopId,
} from '../../../../utils/common/index'
let PREFERENTIAL_ACTIVITIES, shopid, TYPE = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1Checked: false,
    imgUrl: imgUrl,
    hiddState: true,
    disabled: false,
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.PREFERENTIAL_ACTIVITIES != undefined) {
      that.setData({
        switch1Checked: options.PREFERENTIAL_ACTIVITIES == '1' ? true : false
      })
    }
    wx.getStorage({
      key: 'shopid',
      success(res) {
        console.log('缓存中的shop', res.data)
        shopid = res.data
        that.getHotGoods()
      }
    })
  },
  // 移除热销产品
  toDel(e) {
    var that = this
    TYPE = 0
    wx.showModal({
      title: '提示',
      content: '确认移除？移除后将不再热销推荐中展示此产品',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          const { currentTarget: {dataset: {id}} } = e
          that.setHot(id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 添加推荐商品
  setHotgood() {
    TYPE = 1
    const url = '/pages/goods/addGoods/index';
    const { dataList } = this.data;
    const list = []
    dataList.forEach(v => {
      list.push(v.GOODS_ID)
    })
    toPage(url,{from: 'setProduct',list:JSON.stringify(list)})
    this.setHot()
  },
  // 设置产品
  async setHot(id) {
    const SHOP_ID = await getShopId() 
    setHot({
      GOODS_ID: id,
      TYPE: 0,
      SHOP_ID,
    }).then(res => {
      console.log('移除', res)
      this.getHotGoods()
    })
  },
  showState(e) {
    this.setData({
      hiddState: false,
      idx: e.currentTarget.id
    })
  },
  quxiao() {
    this.setData({
      hiddState: true
    })
  },
  switch1Change() {
    this.setData({
      switch1Checked: true
    })
    PREFERENTIAL_ACTIVITIES = 1
    this.setMyGoodss()
  },
  setMyGoods() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '关闭后，将无法为老顾客推荐他点过的商品',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.setData({
            switch1Checked: false
          })
          PREFERENTIAL_ACTIVITIES = 2
          that.setMyGoodss()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },
  setMyGoodss() {
    setMyGoods({
      SHOP_ID: shopid,
      PREFERENTIAL_ACTIVITIES: PREFERENTIAL_ACTIVITIES
    }).then(res => {
      console.log('设置常点商品展示', res)

    })
  },
  getHotGoods() {
    getHotGoods({
      GOODS_ID: shopid,
    }).then(res => {
      console.log('热销产品', res)
      this.setData({
        dataList: res.hotGoods
      })
    })
    // goodsList({
    //   SHOP_ID: shopid,
    // }).then(res => {
    //   console.log('产品', res)
    //   this.setData({
    //     dataList:res.hotGoods
    //   })
    // })

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
    this.getHotGoods()
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