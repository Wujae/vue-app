<template>
  <tech-frame v-bind="frameInitOptions "  :content-style="{overflow: 'hidden'}">
    <div id="onlinestatus4-l1">
      <arrow-title :title-text="'平台预警'" />
    </div>
    <div id="onlinestatus4-r1">
      <level-dropdown   :drop-down-items="dropDownItems" v-bind:style="styleObject" @level-clicked="handleLevelClick"></level-dropdown>
    </div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems[this.levelSelected]"></wrap-table>
    <auto-fresh-pagination class="pagination" @autoed="getRefreshData"
                           :dataLoading="dataLoading" :pager="pagerInfo"
                           @to-page="handlePageChange"  @auto-fresh="handleAutoFresh"></auto-fresh-pagination>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'
  import LevelDropdown from "../base/LevelDropdown"
  import ArrowTitle from '../base/ArrowTitle'
  import AutoFreshPagination from '../base/AutoFreshPagination'

  import thmInterfaceService from '../../service/ThmInterfaceService'

  //currentWarn
  export default {
    name: "OnlineStatus2",
    components: {AutoFreshPagination, ArrowTitle, WrapTable, TechFrame,LevelDropdown},
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
            {title: '车型', key: 'trainType', style: {width: '15%', 'font-size': '14px'}},
            {title: '车组号', key: 'sn', style: {width: '15%', 'font-size': '14px'}},
            {title: '车辆号', key: 'coach', style: {width: '10%', 'font-size': '14px'}},
            {title: '预警项目', key: 'warnName', style: {width: '40%', 'font-size': '14px'}},
            {title: '预警类型', key: 'warnType', style: {width: '10%', 'font-size': '14px'}}

          ]
        },
        // dataItems: null,
        dataItems:{
          A: [],
          B: [],
          C: [],
          D: []
        },
        dropDownItems: [ ],
        styleObject:{
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
          pageSize: 4,
          currentPage: 1
        },
        dataLoading: true,
        refreshFlag: false
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
        'getCurrentWarn','getCurrentFaultCount'
      ])
    },
    watch: {
      getCurrentWarn (newv) { //newv 就是改变后的getTrains值

        this.parseData(newv);
      },
      getCurrentFaultCount (newv){
        this.handleLevelChange()
      }
    },
    mounted() {
      this.enabledTimerQuery();
    },
    methods : {
      getData (doEnableTimer){

        this.dataLoading = true;

        thmInterfaceService.fetchWarnData(this,
          {
            onSuccess:(response) => {

              this.dataLoading = false;
            },
            onError:() => {
              this.dataLoading = false;
            }
          }, doEnableTimer);

      },
      parseData (rawdata) {
        let cont = { A:0, B:0, C:0, D:0 };

        this.dataItems.A.length = 0;
        this.dataItems.B.length = 0;
        this.dataItems.C.length = 0;
        this.dataItems.D.length = 0;

        //rawdata.forEach  data. warnLevel
        rawdata.forEach((data,index) => {


            switch (data.warnLevel) {
              case 'A':
                cont.A++;
                if(this.dataItems.A.length < this.pagerInfo.pageSize && (index >= (this.pagerInfo.currentPage-1) * this.pagerInfo.pageSize))
                  this.dataItems.A.push(data)
                break;
              case 'B':
                cont.B++;
                if(this.dataItems.B.length < this.pagerInfo.pageSize && (index >= (this.pagerInfo.currentPage-1) * this.pagerInfo.pageSize))
                  this.dataItems.B.push(data)
                break;
              case 'C':
                cont.C++;
                if(this.dataItems.C.length < this.pagerInfo.pageSize && (index >= (this.pagerInfo.currentPage-1) * this.pagerInfo.pageSize))
                  this.dataItems.C.push(data)
                break;
              case 'D':
                cont.D++;
                if(this.dataItems.D.length < this.pagerInfo.pageSize && (index >= (this.pagerInfo.currentPage-1) * this.pagerInfo.pageSize))
                  this.dataItems.D.push(data)
                break;
            }

        })

        this.pagerInfo.total = cont[this.levelSelected]

          let result = [{
            key: 'A',
            selected: this.levelSelected === 'A',
            name: `A 级 ${cont.A}`,
            style: {'background-color': '#bf3131', color: '#fff'}
          },
          {
            key: 'B',
            selected: this.levelSelected === 'B',
            name: `B 级 ${cont.B}`,
            style: {'background-color': '#c08528', color: '#fff'}
          },
          {
            key: 'C',
            selected: this.levelSelected === 'C',
            name: `C 级 ${cont.C}`,
            style: {'background-color': '#ac990a', color: '#fff'}
          },
          {
            key: 'D',
            selected: this.levelSelected === 'D',
            name: `D 级 ${cont.D}`,
            style: {'background-color': '#25ac48', color: '#fff'}
          }]

         this.dropDownItems = result

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
        console.log('handleLevelClick');

        this.levelSelected = event.key
        this.disabledTimerQuery()
      },
      handleLevelChange() {

        if(this.refreshFlag){
          this.enabledTimerQuery()
        }
      },
      handlePageChange(page) {
        //console.log(`当前页: ${page}`)
        //切换页面将停止自动刷新逻辑
        this.pagerInfo.currentPage = page

        //console.log('paging');
        this.disabledTimerQuery()

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

  #onlinestatus4-l1 {
    display: inline-block;
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin-top: 30px;
  }
  #onlinestatus4-r1 {
    position: relative;

  }

</style>
