<template>
  <div ref="echartsBar" :style="{width: '800px', height: '600px', display: 'inline-block'}" class="echarts"></div>

</template>

<script>

  const STATION_COLOR = [
    '#00cddb',
    '#2a54de',
    '#37516c',
    '#3420e6',
    '#1ddd98',
    '#15de57',
  ]

  export default {
    name: "EchartsForce",
    data () {
      return {
        chartInstance: null
      }
    },
    props: {
      rawData: {
        type: Array,
        default: () => {
          return null
        }
      }
    },
    watch: {
      // 如果 `rawData` 发生改变，这个函数就会运行
      rawData (curVal, oldVal) {

        this.updateEcharts();
      }
    },
    mounted () {
      this.initEcharts()
      // console.log('sub mount over')
    },
    methods: {
      parseRelation (data) {

        if (!data || data.length === 0) return null;

        let model = [], ci = 0;
        let stationMap = {};

        return data.reduce((p, c, i) => {

          let modelIdx = model.indexOf(c.train_type);
          //找到车型
          if (modelIdx > -1) {

            p.modelSum[modelIdx].value++
          } else {

            model.push(c.train_type);
            p.categories.push({
              "name": c.train_type,
              "keyword": {},
              "base": c.train_type
            });

            p.modelSum.push({
              name: c.train_type,
              value: 1
            })
          }

          p.nodes.push({
            "name": c.sn,
            "value": 1,
            "category": modelIdx
          });

          p.links.push({
            source: Math.floor(Math.random() * data.length),
            target: Math.floor(Math.random() * data.length)
          })

          return p;

        }, {
          "type": "force",
          "categories": [],
          "nodes": [],
          "links": [],
          "modelSum": []
        });
      },
      updateEcharts () {

        //console.log(this.rawData);
        this.drawEcharts();

      },
      initEcharts () {

        if(this.chartInstance) return;

        let initFinished = false;

        // 基于准备好的dom，初始化echarts实例
        this.chartInstance = this.$echarts.init(this.$refs.echartsBar);

        this.chartInstance.on('rendered', function () {
          if(initFinished) return;
          let radarStyle = document.createElement("style");
          radarStyle.innerHTML = `
           .echarts > div:nth-child(1) > canvas:nth-child(2) {
            animation: radar-beam 30s infinite;
            animation-timing-function: linear;
            transform-origin: center;
          }
          @keyframes radar-beam {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `;

          document.getElementsByTagName("head")[0].appendChild(radarStyle);
          initFinished = true;
        });

      },
      drawEcharts () {

        this.initEcharts()

        if(!this.rawData || this.rawData.length === 0 ) return;

        let result = this.parseRelation(this.rawData);

        //console.log(result);
        if (!result || result.length === 0) return;

        let option = {
          color: STATION_COLOR,
          legend: {
            data: ['CRH380B', 'CRH3C', 'CRH380BL', 'CR400BF', 'CR400BF-A', 'CRH3A'],
            textStyle: {
              color: 'white'
            }
          },
          series: [{
            name: '车组力反馈图',
            type: 'graph',
            layout: 'force',
            animation: false,
            label: {
              normal: {
                position: 'right',
                formatter: '{b}'
              }
            },
            draggable: true,
            data: result.nodes.map(function (node, idx) {
              node.id = idx;
              return node;
            }),
            categories: result.categories,
            force: {
              edgeLength: 5,
              repulsion: 20,
              gravity: 0.2
            },
            edges: result.links
          },
            {
              name: '车型配属饼图',
              type: 'pie',
              radius: ['45%', '50%'],
              labelLine: {
                normal: {
                  length: 25,
                  length2: 65,
                  lineStyle: {
                    type: 'solid'
                  }
                }

              },
              label: {
                normal: {
                  formatter: '{b} : {c}列' + '\n' + '[{d}%]',
                  borderWidth: 0,
                  borderRadius: 4,
                  height: 30,
                  fontSize: 15,
                  align: 'center',
                  color: '#ffffff',
                  rich: {
                    b: {
                      fontSize: 18,
                      lineHeight: 5,
                      color: '#41B3DC'
                    }

                  }
                }
              },
              data: result.modelSum
            },
            {
              name: 'halo',
              type: 'gauge',
              splitNumber: 10, //刻度数量
              min: 0,
              max: 100,
              radius: '80%', //图表尺寸
              center: ['50%', '50%'],
              axisLine: {
                show: true,
                lineStyle: {
                  width: 0,
                  shadowBlur: 0,
                  color: [
                    [0.05, '#cf3'],
                    [0.10, '#9f3'],
                    [0.15, '#6f3'],
                    [0.20, '#3f3'],
                    [0.25, '#3f6'],
                    [0.30, '#3f9'],
                    [0.35, '#3fc'],
                    [0.40, '#3ff'],
                    [0.45, '#3cf'],
                    [0.50, '#39f'],
                    [0.55, '#36f'],
                    [0.60, '#33f'],
                    [0.65, '#63f'],
                    [0.70, '#93f'],
                    [0.75, '#c3f'],
                    [0.80, '#f3f'],
                    [0.85, '#f3c'],
                    [0.90, '#f39'],
                    [0.95, '#f36'],
                    [1, '#f43']
                  ]
                }
              },
              axisTick: {
                show: true,
                lineStyle: {
                  color: 'auto',
                  width: 2
                },
                length: 20,
                splitNumber: 5
              },
              splitLine: {
                show: true,
                length: 22,
                lineStyle: {
                  color: 'auto',
                }
              },
              axisLabel: {
                show: false
              },
              pointer: { //仪表盘指针
                show: 0,
                length: '70%',
                width: 2
              },
              detail: {
                show: 0
              }
            },
            {
              type: 'pie',
              zlevel: 2,
              silent: true,
              radius: ['55%', '58%'],
              startAngle: -65,
              label: {
                normal: {
                  show: false
                },
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: _pie2()
            },
            {
              name: '外圈',
              type: 'pie',
              startAngle: 315,
              hoverAnimation: false,
              radius: ["68%", "69%"],
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '10',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 25,
                itemStyle: {
                  normal: {
                    color: "rgba(0,0,0,0)"
                  }
                }
              },
                {
                  value: 75,
                  itemStyle: {
                    normal: {
                      color: "rgba(20,198,249,1)"
                    }
                  }
                },
              ]
            }
          ]
        }

        function _pie2 () {
          let dataArr = [];
          for (let i = 0; i < 8; i++) {
            if (i % 2 === 0) {
              dataArr.push({
                name: (i + 1).toString(),
                value: 25,
                itemStyle: {
                  normal: {
                    color: "rgba(88,142,197,0.5)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)"
                  }
                }
              })
            } else {
              dataArr.push({
                name: (i + 1).toString(),
                value: 20,
                itemStyle: {
                  normal: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)"
                  }
                }
              })
            }

          }
          return dataArr

        }

        this.chartInstance.setOption(option);
      }
    }
  }
</script>

<style scoped>

</style>
