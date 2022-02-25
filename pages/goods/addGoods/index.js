// pages/goods/addGoods/index.js
import {toPage, getShopId} from '../../../utils/common/index';
import {
  goodsCategory, //查询分类管理
  goodsSort, //商品排序
  updateGoodsNew, //商品上下架
} from '../../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    selected: null, //左边商品大类文字选中样式
    className: ['酸汤面','油泼辣子面'],
    currentIndex: 0,
    goodsList: null,
    selectedStylle: null, //商品排序选中样式
    isSort: false, //是否展示商品排序
  },
  async getGoodsList() {
    const SHOP_ID = await getShopId()
    const {goodsCategoryData: goodsList} =  await goodsCategory({SHOP_ID})
    console.log('商品列表',goodsList);
    if(goodsList&&goodsList.length !==0){
      this.setData({
        goodsList
      })
    }
  },
  async toOtherPage(e){
    const {currentTarget: {dataset: {url, type}}} = e
    if(type === '分类管理'){
      const { goodsList } = this.data
      if(goodsList && goodsList.length !== 0){
        const url = "/pages/goods/classify/manage/manage"
        toPage(url)
      }else {
        const url = "/pages/goods/classify/add/add"
        toPage(url)
      }
    
    }else{
      toPage(url)
    }
    
  },
  // 点击左边的大类
  chooseClass(e){
    const {currentTarget: {dataset: {index}}} = e;
    console.log(index);
    this.setData({
      currentIndex: index
    })
  },
  // 商品上下架点击
 upDowm(e){
  let {currentTarget: {dataset: {item: {GOODS_ID ,VALID}}}} = e
  const content = VALID === 0 ? '是否要将该商品上架' : '是否要将该商品下架'
  const change  = async() => {
    VALID = VALID === 0 ? 1 : 0
    await updateGoodsNew({GOODS_ID, VALID})
    this.getGoodsList()
  }
    wx.showModal({
      content,
      success: (res) => {
        if(res.confirm){
          change()
        }
      }
    })
    
   
  },
  // 商品排序点击
  sortTap(){
    this.setData({
      isSort: !this.data.isSort
    })
  },
  // 商品排序
 async sortGoods(e){
   const {currentTarget : {dataset: {type, id:GOODS_ID}}} = e;
   const SORT_TYPE = type === 'up' ? 2 : 3
   console.log(type);
   try{
    const res = await goodsSort({GOODS_ID, SORT_TYPE})
    this.getGoodsList()
    console.log(res);
   }catch(err){
     wx.showToast({
       title: '网络出小差了,请稍后再试',
       icon: 'none'
     })
     console.log(err);
   }
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
    const {globalData: {color,}} = app;
    const selected = `color: ${color}`
    const selectedStylle = `background: ${color}; color: #fff`
    this.setData({
      color,
      selected,
      selectedStylle
    })
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getGoodsList()
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