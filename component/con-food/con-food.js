// component/con-food/con-food.js
import {
  goodsList,
  updateGoods,
  goodsTop
} from '../../utils/api';
let shopid;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    refreshState: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    info: [],
    currenIndex: 0,
    gotopState: false,
    refreshState: false
  },
  lifetimes: {
    attached() {
      const _this = this;
      wx.getStorage({
        key: 'chocieshopid',
        success(res) {
          shopid = res.data;
          _this.goodsList();
        }
      })
      wx.getSystemInfo({
        success: function (res) {
          console.log(res)
          _this.setData({
            windowHeight: res.windowHeight - 62.5
          })
        }
      })
    },

  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      const _this = this;
      console.log(_this.properties.refreshState, '===========================================')
      if (_this.properties.refreshState) {
        _this.setData({
          currenIndex: 0,
        })
        wx.getStorage({
          key: 'chocieshopid',
          success(res) {
            shopid = res.data;
            _this.goodsList();
          }
        })
      }

    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 
    //导航
    selectBox(e) {
      console.log(e)
      const _this = this;
      const currenIndex = e.currentTarget.dataset.index;
      const kindid = e.currentTarget.dataset.kindid;
      _this.setData({
        currenIndex: currenIndex,
        kindid: kindid
      })
    },
    //导航
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
    close: function () {
      this.setData({
        iosDialog1: false,
        showIOSDialog: false
      })
    },
    openIOS1: function () {
      this.setData({
        iosDialog1: true
      });
    },
    openIOS: function () {
      this.setData({
        showIOSDialog: true
      });
    },

    goCate() {
      wx.navigateTo({
        url: '/agentpages/pages/goods management/classification/classification',
      })
    },
    toedit(e) {
      console.log(e.currentTarget.dataset)
      const goodsid = e.currentTarget.dataset.goodsid;
      wx.navigateTo({
        url: '/agentpages/pages/upLoad/addgoods/addgoods?goodsid=' + goodsid+'&back=1',
      })
    },
    goSort() {
      // wx.navigateTo({
      //   url: '/agentpages/pages/goods management/effects/effects',
      // })
      this.setData({
        gotopState: !this.data.gotopState
      })
    },
    goPatch() {
      console.log()
      wx.navigateTo({
        url: '/agentpages/pages/goods management/Patch/Patch?',
      })
    },
    packset() {
      wx.navigateTo({
        url: '/agentpages/pages/goods management/packset/packset',
      })
    },
    addguige() {
      wx.navigateTo({
        url: '/agentpages/pages/upLoad/guigeku/guigeku',
      })
    },
    addlabel() {
      wx.navigateTo({
        url: '/agentpages/pages/upLoad/LabelList/LabelList',
      })
    },
    addgoods() {
      wx.navigateTo({
        url: '/agentpages/pages/upLoad/addgoods/addgoods',
      })
    },
    addaces() {
      wx.navigateTo({
        url: '/agentpages/pages/upLoad/aceslib/aceslib',
      })
    },
    handleInputChange(){
      wx.navigateTo({
        url: '/agentpages/pages/search/search',
      })
    },
    // 置顶
    goodsTop(e) {
      const _this = this;
      const GOODS_ID = e.currentTarget.dataset.goodsid;
      let index = e.currentTarget.dataset.index
      goodsTop({
        GOODS_ID
      }).then(data => {
        console.log(data, "置顶")
        if (data.result == "success") {
          let dataList = _this.data.goodsCategoryData
          for (var i = 0; i < dataList.length; i++) {
            for (var j = 0; j < dataList[i].goodsList.length; j++) {
              if (dataList[i].goodsList[j].GOODS_ID == GOODS_ID) {
                dataList[i].goodsList.unshift(dataList[i].goodsList.splice(index, 1)[0]);
              }
            }
          }
          _this.setData({
            goodsCategoryData: dataList
          })
        } else if (data.result == "error") {
          wx.showToast({
            title: data.data,
            icon: 'none'
          })
        }
      })
    },
    //商品上下架
    changeGoods(e) {
      console.log(e, "商品上下架")
      const _this = this;
      let finallValue;
      const value = e.currentTarget.dataset.value;
      const goodsid = e.currentTarget.dataset.goodsid;
      if (value == 1) {
        finallValue = 0
      } else {
        finallValue = 1
      }
      updateGoods({
        GOODS_ID: goodsid,
        VALID: finallValue
      }).then(data => {
        console.log(data, "商品上下架操作")
        if (data.result == "success") {
          for (var i = 0; i < _this.data.goodsCategoryData.length; i++) {
            for (var j = 0; j < _this.data.goodsCategoryData[i].goodsList.length; j++) {
              if (_this.data.goodsCategoryData[i].goodsList[j].GOODS_ID == data.GOODS_ID) {
                _this.data.goodsCategoryData[i].goodsList[j].VALID = finallValue
              }
            }
          }
          _this.setData({
            goodsCategoryData: _this.data.goodsCategoryData
          })
        } else if (data.result == "error") {
          wx.showToast({
            title: data.data,
            icon: 'none'
          })
        }
      })
    },
    goodsList() {
      const _this = this;
      goodsList({
        SHOP_ID: shopid
      }).then(data => {
        console.log(data, "商品上下架列表")
        if (data.result == "success") {
          _this.setData({
            goodsCategoryData: data.goodsCategoryData,
            kindid: data.goodsCategoryData[0].GOODS_CATEGORY_ID
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