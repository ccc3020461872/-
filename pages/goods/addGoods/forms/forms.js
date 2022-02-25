// pages/goods/addGoods/forms/forms.js
import {
  getShopId,
  toPage,
  tasteStringify
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
    access: null, //辅料
    classify: null, //分类
    SPECIFICATIONS: '', //规格集合
    isCopy: false,
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
      } else {
        toPage('/pages/goods/excipients/excipients', )
      }
      console.log(res);
      return
    } else if (type === '分类') {
      const res = await goodsCategory({
        SHOP_ID
      });
      console.log('分类', res);
      if (res.goodsCategoryData.length === 0) {
        toPage('/pages/goods/classify/add/add')
      } else {
        toPage('/pages/goods/classify/choose/choose', {
          list: JSON.stringify(res.goodsCategoryData),
          classify: JSON.stringify(this.data.classify)
        })
      }
      return
    }else if(type === '口味'){
      const {SPECIFICATIONS: chooseTaste} = this.data
      const param = {chooseTaste: JSON.stringify(chooseTaste)}
      console.log(param);
      toPage(url,param)
    }else if(type === '喜好标签'){
      const { tag } = this.data
      const param = {tag: JSON.stringify(tag)}
      toPage(url, param)
    }else {
      toPage(url)
    }
   
  },
  // 点击复制添加
  copyTap(){
    this.setData({
      isCopy: true
    })
  },
  // 保存
  async save(e) {
    console.log(e);
    const GOODS_SHOP_ID = await getShopId()
    let {
      detail: {
        value: {
          GOODS_NAME, //商品名称
          GOODS_DESC, //商品描述
          GOODS_PRICE, //价格
          PROMOTION_PRICE, //促销价格
          GOODS_VIP_PRICE, //会员价格
          VALID,
          PACKING_CHARGE, //打包费
        }
      }
    } = e;
    VALID = VALID === false ? 0 : 1;
    const {
      goodsImgPath: GOODS_IMG,
      print,
      classify,
      access,
      SPECIFICATIONS, //口味
      isCopy
    } = this.data;
    const GOODS_CATEGORY_ID = this.data.classify?.GOODS_CATEGORY_ID || ''//分类id
    let TICKET_TYPE
    if(print){
      TICKET_TYPE = print === '前台' ? 1 : 2 //打印档口
    }else {
       TICKET_TYPE = null
    }
    const SPECIAL_LABEL = classify?.GOODS_CATEGORY_ID||''; //喜好id
    const ACCESSORIES_ID = []
    if(access){
      access.map(({
        id
      }) => {
        ACCESSORIES_ID.push(id)
      })
    } //辅料id集合
    if (!GOODS_NAME) {
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none'
      })
      return
    }
    if(!GOODS_IMG){
      wx.showToast({
        title: '请上传商品图片',
        icon: 'none'
      })
      return
    }
    if(!GOODS_CATEGORY_ID){
      wx.showToast({
        title: '请选择分类',
        icon: 'none'
      })
      return
    }
    if(!GOODS_PRICE){
      wx.showToast({
        title: '请输入价格',
        icon: 'none'
      })
      return
    }
    if(!TICKET_TYPE){
      wx.showToast({
        title: '请选择打印档口',
        icon: 'none'
      })
      return
    }
    if(!PACKING_CHARGE){
      wx.showToast({
        title: '请设置打包金额',
        icon: 'none'
      })
      return
    }
    try{
      const params = {
        GOODS_NAME,
        GOODS_SHOP_ID,
        GOODS_DESC,
        GOODS_PRICE,
        PROMOTION_PRICE,
        GOODS_VIP_PRICE,
        GOODS_CATEGORY_ID,
        VALID,
        GOODS_IMG,
        PACKING_CHARGE,
        TICKET_TYPE,
        SPECIAL_LABEL,
        ACCESSORIES_ID,
        SPECIFICATIONS
      }
      const content = isCopy ? '是否保存，并继续添加' : '是否保存'
      const showToast = ()=>{
        wx.showToast({
          title: '添加成功',
          icon: 'none',
          // 如果点击的是复制并继续添加就继续添加，否则返回上一个页面
          success:()=> {
            if(isCopy){
              this.setData({
                isCopy: false
              })
            }else {
              toPage()
            }
          }
        })
      }
      wx.showModal({
        content,
        success: async (res) => {
          if(res.confirm){
            await addGoods(params)
            showToast()
          }
        }
      })
   
    }catch(err){
      wx.showToast({
        title: '网络出小差了，请重试',
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
      let access = accessoriesList&&[] || null;
      accessoriesList&&accessoriesList.forEach(v => {
        access.push({
          name: v.ACCESSORIES_NAME,
          id: v.ACCESSORIES_ID
        })
      })

      this.setData({
        print,
        taste: taste&&tasteStringify(taste),
        SPECIFICATIONS: taste,
        tag,
        access,
        classify,
      })
      console.log(`打印档口：${print},口味：${taste},商品喜好标签：${JSON.stringify(tag)},辅料${access},分类：${JSON.stringify(classify)}`, );
    } catch (e) {
      console.log('获取错误',e);
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
    try {
      wx.getStorageSync('print')&&wx.removeStorageSync('print');
      wx.getStorageSync('taste')&&wx.removeStorageSync('taste');
      wx.getStorageSync('tag')&&wx.removeStorageSync('tag');
      wx.getStorageSync('accessories')&&wx.removeStorageSync('accessories');
      wx.getStorageSync('classify')&&wx.removeStorageSync('classify');
    }catch(e){
      console.log('移除失败',err);
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