// component/con-title/con-title.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commimg: String,
    commtitle: String,
    formcolor: Boolean,
    backSate: String,
    titleType:Boolean
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      console.log('kkkkkkkkkkkkk')
      if (this.data.backSate != 'no') {
        wx.navigateBack({
          delta: 1,
        })
      }
    },
  },
  lifetimes: {
    ready() {
      const _this=this;
      _this.setData({
        statusBarHeight: getApp().globalData.statusBarHeight,
        statusTop: getApp().globalData.statusTop,
      })
      let statusBarHeight=getApp().globalData.statusBarHeight;
      let statusTop=getApp().globalData.statusTop;
      let parmas={statusBarHeight,statusTop}
      _this.triggerEvent('tabarHeight', parmas)
      console.log(getApp().globalData.statusBarHeight)
    }
  }
})