<template>

  <div ref="echartsBar" :style="{width: width + 'px', height: height + 'px'}"></div>

</template>

<script>
  export default {
    name: 'echartsBar',
    data () {
      return {
        chartinstance: null
      }
    },
    props: {
      width: {
        type: Number,
        default: () => {
          return 600;
        }
      },
      height: {
        type: Number,
        default: () => {
          return 400;
        }
      }
    },
    watch: {
      callbackdata() {

        this.updateEcharts();
      }
    },
    mounted () {
      this.drawEcharts()
    },
    methods: {
      updateEcharts () {
        console.log(this.width, this.height);

        setTimeout( () => {
          this.chartInstance.resize();

        },100);

      },
      drawEcharts () {
        // 基于准备好的dom，初始化echarts实例
        this.chartInstance = this.$echarts.init(this.$refs.echartsBar);
        // 绘制图表
        let data = [{
          name: '区域1',
          itemStyle: {
            color: '#da0d68'
          },
          children: [{
            name: '服务站1',
            value: 1,
            itemStyle: {
              color: '#975e6d'
            },
            children: [{
              name: '车型1',
              value: 1,
              itemStyle: {
                color: '#f99e1c'
              }
            }]
          }, {
            name: '服务站2',
            itemStyle: {
              color: '#e0719c'
            },
            children: [{
              name: '车型1',
              value: 1,
              itemStyle: {
                color: '#f99e1c'
              }
            }, {
              name: '车型2',
              value: 1,
              itemStyle: {
                color: '#ef5a78'
              }
            }, {
              name: '车型3',
              value: 2,
              itemStyle: {
                color: '#d711bd'
              }
            }]
          }]
        }, {
          name: '区域2',
          itemStyle: {
            color: '#da1d23'
          },
          children: [{
            name: '服务站3',
            itemStyle: {
              color: '#dd4c51'
            },
            children: [{
              name: '车型1',
              value: 1,
              itemStyle: {
                color: '#3e0317'
              }
            }, {
              name: '车型2',
              value: 1,
              itemStyle: {
                color: '#e62969'
              }
            }, {
              name: '车型3',
              value: 1,
              itemStyle: {
                color: '#6569b0'
              }
            }, {
              name: '车型4',
              value: 1,
              itemStyle: {
                color: '#ef2d36'
              }
            }]
          }, {
            name: '服务站4',
            itemStyle: {
              color: '#c94a44'
            },
            children: [{
              name: '车型2',
              value: 1,
              itemStyle: {
                color: '#b53b54'
              }
            }, {
              name: '车型3',
              value: 1,
              itemStyle: {
                color: '#a5446f'
              }
            }]
          }, {
            name: '服务站5',
            itemStyle: {
              color: '#dd4c51'
            },
            children: [{
              name: '车型1',
              value: 1,
              itemStyle: {
                color: '#f2684b'
              }
            }, {
              name: '车型2',
              value: 1,
              itemStyle: {
                color: '#e73451'
              }
            }, {
              name: '车型3',
              value: 1,
              itemStyle: {
                color: '#e65656'
              }
            }, {
              name: '车型4',
              value: 1,
              itemStyle: {
                color: '#f89a1c'
              }
            }, {
              name: '车型5',
              value: 1,
              itemStyle: {
                color: '#aeb92c'
              }
            }, {
              name: '车型6',
              value: 1,
              itemStyle: {
                color: '#4eb849'
              }
            }]
          }, {
            name: '服务站6',
            itemStyle: {
              color: '#f7a128'
            },
            children: [{
              name: '车型1',
              value: 1,
              itemStyle: {
                color: '#f26355'
              }
            }, {
              name: '车型3',
              value: 1,
              itemStyle: {
                color: '#e2631e'
              }
            }, {
              name: '车型4',
              value: 1,
              itemStyle: {
                color: '#fde404'
              }
            }, {
              name: '车型6',
              value: 1,
              itemStyle: {
                color: '#7eb138'
              }
            }]
          }]
        }, {
          name: '区域3',
          itemStyle: {
            color: '#ebb40f'
          },
          children: [{
            name: '服务站7',
            itemStyle: {
              color: '#e1c315'
            },
            children: [{
              name: '车型1',
              value: 1,
              itemStyle: {
                color: '#9ea718'
              }
            }, {
              name: '车型2',
              value: 1,
              itemStyle: {
                color: '#94a76f'
              }
            }, {
              name: '车型3',
              value: 1,
              itemStyle: {
                color: '#d0b24f'
              }
            }, {
              name: '车型4',
              value: 1,
              itemStyle: {
                color: '#8eb646'
              }
            }]
          }, {
            name: '服务站8',
            itemStyle: {
              color: '#b09733'
            },
            children: [{
              name: '车型1',
              value: 1,
              itemStyle: {
                color: '#8f1c53'
              }
            }, {
              name: '车型3',
              value: 1,
              itemStyle: {
                color: '#b34039'
              }
            }, {
              name: '车型4',
              value: 1,
              itemStyle: {
                color: '#ba9232'
              }
            }, {
              name: '车型5',
              value: 1,
              itemStyle: {
                color: '#8b6439'
              }
            }]
          }]
        }]

        let option = {
          title: {
            text: '各服务站车组配属'
          },
          series: {
            type: 'sunburst',
            highlightPolicy: 'ancestor',
            data: data,
            center: ['50%', '50%'],
            radius: [0, '95%'],
            sort: null,
            levels: [{}, {
              r0: '15%',
              r: '35%',
              itemStyle: {
                borderWidth: 2
              },
              label: {
                rotate: 'tangential'
              }
            }, {
              r0: '35%',
              r: '70%',
              label: {
                align: 'right'
              }
            }, {
              r0: '70%',
              r: '72%',
              label: {
                position: 'outside',
                padding: 3,
                silent: false
              },
              itemStyle: {
                borderWidth: 3
              }
            }]
          }
        }

        this.chartInstance.setOption(option);

        window.chartInstance = this.chartInstance;
      }
    }
  }
</script>

<style scoped>

</style>
