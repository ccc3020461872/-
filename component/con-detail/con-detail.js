// component/con-detail/con-detail.js
import {
  currentData
} from '../../utils/util';
import {
  salesStatistics
} from '../../utils/api';
let shopid = ""
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sdate: {
      type: String,
      value: ''
    },
    edate: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: currentData(),
    currentIndex: 0,
    images: '/img/null.png',
    infoWord: '暂无数据',
    height: 355,
    dataList: [],
    isShow: false,
    toplist: ['销量', '销量占比', '菜品收入', '收入占比', '菜品优惠(元)', '优惠占比', '销售额(元)', '销售额占比', '销售千次', '菜品点击率', '顾客点击率']
  },
  observers: {
    'sdate, edate': function (sdate, edate) {
      // 在 sdate 或者 edate 被设置时，执行这个函数
      console.log('observers')
      const _this = this;
      wx.getStorage({
        key: 'shopid',
        success(res) {
          shopid = res.data;
          _this.computedData();
        }
      })
    }

  },
  lifetimes: {
    // attached() {
    //   const _this = this;
    //   wx.getStorage({
    //     key: 'shopid',
    //     success(res) {
    //       shopid = res.data;
    //       _this.computedData();
    //     }
    //   })
    // }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    choice(e) {
      const _this = this;
      console.log(e.currentTarget.dataset.index)
      const currentIndex = e.currentTarget.dataset.index;
      _this.setData({
        currentIndex: currentIndex
      })
      _this.data.dataList = []
      _this.computedData();
    },
    computedData() {
      const _this = this;
      salesStatistics({
        SHOP_ID: shopid,
        sDate: _this.data.sdate,
        eDate: _this.data.edate
      }).then(data => {
        console.log(data, "菜品销量")
        if (data.result == "success") {
          // _this.setData({
          //   allData: data.allData,
          //   dataList: data.allData[_this.data.currentIndex].data
          // })
          _this.setData({
            dataList: data.allData
          })
        } else if (data.result == "error") {
          wx.showToast({
            title: data.data,
            icon: 'none'
          })
        }
        _this.setData({
          isShow: true
        })
      })
    },
    scroll(e) {
      console.log(e.detail)
      if (e.detail.scrollLeft > 0) {
        this.setData({
          isActive: true
        })
      } else {
        this.setData({
          isActive: false
        })
      }
    },
  }
})