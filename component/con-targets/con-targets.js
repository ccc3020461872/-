// component/con-targets/con-targets.js
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
    datenav:['按日','按周','按月'],
    currTab:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseDate(e){
      this.setData({
        currTab:e.currentTarget.id
      })
    }
  }
})
