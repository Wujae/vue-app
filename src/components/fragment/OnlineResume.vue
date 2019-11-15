<template>
  <tech-frame v-bind="frameInitOptions" :content-style="{overflow: 'hidden'}">
    <div class="title">
      <arrow-title :title-text="'开行信息'"></arrow-title>
    </div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
    <auto-fresh-pagination class="pagination"
                           :hideRefresh="true" :dataLoading="dataLoading" :pager="pagerInfo"
                           @to-page="handle2Page" @auto-fresh="handleAutoFresh"></auto-fresh-pagination>
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
            {title: '前车', key: 'JAE_0', nullVal:'-', style: {width: '8%'}},
            {title: '后车', key: 'JAG_0', nullVal:'-', style: {width: '8%'}},
            {title: '首发车次', key: 'AA', nullVal:'-', style: {width: '10%'}},
            {title: '开行日期', key: 'JDATE', nullVal:'-', style: {width: '15%'}},
            {title: '始发站', key: 'AF', nullVal:'-', style: {width: '10%'}},
            {title: '终到站', key: 'AG', nullVal:'-', style: {width: '10%'}},
            {title: '始发时间', key: 'AD', nullVal:'-', style: {width: '10%'}},
            {title: '终到时间', key: 'AE', nullVal:'-', style: {width: '10%'}},
            {title: '运行时长', key: 'SJ', nullVal:'-', style: {width: '10%'}},
            {title: '区间里程', key: 'LC', nullVal:'-', style: {width: '10%'}},
            {title: '值乘人', key: 'BA', nullVal:'-', style: {width: '10%'}},
          ]
        },
        pagerInfo: {
          total:0,
          pageSize: 5,
          currentPage: 1
        },
        dataItems: null,
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
        let querySql = ` REGEXP_INSTR( JAE_0 || ',' ||JAG_0, '^${train},|,${train}$' ) > 0 `

        this.dataLoading = true;
        mdpInterfaceService.queryBy(this, "V_KXQK",
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
              console.log(error)
              this.dataLoading = false;

            }
        })
      },
      handle2Page(page) {
        console.log(`当前页: ${page}`);
        this.getRemoteData(page)

      },
      handleAutoFresh(flag) {
        console.log(`刷新状态: ${flag}`);
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

  .pagination{
    position: absolute;
    bottom: 0;
    right: 20px;
  }

</style>
