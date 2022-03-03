// pages/goods/addGoods/index.js
import {
  toPage,
  getShopId
} from '../../../utils/common/index';
import {
  goodsCategory, //查询分类管理
  goodsSort, //商品排序
  updateGoodsNew, //商品上下架
  setHot, //设为热销
} from '../../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    selected: null, //左边商品大类文字选中样式
    className: ['酸汤面', '油泼辣子面'],
    currentIndex: 0,
    goodsList: null,
    selectedStylle: null, //商品排序选中样式
    isSort: false, //是否展示商品排序
    isChoose: false, //是否是商品选择
    choosedIdList: null, //已经是热销的商品的id的集合
  },
  async getGoodsList() {
    const SHOP_ID = await getShopId()
    const {
      goodsCategoryData: goodsList
    } = await goodsCategory({
      SHOP_ID
    })
    console.log('商品列表', goodsList);
    if (goodsList && goodsList.length !== 0) {
      this.setData({
        goodsList
      })
    }
  },
  async toOtherPage(e) {
    const {
      currentTarget: {
        dataset: {
          url,
          type,
          goods
        }
      }
    } = e
    if (type === '分类管理') {
      const {
        goodsList
      } = this.data
      if (goodsList && goodsList.length !== 0) {
        const url = "/pages/goods/classify/manage/manage"
        toPage(url)
      } else {
        const url = "/pages/goods/classify/add/add"
        toPage(url)
      }

    } else if (type === 'itemtap') {
      const {
        goodsList,
        currentIndex
      } = this.data
      const {
        CATEGORY_NAME,
        GOODS_CATEGORY_ID
      } = goodsList[currentIndex];
      const CATEGORY = {
        CATEGORY_NAME,
        GOODS_CATEGORY_ID
      }
      toPage(url, {
        goods: JSON.stringify({
          ...goods,
          CATEGORY
        })
      })
    } else {
      toPage(url)
    }

  },
  // 点击左边的大类
  chooseClass(e) {
    const {
      currentTarget: {
        dataset: {
          index,
          info
        }
      }
    } = e;
    console.log(index);
    console.log(info);
    this.setData({
      currentIndex: index
    })
  },
  // 商品上下架点击
  upDowm(e) {
    let {
      currentTarget: {
        dataset: {
          item: {
            GOODS_ID,
            VALID
          }
        }
      }
    } = e
    const content = VALID === 0 ? '是否要将该商品上架' : '是否要将该商品下架'
    const change = async () => {
      VALID = VALID === 0 ? 1 : 0
      await updateGoodsNew({
        GOODS_ID,
        VALID
      })
      this.getGoodsList()
    }
    wx.showModal({
      content,
      success: (res) => {
        if (res.confirm) {
          change()
        }
      }
    })
  },
  // 商品排序点击
  sortTap() {
    this.setData({
      isSort: !this.data.isSort
    })
  },
  // 商品排序
  async sortGoods(e) {
    const {
      currentTarget: {
        dataset: {
          type,
          id: GOODS_ID
        }
      }
    } = e;
    const SORT_TYPE = type === 'up' ? 2 : 3
    console.log(type);
    try {
      const res = await goodsSort({
        GOODS_ID,
        SORT_TYPE
      })
      this.getGoodsList()
      console.log(res);
    } catch (err) {
      wx.showToast({
        title: '网络出小差了,请稍后再试',
        icon: 'none'
      })
      console.log(err);
    }
  },
  // 商品选择
  chooseGoods(e) {
    let {
      currentTarget: {
        dataset: {
          info
        }
      }
    } = e;
    info = JSON.parse(info)
    console.log(info);
    const {
      index
    } = info
    const {
      goodsList,
      currentIndex
    } = this.data;
    goodsList[currentIndex].goods[index].selected = !goodsList[currentIndex].goods[index].selected
    this.setData({
      goodsList
    })
  },
  // 保存
   save() {
    const {
      goodsList
    } = this.data;
    let selectList = []
    goodsList.forEach(v => {
      if (v?.goods && v.goods.length !== 0) {
        const arr = v.goods.filter(v => v.selected)
        if (arr.length !== 0) {
          selectList = [...selectList, ...arr]
        }
      }
    });
    if(selectList.length === 0){
      wx.showToast({
        title: '当前未选商品',
        icon: 'none'
      })
      return
    }
    const GOODS_ID = []	
    selectList.forEach(v => GOODS_ID.push(v.GOODS_ID))
    wx.showModal({
      content: "是否将选中的商品设为推荐商品",
      success: async res => {
        if(res.confirm){
          try{
            const SHOP_ID = await getShopId()
            await setHot({GOODS_ID: GOODS_ID.toString(), TYPE: 1,SHOP_ID});
          }catch(err){
            console.log(err);
          }
          toPage()
        }
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      from = '',
        list,
    } = options;
    list = list&&JSON.parse(list) || null
    console.log(options);
    if (from && from === 'setProduct') {
      console.log('从推荐商品页面过来的');
      this.setData({
        isChoose: true,
        choosedIdList: list
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const {
      globalData: {
        color,
      }
    } = app;
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
  onShow: async function () {
    await this.getGoodsList()
    const {
      isChoose,
      goodsList,
      choosedIdList
    } = this.data;
    if (isChoose) {
      //  全部selected设为false
      goodsList.map(v => {
        if (v?.goods) {
          v.goods.map(v => v.selected = false)
        } else {
          return
        }
      })
      // 之前选中的设为true
      if (choosedIdList && choosedIdList.length !== 0) {
        goodsList.map(v => {
          if (v?.goods && v.goods !== 0) {
            v.goods.map(v2 => {
              if (choosedIdList.includes(v2.GOODS_ID)) {
                v2.selected = true
              }
            })
          }
        })
      }

      this.setData({
        goodsList
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