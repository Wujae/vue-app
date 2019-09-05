<template>
  <tech-frame v-bind="frameInitOptions">
    <div class="title">检修信息</div>
    <div ref="echarts" :style="{width: '650px', height: '250px', display: 'inline-block'}" class="echarts"></div>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import mdpInterfaceService from '../../service/MdpInterfaceService'
  import { mapGetters } from 'vuex'

  const LINEAR_COLOR = {
    linearYtoG: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: '#f5b44d'
      }, {
        offset: 1,
        color: '#28f8de'
      }]
    },
    linearGtoB: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [{
        offset: 0,
        color: '#43dfa2'
      }, {
        offset: 1,
        color: '#28f8de'
      }]
    },
    linearBtoG: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [{
        offset: 0,
        color: '#1c98e8'
      }, {
        offset: 1,
        color: '#28f8de'
      }]
    },
    areaBtoG: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: 'rgba(35,184,210,.2)'
      }, {
        offset: 1,
        color: 'rgba(35,184,210,0)'
      }]
    }
  };

  let fillImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAF+CAYAAADNzDlVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABFhJREFUeNrs3U+O1DgUgHHblUFzhb7GCCHNtnfMFUasOA9HYEWfAQlpZq6AEOIIdPcFZgMVe5L6Q6pLzQjFLZK2fpZSKbVioQ8n9b68+Dnxz39fXYYYrkIIF+Fxt5the5kagQkHhtepEZhvUCk01tLh3Gul3aZQwovxSwMwn8cfhW74+Lul66jJawgQIEB1QJfDdj1s5ZFvI8NzLsfluByX43KAlmzjKRdyTkYIEJeb6XK5JC7H5bhchculmLmcOASoAqjPGyMEiMtVuFyMhctxOS5X4XKlRC4nDgECBIjLLeVyXSnpqhQux+W43FyXi/Jy4hCgKqC+74wQIC5XkZdLKcvLcTkuV+FyOScuJw4Bmt/MlwPE5WprH4LaBy7H5WpcbvjgcuIQIECAuByXe0iXy4eJtOONXilx2NJh238PIYbpmPP9qvpc7O5YU+r351/KB9hyAl7C3WPO9+vqs3O5hkZocrn9H+PJwdP3Y87h/n9sNX24HKBFgLaesQLiclUul9Q+yMvJy1Xl5bLaB3EIUE3biVzvGSsgLjfb5Yb7ci7H5bhchcvFWLicOAQIECAux+W43P1QXcmpuWuotbyc2gdxCFBF29c+FHk5QFzOfDl5OS63jMsFtQ/iECBAgLgcl+Ny34PqcoMrot+cFkzEWIbtuN9/H0/R/yuyWFGf2zR8vBiLIHa5hTsFE3FGkcWifT4Pey63fqDt9hemsOYWSylGaM2t++P6zWUjS7KNuZGX1pdbO5S83Mqb9eXEIUC1gfV4r2GEAP08IHk5LsfluNzkcsEzVnEIULXLFS4HiMvNdrnh+uFyXI7LVbhcTN7hJQ4BqnU5eTlAXG6+y/XbjstxOS5X4XJ93nA5cQhQrcupYwXE5Wa7XLRWMJfjclUuV6wVLA4BAgSIyy3ncl0p6aoULsfluNxcl4vRM1ZxCBAgQFxuybWC25ov1+Wc2nK543tOj/tpeYxpOz9mzX3GERpd7uI4PWZcGuO8Hf82vSr07n5FfW7TZrPlcuIQoAqgL19+NUKAuFyFyw1xyDPWVbtci9dQY/Pl+o7LiUOA5rdD7cPGCAHicubLcTkut4jLmS8nDgF6CJdT+wCIy3kfK5fjcsu43HA/xOXEIUCVLnffhAYjBIjL/ZjLZevLcTkuV+Vyyfpy4hCgKqCvX58YIUBcbr7Lxd8/vb1u6Gf7hstxuZ/tcp6xikOAAAHicubLPYz2BHk5LsfluJzA+tja7hlrr/YBEJeb63Lx2cd38nJcjstVuFyyvpw4BAgQIC7H5bgcl3u0Lpd77/AShwBVNGuSAOJylS739MNf7blcSv1+uFI+LFmbT5avzbv/gOmY8/2q+lzc+ZWbqvZPK76OS9duvrNfV5/2XG4YMS4nDgECBIjLcbmHdLmGzjh5OS7H5cShxoGsLweIy1W63G/v/+FyXI7LVbic+XLiECBAgLgcl+NyXI7LrcXlYilFHAIEaH77T4ABAKzsRPWz+TQ7AAAAAElFTkSuQmCCgg';
  let bgImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAF+CAYAAADNzDlVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAilJREFUeNrs1rENwjAURdEfC0pmQAwBDfuwE8wDDSULIGagTGEcFNHQpfPXseT0V0ryzrA/XzcRsWt3HX2fsd1XSRITc8O2JIn5RZVIdsr87mU54xT0TBL1/Sms2uPd7qPXivvp+PfKpfuGBAkStPxMf7muLXe43FiO5ViO5VjOsAoSxHIsx3Isx3Isx3KGVZAglmM5lmM5lmM5liMFQYJYjuVYjuVYjuVYTpAgQSzHcizHcizHcoZVkCCWYzmWYzmWYzmWM6yCBLEcy7Ecy7Ecy7GcIEGCWI7lWI7lWI7lDKsgQYJYjuVYjuVYjuUMqyBBLMdyLMdyLMdyLGdYBQliOZZjOZZjOZZjOUGCBLEcy7Ecy7EcyxlWQYJYjuVYjuVYjuVYzrAKEsRyLMdyLMdyLMdypCBIEMuxHMuxHMuxnGEVJEgQy7Ecy7Ecy7GcYRUkiOVYjuVYjuVYjuUMqyBBLMdyLMdyLMdyLCdIkCCWYzmWYzmWYznDKkgQy7Ecy7Ecy7EcyxlWQYJYjuVYjuVYjuVYjhQECWI5lmM5lmM5ljOsggQJYjmWYzmWYzmWM6yCBLEcy7Ecy7Ecy7GcYRUkiOVYjuVYjuVYjuUECRLEcizHcizHcixnWAUJYjmWYzmWYzmWYznDKkgQy7Ecy7Ecy7Ecy5GCIEEsx3Isx3Isx3IsJ0iQIJZjOZZjOZZjOcMqSBDLsRzLsRzL9Wy5odZqhwQJWn4+AgwApGqd0LftHcgAAAAASUVORK5CYII=';


  export default {
    name: "RepairTaskInfo",
    data: function () {
      return {
        chartInstance: null,
        maincycs: null
      }
    },
    props: {
      frameInitOptions: {
        type: Object,
        default: () => {
          return {
            size: {width: 5 * 150, height: 150 * 2},
            blurDistance: 3,
            connerClip: [0, 0,  0, 0],
            maincycs: null
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

        mdpInterfaceService.getMaincycData(this, {
          params: {
            station: seletedTrains.join(","),
            startDate: (new Date()).Format("yyyy-MM-dd"),
            endDate: (new Date()).Format("yyyy-MM-dd")
          },
          onSuccess: (response) => {
            this.doBuildData(response);
          }
        });

      },
      doBuildData (data) {

        //console.log(data);
        if (data) {

          /**
           * 根据（区域中心-服务站）组成key合并统计
           * areas = {
           * //区域中心-服务站
           * all: ...
           * 'xxx': {
           *      dept: 'xxx',
           *      maincycs: {
           *          'maincyc1': 1,
           *          'maincyc2': 1,
           *          'maincyc3': 1,
           *          ...
           *      }
           *  }
           *  , ...
           * }
           *
           */
          let areas = {
            all: {
              dept: "all",
              name: "区域中心合计",
              isSum: 2,
              maincycs: {}
            }
          };

          /**
           * ta结构
           * AREA_CENTER_CODE: "1K2300010000"
           * AREA_CENTER_NAME: "华北"
           * MAINCYC_CODE: "100000"
           * MAINCYC_NAME: "三级修"
           * STATION_CODE: "1K2301010309000"
           * STATION_NAME: "北京服务站"
           * COUNT: 21
           */
          data.forEach((ta) => {

            let code = 'all';
            //合计
            if (areas[code].maincycs[ta.MAINCYC_CODE]) {
              areas[code].maincycs[ta.MAINCYC_CODE] += ta.COUNT;
            } else {
              areas[code].maincycs[ta.MAINCYC_CODE] = ta.COUNT;
            }

          });

          this.fullFillMaincyc(areas);
        }
      },
      fullFillMaincyc (areas) {

        //console.log(areas);
        let maincycs = this.maincycs;

        let result = [];
        Object.keys(areas).forEach((key) => {

          let area = areas[key];
          area.count = 0;
          area.countArray = [];

          maincycs.forEach((maincyc) => {

            if (!area.maincycs[maincyc.ID]) {
              area.maincycs[maincyc.ID] = 0;
            }

            area.countArray.push(area.maincycs[maincyc.ID]);
            area.count += area.maincycs[maincyc.ID];

          });

          result.push(area);

        });

        //console.log(result);

        this.prepareDrawCharts(result)

      },
      prepareDrawCharts (summaryData){

        let maxValue = Math.max.apply(null, summaryData[0].countArray);

        let chartDatas = summaryData.reduce((dft, cur) =>{

          if(cur.isSum === 2)
            dft.push({
              categories: this.maincycs.map(function(e){ return e.NAME;}),
              series: []
            });

          let tmp = dft[dft.length-1];
          tmp.series.push({
            name: 'bg',
            type: 'pictorialBar',
            barWidth: '45%',
            silent: true,
            symbol: 'image://'+ bgImg,
            symbolClip:false,
            symbolBoundingData: maxValue,
            symbolSize: [30, '100%'],
            data: Array(cur.countArray.length).fill(maxValue)
          })
          tmp.series.push({
            data: cur.countArray,
            type: 'pictorialBar',
            name: cur.name,
            barWidth: '45%',
            barGap: '-100%',
            z: 3,
            symbol: 'image://'+ fillImg,
            symbolClip:true,
            symbolBoundingData: maxValue,
            symbolSize: [30, '100%'] ,
            tooltip: {
              position: 'top',
              formatter: '{c}',
              backgroundColor: 'rgba(28,152,232,.2)',
              padding: 6
            }
          })

          return dft;

        }, []);

        this.updateCharts(chartDatas[0]);

      },
      updateCharts: function(chartData) {
        let cata = {
          legend: {
            show:false
          },
          grid: {
            left: '3%',
            right: '3%',
            top: '10%',
            bottom: '3%',
            containLabel: true
          },
          tooltip: {
            show: true,
            trigger: 'item',
            alwaysShowContent: true
          },
          xAxis:  {
            type: 'category',
            axisLine: {
              show:true,
              color: "#ffffff"

            },
            splitLine: {
              show: false
            },
            axisLabel: {
              fontSize: 12,
              color: "#ffffff",
              interval: 0
            },
            data: chartData.categories,

          },
          yAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              fontSize: 12,
              color: "#ffffff"
            }
          },
          series: chartData.series

        };

        this.chartInstance.setOption(cata);

      },
      initEcharts () {

        this.chartInstance = this.$echarts.init(this.$refs.echarts);

      },
    },
    created () {
      this.maincycs = this.$store.state.displayMaincys
    },
    mounted () {
      let data = [{
        "MAINCYC_NAME": "I1",
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2070406024",
        "COUNT": 4002,
        "STATION_NAME": "徐州东服务站",
        "MAINCYC_CODE": "000006",
        "AREA_CENTER_CODE": "1K2300020000"
      }, {
        "MAINCYC_NAME": "I2",
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2301010308000",
        "COUNT": 2003,
        "STATION_NAME": "合肥南服务站",
        "MAINCYC_CODE": "000004",
        "AREA_CENTER_CODE": "1K2300020000"
      }, {
        "MAINCYC_NAME": "M0",
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2301010308000",
        "COUNT": 2302,
        "STATION_NAME": "合肥南服务站",
        "MAINCYC_CODE": "000009",
        "AREA_CENTER_CODE": "1K2300020000"
      }, {
        "MAINCYC_NAME": "M1",
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2301010308000",
        "COUNT": 1135,
        "STATION_NAME": "合肥南服务站",
        "MAINCYC_CODE": "000009",
        "AREA_CENTER_CODE": "1K2300020000"
      }, {
        "MAINCYC_NAME": "M2",
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2301010308000",
        "COUNT": 313,
        "STATION_NAME": "合肥南服务站",
        "MAINCYC_CODE": "000009",
        "AREA_CENTER_CODE": "1K2300020000"
      }, {
        "MAINCYC_NAME": "M3",
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2070406029",
        "COUNT": 141,
        "STATION_NAME": "南翔服务站",
        "MAINCYC_CODE": "000011",
        "AREA_CENTER_CODE": "1K2300020000"
      }, {
        "MAINCYC_NAME": "LU探伤",
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2070406029",
        "COUNT": 323,
        "STATION_NAME": "南翔服务站",
        "MAINCYC_CODE": "000011",
        "AREA_CENTER_CODE": "1K2300020000"
      }, {
        "MAINCYC_NAME": "空探",
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2070406029",
        "COUNT": 1102,
        "STATION_NAME": "南翔服务站",
        "MAINCYC_CODE": "000011",
        "AREA_CENTER_CODE": "1K2300020000"
      }, {
        "MAINCYC_NAME": "镟修",
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2070406029",
        "COUNT": 143,
        "STATION_NAME": "南翔服务站",
        "MAINCYC_CODE": "000011",
        "AREA_CENTER_CODE": "1K2300020000"
      }, {
        "MAINCYC_NAME": "三级修",
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2070406029",
        "COUNT": 30,
        "STATION_NAME": "南翔服务站",
        "MAINCYC_CODE": "000011",
        "AREA_CENTER_CODE": "1K2300020000"
      }, {
        "MAINCYC_NAME": "四级修",
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2070406029",
        "COUNT": 4,
        "STATION_NAME": "南翔服务站",
        "MAINCYC_CODE": "000011",
        "AREA_CENTER_CODE": "1K2300020000"
      }, {
        "MAINCYC_NAME": "五级修",
        "AREA_CENTER_NAME": "华东",
        "STATION_CODE": "1K2070406029",
        "COUNT": 3,
        "STATION_NAME": "南翔服务站",
        "MAINCYC_CODE": "000011",
        "AREA_CENTER_CODE": "1K2300020000"
      }];

      this.initEcharts();

      this.doBuildData(data)
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
