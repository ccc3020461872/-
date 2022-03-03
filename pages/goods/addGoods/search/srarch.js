// pages/goods/addGoods/search/srarch.js
import {
  goodsSearch //搜索
} from '../../../../utils/api'
import {
  toPage,
  getShopId,
} from '../../../../utils/common/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], //商品列表
    keyWords: null, //搜索输入关键字
    empty: false, //控制搜索不到词条的提示语 一开始进来不提示
  },
  // 获取搜索的列表
  async getGoodsList() {
    try {
      const GOODS_SHOP_ID = await getShopId();
      const {
        keyWords
      } = this.data;
      const res = await goodsSearch({
        GOODS_SHOP_ID,
        keyWords: keyWords || ''
      })
      if (res && res?.goodsData) {
        return res.goodsData
      }
    } catch (err) {
      console.log('搜索错误', err);
    }
  },
  // 绑定输入事件
  doInput(e) {
    const {
      detail: {
        value: keyWords
      }
    } = e;
    this.setData({
      keyWords,
      empty: true,
    })
    
    if (keyWords) {
      this.getGoodsList()
        .then(res => this.setData({
          goodsList: res
        }))
        .catch(err => {
          console.log(err);
          this.setData({
            goodsList: []
          })
        })
    } else {
      this.setData({
        goodsList: [],
        empty:false,
      })
    }


  },
  // 点击单个商品跳转商品详情
  toOtherPage(e){
   const {currentTarget: {dataset: {item}}} = e;
   console.log(item);
   const url = "/pages/goods/addGoods/forms/forms"
   toPage(url,{goods: JSON.stringify(item)})
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.keyWords) {
      this.getGoodsList()
        .then(res => this.setData({
          goodsList: res
        }))
        .catch(err => {
          console.log(err);
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