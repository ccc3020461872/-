// component/con-summary/con-summary.js
import * as echarts from '../ec-canvas/echarts';
import { currentData } from '../../utils/util';

import {
  orderStatistics,
  newOrderStatistics, //新营业汇总
} from '../../utils/api';
const app = getApp();
let treeXarray = [];
let treeXarrayData = [];
let barChart = null;
let shopid;

let pieChart = null;
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
    navlist: ['营业汇总', '营业明细'],
    currentIndex: 0,
    date: currentData(),
    interval: '',
    //折线图
    line_ec: {
      lazyLoad: true // 延迟加载
    },
    ec: {
      onInit: function (canvas, width, height) {
        pieChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(pieChart);
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return pieChart;
      },
      lazyLoad: false // 延迟加载
    }, //饼图
    array1: ['当日', '近一周', '近一月', '近一年'],
    index1: 0,
  },
  lifetimes: {
    attached() {},
    ready: function () {
      const _this = this;

      console.log(app.globalData.StoreArry, "StoreArry")
      let storeName = [];
      //门店的名称
      app.globalData.StoreArry.forEach(item => {
        storeName.push(item.SHOP_NAME)
      })
      _this.setData({
        array: storeName
      })
      treeXarray = [];
      treeXarrayData = [];
      _this.linechartsComponnet = _this.selectComponent('#businessTrend'); //折线图
      wx.getStorage({
        key: 'shopName',
        success(res) {
          _this.setData({
            storeName: res.data
          })
        }
      })
      wx.getStorage({
        key: 'shopid',
        success(res) {
          shopid = res.data;
          console.log(shopid, "shopid=============")
          wx.setStorage({
            data: res.data,
            key: 'chocieshopid',
          })
          // 、、、、、、、、////////////////////////
          shopid = '300000001'
          wx.setStorage({
            data: shopid,
            key: 'chocieshopid',
          })
          // 以上后期删掉////////////////////////////

          setTimeout(() => {
            _this.computedData();

          }, 300)


        }
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toDetail() {
      wx.navigateTo({
        url: '/agentpages/pages/pay-detail/pay-detail',
      })
    },
    choose(e) {
      console.log(e)
      // 1.设置最新的index
      this.setData({
        currentIndex: e.currentTarget.dataset.idx
      })
    },
    bindPickerChange: function (e) {
      const _this = this;
      _this.linechartsComponnet = _this.selectComponent('#businessTrend'); //折线图
      console.log('picker发送选择改变，携带值为', e.detail.value)
      _this.setData({
        storeName: _this.data.array[e.detail.value]
      })
      //判断选择的名称和门店数组里面的门店名称相等，将选择中的门店id赋值给shopid
      console.log(app.globalData.StoreArry)
      for (var i = 0; i < app.globalData.StoreArry.length; i++) {
        if (_this.data.array[e.detail.value] == app.globalData.StoreArry[i].SHOP_NAME) {
          shopid = app.globalData.StoreArry[i].SHOP_ID
        }
      }
      console.log(shopid, "chocieShopid")
      wx.setStorage({
        data: shopid,
        key: 'chocieshopid',
      })
      treeXarray = [];
      treeXarrayData = [];
      _this.computedData();
    },
    // 当日营收
    bindChange: function (e) {
      const _this = this;
      console.log('picker发送选择改变，携带值为', e.detail.value)
      _this.setData({
        index1: e.detail.value
      })

      _this.computedData();
    },
    bindDateChange: function (e) {
      const _this = this;
      console.log('picker发送选择改变，携带值为', e.detail.value)
      _this.setData({
        date: e.detail.value
      })
      treeXarray = [];
      treeXarrayData = [];
      _this.computedData();
    },
    //近一周营业汇总
    computedData() {
      const _this = this;
      newOrderStatistics({
        SHOP_ID: shopid,
        selectDate: _this.data.date,
        selectType: _this.data.index1 * 1 + 1
      }).then(data => {
        console.log(data, "营业汇总");
        treeXarray = [];
        treeXarrayData = [];
        if (data.result == "success") {
          _this.setData({
            selectDay: data.selectDay,
            wxPay: data.orderWX,
            aPay: data.orderALP
          })
          let dateList
          if (_this.data.index1 == 0 || _this.data.index1 == 1) {
            dateList = data.weekRes
            dateList.forEach((item) => {
              treeXarray.push(item.selectDate)
              treeXarrayData.push(item.allMoney)
            })
          } else if (_this.data.index1 = 2) {
            dateList = data.monthRes
            dateList.forEach((item) => {
              treeXarrayData.push(item.allMoney)
            })
            treeXarray.push(dateList[0].selectDate, dateList[5].selectDate, dateList[11].selectDate, dateList[16].selectDate, dateList[21].selectDate, dateList[26].selectDate, dateList[dateList.length - 1].selectDate, )
          } else {
            dateList = data.yearRes
            dateList.forEach((item) => {
              treeXarray.push(item.selectDate)
              treeXarrayData.push(item.allMoney)
            })
          }

          _this.init_lineCharts()
          _this.getPieOption()

        } else if (data.result == "error") {
          wx.showToast({
            title: data.data,
            icon: 'none'
          })
        }
      })
    },
    //初始化图表--折线图
    init_lineCharts: function () {
      this.linechartsComponnet.init((canvas, width, height) => {
        // 初始化图表
        const lineChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });

        lineChart.setOption(this.getLineOption());

        //此处为折线图的点击事件，点击展示折点信息
        lineChart.on('click', function (handler, context) {
          var handlerValue = handler.name + ' :  ' + handler.value
          wx.showToast({
            title: handlerValue,
            icon: 'none',
            duration: 1200,
            mask: true
          })
        });
        return lineChart;
      });
    },

    /**
     * 折线图
     */
    getLineOption: function () {
      console.log(treeXarray, treeXarrayData, '========================================')
      var option = {
        grid: {
          top: '15%', //距上边距
          left: '0%', //距离左边距
          right: '5%', //距离右边距
          bottom: '10%', //距离下边距
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          //网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#eee'],
              width: 1,
              type: 'dashed '
            },
          },

          data: treeXarray, //此处为数组
          //刻度线
          axisTick: {
            show: false,
          },
          //坐标线
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eee', //左边线的颜色
              width: '1' //坐标线的宽度
            }
          },
          axisLabel: {
            color: '#666', //坐标值得具体的颜色
            interval: this.data.interval, //x轴间隔多少显示刻度
            fontSize: 10,
          }
        }],
        yAxis: [{
          gridIndex: 0,
          type: 'value',
          boundaryGap: true,
          //坐标区域
          splitLine: {
            show: true, //改设置显示坐标区域内的y轴分割线
            lineStyle: {
              color: ['#eee'],
              width: 1,
              type: 'dashed '
            },

          },
          //刻度线
          axisTick: {
            show: false,
          },
          //坐标线
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eee', //左边线的颜色
              width: '1' //坐标线的宽度
            }
          },
          //坐标值
          axisLabel: {
            textStyle: {
              color: '#666', //坐标值得具体的颜色

            }
          }
        }],
        series: [{
          name: '营业趋势',
          type: 'line',
          seriesLayoutBy: 'row',
          emphasis: {
            focus: 'series'
          },
          smooth: true,
          center: ['100%', '100%'],
          //如果不需要阴影部分，直接删除areaStyle就可以了
          areaStyle: { //区域填充样式
            normal: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#833738'
                },
                {
                  offset: 1,
                  color: '#ffffff'
                }
              ], false),
            }
          },
          itemStyle: {
            normal: {
              color: '#833738',
              fontSize: '80',
              lineStyle: {
                color: '#833738'
              },
              areaStyle: {
                color: 'rgb(252, 223, 195)'
              },
            }
          },
          // data: treeXarrayData, //此处为数组
          data: [999, 666, 523, 454, 543, 2132, 1, ], //此处为数组
        }]
      };
      return option;
    },

    //饼图
    getPieOption: function () {
      var _this = this
      // console.log('=======', _this.data.wxPay, _this.data.aPay)
      pieChart.setOption({
        tooltip: {
          show: true,
          formatter: "{b} : {c} ({d}%)"
        },
        color: ['#4285F4', '#F57904'],
        calculable: true,
        series: [{
          name: '分类',
          type: 'pie',
          center: ['50%', '40%'],
          radius: 80,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inner',
                formatter: function (params) {
                  return (params.percent - 0).toFixed(0) + '%'
                }
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              label: {
                show: true,
                formatter: "{b}\n{d}%"
              }
            }
          },
          data: [{
              value: _this.data.aPay,
              name: '支付宝'
            },
            {
              value: _this.data.wxPay,
              name: '微信'
            },
          ]
        }]
      })

      // return option;
    },


  }
})