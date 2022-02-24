// pages/index/shopSet/setTime/cpnsChilds/timeset/timeset.js
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
    week: [{
      text: '周一',
      selected: true
    },
    {
      text: '周二',
      selected: true
    },
    {
      text: '周三',
      selected: true
    },
    {
      text: '周四',
      selected: true
    },
    {
      text: '周五',
      selected: true
    },
    {
      text: '周六',
      selected: true
    },
    {
      text: '周日',
      selected: true
    },
  ],
  typeli: ['全天', '选择时间段'],
  time: '开始时间'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindTimeChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        time: e.detail.value
      })
    },
    //全选
    selectAll: function () {
      var that = this
      var week = that.data.week
      if (that.data.selectedAll == true) {
        for (var i = 0; i < week.length; i++) {
          const selected = week[i].selected; // 获取当前商品的选中状态
          week[i].selected = false; // 改变状态  
          that.setData({
            week: week,
            selectedAll: false
          });
        }
      } else {
        for (var i = 0; i < week.length; i++) {
          const selected = week[i].selected; // 获取当前商品的选中状态
          week[i].selected = true; // 改变状态  
          that.setData({
            week: week,
            selectedAll: true
          });
        }
      }
  
  
    },
    //单选
    selectList: function (e) {
      var that = this
      var week = that.data.week
      for (var i = 0; i < week.length; i++) {
        const DB_SHOPCAR_ID = e.currentTarget.dataset.id; // 获取data- 传进来的index
        if (DB_SHOPCAR_ID == week[i].DB_SHOPCAR_ID) {
          const selected = week[i].selected; // 获取当前商品的选中状态
          week[i].selected = !selected; // 改变状态  
          that.setData({
            week: week,
          });
        }
        if (week[i].selected == false) {
          that.setData({
            selectedAll: false
          })
          // return false;
        }
      }

    },
  }
})
