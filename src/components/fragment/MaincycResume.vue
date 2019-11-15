<template>
  <tech-frame v-bind="frameInitOptions" :content-style="{overflow: 'hidden'}">
    <div class="title">
      <arrow-title :title-text="'检修信息'"></arrow-title>
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
  import { mapGetters } from 'vuex'
  import WrapTable from '../base/WrapTable'
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
            {title: '修程', key: 'BA_0', nullVal:'-', style: {width: '15%'}},
            {title: '开始时间', key: 'AD', nullVal:'-', style: {width: '15%'}},
            {title: '结束时间', key: 'AE', nullVal:'-', style: {width: '15%'}},
            {title: '修时里程', key: 'AK', nullVal:'-', style: {width: '15%'}},
            {title: '执行单位', key: 'AF_0', nullVal:'-', style: {width: '15%'}},
            {title: '维修地点', key: 'DD', nullVal:'-', style: {width: '15%'}},
            {title: '监控人', key: 'AG', nullVal:'-', style: {width: '15%'}}
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

        let querySql = `AA_0 = '${train}'`

        this.dataLoading = true;

        mdpInterfaceService.queryBy(this, "LLCZ_LATEST_M",
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
