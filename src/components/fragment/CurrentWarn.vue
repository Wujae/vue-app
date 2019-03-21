<template>
  <tech-frame v-bind="frameInitOptions "  :content-style="{overflow: 'hidden'}">
    <div id="onlinestatus4-l1">平台预警</div>
    <div id="onlinestatus4-r1">
      <select value="">
        <option >一级260</option>
        <option >二级136</option>
        <option >三级136</option>
      </select>
    </div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'

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
        dataItems:[

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
        'getCurrentWarn'
      ])
    },
    watch: {
      getCurrentWarn (newv) { //newv 就是改变后的getTrains值
        console.log(newv,'bbbbb');
        this.dataItems=newv
      }
    },
    components: {WrapTable, TechFrame},
    mounted () {

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
  #onlinestatus4-l1 {
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin-top: 30px;
  }
  #onlinestatus4-r1 {
    position: relative;

  }
  #onlinestatus4-r1 select {
    position: absolute;
    top: -20px;
    right: 30px;
    width: 100px;
    height: 20px;
  }

</style>
