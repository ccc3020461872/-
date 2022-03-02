// component/con-summary/con-summary.js
import * as echarts from '../ec-canvas/echarts';
import {
  currentData
} from '../../utils/util';
import {
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
    sdate: {
      type: String,
      value: ''
    },
    edate: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
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
  },
  observers: {
    'sdate, edate': function (sdate, edate) {
      // 在 sdate 或者 edate 被设置时，执行这个函数
      const that = this;
      treeXarray = [];
      treeXarrayData = [];
      that.linechartsComponnet = that.selectComponent('#businessTrend'); //折线图
      console.log(that.linechartsComponnet)
      wx.getStorage({
        key: 'shopid',
        success(res) {
          shopid = res.data;
          console.log(shopid, "shopid=============")
          setTimeout(() => {
            that.computedData();
          }, 300)
        }
      })
    }

  },
  lifetimes: {
    attached() {},
    // ready: function () {
    //   const that = this;
    //   treeXarray = [];
    //   treeXarrayData = [];
    //   that.linechartsComponnet = that.selectComponent('#businessTrend'); //折线图
    //   console.log(that.linechartsComponnet)
    //   wx.getStorage({
    //     key: 'shopid',
    //     success(res) {
    //       shopid = res.data;
    //       console.log(shopid, "shopid=============")
    //       setTimeout(() => {
    //         that.computedData();
    //       }, 300)
    //     }
    //   })
    // },
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
    //营业汇总
    computedData() {
      const that = this;
      newOrderStatistics({
        SHOP_ID: shopid,
        sDate: that.data.sdate,
        eDate: that.data.edate
      }).then(data => {
        console.log(data, "营业汇总");
        treeXarray = [];
        treeXarrayData = [];
        if (data.result == "success") {
          that.setData({
            selectDay: data.selectDay,
            wxPay: data.orderWX,
            aPay: data.orderALP
          })

          let dateList = data.data
          dateList.forEach((item) => {
            treeXarray.push(item.selectDate)
            treeXarrayData.push(item.allMoney)

          })
          console.log(treeXarray, treeXarrayData)
          that.init_lineCharts()
          that.getPieOption()
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
                  color: '#1E5051'
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
              color: '#1E5051',
              fontSize: '80',
              lineStyle: {
                color: '#1E5051'
              },
              areaStyle: {
                color: 'rgb(252, 223, 195)'
              },
            }
          },
          data: treeXarrayData, //此处为数组
          // data: [999, 666, 523, 454, 543, 2132, 1, ], //此处为数组
        }]
      };
      return option;
    },

    //饼图
    getPieOption: function () {
      var that = this
      // console.log('=======', that.data.wxPay, that.data.aPay)
      pieChart.setOption({
        tooltip: {
          show: true,
          formatter: "{b} : {c} ({d}%)"
        },
        color: ['#4285F4', '#1E5051'],
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
              value: that.data.aPay,
              name: '支付宝'
            },
            {
              value: that.data.wxPay,
              name: '微信'
            },
          ]
        }]
      })

      // return option;
    },


  }
})