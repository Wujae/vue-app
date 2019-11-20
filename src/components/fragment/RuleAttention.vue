<template>
  <tech-frame v-bind="frameInitOptions">
    <div id="onlinestatus6-l1">
      <arrow-title :title-text="'规则关注'" />
    </div>
    <div id="onlinestatus6-r1">
      <!--<level-dropdown v-bind:style="styleObject5" :drop-down-items="dropDownItems"></level-dropdown>-->
    </div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
    <auto-fresh-pagination class="pagination" @autoed="getRefreshData"
                           :dataLoading="dataLoading" :pager="pagerInfo"
                           @to-page="handlePageChange"  @auto-fresh="handleAutoFresh"></auto-fresh-pagination>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'
  import LevelDropdown from "../base/LevelDropdown";
  import mdpInterfaceService from '../../service/MdpInterfaceService'
  import ArrowTitle from '../base/ArrowTitle'
  import AutoFreshPagination from '../base/AutoFreshPagination'

  //ruleAttention
  export default {
    name: "OnlineStatus2",
    components: {AutoFreshPagination, ArrowTitle, WrapTable, TechFrame,LevelDropdown},
    data () {
      return {
        columnSetting: {
          needIdx: false,
          idxOccupancyRate: 5,
          overallStyle: null,
          rowHeight: '30px',
          rowMinHeight: '20px',
          titleRowStyle: {"background-color": "#1d2d47"},
          oddRowStyle: null,
          evenRowStyle: null,
          columns: [
            {title: '关注项点', key: 'name', style: {width: '20%', 'font-size': '14px'}},
            {title: '车型', key: 'trainTypeName', style: {width: '15%', 'font-size': '14px'}},
            {title: '车组号', key: 'trainId', style: {width: '10%', 'font-size': '14px'}},
            {title: '车辆号', key: 'vehicleNo', style: {width: '10%', 'font-size': '14px'}},
            {title: '关注参数', key: 'partName',
              style: {width: '20%', 'font-size': '14px', overflow: 'hidden', 'word-break': 'keep-all', 'text-overflow': 'ellipsis', 'justify-content': 'start'},
              titleStyle: {width: '20%', 'font-size': '14px', 'justify-content': 'center'}
             },
            {title: '参数值', key: 'paramValue', style: {width: '10%', 'font-size': '14px'}},
            {title: '参数趋势', key: 'changeTrend', style: {width: '10%', 'font-size': '14px'}}

          ]
        },
        // dataItems: null,
        dataItems:[],
        dropDownItems:[],
        styleObject5:{
          position: 'absolute',
          top: '-30px',
          right: '30px',
          width: '100px',
          height: '20px'
        },
        levelSelected: 'A',
        pagerInfo: {
          layout: 'prev, pager, next',
          total:0,
          pageSize: 5,
          currentPage: 1
        },
        dataLoading: true,
        refreshFlag: true
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
        'getRuleAttentionCount',
        'getCurrentFaultCount'
      ])
    },

    watch: {
      getRuleAttention (newv) { //newv 就是改变后的ruleAttention值
        this.dataItems = newv

      },
      getCurrentFaultCount (newv){
        this.handleLevelChange()

      },
      getRuleAttentionCount (newv) { //newv 就是改变后的ruleAttentionCount值
        //console.log('getRuleAttentionCount', newv,)
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
    mounted () {
      console.log('ruleAttention mounted')

      //mdpInterfaceService.getRuleAttentionCount(this);
      this.getData(true)

    },
    methods : {
      getData(doTimer){
        mdpInterfaceService.getRuleAttention(this,
          {
            params: {
              page: this.pagerInfo.currentPage
            },
            onSuccess:(response) => {

              this.pagerInfo.total = response.records

              this.dataLoading = false;
            },
            onError:() => {
              this.dataLoading = false;
            }
          });
      },
      parseData (rawdata) {
        if(!rawdata || rawdata.length === 0 ) return;

      },
      handlePageChange(page) {
        //console.log(`当前页: ${page}`)
        //切换页面将停止自动刷新逻辑
        this.pagerInfo.currentPage = page

        //console.log('paging');
        this.disabledTimerQuery()

      },
      getRefreshData(flag) {
        this.refreshFlag = flag
      },
      handleAutoFresh(flag) {
        //切换自动刷新将跳转第一页
        //console.log(`刷新状态: ${flag}`);
        if(flag){
          this.pagerInfo.currentPage = 1
        }else{
          //阻止数据请求
          mdpInterfaceService.stopRuleAttentionPendingTask()
        }
      },
      handleLevelClick(event) {
        //console.log('handleLevelClick');
        this.disabledTimerQuery()
      },
      handleLevelChange(event) {

        //console.log('handleLevelChange');
        if(this.refreshFlag){
          this.enabledTimerQuery()
        }
      },
      enabledTimerQuery(){
        this.getData(true)
      },
      disabledTimerQuery(){
        this.getData(false)
      },
    }
  }
</script>

<style scoped>

  .pagination{
    position: absolute;
    bottom: 0;
    right: 20px;
  }

  #onlinestatus6-l1 {
    display: inline-block;
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin-top: 10px;
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
