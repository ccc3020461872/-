// component/con-fitment/con-fitment.js
import toPage from '../../utils/common/toPage'
import {
  appId,
  setShop,
  uploadFileCOS,
  storeDemo,
  aboutStore
} from '../../utils/api'
let shopid
const app = getApp()
let latitude
let longitude
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
    colorList: ['#1e5051', '#b7282e', ], //装修风格
    currentColor: 0,
    swiperPopShow: false,
    popType: null,
    logoimg: '/img/up.png',
    backimg: '/images/test.png',
    swiperimg: '/images/test.png',
  },
  observers: {
    'shop': function () {
      var that = this

    }
  },
  lifetimes: {
    attached() {

    },
    ready: function () {
      var that = this
      wx.getStorage({
        key: 'shopid',
        success(res) {
          shopid = res.data
          that.getShop()
        }
      })
      that.storeDemo()


    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 预览店铺
    toshowShop() {
      if (this.data.shop != undefined && this.data.shop != '' && this.data.shop != null) {
        wx.navigateTo({
          url: '../../pages/index/shopSet/showShop/showShop?shop=' + JSON.stringify(this.data.shop),
        })
      } else {
        wx.showToast({
          title: '请装修好后预览',
          icon: 'none'
        })
      }

    },
    tochooseMap() {
      var that = this
      wx.chooseLocation({
        success: function (res) {
          console.log(res, res.latitude, res.longitude, '出发地')
          that.setData({
            addName: res.name,
          })
          latitude = res.latitude
          longitude = res.longitude
        },
      })
    },
    getShop() {
      aboutStore({
        SHOP_ID: shopid
      }).then(res => {
        console.log('店铺信息', res)
        if (res.result == 'success') {
          let shop = res.SHOP
          this.setData({
            shop: shop,
            addName: shop.SHOP_ADD,
            logoimg: shop.SHOP_IMG,
            backimg: shop.BACKGROUND_IMG,
            swiperimg: shop.MARKETING_IMG,
            chooseColor: shop.SHOP_TYPE
          })
          latitude = shop.LATITUDE
          longitude = shop.LONGITUDE
          wx.setStorage({
            key: 'shop',
            data: shop
          })
        } else {

        }
      })
    },
    chooseswiper(e) {
      console.log('chooseswiper=====', e)
      this.setData({
        swiperimg: e.detail.swiperImg
      })
    },
    chooseback(e) {
      console.log('chooseback=====', e)
      this.setData({
        backimg: e.detail.backImg
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
    storeDemo() {
      storeDemo().then(res => {
        console.log('店铺图片模板', res)
        this.setData({
          backList: res.banner,
          swiperList: res.demo
        })
      })
    },
    // 颜色选择
    colorItemTap(e) {
      const {
        currentTarget: {
          dataset: {
            color
          }
        }
      } = e;
      console.log(color);
      this.setData({
        currentColor: color
      })
    },
    showPop(e) {
      const {
        currentTarget: {
          dataset: {
            type: popType
          }
        }
      } = e
      this.setData({
        swiperPopShow: true,
        popType,
      })
    },
    formSubmit: function (e) {
      var that = this
      let name = e.detail.value.name
      let note = e.detail.value.note
      let phone = e.detail.value.phone
      if (that.data.logoimg == '/img/up.png') {
        wx.showToast({
          title: '请上传小程序logo',
          icon: 'none'
        })
        return false;
      }
      if (name == '') {
        wx.showToast({
          title: '请输入小程序名称',
          icon: 'none'
        })
        return false;
      }

      if (note == '') {
        wx.showToast({
          title: '请输入简介',
          icon: 'none'
        })
        return false;
      }
      if (this.data.addName == '') {
        wx.showToast({
          title: '请选择门店具体地址',
          icon: 'none'
        })
        return false;
      }
      if (phone == '') {
        wx.showToast({
          title: '请填写手机号',
          icon: 'none'
        })
        return false;
      }
      if (that.data.backimg == '/images/test.png') {
        wx.showToast({
          title: '请上传店铺首页背景图',
          icon: 'none'
        })
        return false;
      }
      if (that.data.swiperimg == '/images/test.png') {
        wx.showToast({
          title: '请上传店铺营销图',
          icon: 'none'
        })
        return false;
      }
      this.setData({
        disabled: true
      })
      setShop({
        SHOP_ID: shopid,
        SHOP_NAME: name,
        SHOP_DESC: note,
        SHOP_ADD: this.data.addName,
        SHOP_TEL: phone,
        SHOP_IMG: this.data.logoimg,
        BACKGROUND_IMG: this.data.backimg,
        MARKETING_IMG: this.data.swiperimg,
        SHOP_TYPE: this.data.colorList[this.data.currentColor],
        LATITUDE: latitude,
        LONGITUDE: longitude
      }).then(res => {
        console.log('发布结果', res)
        if (res.STATUS == 'SUCCESS') {
          var that = this
          that.getShop()
          wx.showModal({
            title: '提交成功！',
            confirmText: '确认',
            showCancel: false,
            success(res) {
              if (res.cancel) {
                that.getShop()
              } else if (res.confirm) {

              }
            }
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
          that.setData({
            disabled: false
          })
        }
      })

    },
    //上传图片
    uploadImage(e) {
      var that = this
      var idx = e.currentTarget.dataset.idx
      wx.chooseImage({
        count: 1,
        camera: 'back',
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          // 多张照片上传
          var tempFilePath = res.tempFilePaths[0]
          uploadFileCOS(tempFilePath)
            .then(data => {
                console.log('服务器地址', typeof (data), data)
                if (idx == 0) {
                  that.setData({
                    logoimg: data
                  })
                } else if (idx == 1) {
                  that.setData({
                    backimg: data
                  })
                } else {
                  that.setData({
                    swiperimg: data
                  })
                }
              }


            )
        }
      })
    },
  }
})