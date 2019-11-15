<template>
  <tech-frame v-bind="frameInitOptions" :content-style="{overflow: 'hidden'}">
    <div class="title">
      <arrow-title :title-text="'故障履历'"></arrow-title>
    </div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
    <auto-fresh-pagination class="pagination"
                           :hideRefresh="true" :dataLoading="dataLoading" :pager="pagerInfo"
                           @to-page="handle2Page" ></auto-fresh-pagination>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import mdpInterfaceService from '../../service/MdpInterfaceService'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'
  import ArrowTitle from '../base/ArrowTitle'
  import AutoFreshPagination from '../base/AutoFreshPagination'

  export default {
    name: "FaultResume",
    components: {AutoFreshPagination, ArrowTitle, WrapTable, TechFrame},
    data () {
      return {
        columnSetting: {
          needIdx: false,
          idxOccupancyRate: 5,
          overallStyle: {"font-size": "13px"},
          rowHeight: '30px',
          rowMinHeight: '10px',
          titleRowStyle: {"font-size": "13px", "background-color": "#1d2d47"},
          oddRowStyle: null,
          evenRowStyle: null,
          columns: [
            {title: '故障单号', key: 'FAULTID', nullVal:'-', style: {width: '15%'}},
            {title: '服务站', key: 'SERVICESTATION_0', nullVal:'-', style: {width: '15%'}},
            {title: '故障来源', key: 'FAULTFROM_0', nullVal:'-', style: {width: '15%'}},
            {title: '车辆号', key: 'COACH_0', nullVal:'-', style: {width: '15%'}},
            {title: '故障现象', key: 'PHENOM', nullVal:'-', style: {width: '15%'}},
            {title: '任务状态', key: 'TASKSTATUS', nullVal:'-', style: {width: '15%'}, keyTranslate:{'00':'不处理', '10':'待审核', '20':'已建单', '30':'处理中', '99':'已关闭'}},
            {title: '发生时间', key: 'FAULTTIME', nullVal:'-', style: {width: '15%'}}
          ]
        },
        dataItems: null,
        pagerInfo: {
          layout: "prev, pager, next, total",
          total:0,
          pageSize: 5,
          currentPage: 1
        },
        currentTrain: null,
        dataLoading: true
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

        this.currentTrain = newTrain;

        this.getRemoteData()
      }
    },
    methods : {
      getRemoteData(page) {
        let train = this.currentTrain;

        let querySql = `TRAINNO_0 = '${train}'`

        mdpInterfaceService.queryBy(this, "V_GZLL",
          {
            params: {
              rows: 5,
              page: page ? page: 1,
              queryResultFilterSql: querySql
            },
            onSuccess: (resp) => {

              // console.log(resp)
              this.dataItems = resp.rows
              this.pagerInfo.total = resp.records

              this.dataLoading = false;


          }, onError: (error) => {

            this.dataLoading = false;

            console.log(error)
          }
        })
      },
      handle2Page(page) {
        console.log(`当前页: ${page}`);
        this.getRemoteData(page)

      },

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

  .pagination{
    position: absolute;
    bottom: 0;
    right: 20px;
  }

</style>
