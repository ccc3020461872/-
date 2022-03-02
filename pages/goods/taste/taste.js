// pages/goods/classify/add/add.js
import  {tasteStringify, toPage} from '../../../utils/common/index'
import {
  addSpecificationsGroup, //新增
} from '../../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: null,
    shortcutList: ['辣度：不辣/微辣/中辣/重辣', "甜度：无糖/少糖/多糖/全糖", "温度：热饮/常温/少冰/多冰"],
    info: [],
    sameItem: null,  //找到重复的，颜色红色警示\
    sameStyle: "color: red;",
    create: true, //判断是创建还是修改, true是创建 false是修改
  },
  toOtherPage(e) {
    const {
      currentTarget: {
        dataset: {
          url
        }
      }
    } = e
    toPage(url)
  },
  // 添加一个口味名称输入框
  addInput(e) {
    const currentIndex = e.currentTarget.dataset.index
    this.changeInput('+', currentIndex)

  },
  // 点击删除按钮
  remove(e) {
    console.log(Date.now());
    const {
      currentTarget: {
        dataset: {
          idx,
          index
        }
      }
    } = e;
    this.changeInput('-', index, idx)
    console.log(idx, index);
    console.log(e);
  },
  // 点击快捷选择
  chooseFast({
    currentTarget: {
      dataset: {
        index
      }
    }
  }) {
    let {
      shortcutList,
      info
    } = this.data;
    let type = shortcutList[index].split('：');
    const attribute = type[0]
    const names = type[1].split('/')
      // 没有的话新增一个，在赋值
      console.log(info);
     
      this.initInfo();
      info[info.length - 1].nameValue = attribute;
      info[info.length - 1].nameNum.map((v, i) => {
        v.value = names[i]
      })
     if(!info[0].nameValue){
      info.splice(0,1)
     }
  
    this.setData({
      info
    })
    console.log(info);
  },
  // 添加或者删除口味名称 （小项）
  changeInput(type, currentIndex, idx) {
    let {
      info
    } = this.data
    if (type === '-') {
      if (info.length && info[currentIndex].nameNum) {
        console.log(info[currentIndex]);
        const de = info[currentIndex].nameNum.splice(idx, 1)
        console.log('de', de);
        console.log('idx', idx);
      }
    } else {
      info[currentIndex].nameNum.push({
        value: null,
        id: Date.now(),
      })
    }
    this.setData({
      info
    })
  },
  // 点击添加或者删除口味属性 （大项）
  doChangeTast(e) {
    const {
      currentTarget: {
        dataset: {
          type,
          index
        }
      }
    } = e;
    this.changeProperty(type, index)
  },
  //添加或者删除口味属性 （大项)
  changeProperty(type, currentIndex) {
    if (type === '-') {
      const {
        info
      } = this.data;
      if (info.length !== 0) {
        wx.showModal({
          content: '是否删除当前属性？同时会删除其子属性',
          success: res => {
            if(res.confirm){
              info.splice(currentIndex, 1)
              this.setData({
                info,
                sameItem: null
              })
              wx.showToast({
                title: '删除成功',
                icon: 'none'
              })
            }
          }
        }) 
      }
      
    } else {
      this.initInfo()
    }
  },
  // 新建一个口味对象
  initInfo() {
    const {
      info
    } = this.data
    console.log(info);
    info.push({
      nameNum: [{
          value: null,
          id: Date.now() + 1,
        }, {
          value: null,
          id: Date.now() + 2,
        },
        {
          value: null,
          id: Date.now() + 3,
        },
        {
          value: null,
          id: Date.now() + 4,
        }
      ],
      numId: Date.now() + 5,
      nameValue: null,
    })
    this.setData({
      info
    })
  },
  // 设置口味
  setName(e) {
    console.log(e);
    const {
      currentTarget: {
        dataset: {
          idx,
          index,
          type,
        }
      },
      detail: {
        value
      }
    } = e;
    const {
      info
    } = this.data;
    if (type && type === 'attribute') {
      info[index].nameValue = value
    } else {
      info[index].nameNum[idx].value = value
    }
    this.setData({
      info
    })
  },
  // 保存
  save(){
    console.log('保存',this.data.info);
    this.setData({
      sameItem: null
    })
    const { info } = this.data;
   
    const nameValueEmpty = info.find(v => {
      return !v.nameValue
    })
     // 先过滤掉item上面空的value
     info.map(v => {
      v.nameNum = v.nameNum.filter(v2 => v2.value)
     })
    if(nameValueEmpty){
      wx.showToast({
        title: '口味属性为必填项',
        icon: 'none'
      })
      return
    }
    const same = info.find((v , i, a) =>{
      return (
        a.find((v1, i1,) => {
          return v.nameValue === v1.nameValue && v.numId !== v1.numId
        })
      )
    }) 
    if(same){
      wx.showToast({
        title: '请勿添加相同的口味',
        icon: 'none'
      })
      this.setData({
        sameItem:same
      })
      return
    }
    wx.setStorageSync('taste', info)
    toPage()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let info
    if(options?.chooseTaste){
      info = typeof options.chooseTaste == 'string' ?  JSON.parse(options.chooseTaste) : info
    }else {
      info = ''
    }
    if(info){
      this.setData({
        info
      })
    }else {
      this.initInfo()
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const {
      globalData: {
        color
      }
    } = app;
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
    // const {
    //   info: dataInfo
    // } = this.data
    // if (dataInfo.length !== 0) {
    //   if (dataInfo.find(v => {
    //       return v.nameValue === null
    //     })) {
    //     return
    //   }
    // } else {
    //   return
    // }
    // const info = JSON.parse(JSON.stringify(this.data.info))
    // console.log(info);
    // const newArr = []
    // info.map((item) => {
    //   const arr2 = [];
    //   arr2.push(item.nameValue)
    //   item.nameNum.map(v => {
    //     arr2.push(v.value)
    //   })
    //   newArr.push(arr2.join('/').replace('/', ":"))
    // })
    // console.log(newArr);
    // console.log( tasteStringify(this.data.info));
    // wx.setStorageSync('taste', newArr.join(','))
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