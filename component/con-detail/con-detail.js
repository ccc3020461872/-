// component/con-detail/con-detail.js
import { currentData } from '../../utils/util';


import {
  salesStatistics
} from '../../utils/api';
let shopid = "300000007"
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
    date: currentData(),
    allData: ['菜品名称', '菜品名称+规格', '菜品小类', '菜品大类'],
    currentIndex: 0,
    images: 'https://kad-1254002404.cos.ap-chengdu.myqcloud.com/keaidian/WEG/norder.png',
    infoWord: '暂无数据...',
    height: 355,
    dataList: [],
    isShow: false,
    toplist: ['销量', '销量占比', '菜品收入', '收入占比', '菜品优惠(元)', '优惠占比', '销售额(元)', '销售额占比', '销售千次', '菜品点击率', '顾客点击率']
  },
  lifetimes: {
    attached() {
      const _this = this;
      _this.computedData(); //后期删除
      wx.getStorage({
        key: 'chocieshopid',
        success(res) {
          // shopid = res.data;
          shopid = "300000007"
          _this.computedData();
        }
      })
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChange: function (e) {
      const _this = this;
      console.log('picker发送选择改变，携带值为', e.detail.value)
      _this.setData({
        date: e.detail.value
      })
      _this.computedData();
    },
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
        selectDate: _this.data.date
      }).then(data => {
        console.log(data, "营业明细")

        if (data.result == "success") {
          _this.setData({
            // allData: data.allData,
            dataList: data.allData[_this.data.currentIndex].data
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
      if (e.detail.scrollLeft> 0) {
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