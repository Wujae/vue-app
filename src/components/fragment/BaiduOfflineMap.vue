<template>
  <tech-frame v-bind="frameInitOptions">
    <div id="baiduOfflineDivContainer" ref="echartsBar" class="baidu-offline-map-div"></div>

  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import thmInterfaceService from '../../service/ThmInterfaceService'
  require('echarts/extension/bmap/bmap');

  import { mapGetters } from 'vuex'

  const  LVL_COLOR = {
    A: '#cf686e',
    B: '#cfdd3e',
    C: '#00c8da',
    NORMAL: '#19da94'
  };

  export default {
    name: "BaiduOfflineMap",
    components: {TechFrame},
    data: function () {
      return {
        chartInstance: null,
        mapData: null
      }
    },
    props: {
      frameInitOptions: {
        type: Object,
        default: () => {
          return {
            size: {width: 7 * 150, height: 150 * 5},
            blurDistance: 3,
            connerClip: [0, 0,  0, 0]
          }
        }
      }
    },
    computed:{
      ...mapGetters([
        'getTrains'
      ])
    },
    watch: {
      getTrains (newv) { //newv 就是改变后的state.trains值

        this.updateMap(newv)
      }
    },
    methods: {
      updateMap (data) {

        //console.log('map init', data)

        if(!data || data.length === 0) return;

        /**
         * gps : {
         * ​​​al_a: "15",
         * ​​​al_all: "159"​,
         * ​​al_b: "31"​​​,
         * al_c: "113",
         * ​​​alertCount: "15/31/113/159",
         * ​​​gps_lat: "26.1964"​,
         * ​​gps_long: "105.8619"​,
         * ​​​sn: "3050"​
         * }
         */
        let seriesData = data.map((gps) => {
          return {
            name: gps.sn,
            value: [gps.gps_long, gps.gps_lat, gps.al_all],
            faultCount: gps.alertCount,
            itemStyle: {
              normal: {
                color: gps.al_a > 0 ? LVL_COLOR.A : gps.al_b > 0 ? LVL_COLOR.B : gps.al_c > 0 ? LVL_COLOR.C : LVL_COLOR.NORMAL,
                shadowBlur: 10,
                shadowColor: '#333'
              }
            }
          }
        })

        this.mapData = seriesData

        this.drawEcharts()


      },
      initEcharts () {
        if(this.chartInstance) return;

        // 基于准备好的dom，初始化echarts实例
        this.chartInstance = this.$echarts.init(this.$refs.echartsBar);

      },
      drawEcharts () {

        this.initEcharts();

        if(!this.mapData || this.mapData.length === 0) return;

        let option = {

          title: {
            text: '车组实时监控',
            subtext: 'Data from WTDS',
            left: 'left',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: (param) => {

              return `${param.seriesName}<br/>${param.data.name}:${param.data.faultCount}`
            }
          },
          bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            scaleLimit: {
              min: 5,
              max: 8
            },
            roam: true,
          },
          series : [
            {
              name: '车组运行',
              type: 'scatter',
              coordinateSystem: 'bmap',
              data: this.mapData,
              symbolSize: 10,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: true
                }
              }
            },
            {
              name: '故障数排名前五',
              type: 'effectScatter',
              coordinateSystem: 'bmap',
              data: this.mapData.sort((a, b) =>{
                return b.value[2] - a.value[2];
              }).slice(0, 5),
              symbolSize: (val) => {
                return 25;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                }
              },
              zlevel: 1
            }
          ]
        };

        this.chartInstance.setOption(option);

        let bmap = this.chartInstance.getModel().getComponent('bmap').getBMap();
        bmap.setMinZoom(5);
        bmap.setMaxZoom(8);
      }
    },
    mounted () {

      this.initEcharts();

    }
  }
</script>

<style scoped>

  .baidu-offline-map-div {
    height: 100%;
    background-color: #021019;
  }

</style>
