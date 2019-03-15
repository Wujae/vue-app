<template>
  <tech-frame v-bind="frameInitOptions" :content-style="{overflow: 'hidden'}">
    <div class="title">检修信息</div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import mdpInterfaceService from '../../service/MdpInterfaceService'
  import { mapGetters } from 'vuex'
  import WrapTable from '../base/WrapTable'

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
            {title: '修程', key: 'BA_0', nullVal:'-', style: {width: '15%'}},
            {title: '开始时间', key: 'AD', nullVal:'-', style: {width: '15%'}},
            {title: '结束时间', key: 'AE', nullVal:'-', style: {width: '15%'}},
            {title: '修时里程', key: 'AK', nullVal:'-', style: {width: '15%'}},
            {title: '执行单位', key: 'AF_0', nullVal:'-', style: {width: '15%'}},
            {title: '维修地点', key: 'DD', nullVal:'-', style: {width: '15%'}},
            {title: '监控人', key: 'AG', nullVal:'-', style: {width: '15%'}}
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
        let querySql = `AA_0 = '${train}'`

        mdpInterfaceService.queryBy(this, "LLCZ", {params: {queryResultFilterSql: querySql},
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
