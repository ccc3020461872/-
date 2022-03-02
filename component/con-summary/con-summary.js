// component/con-summary/con-summary.js
import {
  currentData,
  morrDate
} from '../../utils/util';
import {
  orderStatistics,
  newOrderStatistics, //新营业汇总
  imgUrl
} from '../../utils/api';
const app = getApp();
let shopid;
let treeXarray = []
let treeXarrayData = []
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
    sdate: currentData(),
    edate: morrDate(),
    startDate: currentData(),
    endDate: morrDate(),
    typeList: [{
        title: '商品管理',
        image: imgUrl + 'shop/shop/1.gif',
        url: "/pages/goods/addGoods/index"
      },
      {
        title: '店铺设置',
        image: imgUrl + 'shop/shop/2.gif',
        url: `/pages/index/shopSet/shopSet?title=店铺设置`
      },
      {
        title: '预点餐设置',
        image: imgUrl + 'shop/shop/3.gif',
        url: `/pages/index/reserveTable/reserveTable`
      },
      {
        title: '打票机管理',
        image: imgUrl + 'shop/shop/4.gif',
        url: `/pages/index/machina/machina`
      },

      {
        title: '桌贴码申请',
        image: imgUrl + 'shop/shop/5.gif',
        url: `/pages/deskCode/deskCode`
      },
      {
        title: '营业报表',
        image: imgUrl + 'shop/shop/6.png',
        url: `/pages/index/stateMent/stateMent`
      },
    ],
    typeList1: [{
        title: '卡券营销',
        image: imgUrl + 'shop/shop/7.gif',
        url: `/pages/businesscard/canvassBusinessOrders/canvassBusinessOrders`
      },
      {
        title: '会员营销',
        image: imgUrl + 'shop/shop/8.gif',
        url: `/pages/businesscard/canvassBusinessOrders/canvassBusinessOrders`

      },
      {
        title: '积分营销',
        image: imgUrl + 'shop/shop/9.gif',
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
      let statusBarHeight = getApp().globalData.statusBarHeight;
      let statusTop = getApp().globalData.statusTop;
      let parmas = {
        statusBarHeight,
        statusTop
      }
      _this.triggerEvent('tabarHeight', parmas)
      console.log('======', getApp().globalData.statusBarHeight)
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
    toPage1(e) {

      wx.showToast({
        title: '暂未开通，敬请期待',
        icon: 'none'
      })
    },
    toDetail() {
      wx.navigateTo({
        url: '../../component/con-order/con-order',
      })
    },
    choose(e) {
      console.log(e)
      // 1.设置最新的index
      this.setData({
        currentIndex: e.currentTarget.dataset.idx
      })
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
        sDate: _this.data.sdate,
        eDate: _this.data.edate
      }).then(data => {
        console.log(data, "营业汇总");
        treeXarray = [];
        treeXarrayData = [];
        if (data.result == "success") {
          _this.setData({
            selectDay: data.selectDay,
            shopName: data.selectDay.SHOP_NAME
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