<template>
  <tech-frame v-bind="frameInitOptions"  :content-style="{overflow: 'hidden'}">
    <div id="onlinestatus3-l1">列 车 整 车 参 数</div>
    <wrap-table :column-setting="columnSetting" :data-items="dataItems"></wrap-table>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'
  import { mapGetters } from 'vuex'

  //trainParamsEntity
  export default {
    name: "OnlineStatus2",
    data () {
      return {
        columnSetting: {
          needIdx: true,
          idxOccupancyRate: 10,
          overallStyle: {'border-bottom':'1px solid #23a2da'},
          rowHeight: '46px',
          rowMinHeight: '20px',
          titleRowStyle: {'background-color': '#1b3b65','border':'1px solid #23a2da'},
          oddRowStyle:{'background-color': '#1a4069'},
          evenRowStyle:{'background-color': '#1c3759'},
          columns:null

          //   [
          //   {title: '项目', key: 'number', style: {width: '30%', 'font-size': '14px', color:'white'},  titleStyle: {width: '30%', 'font-size': '14px', color:' #09f2e1'}},
          //   {title: '1车设备', key: 'station', style: {width: '40%', 'font-size': '14px', color:'white'},  titleStyle: {width: '40%', 'font-size': '14px', color:' #09f2e1'}},
          //   {title: '8车设备', key: 'alloc', style: {width: '30%', 'font-size': '14px', color:'white'},  titleStyle: {width: '30%', 'font-size': '14px', color:' #09f2e1'}}
          //   // {title: '车辆号', key: 'online', style: {width: '10%', 'font-size': '14px'}},
          //   // {title: '所属系统', key: 'trans', style: {width: '25%', 'font-size': '14px'}},
          //   // {title: '故障代码', key: 'stopped', style: {width: '20%', 'font-size': '14px'}}
          //
          // ]
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
        'getTrainParamsEntity'
      ])
    },
    watch: {
      getTrainParamsEntity (newv) { //newv 就是改变后的getTrains值
        console.log(newv,'jjjjj')
        this.parseData(newv);
      }
    },
    components: {WrapTable, TechFrame},
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
              style: {width: '50%', 'font-size': '14px', color: 'white'},
              titleStyle: {width: '50%', 'font-size': '14px', color: ' #09f2e1'}
            }];
            data.coaches.forEach((coach, idxe) => {

              result.push({
                title: `${coach}车设备`,
                key: `param_${idxe}`,
                style: {width: '50%', 'font-size': '14px', color: 'white'},
                titleStyle: {width: '50%', 'font-size': '14px', color: ' #09f2e1'}
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

      }
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
    color: #09f2e1;
    font-weight: bolder;
    font-size: 18px;
    margin-top: 30px;
    margin-right:500px;
  }
  #onlinestatus3-r1 {
    position: relative;

  }
  #onlinestatus3-r1 select {
    position: absolute;
    top: -20px;
    right: 0px;
    width: 150px;
    height: 20px;
    background: #1b3b65;
    border-color: #23a2da;
    color: white;
  }

</style>
