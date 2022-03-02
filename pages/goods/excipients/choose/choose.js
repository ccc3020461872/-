// pages/goods/classify/add/add.js
import toPage from '../../../../utils/common/toPage'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    list: null,
    allChoose: false,
  },
  toOtherPage(e){
    const {currentTarget: {dataset: {url}}} = e
    toPage(url)
  },
  choose({currentTarget: {dataset: {index, type}}}){
    const { list } = this.data
    // 如果没有index,是全选
    if(index === undefined){
      list.forEach(v => {
        v.select = type
      })
      this.setData({
        allChoose: !this.data.allChoose
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
    toPage()
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { list,access } = this.options
    access = JSON.parse(access)
    console.log(access);
    list = JSON.parse(list)
    list.map(v => {
      v.select = false
    })
    function filterIndex(sourceArr,target){
      const newArr = sourceArr.filter(v =>{
        const item = target.find((v2) => {
          return v2.id === v.ACCESSORIES_ID
        });
        return v.ACCESSORIES_ID === item?.id 
      })
      const indexArr = [];
      newArr.forEach(v => {
        let index = sourceArr.findIndex(v1 => v1.ACCESSORIES_ID + '' === v.ACCESSORIES_ID + '');
        index !== -1&&indexArr.push(index)
      })
      indexArr.forEach(v => {
        sourceArr[v].select = true
      });
      return sourceArr
    }
    if(access) {
     const newArr =  filterIndex(list ,access);
     console.log(newArr);
    }
    this.setData({
      list: list
    })
    console.log(this.data.list);
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
   const selectArr = wx.getStorageSync('accessories');
   console.log(selectArr);
   const { list } = this.data;
   selectArr&&list.map((v,i,a) => {
     selectArr.forEach(v2 =>{
       if(v2.ACCESSORIES_NAME === v.ACCESSORIES_NAME){
        v.select = true
       }
     })
   })
   this.setData({
    list
   })
   const noChoose = this.data.list.find(v => v.select === false)
   if(!noChoose){
     this.setData({
      allChoose: true
     })
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
    const { list } = this.data;
    const selectArr = list.filter(v => {
      return v.select
    });
    console.log(selectArr);
    if(selectArr.length !== 0){
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