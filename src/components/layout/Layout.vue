<template>
  <div>
    <div class="header">
      <div class="title">全图监控</div>
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

  export default {
    name: 'Layout',
    components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem
    },
    data () {
      return {
        layout: [
          {
            "x": 0,
            "y": 0,
            "w": 7,
            "h": 5,
            "i": "0",
            isDraggable: false,
            isResizable: false,
            "innerComponent": "async-echarts-compa0",
            "componentPath": "fragment/BaiduOfflineMap"
          },
          {
            "x": 7,
            "y": 0,
            "w": 5,
            "h": 5,
            "i": "1",
            isDraggable: false,
            isResizable: false,
            "innerComponent": "async-echarts-compa1",
            "componentPath": "fragment/OnlineStatus"
          },
          {
            "x": 0,
            "y": 5,
            "w": 7,
            "h": 4,
            "i": "2",
            isDraggable: false,
            isResizable: false,
            "innerComponent": "async-echarts-compa2",
            "componentPath": "fragment/TrainAllocation"
          },
          {
            "x": 7,
            "y": 5,
            "w": 5,
            "h": 2,
            "i": "3",
            isDraggable: false,
            isResizable: false,
            "innerComponent": "async-echarts-compa3",
            "componentPath": "fragment/TrainStatus"
          },
          {
            "x": 7,
            "y": 7,
            "w": 5,
            "h": 2,
            "i": "4",
            isDraggable: false,
            isResizable: false,
            "innerComponent": "async-echarts-compa4",
            "componentPath": "fragment/RepairTaskInfo"
          },
        ],
        gridVolume: [
          {size: {width: 7 * 150, height: 150 * 5}, blurDistance: 3, connerClip: [0, 0, 0, 0]},
          {size: {width: 5 * 150, height: 150 * 5}, blurDistance: 3, connerClip: [0, 0, 20, 0]},
          {size: {width: 7 * 150, height: 150 * 4}, blurDistance: 3, connerClip: [0, 0, 20, 0]},
          {size: {width: 5 * 150, height: 150 * 2}, blurDistance: 3, connerClip: [0, 0, 10, 0]},
          {size: {width: 5 * 150, height: 150 * 2}, blurDistance: 3, connerClip: [0, 0, 10, 0]},
        ],
        callbackdata: {},//返回数据
      }
    },
    created () {

      this.layout.forEach(item => {

        this.registerComponent(item.innerComponent, item.componentPath);
      });
    },
    mounted () {

      //车组上线状态数据
      thmInterfaceService.getOnlineStatusData(this);

      //mInterfaceService.getFaultData(this);
      //thmInterfaceService.getWarnData(this);
      //thmInterfaceService.getTrainParamsData(this);
    },
    methods: {}
  }
</script>

<style scoped>

  .grid-layout {
    background-color: #181419;
    overflow: hidden;
    font: inherit;
    color: #ffffff;

    /*text-shadow: 0 0 5px #fff,
    0 0 10px #001da6,
    0 0 15px #2262a6,
    0 0 20px #2262a6,
    0 0 35px #2262a6,
    0 0 40px #2262a6,
    0 0 50px #2262a6,
    0 0 75px #2262a6;    */

    height: 100%;
    position: relative;

    font-family: Jura-light;
  }

  .vue-grid-item {
    /*border: 1px solid gray;*/
    /*font-size: 150px;*/
  }

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
</style>
