// pages/index/shopSet/setProduct/setProduct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddState: true,
    switch1Checked: true,
    imgList: [],
    disabled: false,
    uploadimg: [],
    imgList1: [],
    dataList: [{
      G_IMG: 'https://keaidiansaas-1254002404.cos.ap-chengdu.myqcloud.com/img/good.jpg',
      G_NAME: '美味黄桃套餐',
      G_MONEY: 22
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  quxiao() {
    this.setData({
      hiddState: !this.data.hiddState
    })
  },
  //上传图片
  uploadImage() {
    var that = this
    wx.chooseImage({
      count: 3,
      camera: 'back',
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 多张照片上传
        console.log('多张照片上传', res.tempFilePaths, res.tempFilePaths.length)
        var tempFilePath = res.tempFilePaths

        that.setData({
          imgList: that.data.imgList.concat(tempFilePath)
        })

        console.log('imgList', that.data.imgList)
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length
        var i = 0;
        that.uploadImageSave1(tempFilePath, successUp, failUp, i, length);

      }
    })
  },
  // 多张照片上传
  uploadImageSave1(filePaths, successUp, failUp, i, length) { //递归调用
    console.log(i + "file路径为" + filePaths);
    var that = this
    if (filePaths[i]) {
      var Key = util.getRandFileName(filePaths[i]);
      cos.postObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: currentDate + '/images/' + Key,
          FilePath: filePaths[i],
        },
        function (err, data) {
          // wx.hideLoading();
          if (data && data.Location) {
            console.log('https://' + data.Location)
            var V_BACKGRADE = 'https://' + data.Location
            var imgList1 = that.data.imgList1
            imgList1.push(V_BACKGRADE)
            that.setData({
              imgList1: imgList1,
              V_BACKGRADE: imgList1,
            })

            i++;
            if (i == length) {
              console.log('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
            } else { //递归调用uploadDIY函数
              that.uploadImageSave1(filePaths, successUp, failUp, i, length);
            }
          } else {
            wx.showToast({
              title: '上传失败',
              icon: 'error',
              duration: 2000
            });
            failUp++;
          }
        });

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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