// component/con-order/con-order.js
import {
  currentData,
  morrDate
} from '../../utils/util';
import {
  orderDataStatistics
} from '../../utils/api';
const app = getApp()
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
    color: app.globalData.color,
    images: '/img/null.png',
    infoWord: '暂无交易',
    height: 355,
    sdate: currentData(),
    edate: morrDate(),
    startDate: currentData(),
    endDate: morrDate(),
    dataList: []
  },
  lifetimes: {
    attached() {
      const _this = this;
      console.log('开始结束日期', currentData(), morrDate())
      wx.getStorage({
        key: 'shopid',
        success(res) {
          shopid = res.data;
          _this.computedData();
        }
      })

    },

  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChangeStart: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        sdate: e.detail.value
      })
      this.computedData();
    },
    bindDateChangeEnd: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        edate: e.detail.value
      })
      this.computedData();
    },
    computedData() {
      const _this = this;
      orderDataStatistics({
        SHOP_ID: shopid,
        sDate: _this.data.sdate,
        eDate: _this.data.edate
      }).then(res => {
        console.log(res, "营业明细")
        if (res.result == "success") {
          _this.setData({
            date: res
          })
          // let dataList = _this.data.dataList
          // if (res.data[0].orderDesc.length > 0) {
          //   for (let j = 0; j < res.data[0].orderDesc.length; j++) {
          //     dataList.push(res.data[0].orderDesc[j])
          //   }
          // }
          // _this.setData({
          //   dataList: res.data[0].orderDesc,
          // })
          _this.setData({
            dataList: res.data,
          })
          console.log('=====', _this.data.dataList)
        } else if (res.result == "error") {
          wx.showToast({
            title: res.data,
            icon: 'none'
          })
        }
      })
    },
    toDay(e) {
      let index = e.currentTarget.id
      let listIndex = JSON.stringify(this.data.dataList[index].orderDesc)
      console.log(listIndex)
      wx.navigateTo({
        url: '../../pages/index/pay-daydetail/pay-daydetail?listIndex='+listIndex,
      })
    },
  }
})