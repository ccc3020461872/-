// component/con-center/con-center.js
const app = getApp();
let userName;
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

  },
  lifetimes: {
    attached() {
      const _this = this;
      wx.getStorage({
        key: 'shop',
        success(res) {
          console.log('店铺信息', res.data)
          _this.setData({
            shop: res.data
          })
        }
      })


    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toOut() {
      wx.navigateTo({
        url: '/pages/index/out/out',
      })
    },
    updatePwd() {
      wx.navigateTo({
        url: '/pages/index/mine/updatePwd/updatePwd',
      })
    },
    tosetting() {
      wx.navigateTo({
        url: '../../pages/index/setting/setting',
      })
    },
    // 分享
    // toshare(){
    //   wx.showShareMenu({
    //     withShareTicket: true,
    //     menus: ['shareAppMessage']
    //   })
    // },
    toweb() {
      wx.navigateTo({
        url: '/pages/index/mine/web-view/web-view',
      })
    },
    toabout() {
      wx.navigateTo({
        url: '/pages/index/about/about',
      })
    },
    loginOut() {
      wx.navigateBack({
        delta: 2 //返回上一级页面
      })
    }
  }
})