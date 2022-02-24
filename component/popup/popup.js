// components/popup/popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    choose: Array,
    show: {
      type: Boolean,
      value: false
    },
    type: {
      type: Number,
      value: 0,
    },
    imgList: {
      type: Array,
      value: ["/images/test.png","/images/test.png","/images/test.png","/images/test.png","/images/test.png"]
    }
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
    clouse(){
      this.setData({
        show: false
      })
    },
    itemTap(e){
      const {currentTarget: {dataset: {type}}}  = e;
      this.triggerEvent('chooseType',type)
    }
  }
})
