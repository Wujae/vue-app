<template>
  <tech-frame v-bind="frameInitOptions"  :content-style="{overflow: 'hidden'}">
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

  //trainParamsParts
  export default {
    name: "",
    data () {
      return {
        columnSetting: {
          needIdx: true,
          idxOccupancyRate: 10,
          overallStyle: {'border-bottom':'1px solid #23a2da'},
          rowHeight: '46px',
          rowMinHeight: '20px',

          titleRowStyle: {'background-color': '#1b3b65','border':'1px solid #23a2da'},
          oddRowStyle:{'background-color': '#1a4069'},
          evenRowStyle:{'background-color': '#1c3759'},
          columns:null
          //   [
          //   {title: '项目', key: 'number', style: {width: '30%', 'font-size': '14px', color:'white'},  titleStyle: {width: '30%', 'font-size': '14px', color:' #09f2e1'}},
          //   {title: '1车', key: 'station', style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
          //   {title: '2车', key: 'alloc', style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
          //   {title: '3车', key: 'online', style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
          //   {title: '4车', key: 'trans', style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
          //   {title: '5车', key: 'five',style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
          //   {title: '6车', key: 'six', style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
          //   {title: '7车', key: 'seven',style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}},
          //   {title: '8车', key: 'eight', style: {width: '10%', 'font-size': '14px', color:'white'},  titleStyle: {width: '10%', 'font-size': '14px', color:' #09f2e1'}}
          //
          // ]
        },
        // dataItems: null,
        dataItems:[
          // {number:"转向架1一轴左侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'},
          // {number:"转向架1二轴左侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'},
          // {number:"转向架1一轴右侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37' },
          // {number:"转向架1二轴右侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37' },
          // {number:"转向架2三轴左侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'},
          // {number:"转向架2四轴左侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37' },
          // {number:"转向架2三轴右侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37' },
          // {number:"转向架2四轴右侧温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'},
          // {number:"电机1驱动侧轴承温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37' },
          // {number:"电机2驱动侧轴承温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'},
          // {number:"电机3驱动侧轴承温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'},
          // {number:"电机4驱动侧轴承温度",station: '40.75', alloc: '40.75',online:'40.75' ,trans:'37.33',five:'43.02',six:'36.2',seven:'31.65',eight:'29.37'}
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
        'getTrainParamsParts'
      ])
    },
    watch: {
      getTrainParamsParts (newv) { //newv 就是改变后的getTrains值
        console.log(newv,'lllllll')
        this.parseData(newv);
      }
    },
    components: {WrapTable, TechFrame},
    mounted () {

    },
    methods : {
      parseData (rawdatas) {
        let newlist = rawdatas.map((data, idx) =>{

          if(idx === 0) {
            //拼columns
            let result = [{
              title: '项目',
              key: 'key',
              style: {width: '50%', 'font-size': '14px', color: 'white'},
              titleStyle: {width: '50%', 'font-size': '14px', color: ' #09f2e1'}
            }];
            data.coaches.forEach((coach, idxe) => {

              result.push({
                title: `${coach}车设备`,
                key: `param_${idxe}`,
                style: {width: '50%', 'font-size': '14px', color: 'white'},
                titleStyle: {width: '50%', 'font-size': '14px', color: ' #09f2e1'}
              })
            })

            this.columnSetting.columns = result

          }

          let resultData = {
            key: data.key
          }

          data.valueList.forEach((value, idxe) => {
            resultData[`param_${idxe}`] = value.param_value

          })

          //数据处理

          return resultData
        })

        // 数据的赋值
        this.dataItems = newlist


      },

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
