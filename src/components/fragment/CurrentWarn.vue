<template>
  <tech-frame v-bind="frameInitOptions "  :content-style="{overflow: 'hidden'}">
    <div id="onlinestatus4-l1">
      <arrow-title :title-text="'平台预警'" />
    </div>
    <div id="onlinestatus4-r1">
      <level-dropdown   :drop-down-items="dropDownItems" v-bind:style="styleObject" ></level-dropdown>
    </div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'
  import LevelDropdown from "../base/LevelDropdown"
  import ArrowTitle from '../base/ArrowTitle'

  //currentWarn
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
            {title: '车型', key: 'trainType', style: {width: '15%', 'font-size': '14px'}},
            {title: '车组号', key: 'sn', style: {width: '15%', 'font-size': '14px'}},
            {title: '车辆号', key: 'coach', style: {width: '10%', 'font-size': '14px'}},
            {title: '预警项目', key: 'warnName', style: {width: '40%', 'font-size': '14px'}},
            {title: '预警类型', key: 'warnType', style: {width: '10%', 'font-size': '14px'}}

          ]
        },
        // dataItems: null,
        dataItems:[],
        dropDownItems: [
          {
            key: 'A',
            name: 'A 级  251',
            style: {'background-color': '#bf3131', color: '#fff'}
          },
          {
            key: 'B',
            name: 'B 级  251',
            style: {'background-color': '#c08528', color: '#fff'}
          },
          {
            key: 'C',
            name: 'C 级  251',
            style: {'background-color': '#ac990a', color: '#fff'}
          },
          {
            key: 'D',
            name: 'D 级  251',
            style: {'background-color': '#25ac48', color: '#fff'}
          },
        ],
        styleObject:{
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
        'getCurrentWarn'
      ])
    },
    watch: {
      getCurrentWarn (newv) { //newv 就是改变后的getTrains值

        this.dataItems=newv;
        this.parseData(newv);
      }
    },
    components: {ArrowTitle, WrapTable, TechFrame,LevelDropdown},
    mounted () {

    },
    methods : {
      parseData (rawdata) {
        let contA=0
        let contB=0
        let contC=0
        let contD=0
        //rawdata.forEach  data. warnLevel
        rawdata.forEach((data,index) => {

          switch (data.warnLevel) {
            case 'A':
              contA++;
              break;
            case 'B':
              contB++;
              break;
            case 'C':
              contC++;
              break;
            case 'D':
              contD++;
              break;
          }
        })

          let result = [{
            key: 'A',
            name: `A 级 ${contA}`,
            style: {'background-color': '#bf3131', color: '#fff'}
          },
          {
            key: 'B',
            name: `B 级 ${contB}`,
            style: {'background-color': '#c08528', color: '#fff'}
          },
          {
            key: 'C',
            name: `C 级 ${contC}`,
            style: {'background-color': '#ac990a', color: '#fff'}
          },
          {
            key: 'D',
            name: `D 级 ${contD}`,
            style: {'background-color': '#25ac48', color: '#fff'}
          }]

         this.dropDownItems=result

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
  #onlinestatus4-l1 {
    display: inline-block;
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin-top: 30px;
  }
  #onlinestatus4-r1 {
    position: relative;

  }
  .selectCW {
    position: absolute;
    top: -20px;
    right: 30px;
    width: 100px;
    height: 20px;
  }

</style>
