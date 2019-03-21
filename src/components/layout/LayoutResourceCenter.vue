<template>
  <div>
    <div class="header">
      <div class="title">资源中心</div>
      <train-select></train-select>
    </div>
    <grid-layout class="grid-layout" :layout.sync="layout" :col-num="12" :row-height="270" :is-draggable="true"
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
  import TrainSelect from '../base/TrainSelect'

  export default {
    name: "LayoutResourceCenter",
    components: {
      TrainSelect,
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem
    },
    data (){
      return {
        layout: [
          {"x":0, "y":0, "w":12, "h":2, "i":"0", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa0", "componentPath": "fragment/TrainStructure" },
          {"x":0, "y":2, "w":7, "h":3, "i":"1", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa1", "componentPath": "fragment/TrainBaseInfo"  },
          {"x":7, "y":2, "w":5, "h":1, "i":"2", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa2", "componentPath": "fragment/OnlineResume"  },
          {"x":7, "y":3, "w":5, "h":1, "i":"3", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa3", "componentPath": "fragment/MaincycResume"  },
          {"x":7, "y":4, "w":5, "h":1, "i":"4", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa4", "componentPath": "fragment/FaultResume"  },
        ],
        gridVolume: [
          {size: {width: 12 * 150, height: 270 * 2}, blurDistance: 3, connerClip: [0, 0,  0, 0], contentStyle: {overflow: 'hidden'} },
          {size: {width:  7 * 150, height: 270 * 3}, blurDistance: 3, connerClip: [0, 0, 20, 0] },
          {size: {width:  5 * 150, height: 270 * 1}, blurDistance: 3, connerClip: [0, 0, 20, 0] },
          {size: {width:  5 * 150, height: 270 * 1}, blurDistance: 3, connerClip: [0, 0, 10, 0] },
          {size: {width:  5 * 150, height: 270 * 1}, blurDistance: 3, connerClip: [0, 0, 10, 0] },
        ],
        callbackdata:{},//返回数据
      }
    },
    created () {

      this.layout.forEach(item => {

        this.registerComponent(item.innerComponent, item.componentPath);
      });
    },
    mounted () {

    },
    methods: {

    }
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
</style>
