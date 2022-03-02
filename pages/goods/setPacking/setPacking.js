// pages/goods/classify/manage/manage.js
import {toPage, getShopId} from '../../../utils/common/index'
import {
  amountOfPackaging //打包费设置
} from '../../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     color: null,
     selectedClass: null,
     currentType: 'order',
     price: null,
  },
  toOtherPage(e){
    const {currentTarget: {dataset: {url}}} = e
    toPage(url)
  },
  // 输入金额
  inputPrice(e){
    const {detail: {value: price}} = e;
    this.setData({
      price,
    }) 
  },
  // 点击选择的收费类型
  typeChoose(e){
    const {currentTarget: {dataset: {type}}} = e;
    console.log(`当前选择的是${type}`);  
    this.setData({
      currentType: type
    })
  },
  async save(){
    const SHOP_ID = await getShopId();
    const { currentType, price: PACKING_CHARGE = ''} = this.data;
    const PACKTYPE = currentType === 'order' ? 1 : 0;
    if(PACKTYPE === 1){
      if(!PACKING_CHARGE || PACKING_CHARGE-0 <= 0){
        wx.showToast({
          title: '请输入打包费用',
          icon: 'none'
        })
        return
      }
    }
    const content = PACKTYPE === 1 ? '是否按订单收费' : '是否按商品收费'
    wx.showModal({
      content,
      success: async res => {
        if(res.confirm){
         await amountOfPackaging({
            SHOP_ID,
            PACKING_CHARGE,
            PACKTYPE,
          })
         toPage()
        }
      }
    })
    
   
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const {globalData: {color}} = app;
    const selectedClass =  `background: ${color}; color: #fff`
    this.setData({
      color,
      selectedClass
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