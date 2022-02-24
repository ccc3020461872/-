// component/con-summary/con-summary.js
import { currentData } from '../../utils/util';
import {
  orderStatistics,
  newOrderStatistics, //新营业汇总
} from '../../utils/api';
const app = getApp();
let shopid;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    navlist: ['营业汇总', '营业明细'],
    currentIndex: 0,
    date: currentData(),
    interval: '',
    array1: ['当日', '近一周', '近一月', '近一年'],
    index1: 0,
    typeList: [{
        title: '商品管理',
        image: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/1.gif',
        url: "/pages/goods/addGoods/index"
      },
      {
        title: '店铺设置',
        image: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/2.gif',
        url: `/pages/index/shopSet/shopSet?title=店铺设置`
      },
      {
        title: '预点餐设置',
        image: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/3.gif',
        url: `/pages/index/reserveTable/reserveTable`
      },
      {
        title: '打票机管理',
        image: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/4.gif',
        url: `/pages/index/machina/machina`
      },

      {
        title: '桌贴码申请',
        image: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/5.gif',
        url: `/pages/deskCode/deskCode`
      },
      {
        title: '营业报表',
        image: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/6.png',
        url: `/pages/index/stateMent/stateMent`
      },
    ],
    typeList1: [{
        title: '卡券营销',
        image: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/7.gif',
        url: `/pages/businesscard/canvassBusinessOrders/canvassBusinessOrders`
      },
      {
        title: '会员营销',
        image: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/8.gif',
        url: `/pages/businesscard/canvassBusinessOrders/canvassBusinessOrders`

      },
      {
        title: '积分营销',
        image: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/9.gif',
        url: `/pages/businesscard/canvassBusinessOrders/canvassBusinessOrders`

      },


    ]

  },
  lifetimes: {
    attached() {

    },
    ready: function () {
      const _this = this;
      _this.setData({
        statusBarHeight: getApp().globalData.statusBarHeight,
        statusTop: getApp().globalData.statusTop,
      })
      let statusBarHeight=getApp().globalData.statusBarHeight;
      let statusTop=getApp().globalData.statusTop;
      let parmas={statusBarHeight,statusTop}
      _this.triggerEvent('tabarHeight', parmas)
      console.log('======',getApp().globalData.statusBarHeight)
      // console.log(app.globalData.StoreArry, "StoreArry")
      let storeName = [];
      //门店的名称
      app.globalData.StoreArry.forEach(item => {
        storeName.push(item.SHOP_NAME)
      })
      _this.setData({
        array: storeName
      })
      treeXarray = [];
      treeXarrayData = [];
      _this.linechartsComponnet = _this.selectComponent('#businessTrend'); //折线图
      wx.getStorage({
        key: 'shopName',
        success(res) {
          _this.setData({
            storeName: res.data
          })
        }
      })
      wx.getStorage({
        key: 'shopid',
        success(res) {
          shopid = res.data;
          console.log(shopid, "shopid=============")
          wx.setStorage({
            data: res.data,
            key: 'chocieshopid',
          })
          // 、、、、、、、、////////////////////////
          // shopid = '300000001'
          // wx.setStorage({
          //   data: shopid,
          //   key: 'chocieshopid',
          // })
          // 以上后期删掉////////////////////////////

          setTimeout(() => {
            _this.computedData();

          }, 300)


        }
      })

   
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转我的推广页面
    toPage(e) {
      const {
        url
      } = e.currentTarget.dataset
      wx.navigateTo({
        url,
      })
    },
    toDetail() {
      wx.navigateTo({
        url: '/agentpages/pages/pay-detail/pay-detail',
      })
    },
    choose(e) {
      console.log(e)
      // 1.设置最新的index
      this.setData({
        currentIndex: e.currentTarget.dataset.idx
      })
    },
    bindPickerChange: function (e) {
      const _this = this;
      _this.linechartsComponnet = _this.selectComponent('#businessTrend'); //折线图
      console.log('picker发送选择改变，携带值为', e.detail.value)
      _this.setData({
        storeName: _this.data.array[e.detail.value]
      })
      //判断选择的名称和门店数组里面的门店名称相等，将选择中的门店id赋值给shopid
      console.log(app.globalData.StoreArry)
      for (var i = 0; i < app.globalData.StoreArry.length; i++) {
        if (_this.data.array[e.detail.value] == app.globalData.StoreArry[i].SHOP_NAME) {
          shopid = app.globalData.StoreArry[i].SHOP_ID
        }
      }
      console.log(shopid, "chocieShopid")
      wx.setStorage({
        data: shopid,
        key: 'chocieshopid',
      })
      treeXarray = [];
      treeXarrayData = [];
      _this.computedData();
    },
    // 当日营收
    bindChange: function (e) {
      const _this = this;
      console.log('picker发送选择改变，携带值为', e.detail.value)
      _this.setData({
        index1: e.detail.value
      })

      _this.computedData();
    },
    bindDateChange: function (e) {
      const _this = this;
      console.log('picker发送选择改变，携带值为', e.detail.value)
      _this.setData({
        date: e.detail.value
      })
      treeXarray = [];
      treeXarrayData = [];
      _this.computedData();
    },
    //近一周营业汇总
    computedData() {
      const _this = this;
      newOrderStatistics({
        SHOP_ID: shopid,
        selectDate: _this.data.date,
        selectType: _this.data.index1 * 1 + 1
      }).then(data => {
        console.log(data, "营业汇总");
        treeXarray = [];
        treeXarrayData = [];
        if (data.result == "success") {
          _this.setData({
            selectDay: data.selectDay,
          })



        } else if (data.result == "error") {
          wx.showToast({
            title: data.data,
            icon: 'none'
          })
        }
      })
    },



  }
})