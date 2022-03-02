// component/con-effect/con-effect.js
import * as echarts from '../ec-canvas/echarts';
import {
  currentData
} from '../../utils/util';
import {
  getOrderEffect,
  getNewOrderEffect
} from '../../utils/api'
let treeXarray = []
let treeXarrayData = [];
let barChart = null;
let scatterChart = null;
let shopid;
let finallArry = []; //最终数组
let activityArry = ['活动参与人数']; //活动参与人数
let dateArry = ['product']; //日期
let checkArry = ['领券数量']; //核销
let couponsArry = ['核销数量']; //领券
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
    region: [],
    index: 0,
    //柱形图
    ecBar: {
      onInit: function (canvas, width, height, dpr) {
        barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        return barChart;
      }
    },
    //折线图
    ecScatter: {
      onInit: function (canvas, width, height, dpr) {
        scatterChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(scatterChart);
        return scatterChart;
      }
    },
  },
  observers: {
    'sdate, edate': function (sdate, edate) {
      // 在 sdate 或者 edate 被设置时，执行这个函数
      const _this = this;
      wx.getStorage({
        key: 'shopid',
        success(res) {
          shopid = res.data;
          treeXarray = [];
          treeXarrayData = [];
          finallArry = [];
          setTimeout(() => {
            _this.computedData();
          }, 300)

        }
      })
    }

  },
  lifetimes: {
    // ready() {
    //   const _this = this;
    //   wx.getStorage({
    //     key: 'shopid',
    //     success(res) {
    //       shopid = res.data;
    //       treeXarray = [];
    //       treeXarrayData = [];
    //       finallArry = [];
    //       setTimeout(() => {
    //         _this.computedData();
    //       }, 300)

    //     }
    //   })
    // }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindRegionChange(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value,
      })
    },
    computedData() {
      const _this = this;
      getNewOrderEffect({
        SHOP_ID: shopid,
        selectDate: _this.data.date
      }).then(data => {
        console.log(data, "数据统计")
        treeXarray = [];
        treeXarrayData = [];
        finallArry = [];
        if (data.result == "success") {
          //新增会员数量
          data.customer.forEach(item => {
            treeXarray.push(item.selectDate)
            treeXarrayData.push(item.allNumber);
          })
          activityArry = ['活动参与人数']; //活动参与人数
          dateArry = ['product']; //日期
          checkArry = ['领券数量']; //核销
          couponsArry = ['核销数量']; //领券
          //营销参与人数
          data.activity.forEach(item => {
            dateArry.push(item.date)
            activityArry.push(item.activityNumber)
            checkArry.push(item.couponsNumber)
            couponsArry.push(item.checkNumber)

          })
          // 活动列表
          let text
          data.couponList.forEach(item => {
            if (item.TYPE == 3) {
              text = '回顾券'
            } else if (item.TYPE == 2) {
              text = '活动券'
            } else {
              text = '新人券'
            }
            _this.data.region.push(text + item.COUPON_NAME)

          })
          _this.setData({
            region: _this.data.region,
            couponList: data.couponList
          })
          finallArry.push(dateArry, activityArry, checkArry, couponsArry);
          // console.log(dateArry, activityArry, checkArry, couponsArry, finallArry)
          //柱形图
          barChart.setOption({
            // 指定图表的配置项和数据
            grid: {
              top: '10%', //距上边距
              left: '3%', //距离左边距
              right: '0%', //距离右边距
              bottom: '10%', //距离下边距
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: treeXarray,
              boundaryGap: true,
              //网格样式
              splitLine: {
                show: false
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
                  fontSize: 10
                },
                rotate: 45
              }
            },
            yAxis: {
              type: 'value', //自定义y轴的数据必须设置该属性
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

            },
            series: [{
              name: '会员数量',
              type: 'bar',
              data: treeXarrayData,
              //设置柱子的宽度
              barWidth: 15,
              label: {
                show: true,
                position: 'top',
                textStyle: { //数值样式
                  color: '#333',
                  fontSize: 10
                }
              },
              //柱线图配置样式
              itemStyle: {
                //通常情况下：
                normal: {
                  barBorderRadius: [5, 5, 0, 0], //设置圆角
                  color: "#f57904"
                },
              },
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }],
          });
          //折线图
          scatterChart.setOption({
            // 指定图表的配置项和数据
            grid: {
              top: '15%', //距上边距
              left: '3%', //距离左边距
              right: '0%', //距离右边距
              bottom: '10%', //距离下边距
              containLabel: true
            },
            legend: {
              icon: 'rect',
              itemWidth: 15,
              itemHeight: 2,
              itemGap: 30,
            },
            dataset: {
              source: finallArry
            },
            xAxis: {
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
                  fontSize: 10
                },
                rotate: 45
              }
            },
            yAxis: {
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
            },
            series: [{
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: {
                  focus: 'series'
                },
                //线条的样式
                itemStyle: {
                  color: "#1E5051",
                  opacity: 0 //为0不会绘制图形拐点消失 小圆点消失
                }
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: {
                  focus: 'series'
                },
                //线条的样式
                itemStyle: {
                  color: "#21ED8A",
                  opacity: 0 //为0不会绘制图形拐点消失 小圆点消失
                }
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: {
                  focus: 'series'
                },
                //线条的样式
                itemStyle: {
                  color: "#80A8F1",
                  opacity: 0 //为0不会绘制图形拐点消失 小圆点消失
                }
              },

            ]
          });
        } else if (data.result == "error") {
          wx.showToast({
            title: data.data,
            icon: 'none'
          })
        }
      })
    },

  }
})