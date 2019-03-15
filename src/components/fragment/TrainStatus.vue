<template>
  <tech-frame v-bind="frameInitOptions">
    <div class="title">运用信息</div>
    <div ref="echarts" :style="{width: '600px', height: '250px', display: 'inline-block'}" class="echarts"></div>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import mdpInterfaceService from '../../service/MdpInterfaceService'
  import { mapGetters } from 'vuex'

  const COLOR_MAP = [
    '#00cddb',
    '#2a54de',
    '#37516c',
    '#3420e6',
    '#1ddd98',
    '#15de57',
  ]

  export default {
    name: "TrainStatus",
    data: function () {
      return {
        chartInstance: null,
        usages: [
          {id:'MILE_COUNT',     name:'万公里数'},
          {id:'IMPORTANT_COUNT',name:'专运次数'},
          {id:'ROUTE_COUNT',    name:'开行交路'},
          {id:'ONLINE_DAILY',   name:'日均上线'},
          {id:'HOTSPARE_COUNT', name:'热备'},
          {id:'ONLINE_COUNT',   name:'上线车组'}
        ],
      }
    },
    props: {
      frameInitOptions: {
        type: Object,
        default: () => {
          return {
            size: {width: 5 * 150, height: 150 * 2},
            blurDistance: 3,
            connerClip: [0, 0,  0, 0]
          }
        }
      }
    },
    computed:{
      ...mapGetters([
        'getStationSelected'
      ])
    },
    watch: {
      getStationSelected (newv) {
        this.getRemoteData(newv);
      }
    },
    components: {TechFrame},
    methods: {
      getRemoteData(seletedTrains) {

        mdpInterfaceService.getUsageData(this, {
          params: {
            station: seletedTrains.join(","),
            startDate: '2017-01-01',
            endDate: '2018-12-30'
          },
          onSuccess: (response) => {
            this.doBuildData(response);
          }
        });

      },
      fullFillUsage: function (areas) {

        let usages = this.usages;

        let result = [];
        Object.keys(areas).forEach(function (key) {

          let area = areas[key];
          area.countArray = [];

          Object.keys(area.usages).forEach(function (usage) {
            area.countArray.push(area.usages[usage]);
          });

          result.push(area);

        });

        //console.log(areas);

        this.prepareDrawCharts(result);

      },
      doBuildData: function (data) {

        if (data) {

          let areas = {
            all: {
              dept: "all",
              name: "区域中心合计",
              isSum: 2,
              usages: {}
            }
          };

          let usages = this.usages;

          /**
           * ta结构
           * STATION_CODE:	1K2301010307000
           * STATION_NAME:	杭州服务站
           * AREA_CENTER_CODE:	1K2300020000
           * AREA_CENTER_NAME:	华东
           * ONLINE_COUNT:	1804
           * ONLINE_DAILY:	10
           * HOTSPARE_COUNT:	94
           * IMPORTANT_COUNT:	1
           * ROUTE_COUNT:	1044
           * MILE_COUNT:	6644259131
           */
          data.forEach(function (ta) {

            usages.forEach(function (usage) {

              let code = 'all';
              //合计
              if (areas[code].usages[usage.id]) {
                areas[code].usages[usage.id] += ta[usage.id]||0;
              } else {
                areas[code].usages[usage.id] = ta[usage.id]||0;
              }

            });

          });

          this.fullFillUsage(areas);
        }
      },
      prepareDrawCharts: function(summaryData){

        let chartDatas = summaryData.reduce((dft, cur) =>{
          //console.log(cur);

        if(cur.isSum === 2)
          dft.push({
            categories: this.usages.map((e) => { return e.name;}),
            series: []
          });

        let tmp = dft[dft.length-1];
        tmp.series.push({
          data: cur.countArray.map((e, i) => {
            return {
              value: e,
              itemStyle: {
                color: COLOR_MAP[i]
              }
            };
          }),
          type: 'bar',
          name: cur.name,
          barCategoryGap: '50%',
          label: {
            show: true,
            position: 'right',
            rotate : 0,
            color: '#ffffff',
            fontSize: 15
          },
          itemStyle: {
            barBorderRadius: 30
          }
        });


          return dft;

        }, []);

        this.updateCharts(chartDatas[0]);

      },
      initEcharts () {

        this.chartInstance = this.$echarts.init(this.$refs.echarts);

      },
      updateCharts: function(chartData) {
        let cata = {
          legend: {
            show:false
          },
          grid: {
            left: '3%',
            right: '20%',
            top: '10%',
            bottom: '3%',
            containLabel: true
          },
          xAxis:  {
            type: 'value',
            axisLine: {
              show:false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: chartData.categories,
            axisLine: {
              show:false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              fontSize: 15,
              color: "#ffffff"
            }
          },
          series: chartData.series

        };

        this.chartInstance.setOption(cata);

      }
    },
    mounted () {
      let serverData = [{
        "IMPORTANT_COUNT": 2,
        "ONLINE_DAILY": 0.3,
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2301010307000",
        "ROUTE_COUNT": 87,
        "ONLINE_COUNT": 120,
        "STATION_NAME": "杭州服务站",
        "MILE_COUNT": 4.22,
        "AREA_CENTER_CODE": "1K2300020000",
        "HOTSPARE_COUNT": 4
      }, {
        "IMPORTANT_COUNT": 1,
        "ONLINE_DAILY": null,
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2301010308000",
        "ROUTE_COUNT": null,
        "ONLINE_COUNT": null,
        "STATION_NAME": "合肥南服务站",
        "MILE_COUNT": null,
        "AREA_CENTER_CODE": "1K2300020000",
        "HOTSPARE_COUNT": null
      }, {
        "IMPORTANT_COUNT": 0,
        "ONLINE_DAILY": 0.1,
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2301010305000",
        "ROUTE_COUNT": 18,
        "ONLINE_COUNT": 29,
        "STATION_NAME": "虹桥服务站",
        "MILE_COUNT": null,
        "AREA_CENTER_CODE": "1K2300020000",
        "HOTSPARE_COUNT": 1
      }, {
        "IMPORTANT_COUNT": null,
        "ONLINE_DAILY": null,
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2301010306000",
        "ROUTE_COUNT": null,
        "ONLINE_COUNT": null,
        "STATION_NAME": "南京南服务站",
        "MILE_COUNT": null,
        "AREA_CENTER_CODE": "1K2300020000",
        "HOTSPARE_COUNT": null
      }];

      this.initEcharts();

      this.doBuildData(serverData);
    }
  }
</script>

<style scoped>

  .title {
    width: 40px;
    height: 100%;
    font-size: 25px;
    display: inline-block;
    float: left;
    padding-top: 60px;
    padding-left: 20px;
  }

</style>
