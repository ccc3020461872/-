// components/tabbar/tabbar.js
const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     color: String,
     background: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    navH: 0,
    top:0
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log(App,'app');
      this.setData({
      navH: App.globalData.navHeight,
      top: App.globalData.navTop
    })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  options:{
    multipleSlots: true
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
