<template>
  <tech-frame v-bind="frameInitOptions" :content-style="{overflow: 'hidden'}">
    <div id="onlinestatus5-l1">空调健康评估</div>
    <div id="onlinestatus5-r1">
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

  //airConditioner
  export default {
    name: "OnlineStatus2",
    data () {
      return {
        columnSetting: {
          needIdx: true,
          idxOccupancyRate: 5,
          overallStyle: null,
          rowHeight: '31.5px',
          rowMinHeight: '20px',
          titleRowStyle: null,
          oddRowStyle: null,
          evenRowStyle: null,
          columns: [
            {title: '配属局', key: 'ALLOCATE_BUREAU', style: {width: '18%', 'font-size': '14px'}},
            {title: '服务站', key: 'SERVICE_STATION', style: {width: '20%', 'font-size': '14px'}},
            {title: '车型', key: 'TRAIN_MODEL', style: {width: '15%', 'font-size': '14px'}},
            {title: '车组号', key: 'TRAIN_NO', style: {width: '15%', 'font-size': '14px'}},
            {title: '车辆号', key: 'COACH', style: {width: '10%', 'font-size': '14px'}},
            {title: '空调序号', key: 'AC_NUM', style: {width: '13%', 'font-size': '14px'}},
            {title: '健康状况', key: 'HEALTH_STATUS', style: {width: '13%', 'font-size': '14px'}},
            {title: '评估日期', key: 'EVALUATE_DATE', style: {width: '20%', 'font-size': '14px'}}

          ]
        },
        // dataItems: null,
        dataItems:[]

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
        'getAirConditioner'
      ])
    },
    watch: {
      getAirConditioner (newv) { //newv 就是改变后的getTrains值
        console.log(newv.rows,'nnnnn')
        this.dataItems=newv.rows
      }
    },
    components: {WrapTable, TechFrame},
    mounted () {

    },
    methods : { }

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
  #onlinestatus5-l1 {
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin-top: 30px;
  }
  #onlinestatus5-r1 {
    position: relative;

  }
  #onlinestatus5-r1 select {
    position: absolute;
    top: -20px;
    right: 30px;
    width: 100px;
    height: 20px;
  }

</style>
