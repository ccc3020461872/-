// component/common/common.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fromimages: String,
    frominfoWord: String,
    frominfoTetx: String,
    formheight:Number
  },
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
  // 在组件实例进入页面节点树时执行
    attached(){
      let that=this;
      wx.getSystemInfo({
        success: function(res, rect) {
          console.log(res);
          that.setData({
            screenHeight:res.screenHeight
          })
      
        }
      })
    }
  }
})