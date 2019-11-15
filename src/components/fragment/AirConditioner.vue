<template>
  <tech-frame v-bind="frameInitOptions" :content-style="{overflow: 'hidden'}">
    <div id="onlinestatus5-l1">
      <arrow-title :title-text="'空调健康评估'" />
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

  //airConditioner
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
            {title: '配属局', key: 'ALLOCATE_BUREAU', style: {width: '18%', 'font-size': '14px'}},
            {title: '服务站', key: 'SERVICE_STATION', style: {width: '20%', 'font-size': '14px'}},
            {title: '车型', key: 'TRAIN_MODEL', style: {width: '15%', 'font-size': '14px'}},
            {title: '车组号', key: 'TRAIN_NO', style: {width: '15%', 'font-size': '14px'}},
            {title: '车辆号', key: 'COACH', style: {width: '10%', 'font-size': '14px'}},
            {title: '空调序号', key: 'AC_NUM', style: {width: '13%', 'font-size': '14px'}},
            {title: '健康状况', key: 'HEALTH_STATUS', style: {width: '13%', 'font-size': '14px'}},
            {title: '评估日期', key: 'EVALUATE_DATE', style: {width: '20%', 'font-size': '14px'}}

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
          pageSize: 4,
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
        'getAirConditioner','getAirConditionerCount'
      ])
    },
    watch: {
      getAirConditioner (newv) { //newv 就是改变后的getTrains值
        console.log(newv)
        this.dataItems = newv.rows
      },
      getAirConditionerCount (newv) { //newv 就是改变后的getTrains值

        this.dropDownItems = [
          {
            key: '疾病',
            selected: this.levelSelected === '疾病',
            name: `A 疾病  ${newv[0].amount}`,
            style: {'background-color': '#bf3131', color: '#fff'}
          },
          {
            key: '恶化',
            selected: this.levelSelected === '恶化',
            name: `B 恶化  ${newv[1].amount}`,
            style: {'background-color': '#c08528', color: '#fff'}
          },
          {
            key: '注意',
            selected: this.levelSelected === '注意',
            name: `C 注意  ${newv[2].amount}`,
            style: {'background-color': '#ac990a', color: '#fff'}
          },
          {
            key: '良好',
            selected: this.levelSelected === '良好',
            name: `D 良好  ${newv[3].amount}`,
            style: {'background-color': '#88ac33', color: '#fff'}
          },
          {
            key: '健康',
            selected: this.levelSelected === '健康',
            name: `E 健康  ${newv[4].amount}`,
            style: {'background-color': '#11ac68', color: '#fff'}
          }
        ]

      }
    },
    mounted () {
      mdpInterfaceService.getAirConditionerCount(this);

    },
    methods : {
      getData (doEnableTimer){

        this.dataLoading = true;

        mdpInterfaceService.fetchAirConditioner(this,
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
        }
      },
      handleLevelClick(event) {
        //console.log('handleLevelClick');
        this.disabledTimerQuery()
      },
      handleLevelChange(event) {

        console.log('handleLevelChange');
        this.levelSelected = event.key
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
    margin-top: 30px;
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
