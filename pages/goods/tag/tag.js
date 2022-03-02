// pages/goods/classify/add/add.js
import {
  toPage,
  getShopId
} from '../../../utils/common/index'
import {
  goodsLike //查询喜好列表
} from '../../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    chooseList: [],
    selectedClass: '',
    isSelected: true,
    currentIndex: 0,

  },
  toOtherPage(e) {
    const {
      currentTarget: {
        dataset: {
          url
        }
      }
    } = e
    toPage(url)
  },
  chooseTag(e) {
    const {
      currentTarget: {
        dataset: {
          index
        }
      }
    } = e;
    const {
      currentIndex
    } = this.data
    if (index === currentIndex) {
      this.setData({
        isSelected: false,
      })
    } else {
      this.setData({
        isSelected: true,
        currentIndex: index,
      })
    }

  },
  async getList() {
    const res = await goodsLike()
    console.log('喜好标签', res);
    const {
      resLike: chooseList
    } = res
    this.setData({
      chooseList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const currentItem = options?.tag && JSON.parse(options.tag) || false;
    console.log('上个页面传过来的',currentItem);
    await this.getList();
    if (currentItem) {
      const {
        chooseList
      } = this.data;
      const currentIndex = chooseList.findIndex(v => v.GOODS_LABEL_ID === currentItem.GOODS_LABEL_ID)
      this.setData({
        currentIndex
      })
    }
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
      color,
      selected: `background: ${color};color: #fff`
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
    const {
      currentIndex,
      chooseList
    } = this.data
    wx.setStorageSync('tag', chooseList[currentIndex])
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})