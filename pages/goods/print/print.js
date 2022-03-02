// pages/goods/classify/sort/sort.js
import toPage from '../../../utils/common/toPage'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    choose: false,
    currentIndex: null,
    list:['前台','后厨',],
  },
  doChoose(e){
    console.log(e);
    let {currentTarget: {dataset: {index}}} = e;
    // 判断点击的是不是同一个item
    if(index===this.data.currentIndex){
      console.log('相同');
      this.setData({
        choose: !this.data.choose,
      })
    }else{
      console.log('不同');
      this.setData({
        choose: true,
        currentIndex: index,
      })
    }
  },
  
  toOtherPage({currentTarget: {dataset: {url}}}){
    if(this.data.currentIndex === null) {
      wx.showToast({
        title: '未选择打印档口',
        icon: 'none',
      })
      return
    }
    toPage(url)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {print = ''} = options;
    if(print){
      console.log(print);
      const {list} = this.data;
      const currentIndex = list.findIndex(v => v === print);
      this.setData({
        currentIndex,
        choose: true
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
  onShow: function () {
    try{
      const { list } = this.data
      const print =  wx.getStorageSync('print')
      if(print){
       const currentIndex = list.indexOf(print)
       this.setData({
        currentIndex,
        choose: true
       })
      }
     }catch(e){
       console.log('未设置打印档口');
     }
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
    console.log(this.data.currentIndex);
    const {
      list,
      currentIndex
    } = this.data
    const info = currentIndex !== null && list[currentIndex]
    if(info){
      console.log(info);
      wx.setStorageSync('print', info)
    }
    // 储存选择的那个
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