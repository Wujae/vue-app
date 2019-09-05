<template>
  <tech-frame v-bind="frameInitOptions" :content-style="{overflow: 'hidden'}">
    <div id="onlinestatus3-l1">
      <arrow-title :title-text="'车组报警'"></arrow-title>
    </div>
    <div id="onlinestatus3-r1">
      <level-dropdown v-bind:style="styleObject2" :drop-down-items="dropDownItems" @levelSelected="handleLevelChange"></level-dropdown>
    </div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems" ></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'
  import LevelDropdown from "../base/LevelDropdown";
  import ArrowTitle from '../base/ArrowTitle'

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
          titleRowStyle: {"background-color": "#1d2d47"},
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
        dataItems:[],
        dropDownItems: [],
        styleObject2:{
          position: 'absolute',
          top: '-30px',
          right: '30px',
          width: '100px',
          height: '20px',
          opacity:1
        },
        levelSelected: null
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
        'getCurrentFaultSimple','getCurrentFaultCount'
      ])
    },
    watch: {
      getCurrentFaultSimple (newv) { //newv 就是改变后的getTrains值

        // console.log(newv,'vvvvvvv')
        this.dataItems=newv.list
      },
      getCurrentFaultCount (newv){
        this.dropDownItems = [
          {
            key: 'A',
            selected: this.levelSelected === 'A',
            name: `A 级  ${newv[0].count}`,
            style: {'background-color': '#bf3131', color: '#fff'}
          },
          {
            key: 'B',
            selected: this.levelSelected === 'B',
            name: `B 级  ${newv[1].count}`,
            style: {'background-color': '#c08528', color: '#fff'}
          },
          {
            key: 'C',
            selected: this.levelSelected === 'C',
            name: `C 级  ${newv[2].count}`,
            style: {'background-color': '#ac990a', color: '#fff'}
          }
        ]
      }
    },
    components: {ArrowTitle, WrapTable, TechFrame,LevelDropdown},
    mounted () {

    },
    methods : {
      handleLevelChange(event) {

        // console.log(event)
        this.levelSelected = event.key

        this.$store.commit('updateFaultLevelSimple', event.key)
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
    display: inline-block;
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
