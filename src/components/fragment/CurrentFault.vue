<template>
  <tech-frame v-bind="frameInitOptions">
    <div id="onlinestatus2-l1">
      <slash-title :title-text="'实 时 故 障 信 息'"/>
    </div>
    <div id="onlinestatus2-r1">
      <level-dropdown v-bind:style="styleObject4" :drop-down-items="dropDownItems" @level-clicked="handleLevelClick" @levelSelected="handleLevelChange"></level-dropdown>
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
  import ArrowTitle from '../base/ArrowTitle'
  import SlashTitle from '../base/SlashTitle'
  import AutoFreshPagination from '../base/AutoFreshPagination'

  import thmInterfaceService from '../../service/ThmInterfaceService'

  //currentfault
  export default {
    name: "CurrentFault",
    components: {AutoFreshPagination, SlashTitle, ArrowTitle, LevelDropdown, WrapTable, TechFrame},
    data () {
      return {
        columnSetting: {
          needIdx: false,
          idxOccupancyRate: 5,
          overallStyle: null,
          rowHeight: '45px',
          rowMinHeight: '20px',
          titleRowStyle: {"background-color": "#1d2d47"},
          oddRowStyle: null,
          evenRowStyle: null,
          columns: [
            // {title: '序号', key: '', style: {width: '5%', 'font-size': '14px'}},
            {title: '车型', key: 'trainType', style: {width: '10%', 'font-size': '14px'}},
            {title: '车组号', key: 'sn', style: {width: '10%', 'font-size': '14px'}},
            {title: '车辆号', key: 'coach', style: {width: '8%', 'font-size': '14px'}},
            {title: '所属系统', key: 'sysName', style: {width: '15%', 'font-size': '14px'}},
            {title: '故障代码', key: 'faultCode', style: {width: '10%', 'font-size': '14px'}},
            {title: '故障现象', key: 'descer', style: {width: '18%', 'font-size': '14px'}},
            {title: '故障时间', key: 'faultTime', style: {width: '27%', 'font-size': '14px'}},
            {title: '故障等级', key: 'lvl', style: {width: '10%','font-size': '14px'}},
            {
              title: '故障状态', key: 'occrStatus',
              style: {width: '10%', 'font-size': '14px'},
              keyTranslate: {'1': '发生', '0': '恢复'}
            },
            {title: '故障类型', key: 'errorType', style: {width: '10%', 'font-size': '14px'}},
            {
              title: '故障模式', key: 'mode',
              style: {width: '10%', 'font-size': '14px'},
              keyTranslate: {'1': '维护', '0': '非维护'}
            },
            {
              title: '是否上线', key: 'isOnLine',
              style: {width: '10%', 'font-size': '14px'},
              keyTranslate: {'1': '是', '0': '否'}
            }
            /*,
            {
              title: '处理状态', key: 'dealStatus',
              style: {width: '10%', 'font-size': '14px'},
              keyTranslate: {'1': '已处理', '0': '未处理'}
            }*/
          ]
        },
        dataItems: [],
        dropDownItems: [],
        styleObject4:{
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
          pageSize: 21,
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
        'getCurrentFault','getCurrentFaultCount'
      ])
    },
    watch: {
      getCurrentFault (newv) { //newv 就是改变后的getCurrentFault值（请求回来的数据）

        this.dataItems = newv.list
        //this.parseData(newv);
      },
      getCurrentFaultCount (newv){
        this.parseFaultCountData(newv)

      }
    },
    methods : {
      getData (doEnableTimer){

        this.dataLoading = true;

        thmInterfaceService.fetchFaultData(this,
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
      parseFaultCountData (rawdata) {

       let list = [
         {
           key: 'A',
           selected: this.levelSelected === 'A',
           name: `A 级  ${rawdata[0].count}`,
           style: {'background-color': '#bf3131', color: '#fff'}
         },
         {
           key: 'B',
           selected: this.levelSelected === 'B',
           name: `B 级  ${rawdata[1].count}`,
           style: {'background-color': '#c08528', color: '#fff'}
         },
         {
           key: 'C',
           selected: this.levelSelected === 'C',
           name: `C 级  ${rawdata[2].count}`,
           style: {'background-color': '#ac990a', color: '#fff'}
         }
       ]
        this.dropDownItems = list
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
          thmInterfaceService.stopFaultDataPendingTask()
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


  #onlinestatus2-l1 {
    display: inline-block;
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin-top: 10px;
  }
  #onlinestatus2-r1 {
    position: relative;

  }

</style>
