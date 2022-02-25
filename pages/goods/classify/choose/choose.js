// pages/goods/classify/sort/sort.js
import { toPage } from '../../../../utils/common/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    choose: false,
    currentIndex: null,
    list: null, //分类列表
    selected: null //选择的分类
  },
  doChoose(e){
    console.log(e);
    let {currentTarget: {dataset: {index,item:selected}}} = e;
    // 判断点击的是不是同一个item
    if(index===this.data.currentIndex){
      console.log('相同');
      this.setData({
        choose: !this.data.choose,
        selected: null,
      })
    }else{
      console.log('不同');
      this.setData({
        choose: true,
        currentIndex: index,
        selected,
      })
    }
  },
  // 保存
  save(){
    const { choose,selected } = this.data
    let title
    if(choose){
      console.log(this.data.selected);
      title = '保存成功'
      wx.setStorageSync('classify', selected)
    }else {
     title = '请选择分类'
    }
    wx.showToast({
      title,
      icon: 'none',
      success: (res) => {
        if(title === '保存成功'){
          toPage()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const list = JSON.parse(options.list);
    const classify = JSON.parse(options?.classify) || '';
    console.log('分类列表',list);
    if(classify){
      console.log('当前选择的',classify);
     const currentIndex = list.findIndex((v) => {
        return v.GOODS_CATEGORY_ID === classify.GOODS_CATEGORY_ID 
      })
      this.setData({
        currentIndex,
        selected: classify,
        choose: true
      })
    }
    this.setData({
      list
    })
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