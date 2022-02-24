// pages/goods/classify/add/add.js
import toPage from '../../../../utils/common/toPage'
import {
  addAccessories, //新增辅料
  accessoriesList, //查询辅料列表
  deleteAccessories, //删除辅料
  updateAccessories, //修改辅料
} from '../../../../utils/api';
import {
  getShopId, 
} from '../../../../utils/common/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    list: [{
      name: null,
      price: null,
      id: Date.now()
    }],
    disabled: false
  },
  // 添加辅料
  add() {
    console.log('add');
    const {
      list
    } = this.data
    list.push({
      name: null,
      price: null,
      id: Date.now()
    })
    this.setData({
      list
    })
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
  // 删除一项
  removeItem({
    currentTarget: {
      dataset: {
        index,
        item
      }
    }
  }) {
    console.log(index);
    if(item.ACCESSORIES_ID){
     this.changeAccessories('remove',{ACCESSORIES_ID: item.ACCESSORIES_ID})
    }
    const list = JSON.parse(JSON.stringify(this.data.list))
    console.log(list.splice(index,1));
    this.setData({
      list
    })
  },
  // 输入价格或辅料改变数据
  doInput(e){
    const {currentTarget: {dataset: {type, index}},detail:{value}} = e;
    const { list } = this.data;
    list[index][type] = value;
    this.setData({
      list
    })
    console.log(this.data.list);
  },
  // 查询,新增,删除，添加辅料
  async changeAccessories(type, params) {
    try {
      const SHOP_ID = await getShopId()
      if(type === 'query'){
       const res = await accessoriesList({SHOP_ID});
       console.log('辅料列表',res);
       const list = []
       res.accessories.forEach(item => {
         list.push({
          name: item.ACCESSORIES_NAME,
          id:item.ACCESSORIES_ID,
          ACCESSORIES_ID: item.ACCESSORIES_ID,
          price: item.PRICE,
        })
       })
       this.setData({
         list,
       })
       if(this.data.list.length === 0){
        const item = {name: null, price: null, id: Date.now()}
        const { list } = this.data;
        list.push(item);
        this.setData({
          list,
        })
      }
      }else if (type === 'add') {
        const res = await addAccessories({
          SHOP_ID,
          ACCESSORIES_NAME: {params}
        })
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        })
      }else if(type === 'remove'){
       const res = await deleteAccessories(params)
       console.log('删除',res);
      }
    }catch(err){
      console.log(err);
    }
  },
  // 提交
  commit() {
    const { list } = this.data;
    if(list.length === 0) {
      wx.showToast({
        title: '请添加辅料',
        icon: 'none'
      })
      return
    }
    // 查询空
   const a = list.find(v => {
     return Boolean(v.price) == false || Boolean(v.name) == false
    })
    if(a&&!a.name) {
      wx.showToast({
        title: '请输入名称',
        icon: 'none'
      })
      return 
    }else if(a&&!a.price){
     wx.showToast({
       title: '请输入价格',
       icon: 'none'
     })
     return 
    }
  //  去重
  const b = list.find((v,i,a) => {
   return (
    a.find((v2,i2) => {
      return(Boolean(v.name === v2.name) && Boolean(i !== i2))
    })
   )
  })
  if(b){
    wx.showToast({
      title: `请勿重复添加${b.name}`,
      icon: 'none'
    })
    return
  }
  this.changeAccessories('add',list)
  
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeAccessories('query')
  
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