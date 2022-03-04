// component/cl-empty/cl-empty.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    emptyText: String,
    btnText: String,
    color: String,
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
    saveTap(){
      this.triggerEvent('addinfo')
    },
  }
})
