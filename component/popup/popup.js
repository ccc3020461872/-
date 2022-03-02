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
    backList: {
      type: Array,
      value: []
    },
    swiperList: {
      type: Array,
      value: []
    },
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
    bindchange(e) {
      console.log(e)
    },
    // 选择
    chooseswiper(e) {
      this.data.swiperImg = e.currentTarget.dataset.url
    },
    chooseSure() {
      this.setData({
        show: false
      })
      console.log(this.data.swiperImg)
      this.triggerEvent('chooseswiper', {
        swiperImg: this.data.swiperImg
      })
    },
    chooseback(e) {
      this.data.backImg = e.currentTarget.dataset.url
    },
    chooseSure1() {
      this.setData({
        show: false
      })
      console.log(this.data.backImg)
      this.triggerEvent('chooseback', {
        backImg: this.data.backImg
      })
    },
    clouse() {
      this.setData({
        show: false
      })
    },
    itemTap(e) {
      const {
        currentTarget: {
          dataset: {
            type
          }
        }
      } = e;
      this.triggerEvent('chooseType', type)
    }
  }
})