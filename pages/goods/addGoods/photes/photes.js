// pages/goods/addGoods/photes/photes.js
import toPage from '../../.././../utils/common/toPage'
import {
  vipImage, //图库列表展示
  vipImageSearch, //vip图库搜索
} from '../../../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     color: null,
     imagList: [],
  },
  toOtherPage(e){
    const {currentTarget: {dataset: {url,img,index:current}}} = e
    const data = {
      data: JSON.stringify(img),
      current,
    }
    console.log(e);
    toPage(url,data)
  },
  search(e){
    const {detail: {value: keyword}} = e;
    console.log(e);
    this.getPhotos('search',keyword)
  },
  //获取图片列表 搜索图片
  async getPhotos(type,keyword){
    if(type === 'getList'){
      const imgList = await vipImage();
      console.log(imgList);
      this.setData({
        imgList: imgList.data
      })
    }else if(type === 'search'){
      const { data: imgList } =  await vipImageSearch({keyword})
      this.setData({
        imgList
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
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
    this.getPhotos('getList')
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