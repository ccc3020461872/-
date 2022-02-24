// pages/goods/addGoods/forms/forms.js
import {
  getShopId,
  toPage
} from '../../../../utils/common/index'
import {
  uploadFileCOS, //上传文件
  addGoods, //添加商品
  accessoriesList, //查询辅料
  goodsCategory, //分类查询
} from '../../../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    popShow: false, //上传图片弹窗
    print: null, //打印档口
    taste: null, //口味
    tag: null, //商品喜好标签：
    goodsImgPath: '', //商品图片
    access:null, //辅料
    classify: null, //口味
  },
  showPop() {
    this.setData({
      popShow: true
    })
  },
  updateImg(e) {
    const {
      detail
    } = e
    console.log(detail);
    if (detail === '客爱点VIP图库') {
      const url = '/pages/goods/addGoods/photes/photes'
      toPage(url)
    } else if (detail === '上传') {
      wx.chooseMedia({
        mediaType: 'image',
        count: 1,
        success: (res) => {
          const {
            tempFiles: [{
              tempFilePath
            }]
          } = res;
          uploadFileCOS(tempFilePath)
            .then(res => this.setData({
              goodsImgPath: res
            }))
        }
      })
    }
  },
  async toOtherPage({
    currentTarget: {
      dataset: {
        url,
        type
      }
    }
  }) {
    const SHOP_ID = await getShopId()
    if (type === '辅料') {
      const res = await accessoriesList({
        SHOP_ID
      })
      if (res.accessories.length !== 0) {
        toPage('/pages/goods/excipients/choose/choose', {
          list: JSON.stringify(res.accessories)
        })
      }else {
        toPage('/pages/goods/excipients/excipients', )
      }
      console.log(res);
      return
    }else if(type === '分类') {
     const res = await goodsCategory({SHOP_ID});
     console.log('分类',res);
     if(res.goodsCategoryData.length === 0){
       toPage('/pages/goods/classify/add/add')
     }else{
       toPage('/pages/goods/classify/choose/choose',{list:JSON.stringify(res.goodsCategoryData)})
     }
     return
    }
    toPage(url)
  },
  // 保存
  async save(e) {
    console.log(e);
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
    const {
      globalData: {
        color
      }
    } = app;
    this.setData({
      color
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try {
      const print = wx.getStorageSync('print') //打印档口：
      const taste = wx.getStorageSync('taste') //口味：
      const tag = wx.getStorageSync('tag') //商品喜好标签：
      const accessoriesList = wx.getStorageSync('accessories') //辅料
      const classify = wx.getStorageSync('classify') //分类
      let access = [];
      accessoriesList.forEach(v => {
        access.push(v.ACCESSORIES_NAME)
      })
      access = access.toString()
      console.log('辅料',access);
      this.setData({
        print,
        taste,
        tag,
        access,
        classify,
      })
      console.log(`打印档口：${print},口味：${taste},商品喜好标签：${tag},辅料${access},分类：${classify}`,);
    } catch (e) {
      console.log('获取错误');
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