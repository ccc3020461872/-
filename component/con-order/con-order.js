// component/con-order/con-order.js
import { currentData } from '../../utils/util';
import {
  orderDataStatistics
} from '../../utils/api';
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
    images: '/images/norder.png',
    infoWord: '暂无数据...',
    height: 355,
    date: currentData(),
    dataList: []
  },
  lifetimes: {
    attached() {
      const _this = this;
      wx.getStorage({
        key: 'chocieshopid',
        success(res) {
          console.log('shopid',res)
          shopid = res.data;
          _this.computedData();
        },
        fail(err){
          console.log('shopid',err)
          shopid='300000001'
          _this.computedData();
        }
      })
     
    },

  },
  /**
   * 组件的方法列表
   */
  methods: {
    computedData() {
      const _this = this;
      orderDataStatistics({
        SHOP_ID: shopid,
        selectDate: _this.data.date
      }).then(data => {
        console.log(data, "营业明细")
        if (data.result == "success") {
          let dataList = _this.data.dataList
          if (data.weekRes.length > 0) {
            for (let j = 0; j < data.weekRes.length; j++) {
              dataList.push(data.weekRes[j])
            }
          }
          _this.setData({
            dataList: dataList,
            date:data.nextDate
          })
          console.log('=====', _this.data.dataList)
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
