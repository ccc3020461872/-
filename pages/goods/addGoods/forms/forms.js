// pages/goods/addGoods/forms/forms.js
import {
  getShopId,
  toPage,
  tasteStringify
} from '../../../../utils/common/index'
import {
  uploadFileCOS, //上传文件
  addGoods, //添加商品
  updateGoods, //修改商品
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
    goodsDetail : null, //商品详情，从有商品的地方跳转过来的，修改商品
    create: true, //ture 为创建商品 false 为修改商品
    GOODS_ID: '', //商品id 修改的时候需要
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
            .then(res => {
              this.setData({
                goodsImgPath: res,
                popShow: false,
              })
              try{
                wx.removeStorageSync('imgPath')
              }catch(err) {
                console.log(err);
              }
            })
        }
      })
    }
  },
  async toOtherPage({
    currentTarget: {
      dataset: {
        url,
        type,
        info,
      }
    }
  }) {
    const SHOP_ID = await getShopId()
    if (type === '辅料') {
      const res = await accessoriesList({
        SHOP_ID
      })
      const { access = [] } = this.data 
      if (res.accessories.length !== 0) {
        toPage('/pages/goods/excipients/choose/choose', {
          list: JSON.stringify(res.accessories),
          access: JSON.stringify(access)
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
          classify: this.data.classify && JSON.stringify(this.data.classify) || ''
        })
      }
      return
    }else if(type === '口味'){
      const {SPECIFICATIONS: chooseTaste} = this.data
      const param = {chooseTaste: typeof chooseTaste == 'object' ? JSON.stringify(chooseTaste) : chooseTaste }
      console.log(param);
      toPage(url,param)
    }else if(type === '喜好标签'){
      const { tag='' } = this.data
      const param = { tag: JSON.stringify(tag)}
      toPage(url, param)
    }else if(type === '打印档口'){
      const { print='' } = this.data
      toPage(url,{print: print}) 
    }else if(type === '示例'){
       toPage(url,{info})
    }else {
      toPage(url)
    }
   
  },
  // 点击复制添加
  copyTap(e){
    const {currentTarget: {dataset: {type}}} = e;
    let isCopy;
    if(type === 'copy'){
      isCopy = true
    }else {
      isCopy = false
    }
    this.setData({
      isCopy
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
    PROMOTION_PRICE = (PROMOTION_PRICE * 1).toFixed(2)
    GOODS_VIP_PRICE= (GOODS_VIP_PRICE * 1).toFixed(2)
    PACKING_CHARGE = (PACKING_CHARGE * 1).toFixed(2)
    GOODS_PRICE = (GOODS_PRICE * 1).toFixed(2)
    VALID = VALID === false ? 0 : 1;
    const {
      goodsImgPath: GOODS_IMG,
      print,
      classify,
      access,
      SPECIFICATIONS, //口味
      isCopy,
      tag
    } = this.data;
    const GOODS_CATEGORY_ID = this.data.classify?.GOODS_CATEGORY_ID || ''//分类id
    let TICKET_TYPE
    if(print){
      TICKET_TYPE = print === '前台' ? 1 : 2 //打印档口
    }else {
       TICKET_TYPE = null
    }
    const SPECIAL_LABEL = tag?.GOODS_LABEL_ID||''; //喜好id
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
          title: '保存成功',
          icon: 'none',
          // 如果点击的是复制并继续添加就继续添加，否则返回上一个页面
          success:()=> {
            if(isCopy){
              this.setData({
                isCopy: false,
                create: true
              })
            }else {
              setTimeout(() => {
                toPage()
              }, 1000);
            }
          }
        })
      }
      wx.showModal({
        title: '提示',
        content,
        success: async (res) => {
          if(res.confirm){
           if(this.data.create){
            await addGoods(params)   //创建商品
           }else { 
             const { GOODS_ID } = this.data
              await updateGoods({...params,GOODS_ID}) //修改商品
           }
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
    console.log(options);
    const goods = options?.goods && JSON.parse(options?.goods) || false;
    if(goods){
      console.log(goods);
      const {
        GOODS_IMG: goodsImgPath = "",
        CATEGORY: classify,
        TICKET_TYPE,
        SPECIFICATIONS,
        SPECIFICATIONS: taste,
        ACCESSORIES: access,
        GOODS_LABEL: tag,
        GOODS_ID,
        VALID,
      }= goods
      const print = TICKET_TYPE == 1 ? '前台' : '后厨'
      this.setData({
        goodsDetail: goods,
        goodsImgPath,
        classify,
        print,
        taste,
        access,
        SPECIFICATIONS: JSON.parse(JSON.stringify(SPECIFICATIONS)),
        tag,
        create: false,
        GOODS_ID,
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
      color
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const {
      print: print1,
       taste: taste1,
       tag: tag1,
       access: acs,
       classify: classify1,
       goodsImgPath: goodsImgPath1
      } = this.data
    try {
      const print = wx.getStorageSync('print')|| print1 //打印档口：
      let taste = wx.getStorageSync('taste') || taste1 || '' //口味：
      const tag = wx.getStorageSync('tag') || tag1 //商品喜好标签：
      const accessoriesList = wx.getStorageSync('accessories') || acs || false //辅料
      const classify = wx.getStorageSync('classify')|| classify1//分类
      const goodsImgPath = wx.getStorageSync('imgPath') || goodsImgPath1 || '' //商品图片
      let access = [];
      let SPECIFICATIONS = JSON.parse(JSON.stringify(taste))
      if(taste){
        taste = typeof taste == 'object' ? JSON.stringify(taste) : typeof taste == 'string' ? taste : null
      }
      accessoriesList&&accessoriesList.forEach(v => {
        access.push({
          name: v?.ACCESSORIES_NAME || v?.name || '',
          id: v?.ACCESSORIES_ID || v?.id || '',
        })
      })
      this.setData({
        print,
        taste: tasteStringify(taste),
        SPECIFICATIONS,
        tag,
        access,
        classify,
        goodsImgPath,
        popShow: false
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
      wx.getStorageSync('imgPath')&&wx.removeStorageSync('imgPath')
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