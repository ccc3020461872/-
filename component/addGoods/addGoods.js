// components/addGoods/addGoods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    example: Boolean,
    input: Boolean,
    request: Boolean,
    placeholder: String,
    title: String,
    right: {
      type: Boolean,
      default: false,
    }
  },
  options: {
    multipleSlots:true 
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

  }
})
