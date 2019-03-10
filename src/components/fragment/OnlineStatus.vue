<template>
    <tech-frame v-bind="frameInitOptions">
      <div class="level-band-container-div">
        <div class="level-band-holder">
          <div class="level-band level-a"></div>
          <div>一级(A)</div>
        </div>
        <div class="level-band-holder">
          <div class="level-band level-b"></div>
          <div>二级(B)</div>
        </div>
        <div class="level-band-holder">
          <div class="level-band level-c"></div>
          <div>三级(C)</div>
        </div>
        <div class="level-band-holder">
          <div class="level-band level-normal"></div>
          <div>正常</div>
        </div>
      </div>
      <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
    </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'

  const TRAIN_STATUS = [
    '运行中', '传输中', '停止运行', '离线', '断开连接'
  ];
  const  TRAIN_STATUS_ALIAS = [
    'online', 'trans', 'stopped', 'offline', 'disconnect'
  ];

  const  LVL_COLOR = {
    A: '#c43838',
    B: '#cf8c2d',
    C:'#cdcd40',
    NORMAL: '#5ab943'
  };

  export default {
    name: "OnlineStatus",
    data () {
      return {
        columnSetting: {
          needIdx: false,
          idxOccupancyRate: 5,
          overallStyle: null,
          columnHeight: '45px',
          columnMinHeight: '20px',
          titleRowStyle: null,
          oddRowStyle: null,
          evenRowStyle: null,
          columns: [
            {title: '', key: 'mark', style: {width: '5%'}},
            {title: '服务站', key: 'station', style: {width: '10%'}},
            {title: '配置', key: 'alloc', style: {width: '15%'}},
            {title: '运行', key: 'online', style: {width: '10%'}},
            {title: '传输中', key: 'trans', style: {width: '10%'}},
            {title: '停止运行', key: 'stopped', style: {width: '15%'}},
            {title: '离线', key: 'offline', style: {width: '10%'}},
            {title: '断开连接', key: 'disconnect', style: {width: '15%'}},
            {title: '故障', key: 'faultCount', style: {width: '20%', color: LVL_COLOR.A, 'font-size': '14px'}, titleStyle: {color: 'white', width: '20%'}}
          ]
        },
        dataItems: null
      }
    },
    props: {
      frameInitOptions: {
        type: Object,
        default: () => {
          return {
            size: {width: 5 * 150, height: 150 * 5},
            blurDistance: 3,
            connerClip: [0, 0, 20, 0]
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
      getTrains (newv) { //newv 就是改变后的getTrains值
        this.parseData(newv);
      }
    },
    components: {WrapTable, TechFrame},
    mounted () {

    },
    methods : {
      parseData (rawdata) {
        if(!rawdata || rawdata.length === 0 ) return;

        let stations = [];

        /*
         *{
         * ​​​al_a: "15",
         * ​​​al_all: "159"​,
         * ​​al_b: "31"​​​,
         * al_c: "113",
         * ​​​alertCount: "15/31/113/159",
         * ​​​delayTime: ""​,
         * ​​from: "",
         * ​​​gps_lat: "26.1964"​,
         * ​​gps_long: "105.8619"​,
         * ​​isOnLine: "否"​,
         * ​​jcode: "11",
         * ​​​jname: "成都铁路局"​​​,
         * level: null​,
         * ​​mileage: "5098183",
         * ​​​position: "",
         * ​​​scode: "842",
         * ​​​sn: "3050"​,
         * ​​sname: "重庆北动车组运用所"​​​,
         * speed: "",
         * ​​​station: "重庆服务站"​​,
         * ​stationCode: "3C01010311",
         * ​​​status: "断开连接",
         * ​​​suit: "8"​,
         * ​​to: ""​​​,
         * train_no: "G2878"​,
         * ​​train_type: "CRH3C",
         * ​​​update_time: "2019-03-04 15:44:57",
         * ​​​warnCount: "2/0/0/2"​​
         * }
         */
        let result = rawdata.reduce((p, c, i) => {

          let stationIdx = stations.indexOf(c.station)

          //找到服务站
          if (stationIdx > -1) {

            p[stationIdx].alloc++;

          } else {

            stations.push(c.station)

            p.push({
              station: c.station.replace("服务站", ''),
              alloc: 0,
              ala: parseInt(c.al_a || 0),
              alb: parseInt(c.al_b || 0),
              alc: parseInt(c.al_c || 0)
            })
            stationIdx = stations.length - 1

            TRAIN_STATUS_ALIAS.forEach( alias => {
              p[stationIdx][alias] = 0;
            })

          }

          let dataPt = p[stationIdx]


          dataPt.alloc ++
          dataPt.ala += parseInt(c.al_a || 0)
          dataPt.alb += parseInt(c.al_b || 0)
          dataPt.alc += parseInt(c.al_c || 0)

          let thisStatusIdx = TRAIN_STATUS.indexOf(c.status)

          if(thisStatusIdx > -1){
            dataPt[TRAIN_STATUS_ALIAS[thisStatusIdx]]++
          }

          return p;

        }, []);

        this.updateData(result)
      },
      updateData (data) {

        this.dataItems = data.map( dt => {

          let mark = {
            special: true,
            style: {
              'background-color': dt.ala > 0 ? LVL_COLOR.A : dt.alb > 0 ? LVL_COLOR.B : dt.alc > 0 ? LVL_COLOR.C : LVL_COLOR.NORMAL,
              height:'12px',
              width:'16px'
            }
          }

          return Object.assign({
            mark: mark,
            faultCount: `${dt.ala}/${dt.alb}/${dt.alc}`
          }, dt)
        })
      }
    }
  }
</script>

<style scoped>
  .level-band-container-div{
    position: relative;
    width: 100%;
    padding: 10px;
  }

  .level-band-holder {
    width: 20%;
    height: 30px;
    display: inline-block;
  }

  .level-band {
    width: 100%;
    height: 15px;
  }

  .level-a {
    background-color: #c43838;
  }

  .level-b {
    background-color: #cf8c2d;

  }

  .level-c {
    background-color: #cdcd40;
  }

  .level-normal {
    background-color: #5ab943;
  }
</style>
