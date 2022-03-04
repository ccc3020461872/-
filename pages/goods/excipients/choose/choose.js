// pages/goods/classify/add/add.js
import {toPage, getShopId} from '../../../../utils/common/index'
import { accessoriesList } from '../../../../utils/api'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    list: null,
    allChoose: false,
    isForms: false, 
  },
  toOtherPage(e){
    const {currentTarget: {dataset: {url}}} = e
    toPage(url)
  },
  choose({currentTarget: {dataset: {index}}}){
    const { list } = this.data
    // 如果没有index,是全选
    if(index === undefined){
      this.setData({
        allChoose: !this.data.allChoose
      })
      list.forEach(v => {
        v.select = this.data.allChoose
      })
     
    }else {
      list[index].select = !list[index].select
      const noChoose = list.find(v => v.select === false);
      if(!noChoose){
        this.setData({
          allChoose: true
        })
      }else {
        this.setData({
          allChoose: false
        })
      }
    }
    this.setData({
      list
    })
  },
  // 辅料列表查询
  async queryList(){
    const SHOP_ID = await getShopId()
    const {accessories = null} = await accessoriesList({
      SHOP_ID
    });
    accessories && accessories.map(v => v.select = false)
    this.setData({list: accessories});
  },
  // 保存
  commit(){
    const { list } = this.data;
    const selectArr = list.filter(v => {
      return v.select
    });
    if(selectArr.length === 0){
      wx.showToast({
        title: '未选择辅料',
        icon: 'none'
      })
      return
    }
    if(!this.data.isForms){
      toPage()
    }else {
      wx.redirectTo({
        url: '/pages/goods/addGoods/forms/forms',
      })
    }
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     const {from = null} = options;
     if(from){
      this.setData({
        isForms: true
      })
     }
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const {globalData: {color}} = app;
    this.setData({
      color
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
   const selectArr = wx.getStorageSync('accessories');
   console.log(selectArr);
   await this.queryList()
   const { list } = this.data;
   if(selectArr){
     list.map((v) => {
      selectArr.forEach(v2 =>{
        if(v2.ACCESSORIES_ID + '' === v.ACCESSORIES_ID + ''){
          v.select = true
        }
      })
    })
   }
   this.setData({
    list
   })
   const noChoose = this.data.list.find(v => v.select === false)
   const allChoose = noChoose ? false : true
   this.setData({
    allChoose
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
    const { list } = this.data;
    const selectArr = list&&list.filter(v =>  v.select);
    console.log(selectArr);
    if(selectArr&&selectArr.length !== 0){
      wx.setStorageSync('accessories', selectArr)
    }
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