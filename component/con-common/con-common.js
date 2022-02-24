// component/con-detail/con-detail.js
import { currentData } from '../../utils/util';
import {
  salesStatistics
} from '../../utils/api';
let shopid;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataList:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: currentData(),
    box: ['热菜', '凉菜及酒水'],
    currentIndex: 0,
    images: '../../images/null/norder.png',
    infoWord: '暂无数据...',
    height: 355,
    dataList: [],
    isShow: false
  },

  lifetimes: {
    attached() {
      const _this = this;
      wx.getStorage({
        key: 'chocieshopid',
        success(res) {
          shopid = res.data;
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
        console.log(data, "----营业明细")

        if (data.result == "success") {
          _this.setData({
            allData: data.allData,
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
  }
})