<template>
  <tech-frame v-bind="frameInitOptions" :content-style="{overflow: 'hidden'}">
    <div class="title">故障履历</div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import mdpInterfaceService from '../../service/MdpInterfaceService'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'

  export default {
    name: "FaultResume",
    components: {WrapTable, TechFrame},
    data () {
      return {
        columnSetting: {
          needIdx: false,
          idxOccupancyRate: 5,
          overallStyle: {"font-size": "13px"},
          rowHeight: '30px',
          rowMinHeight: '10px',
          titleRowStyle: {"font-size": "13px"},
          oddRowStyle: null,
          evenRowStyle: null,
          columns: [
            {title: '故障单号', key: 'FAULTID', nullVal:'-', style: {width: '15%'}},
            {title: '服务站', key: 'SERVICESTATION_0', nullVal:'-', style: {width: '15%'}},
            {title: '故障来源', key: 'FAULTFROM_0', nullVal:'-', style: {width: '15%'}},
            {title: '车辆号', key: 'COACH_0', nullVal:'-', style: {width: '15%'}},
            {title: '任务描述', key: 'TASKDESC', nullVal:'-', style: {width: '15%'}},
            {title: '任务状态', key: 'TASKSTATUS', nullVal:'-', style: {width: '15%'}},
            {title: '发生时间', key: 'FAULTTIME', nullVal:'-', style: {width: '15%'}}
          ]
        },
        dataItems: null
      }
    },
    props: {
      frameInitOptions: {
        type: Object,
        default: () => {
          return {
            size: {width: 5 * 150, height: 150 * 2},
            blurDistance: 3,
            connerClip: [0, 0,  0, 0]
          }
        }
      }
    },
    computed:{
      ...mapGetters([
        'getTrainSelected'
      ])
    },
    watch: {
      getTrainSelected (newTrain) { //newv 就是改变后的trainSelected值

        this.getRemoteData(newTrain)
      }
    },
    methods : {
      getRemoteData(train) {
        let querySql = `TRAINNO_0 = '${train}'`

        mdpInterfaceService.queryBy(this, "V_GZLL", {params: {queryResultFilterSql: querySql},
          onSuccess: (resp) => {

            // console.log(resp)
            this.dataItems = resp.rows

          }, onError: (error) => {
            console.log(error)
          }
        })
      }
    },
    mounted () {

    }

  }
</script>

<style scoped>

  .title {
    padding-top: 10px;
    font-size: 18px;
    display: inline-block;
    font-weight: bold;
    color: #10ffeb;
  }

</style>
