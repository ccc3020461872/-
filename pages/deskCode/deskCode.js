// pages/goods/classify/add/add.js
import {toPage,getShopId} from '../../utils/common/index'
import { 
    addTableNumberManage, //添加桌贴码
    updateTableNumberManage, //修改桌贴码
    selectTableNumberManage, //查询桌贴码
  } from '../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    isDeskCode: true, //有无桌贴码
    deskNum: null, //桌号
    note: null, //备注
    num: null, //数量
    printSelf: true, //自己打印还是服务商打印
    start: 0, //默认的开始桌号
    end: 15, //默认的结束桌号
    currentDesk: null, //当前选中的是开始桌号还是结束桌号
    deskNumFocus: false, //输入桌号输入框是否聚焦
    TABLE_MANAGE_ID: null, 
  },
  enter({currentTarget: {dataset: {type}},detail:{value}}){
      this.setData({
        [type]:value
      })
      if(type === 'deskNum'){
        this.setData({
          [this.data.currentDesk]: value,
        })
      }
    console.log(this.data);
  },
  toOtherPage(e){
    const {currentTarget: {dataset: {url}}} = e
    toPage(url)
  },
  chooseType(){
    this.setData({
      isDeskCode: !this.data.isDeskCode
    })
  },
  choosePrint(){
    this.setData({
      printSelf: !this.data.printSelf
    })
  },
  // 选择桌号
  chooseTableNum(e){
    const {currentTarget: {dataset: {type}}} = e;
    const {deskNum } = this.data
    this.setData({
      deskNum: this.data[type],
      currentDesk: type,
      deskNumFocus: true
    })
  },
  // 查询桌贴码
  async queryTableCode(){
    const SHOP_ID = await getShopId();
    const res = await selectTableNumberManage({SHOP_ID});
    console.log(res);
    let {tableManage:{NOTE:note, NUMBER:num, TABLE_MIN:start, TABLE_MAX:end, TABLE_PRINT:printSelf, TABLE_RETAIN:isDeskCode,TABLE_MANAGE_ID}} = res
    isDeskCode = isDeskCode === 1 ? true : false
    printSelf = printSelf === 1 ? true : false
    this.setData({
      note,
      num,
      start,
      end,
      printSelf,
      isDeskCode,
      TABLE_MANAGE_ID
    })
    console.log(this.data);
  },
  // 添加桌贴码
  async commit(){
    const {
      isDeskCode,
      start,
      end,
      note,
      num,
      printSelf,
      TABLE_MANAGE_ID
    } = this.data
    if(!num) {
      wx.showToast({
        title: '请输入数量',
        icon: 'none'
      })
      return
    }
    const TABLE_RETAIN = Number(isDeskCode)
    const TABLE_MIN = start
    const TABLE_MAX = end;
    const TABLE_PRINT = printSelf ? 1 : 2
    const NUMBER = num
    const NOTE = note
    const SHOP_ID = await getShopId()
    const params = {
      SHOP_ID,
      TABLE_MIN,
      TABLE_MAX,
      TABLE_RETAIN,
      TABLE_PRINT,
      NUMBER,
      NOTE
    }
    let res
    if(TABLE_MANAGE_ID){
      const params2 = {...params,TABLE_MANAGE_ID}
       res = await updateTableNumberManage(params2)
      console.log('修改',res);
    }else {
      res = await addTableNumberManage(params)
      console.log('提交',res);
    }
    if(res.STATUS === 'SUCCESS'){
      wx.showToast({
        title: '提交成功',
        icon: 'none'
      });
      toPage()
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryTableCode()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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