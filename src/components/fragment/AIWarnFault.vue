<template>
  <tech-frame v-bind="frameInitOptions" :content-style="{overflow: 'hidden'}">
    <div id="onlinestatus5-l1">
      <arrow-title :title-text="'模型预警'" />
    </div>
    <div id="onlinestatus5-r1">
      <level-dropdown v-bind:style="styleObject3" :drop-down-items="dropDownItems"  @level-clicked="handleLevelClick" @levelSelected="handleLevelChange"></level-dropdown>
    </div>
    <auto-fresh-pagination class="pagination" @autoed="getRefreshData"
                           :dataLoading="dataLoading" :pager="pagerInfo"
                           @to-page="handlePageChange"  @auto-fresh="handleAutoFresh"></auto-fresh-pagination>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'
  import LevelDropdown from "../base/LevelDropdown";
  import ArrowTitle from '../base/ArrowTitle'
  import AutoFreshPagination from '../base/AutoFreshPagination'

  import mdpInterfaceService from '../../service/MdpInterfaceService'

  //aiWarnFault
  export default {
    name: "OnlineStatus2",
    components: {AutoFreshPagination, ArrowTitle, WrapTable, TechFrame,LevelDropdown},
    data () {
      return {
        columnSetting: {
          needIdx: false,
          idxOccupancyRate: 5,
          overallStyle: null,
          rowHeight: '31.5px',
          rowMinHeight: '20px',
          titleRowStyle: {"background-color": "#1d2d47"},
          oddRowStyle: null,
          evenRowStyle: null,
          columns: [
            {title: '服务站', key: 'SERVICE_STATION', style: {width: '20%', 'font-size': '14px'}},
            {title: '车型', key: 'TRAIN_MODEL', style: {width: '15%', 'font-size': '14px'}},
            {title: '车组号', key: 'TRAIN_NO', style: {width: '15%', 'font-size': '14px'}},
            {title: '车辆号', key: 'COACH', style: {width: '10%', 'font-size': '14px'}},
            {title: '部位', key: 'AC_NUM',  style: {width: '20%', 'font-size': '12px'},
              titleStyle: {width: '20%', 'font-size': '14px', 'justify-content': 'center'}},
            {title: '健康状况', key: 'FAULT_MESSAGE', style: {width: '13%', 'font-size': '12px'},
              titleStyle: {width: '20%', 'font-size': '14px'}},
            {title: '预警时间', key: 'RS_DATE', style: {width: '20%', 'font-size': '14px'}}

          ]
        },
        // dataItems: null,
        dataItems:[],
        dropDownItems:[],
        styleObject3:{
          position: 'absolute',
          top: '-30px',
          right: '30px',
          width: '100px',
          height: '20px'
        },
        levelSelected: '疾病',
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
        'getAIWarnFault','getAIWarnFaultCount'
      ])
    },
    watch: {
      getAIWarnFault (newv) { //newv 就是改变后的getTrains值
        //console.log(newv)
        this.dataItems = newv.rows
      },
      getAIWarnFaultCount (newv) { //newv 就是改变后的getTrains值

        this.dropDownItems = [
          {
            key: 'AC',
            selected: this.levelSelected === 'AC',
            //name: `空调  ${newv[0].amount}`,
            name: `空调`,
            style: {'background-color': '#bf3131', color: '#fff'}
          },
          {
            key: 'AX',
            selected: this.levelSelected === 'AX',
            //name: `轴温  ${newv[2].amount}`,
            name: `轴温`,
            style: {'background-color': '#ac990a', color: '#fff'}
          },
          {
            key: 'MO',
            selected: this.levelSelected === 'MO',
            //name: `电机  ${newv[1].amount}`,
            name: `电机`,
            style: {'background-color': '#c08528', color: '#fff'}
          },
          {
            key: 'GE',
            selected: this.levelSelected === 'GE',
            //name: `齿轮箱  ${newv[3].amount}`,
            name: `齿轮箱`,
            style: {'background-color': '#88ac33', color: '#fff'}
          }
        ]

      }
    },
    mounted () {
      mdpInterfaceService.getAIWarnFaultCount(this);

    },
    methods : {
      getData (doEnableTimer){

        this.dataLoading = true;

        mdpInterfaceService.fetchAIWarnFault(this,
          {
            params: {
              page: this.pagerInfo.currentPage,
              level: this.levelSelected
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
        }
      },
      handleLevelClick(event) {
        //console.log('handleLevelClick');
        this.levelSelected = event.key
        this.pagerInfo.currentPage = 1

        this.disabledTimerQuery()
      },
      handleLevelChange(event) {

        console.log('handleLevelChange');
        if(this.refreshFlag){
          this.enabledTimerQuery()
        }
      },
      enabledTimerQuery(){
        this.getData(true)
      },
      disabledTimerQuery(){
        this.getData(false)
      }
    }

  }
</script>

<style scoped>

  .pagination{
    position: absolute;
    bottom: 0;
    right: 20px;
  }

  #onlinestatus5-l1 {
    display: inline-block;
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin-top: 10px;
  }
  #onlinestatus5-r1 {
    position: relative;

  }
  #onlinestatus5-r1 select {
    position: absolute;
    top: -20px;
    right: 30px;
    width: 100px;
    height: 20px;
  }

</style>
