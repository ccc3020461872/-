// pages/goods/classify/manage/manage.js
import {
  getShopId,
  toPage,
} from '../../../../utils/common/index'
import {
  addGoodsCategory, //添加商品
  goodsCategory, //查询商品列表
  updateGoodsCategory, //修改
  deteleCategory, //删除
  goodsCategorySort, //排序
} from '../../../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    CATEGORY_NAME: null,
    showBtns: true, //是否展示添加分类 排序按钮
    detailList: null, //分类列表
    currentItem: null,
    isSort: false, //排序
    selectedStyle: null, //选中颜色
  },
  addDetail() {
    this.setData({
      showBtns: false,
      currentItem: null,
      isSort: false
    })
  },
  // 点击排序
  doSort(){
    console.log(1111);
  this.setData({
    isSort: true
  })
  },
  //上 下 置顶排序点击
  sortList(e){
    const {currentTarget :{dataset: {id: GOODS_CATEGORY_ID, type: SORT_TYPE}}} = e;
    const content = SORT_TYPE === '2' ? '是否将当前分类上调一个位置' : '是否将当前分类下调一个位置'
    wx.showModal({
      content,
      success:(res)=>{
        if(res.confirm){
          this.changeDetail('sort',{GOODS_CATEGORY_ID,SORT_TYPE})
        }
      }
    })
  },
  confuse() {
    this.setData({
      showBtns: true
    })
  },
  nameTap({
    currentTarget: {
      dataset: {
        item
      }
    }
  }) {
    const changeItem = (res) => {
      if (res.confirm) {
        this.setData({
          currentItem: item,
          showBtns: false,
          CATEGORY_NAME: item.CATEGORY_NAME
        })
      }
    }
    wx.showModal({
      content: '是否修改该分类名称',
      success: changeItem,

    })

  },
  doInput({
    detail: {
      value: CATEGORY_NAME
    }
  }) {

    this.setData({
      CATEGORY_NAME
    })
  },
  // 点击删除图片
  deleteTap({
    currentTarget: {
      dataset: {
        id: GOODS_CATEGORY_ID
      }
    }
  }){
    wx.showModal({
      content: '是否删除当前分类',
      success:(res) => {
        if(res.confirm){
          this.changeDetail('delete',{GOODS_CATEGORY_ID})
        }
      }
    })
  },
  // 添加 删除 查询 排序
  async changeDetail(type, params) {
    const {
      CATEGORY_NAME
    } = this.data
    const SHOP_ID = await getShopId();
    const successFn = () => {
      setTimeout(() => {
        this.setData({
          showBtns: true
        })
        this.changeDetail('query')
      }, 1000);
    }
    try {
      if (type === 'add') {
        const res = await addGoodsCategory({
          SHOP_ID,
          CATEGORY_NAME,
        })
        console.log('添加', res);
        if (res.data === '分类已经存在') {
          wx.showToast({
            title: '该分类已存在，请勿重复添加',
            icon: 'none'
          })
          return
        } else {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            success: successFn,
          })
        }
      } else if (type === 'query') {
        const res = await goodsCategory({
          SHOP_ID
        })
        this.setData({
          detailList: [...res.goodsCategoryData]
        })
        console.log('商品列表', res);
      } else if (type === 'change') {
        await updateGoodsCategory(params)
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          success: successFn
        })
      } else if (type === 'delete') {
        const res = await deteleCategory(params)
        console.log('删除', res);
        if(res.result === 'success'){
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          })
        }else if(res.result === 'error') {
          wx.showToast({
            title: '当前分类下有关联菜品，不能删除',
            icon: 'none'
          })
        }
      } else if(type === 'sort') {
        await goodsCategorySort(params);
        const title = params.SORT_TYPE === '2' ? '上调成功' : '下调成功' 
        wx.showToast({
          title,
          icon: 'none',
          success: successFn
        })
       
      }
    } catch (err) {
      console.log(err);
      wx.showToast({
        title: '添加失败',
        icon: 'none',
      })
    }
  },
  // 保存
  async commit() {
    if (!this.data.showBtns) {
      if (this.data.currentItem) {
        const {
          CATEGORY_NAME
        } = this.data
        const {
          GOODS_CATEGORY_ID,
          SORT
        } = this.data.currentItem
        this.changeDetail('change', {
          CATEGORY_NAME,
          GOODS_CATEGORY_ID,
          SORT
        })
        return
      }
      if (!this.data.CATEGORY_NAME) {
        wx.showModal({
          content: '您未输入名称，是否取消添加',
          success: () => {
            this.setData({
              showBtns: true
            })
          }
        })
        return
      } else {
        this.changeDetail('add')
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeDetail('query')
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
      selectedStyle: `border-color: ${color}; color: ${color}; background: #fff`
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