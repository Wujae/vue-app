<template>
  <tech-frame v-bind="frameInitOptions"  :content-style="{overflow: 'hidden'}">
    <div id="onlinestatus3-l1">列车牵引单元参数</div>

    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'

  //trainParamsUnit
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
          titleRowStyle: null,
          titleRowStyle: {'background-color': '#1b3b65','border':'1px solid #23a2da'},
          oddRowStyle:{'background-color': '#1a4069'},
          evenRowStyle:{'background-color': '#1c3759'},
          columns:null

          //   [
          //   {title: '项目', key: 'number', style: {width: '30%', 'font-size': '14px', color:'white'},  titleStyle: {width: '30%', 'font-size': '14px', color:' #09f2e1'}},
          //   {title: '1单元', key: 'station', style: {width: '40%', 'font-size': '14px', color:'white'},  titleStyle: {width: '40%', 'font-size': '14px', color:' #09f2e1'}},
          //   {title: '2单元', key: 'alloc', style: {width: '30%', 'font-size': '14px', color:'white'},  titleStyle: {width: '30%', 'font-size': '14px', color:' #09f2e1'}}
          //   // {title: '车辆号', key: 'online', style: {width: '10%', 'font-size': '14px'}},
          //   // {title: '所属系统', key: 'trans', style: {width: '25%', 'font-size': '14px'}},
          //   // {title: '故障代码', key: 'stopped', style: {width: '20%', 'font-size': '14px'}}
          // ]
        },
        // dataItems: null,
        dataItems:[
          // {number:"网压",station: '28.13', alloc: '28.13' },
          // {number:"网流",station: '0', alloc: '0' },
          // {number:"受电弓",station: '降下', alloc: '降下' },
          // {number:"主断",station: '断开', alloc: '断开' },
          // {number:"牵引力",station: '0', alloc: '0' },
          // {number:"电池电压",station: '122.9', alloc: '122.9' },
          // {number:"空气制动力",station: '181.59', alloc: '181.59' },
          // {number:"主风管压力",station: '961.88', alloc: '961.88' },
          // {number:"制动管压力",station: '228', alloc: '228' },
          // {number:"空簧载重",station: '施加', alloc: '施加' },
          // {number:"载重",station: '施加', alloc: '施加' }
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
        'getTrainParamsUnit'
      ])
    },
    watch: {
      getTrainParamsUnit (newv) { //newv 就是改变后的getTrains值
        this.parseData(newv);
      }
    },
    components: {WrapTable, TechFrame},
    mounted () {

    },
    methods : {
      parseData (rawdatas) {
        let newlist = rawdatas.map((data, idx) =>{
          let result = [{
            title: '项目',
            key: 'key',
            style: {width: '50%', 'font-size': '14px', color: 'white'},
            titleStyle: {width: '50%', 'font-size': '14px', color: ' #09f2e1'}
          }];
          if(idx === 0) {
            //拼columns

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
