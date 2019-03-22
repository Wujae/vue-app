<template>
  <tech-frame v-bind="frameInitOptions">
    <div id="onlinestatus2-l1">
      <slash-title :title-text="'实 时 故 障 信 息'"/>
    </div>
    <div id="onlinestatus2-r1">
      <level-dropdown v-bind:style="styleObject4" :drop-down-items="dropDownItems"></level-dropdown>

    </div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'
  import LevelDropdown from "../base/LevelDropdown";
  import ArrowTitle from '../base/ArrowTitle'
  import SlashTitle from '../base/SlashTitle'

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
  //currentfault
  export default {
    name: "CurrentFault",
    data () {
      return {
        columnSetting: {
          needIdx: true,
          idxOccupancyRate: 5,
          overallStyle: null,
          rowHeight: '45px',
          rowMinHeight: '20px',
          titleRowStyle: null,
          oddRowStyle: null,
          evenRowStyle: null,
          columns: [
            // {title: '序号', key: '', style: {width: '5%', 'font-size': '14px'}},
            {title: '车型', key: 'trainType', style: {width: '10%', 'font-size': '14px'}},
            {title: '车组号', key: 'sn', style: {width: '10%', 'font-size': '14px'}},
            {title: '车辆号', key: 'coach', style: {width: '8%', 'font-size': '14px'}},
            {title: '所属系统', key: 'sysName', style: {width: '15%', 'font-size': '14px'}},
            {title: '故障代码', key: 'faultCode', style: {width: '10%', 'font-size': '14px'}},
            {title: '故障现象', key: 'descer', style: {width: '18%', 'font-size': '14px'}},
            {title: '故障时间', key: 'faultTime', style: {width: '27%', 'font-size': '14px'}},
            {title: '故障等级', key: 'lvl', style: {width: '10%','font-size': '14px'}},
            {
              title: '故障状态', key: 'occrStatus',
              style: {width: '10%', 'font-size': '14px'},
              keyTranslate: {'1': '发生', '0': '恢复'}
            },
            {title: '故障类型', key: 'errorType', style: {width: '10%', 'font-size': '14px'}},
            {
              title: '故障模式', key: 'mode',
              style: {width: '10%', 'font-size': '14px'},
              keyTranslate: {'1': '维护', '0': '非维护'}
            },
            {
              title: '是否上线', key: 'isOnLine',
              style: {width: '10%', 'font-size': '14px'},
              keyTranslate: {'1': '是', '0': '否'}
            },
            {
              title: '处理状态', key: 'dealStatus',
              style: {width: '10%', 'font-size': '14px'},
              keyTranslate: {'1': '已处理', '0': '未处理'}
            }
          ]
        },
        dataItems: [],
        dropDownItems: [],
        styleObject4:{
          position: 'absolute',
          top: '-30px',
          right: '30px',
          width: '100px',
          height: '20px'
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
      getCurrentFault (newv) { //newv 就是改变后的getCurrentFault值（请求回来的数据）

        this.dataItems=newv.list


        //this.parseData(newv);
      },
      getCurrentFaultCount (newv){
        this.parseData(newv)

      }
    },
    components: {SlashTitle, ArrowTitle, LevelDropdown, WrapTable, TechFrame},
    mounted () {

    },
    methods : {
      parseData (rawdata) {


       let list = [
         {
           key: 'A',
           name: `A 级  ${rawdata[0].count}`,
           style: {'background-color': '#bf3131', color: '#fff'}
         },
         {
           key: 'B',
           name: `B 级  ${rawdata[1].count}`,
           style: {'background-color': '#c08528', color: '#fff'}
         },
         {
           key: 'C',
           name: `C 级  ${rawdata[2].count}`,
           style: {'background-color': '#ac990a', color: '#fff'}
         }
       ]
        this.dropDownItems = list
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
  #onlinestatus2-l1 {
    display: inline-block;
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin-top: 30px;
  }
  #onlinestatus2-r1 {
    position: relative;

  }
  .selectCF1 {
    position: absolute;
    top: -20px;
    right: 30px;
    width: 100px;
    height: 20px;
  }

</style>
