<template>
  <div>
    <div class="header">
      <div class="title">列车参数</div>
      <train-select></train-select>
    </div>
    <grid-layout class="grid-layout" :layout.sync="layout" :col-num="12" :row-height="150" :is-draggable="true"
                 :is-resizable="true"
                 :is-mirrored="false" :vertical-compact="true" :margin="[0, 0]" :use-css-transforms="true">

      <grid-item v-for="( item, i ) in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
                 :is-draggable="item.isDraggable" :is-resizable="item.isResizable" :i="item.i">
        <component :is="item.innerComponent" :frameInitOptions="gridVolume[i]"/>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
  import VueGridLayout from 'vue-grid-layout';
  import thmInterfaceService from '../../service/ThmInterfaceService'
  import {mapGetters} from 'vuex'
  import TrainSelect from '../base/TrainSelect'

  //trainParams
  export default {
    name: '',
    components: {
      TrainSelect,
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem
    },
    data() {
      return {
        layout: [
          {
            "x": 0,
            "y": 0,
            "w": 6,
            "h": 4.5,
            "i": "0",
            isDraggable: false,
            isResizable: false,
            "innerComponent": "async-echarts-compa0",
            "componentPath": "fragment/TrainParamsEntity"
          },
          {
            "x": 6,
            "y": 0,
            "w": 6,
            "h": 4.5,
            "i": "1",
            isDraggable: false,
            isResizable: false,
            "innerComponent": "async-echarts-compa1",
            "componentPath": "fragment/TrainParamsUnit"
          },
          {
            "x": 0,
            "y": 4.5,
            "w": 12,
            "h": 4.5,
            "i": "2",
            isDraggable: false,
            isResizable: false,
            "innerComponent": "async-echarts-compa2",
            "componentPath": "fragment/TrainParamsParts"
          }
        ],
        gridVolume: [
          {size: {width: 6 * 150, height: 150 * 4.5}, blurDistance: 3, connerClip: [0, 0, 0, 0]},
          {size: {width: 6 * 150, height: 150 * 4.5}, blurDistance: 3, connerClip: [0, 0, 0, 0]},
          {size: {width: 12 * 150, height: 150 * 4.5}, blurDistance: 3, connerClip: [0, 0, 0, 0]}

        ],
        callbackdata: {},//返回数据
      }
    },
    computed: {
      ...mapGetters([
        'getTrainSelected'
      ])
    },
    watch: {
      getTrainSelected(newTrain) { //newv 就是改变后的trainSelected值

        this.getRemoteData(newTrain)
      }
    },
    methods: {
      getRemoteData(sn) {
        thmInterfaceService.getTrainParamsData(this, {
          params: {sn: sn}, onSuccess: (resp) => {
            //[0,1,2] O:整车， 1：牵引 2：部件
            //resp
            console.log(resp, '999999')
            console.log(resp[0],'ddddd',this) //commit updateTrainParamsEntity
            this.$store.commit('updateTrainParamsEntity', resp[0]);
            this.$store.commit('updateTrainParamsUnit', resp[1]);
            this.$store.commit('updateTrainParamsParts', resp[2])
            resp[1] //commit updateTrainParamsUnit
            resp[2] //commit updateTrainParamsParts
          }
        })
      }
    },
    created() {

      this.layout.forEach(item => {

        this.registerComponent(item.innerComponent, item.componentPath);
      });
    },
    mounted() {
      //车组上线状态数据
      thmInterfaceService.getTrainParamsData(this, {params: {sn: newTrain}})

    },
    // methods: {
    //
    // }
  }
</script>

<style scoped>

  .header {
    height: 40px;
    position: relative;
  }

  .title {
    color: #10ffeb;
    float: left;
    width: 300px;
    position: absolute;
    left: 50%;
    margin-left: -150px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing:2px;
    padding-top: 8px;
  }


  .title:before {
    color: #10ffeb;
    content: "<<<<< ";
    font-weight: lighter;
  }

  .title:after {
    color: #10ffeb;
    content: " >>>>>";
    font-weight: lighter;
  }

  .vue-grid-item {
    /*border: 1px solid gray;*/
    /*font-size: 150px;*/
  }
</style>

