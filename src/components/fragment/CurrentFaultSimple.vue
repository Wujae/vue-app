<template>
  <tech-frame v-bind="frameInitOptions" :content-style="{overflow: 'hidden'}">
    <div id="onlinestatus3-l1">车组报警</div>
    <div id="onlinestatus3-r1">
      <level-dropdown v-bind:style="styleObject2" :drop-down-items="dropDownItems"></level-dropdown>
    </div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems" ></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'
  import LevelDropdown from "../base/LevelDropdown";

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

  //currentFaultSimple
  export default {
    name: "OnlineStatus2",
    data () {
      return {
        columnSetting: {
          needIdx: true,
          idxOccupancyRate: 5,
          overallStyle: null,
          rowHeight: '32px',
          rowMinHeight: '20px',
          titleRowStyle: null,
          oddRowStyle: null,
          evenRowStyle: null,
          columns: [
            // {title: '序号', key: 'number', style: {width: '10%', 'font-size': '14px'}},
            {title: '车型', key: 'trainType', style: {width: '20%', 'font-size': '14px'}},
            {title: '车组号', key: 'sn', style: {width: '15%', 'font-size': '14px'}},
            {title: '车辆号', key: 'coach', style: {width: '10%', 'font-size': '14px'}},
            {title: '所属系统', key: 'sysName', style: {width: '25%', 'font-size': '14px'}},
            {title: '故障代码', key: 'faultCode', style: {width: '20%', 'font-size': '14px'}}

          ]
        },
        // dataItems: null,
        dataItems:[
          // {number:"1",station: 'CRH380B', alloc: '3616',online: '08',stopped: '6812', trans:'辅助电器系统' },
          // {number:"2",station: 'CRH380B', alloc: '3616',online: '08',stopped: '6812', trans:'辅助电器系统' },
          // {number:"3",station: 'CRH380B', alloc: '3616',online: '08',stopped: '6812', trans:'辅助电器系统' },
          // {number:"4",station: 'CRH380B', alloc: '3616',online: '08',stopped: '6812', trans:'辅助电器系统' },
          // {number:"5",station: 'CRH380B', alloc: '3616',online: '08',stopped: '6812', trans:'辅助电器系统' }
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

        ],
        dropDownItems: [],
        styleObject2:{
          position: 'absolute',
          top: '-20px',
          right: '30px',
          width: '100px',
          height: '20px',
          opacity:1
        }

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
        'getCurrentFault','getCurrentFaultCount'
      ])
    },
    watch: {
      getCurrentFault (newv) { //newv 就是改变后的getTrains值
        console.log(newv,'vvvvvvv')
        this.dataItems=newv.list
      },
      getCurrentFaultCount (newv){
        this.dropDownItems = [
          {
          key: 'A',
          name: `A 级  ${newv[0].count}`,
          style: {'background-color': '#bf3131', color: '#fff'}
          },
          {
            key: 'B',
            name: `B 级  ${newv[1].count}`,
            style: {'background-color': '#c08528', color: '#fff'}
          },
          {
            key: 'C',
            name: `C 级  ${newv[2].count}`,
            style: {'background-color': '#ac990a', color: '#fff'}
          }
        ]
      }
    },
    components: {WrapTable, TechFrame,LevelDropdown},
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
    right: 30px;
    width: 100px;
    height: 20px;
  }

</style>
