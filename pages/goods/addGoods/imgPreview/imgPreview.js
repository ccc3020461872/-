// pages/goods/addGoods/imgPreview/imgPreview.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: null,
    color: null,
    list: [],
    current: null, //当前展示的滑块的下标，由上一个页面传过来，点击哪个就传哪个的下标
  },
  changeImg(e){
    const {detail: {dx}} = e;
    const {current, list} = this.data
    if(current+1 === list.length){
     if(dx > 20){
       wx.showToast({
         title: '已经到底了',
         icon: 'none'
       })
     }
    }
    if(current === 0) {
      if(dx < -20){
        wx.showToast({
          title: '已经到头了',
          icon: 'none'
        })
      }
    }
  },
  // 点击确定
  chooseImg(){
    const { list, current } = this.data
    const imgPath = list[current];
    wx.showModal({
      content: '是否设置当前图片为菜品图片',
      success(res){
        if(res.confirm){
          wx.setStorageSync('imgPath', imgPath);
          wx.navigateBack({
            delta: 2,
          })
        }
      }
    })
  },
  swiperChange(e){
    const {detail: {current, source} } = e;
    this.setData({
      current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log('options',options);
   const {data: imageList,current} = options
   this.setData({
     list: JSON.parse(imageList),
     current: parseInt(current)
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const {globalData: {color}} = app
    this.setData({
      color
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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