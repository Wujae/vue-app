<template>
  <tech-frame v-bind="frameInitOptions" :content-style="{overflow: 'hidden'}">
    <div id="onlinestatus3-l1">
      <arrow-title :title-text="'车组报警'"></arrow-title>
    </div>
    <div id="onlinestatus3-r1">
      <level-dropdown v-bind:style="styleObject2" :drop-down-items="dropDownItems" @level-clicked="handleLevelClick" @levelSelected="handleLevelChange"></level-dropdown>
    </div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems" ></wrap-table>
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
  import ArrowTitle from '../base/ArrowTitle'
  import AutoFreshPagination from '../base/AutoFreshPagination'

  import thmInterfaceService from '../../service/ThmInterfaceService'

  //currentFaultSimple
  export default {
    name: "OnlineStatus2",
    data () {
      return {
        columnSetting: {
          needIdx: false,
          idxOccupancyRate: 5,
          overallStyle: null,
          rowHeight: '32px',
          rowMinHeight: '20px',
          titleRowStyle: {"background-color": "#1d2d47"},
          oddRowStyle: null,
          evenRowStyle: null,
          columns: [
            // {title: '序号', key: 'number', style: {width: '10%', 'font-size': '14px'}},
            {title: '车型', key: 'trainType', style: {width: '20%', 'font-size': '14px'}},
            {title: '车组号', key: 'sn', style: {width: '15%', 'font-size': '14px'}},
            {title: '车辆号', key: 'coach', style: {width: '10%', 'font-size': '14px'}},
            {title: '所属系统', key: 'sysName', style: {width: '25%', 'font-size': '14px'}},
            {title: '故障代码', key: 'faultCode', style: {width: '20%', 'font-size': '14px'}}

          ]
        },
        // dataItems: null,
        dataItems:[],
        dropDownItems: [],
        styleObject2:{
          position: 'absolute',
          top: '-30px',
          right: '30px',
          width: '100px',
          height: '20px',
          opacity:1
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
        'getCurrentFaultSimple','getCurrentFaultCount'
      ])
    },
    watch: {
      getCurrentFaultSimple (newv) { //newv 就是改变后的getTrains值

        // console.log(newv,'vvvvvvv')
        this.dataItems=newv.list
      },
      getCurrentFaultCount (newv){
        this.dropDownItems = [
          {
            key: 'A',
            selected: this.levelSelected === 'A',
            name: `A 级  ${newv[0].count}`,
            style: {'background-color': '#bf3131', color: '#fff'}
          },
          {
            key: 'B',
            selected: this.levelSelected === 'B',
            name: `B 级  ${newv[1].count}`,
            style: {'background-color': '#c08528', color: '#fff'}
          },
          {
            key: 'C',
            selected: this.levelSelected === 'C',
            name: `C 级  ${newv[2].count}`,
            style: {'background-color': '#ac990a', color: '#fff'}
          }
        ]
      }
    },
    components: {AutoFreshPagination, ArrowTitle, WrapTable, TechFrame,LevelDropdown},
    methods : {
      getData (doEnableTimer){

        this.dataLoading = true;

        thmInterfaceService.fetchFaultDataSimple(this,
          {
            params: {
              fault_level: this.levelSelected,
              pageNo: this.pagerInfo.currentPage,
            },
            onSuccess:(response) => {

              this.pagerInfo.total = response.total
              this.dataLoading = false;
            },
            onError:() => {
              this.dataLoading = false;
            }
          }, doEnableTimer);

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
          thmInterfaceService.stopFaultDataSimplePendingTask()
        }
      },
      handleLevelClick(event) {
        //console.log('handleLevelClick');
        this.levelSelected = event.key
        this.pagerInfo.currentPage = 1

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

  #onlinestatus3-l1 {
    display: inline-block;
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin-top: 10px;
  }

  #onlinestatus3-r1 {
    position: relative;

  }
  #onlinestatus3-r1 select {
    position: absolute;
    top: -20px;
    right: 30px;
    width: 100px;
    height: 20px;
  }

</style>
