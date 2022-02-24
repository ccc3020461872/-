// component/con-fitment/con-fitment.js
import toPage from '../../utils/common/toPage'
const app = getApp()
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
    colorList: ['#15748c','#124654','#11659a','#1e5051'], //装修风格
    currentColor: '#15748c',
    swiperPopShow: false,
    popType: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toOtherPage(e){
      const {currentTarget: {dataset: {url}}} = e
      toPage(url)
    },
    // 颜色选择
    colorItemTap(e){
      const {currentTarget: {dataset: {color}}} = e;
      console.log(color);
      this.setData({
        currentColor: color
      })
    },
    showPop(e){
      const {currentTarget: {dataset: {type: popType}}} = e
      this.setData({
        swiperPopShow: true,
        popType,
      })
    },
  }
})
