<template>
  <tech-frame v-bind="frameInitOptions" :content-style="{overflow: 'hidden'}">
    <div class="title">开行信息</div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import mdpInterfaceService from '../../service/MdpInterfaceService'
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
            {title: '前车', key: 'JAE_0', nullVal:'-', style: {width: '8%'}},
            {title: '后车', key: 'JAG_0', nullVal:'-', style: {width: '8%'}},
            {title: '车次', key: 'AA', nullVal:'-', style: {width: '10%'}},
            {title: '开行日期', key: 'JDATE', nullVal:'-', style: {width: '10%'}},
            {title: '始发站', key: 'AF', nullVal:'-', style: {width: '10%'}},
            {title: '终到站', key: 'AG', nullVal:'-', style: {width: '10%'}},
            {title: '始发时间', key: 'AD', nullVal:'-', style: {width: '10%'}},
            {title: '终到时间', key: 'AE', nullVal:'-', style: {width: '10%'}},
            {title: '运行时长', key: 'SJ', nullVal:'-', style: {width: '10%'}},
            {title: '区间里程', key: 'LC', nullVal:'-', style: {width: '15%'}},
            {title: '值乘人', key: 'BA', nullVal:'-', style: {width: '10%'}},
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
    mounted () {
      let querySql = "JAE_0 = '3501' OR JAG_0 = '3501'"

      mdpInterfaceService.queryBy(this, "V_KXQK", {params: {queryResultFilterSql: querySql},
        onSuccess: (resp) => {

          console.log(resp)
          this.dataItems = resp.rows

        }, onError: (error) => {
            console.log(error)
        }
      })
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
