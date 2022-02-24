// component/con-center/con-center.js
const app=getApp();
let userName;
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

  },
  lifetimes:{
    attached(){
      const _this=this;
      let bossUser=app.globalData.bossUser;
      let Storeinfo=app.globalData.Storeinfo;
      userName=app.globalData.bossUser.USERNAME
      console.log(bossUser,Storeinfo)
      _this.setData({
        Storeinfo:Storeinfo
      })
      
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updatePwd(){
      wx.navigateTo({
        url: '/pages/index/mine/updatePwd/updatePwd',
      })
    },
    toweb(){
      wx.navigateTo({
        url: '/pages/index/mine/web-view/web-view',
      })
    },
    loginOut(){
      wx.navigateBack({
        delta:2 //返回上一级页面
      })
    }
  }
})
