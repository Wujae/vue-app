<template>
  <tech-frame v-bind="frameInitOptions">
    <div id="onlinestatus6-l1">规则关注</div>
    <div id="onlinestatus6-r1">
      <level-dropdown v-bind:style="styleObject5" :drop-down-items="dropDownItems"></level-dropdown>
    </div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'
  import LevelDropdown from "../base/LevelDropdown";
  import mdpInterfaceService from '../../service/MdpInterfaceService'

  const  LVL_COLOR = {
    A: '#c43838',
    B: '#cf8c2d',
    C:'#cdcd40',
    NORMAL: '#5ab943'
  };

  //ruleAttention
  export default {
    name: "OnlineStatus2",
    data () {
      return {
        columnSetting: {
          needIdx: true,
          idxOccupancyRate: 5,
          overallStyle: null,
          rowHeight: '25px',
          rowMinHeight: '20px',
          titleRowStyle: null,
          oddRowStyle: null,
          evenRowStyle: null,
          columns: [
            {title: '关注项点', key: 'name', style: {width: '20%', 'font-size': '14px'}},
            {title: '车型', key: 'trainTypeName', style: {width: '10%', 'font-size': '14px'}},
            {title: '车组号', key: 'trainId', style: {width: '10%', 'font-size': '14px'}},
            {title: '车辆号', key: 'vehicleNo', style: {width: '10%', 'font-size': '14px'}},
            {title: '关注参数', key: 'partName', style: {width: '20%', 'font-size': '14px', overflow: 'hidden', 'word-break': 'keep-all', 'text-overflow': 'ellipsis'}},
            {title: '参数值', key: 'paramValue', style: {width: '10%', 'font-size': '14px'}},
            {title: '参数趋势', key: 'changeTrend', style: {width: '10%', 'font-size': '14px'}}

          ]
        },
        // dataItems: null,
        dataItems:[],
        dropDownItems:[],
        styleObject5:{
          position: 'absolute',
          top: '-20px',
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
        'getRuleAttention',
        'getRuleAttentionCount'
      ])
    },

    watch: {
      getRuleAttention (newv) { //newv 就是改变后的ruleAttention值
        this.dataItems = newv

      },
      getRuleAttentionCount (newv) { //newv 就是改变后的ruleAttentionCount值
        console.log(newv,'getRuleAttentionCount')
        this.dropDownItems = [
          {
            key: 'A',
            name: `A 级  ${newv[0].count}`,
            style: {'background-color': '#bf3131', color: '#fff'}
          },
          {
            key: 'B',
            name: `B 级 ${newv[1].count}`,
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
      mdpInterfaceService.getRuleAttentionCount(this);

    },
    methods : {
      parseData (rawdata) {
        if(!rawdata || rawdata.length === 0 ) return;

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
  #onlinestatus6-l1 {
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin-top: 30px;
  }
  #onlinestatus6-r1 {
    position: relative;

  }
  #onlinestatus6-r1 select {
    position: absolute;
    top: -20px;
    right: 30px;
    width: 100px;
    height: 20px;
  }

</style>
