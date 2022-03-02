// pages/goods/addGoods/forms/note/note.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nbTitle: "示例",
    imgList: ['https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/example.png', 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/note.png'],
    currentImg: 1,
    height: 0,
    info: null,
    scrollTop: 0, //页面的滚动距离
    type: null,
  },
  imageLoad() {
    let query = wx.createSelectorQuery();
    const doScroll = () => {
      const {
        info: {
          type,
          name
        },
        height
      } = this.data
      let top;
      // top 的计算公式为 指定标签的图片高度 ➗ 图片的总高度 = 指定标签占图片总高度的比例 然后得出的是小于1的小数，因为在js中小数的计算不准确，所以我保留三位小数 将小数乘以一千 最后 ➗ 一千； 用图片的总高度 ✖ 指定标签的图片占比 就能得到指定标签的位置
      if(type === 'example'){
        switch (name) {
          case 'price': //价格
            top = 0
            break;
          case 'vipprice': //vip价格
            top = height * 147 / 1000
            break;
          case 'taste':  //口味
            top = height * 281 / 1000
            break;
          case 'accessories': //辅料
            top = height * 468 / 1000
            break;
          default:
            top = height
            break;
        }
      }
      this.setData({
        scrollTop: `${top}px`,
      })
    }
    query.select('#img').boundingClientRect(rect => {
      this.setData({
        height: rect.height,
      })
      doScroll()
    }).exec();

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      info
    } = options;
    if (info) {
      info = JSON.parse(info)
      this.setData({
        info
      })
      switch (info.type) {
        case 'example':
          this.setData({
            nbTitle: '示例'
          })
          break;
        default:
          this.setData({
            nbTitle: '说明'
          })
          break;
      }

    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onPageScroll(e) {
    console.log(e);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const {info: {type}} = this.data;
    const currentImg = type === 'example' ? 1 : 0;
    this.setData({
      currentImg
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})