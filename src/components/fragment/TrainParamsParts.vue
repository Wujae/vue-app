<template>
  <tech-frame v-bind="frameInitOptions"  :content-style="{overflow: 'hidden'}">
    <div id="onlinestatus3-l1">
      <slash-title :title-text="'列 车 部 件 参 数'" />
    </div>

    <wrap-table :column-setting="columnSetting" :data-items="dataItems" style="height: calc(100% - 58px)"></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'
  import SlashTitle from '../base/SlashTitle'

  const TRAIN_STATUS = [
    '运行中', '传输中', '停止运行', '离线', '断开连接'
  ];
  const  TRAIN_STATUS_ALIAS = [
    'online', 'trans', 'stopped', 'offline', 'disconnect'
  ];

  const  LVL_COLOR = {
    A: '#c43838',
    B: '#cf8c2d',
    C:'#cdcd40',
    NORMAL: '#5ab943'
  };

  //trainParamsParts
  export default {
    name: "",
    data () {
      return {
        columnSetting: {
          needIdx: false,
          idxOccupancyRate: 10,
          overallStyle: {'border-bottom':'1px solid #23a2da', width: '98%', margin: '0 1%'},
          rowHeight: '35px',
          rowMinHeight: '20px',
          titleRowStyle: {'background-color': '#1b3b65','border':'1px solid #23a2da', height: '35px', 'font-weight': 'normal'},
          oddRowStyle:{'background-color': '#1a4069', 'border-top': '1px solid #1d2d47'},
          evenRowStyle:{'background-color': '#1c3759', 'border-top': '1px solid #1d2d47'},
          columns:null
        },
        dataItems:[]
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
        'getTrainParamsParts'
      ])
    },
    watch: {
      getTrainParamsParts (newv) { //newv 就是改变后的getTrains值
        //console.log(newv,'lllllll')
        this.parseData(newv);
      }
    },
    components: {SlashTitle, WrapTable, TechFrame},
    mounted () {

    },
    methods : {
      parseData (rawdatas) {
        let newlist = rawdatas.map((data, idx) =>{

          if(idx === 0) {
            //拼columns
            let result = [{
              title: '项目',
              key: 'key',
              style: {width: '50%', 'font-size': '13px', color: 'white'},
              titleStyle: {width: '50%', 'font-size': '13px', color: ' #09f2e1'}
            }];
            data.coaches.forEach((coach, idxe) => {

              result.push({
                title: `${coach}车`,
                key: `param_${idxe}`,
                style: {width: '50%', 'font-size': '13px', color: 'white'},
                titleStyle: {width: '50%', 'font-size': '13px', color: ' #09f2e1'}
              })
            })

            this.columnSetting.columns = result

          }

          let resultData = {
            key: data.key
          }

          data.valueList.forEach((value, idxe) => {
            resultData[`param_${idxe}`] = value.param_value

          })

          //数据处理

          return resultData
        })

        // 数据的赋值
        this.dataItems = newlist


      },

    }
  }
</script>

<style scoped>
  .level-band-container-div{
    position: relative;
    width: 100%;
    padding: 10px;
  }

  .level-band-holder {
    width: 20%;
    height: 30px;
    display: inline-block;
  }

  .level-band {
    width: 100%;
    height: 15px;
  }

  .level-a {
    background-color: #c43838;
  }

  .level-b {
    background-color: #cf8c2d;

  }

  .level-c {
    background-color: #cdcd40;
  }

  .level-normal {
    background-color: #5ab943;
  }
  #onlinestatus3-l1 {
    display: inline-block;
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin: 20px auto;

  }

</style>
