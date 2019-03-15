<template>
  <tech-frame v-bind="frameInitOptions">
    <div id="onlinestatus3-l1">列 车 部 件 参 数</div>

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
    name: "",
    data () {
      return {
        columnSetting: {
          needIdx: true,
          idxOccupancyRate: 5,
          overallStyle: {'border-bottom':'1px solid #23a2da'},
          rowHeight: '40px',
          rowMinHeight: '20px',

          titleRowStyle: {'background-color': '#1b3b65','border':'1px solid #23a2da'},
          oddRowStyle:{'background-color': '#1a4069'},
          evenRowStyle:{'background-color': '#1c3759'},
          columns: [
            {title: '项目', key: 'number', style: {width: '30%', 'font-size': '14px', color:'white'},  titleStyle: {width: '30%', 'font-size': '14px', color:' #09f2e1'}},
            {title: '1车', key: 'station', style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
            {title: '2车', key: 'alloc', style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
            {title: '3车', key: 'online', style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
            {title: '4车', key: 'trans', style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
            {title: '5车', key: 'five',style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
            {title: '6车', key: 'six', style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
            {title: '7车', key: 'seven',style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
            {title: '8车', key: 'eight', style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}}

          ]
        },
        // dataItems: null,
        dataItems:[
          {number:"转向架1一轴左侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'},
          {number:"转向架1二轴左侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'},
          {number:"转向架1一轴右侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37' },
          {number:"转向架1二轴右侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37' },
          {number:"转向架2三轴左侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'},
          {number:"转向架2四轴左侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37' },
          {number:"转向架2三轴右侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37' },
          {number:"转向架2四轴右侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'},
          {number:"电机1驱动侧轴承温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37' },
          {number:"电机2驱动侧轴承温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'},
          {number:"电机3驱动侧轴承温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'},
          {number:"电机4驱动侧轴承温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'}
          // {number:"6",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"7",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"8",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"9",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"10",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"11",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"12",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"13",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"14",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"15",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"16",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"17",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"18",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"19",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},
          // {number:"20",station: 'CRH380B', alloc: '3616',stopped: '6812', online: '08', offline: '电器设备炬火警', faultCount: 'A', disconnect: '2019-01-08 15：07：25',trans:'辅助电器系统' ,faultStation:'否',faultType:'司机故障',faultModel:'非维护',isOnline:'是',transType:'未处理'},

        ]

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
  #onlinestatus3-l1 {
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin-top: 30px;

  }
  #onlinestatus3-r1 {
    position: relative;

  }
  #onlinestatus3-r1 select {
    position: absolute;
    top: -20px;
    right: 0px;
    width: 150px;
    height: 20px;
    background: #1b3b65;
    border-color: #23a2da;
    color: white;
  }

</style>
