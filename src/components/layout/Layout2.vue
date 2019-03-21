<template>
  <div>
    <div class="header">
      <div class="title">列车参数</div>
    </div>
    <grid-layout class="grid-layout" :layout.sync="layout" :col-num="60" :row-height="30" :is-draggable="true"
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
  import mdpInterfaceService from '../../service/MdpInterfaceService'

  //eventCenter
  export default {
    name: '',
    components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem
    },
    data (){
      return {
        layout: [
          {"x":0, "y":0, "w":40, "h":36, "i":"0", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa0", "componentPath": "fragment/Currentfault" },
          {"x":40, "y":0, "w":20, "h":9, "i":"1", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa1", "componentPath": "fragment/CurrentFaultSimple"  },
          {"x":40, "y":9, "w":20, "h":9, "i":"2", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa2", "componentPath": "fragment/CurrentWarn"  },
          {"x":40, "y":18, "w":20, "h":9, "i":"3", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa3", "componentPath": "fragment/AirConditioner"  },
          {"x":40, "y":27, "w":20, "h":9, "i":"4", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa4", "componentPath": "fragment/RuleAttention"  },
          {"x":0, "y":36, "w":15, "h":9, "i":"5", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa5", "componentPath": "fragment/CurrentWarn"  },
          {"x":15, "y":36, "w":15, "h":9, "i":"6", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa6", "componentPath": "fragment/CurrentWarn"  },
          {"x":30, "y":36, "w":15, "h":9, "i":"7", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa7", "componentPath": "fragment/CurrentWarn"  },
          {"x":45, "y":36, "w":15, "h":9, "i":"8", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa8", "componentPath": "fragment/CurrentWarn"  },
        ],
        gridVolume: [
          {size: {width: 40 * 30, height: 30 * 36}, blurDistance: 3, connerClip: [0, 0,  0, 0] },
          {size: {width: 20 * 30, height: 30 * 9}, blurDistance: 3, connerClip: [0, 0, 0, 0] },
          {size: {width: 20 * 30, height: 30 * 9}, blurDistance: 3, connerClip: [0, 0,0, 0] },
          {size: {width: 20 * 30, height: 30 * 9}, blurDistance: 3, connerClip: [0, 0, 0, 0] },
          {size: {width: 20 * 30, height: 30 * 9}, blurDistance: 3, connerClip: [0, 0, 0, 0] },
          {size: {width:15 * 30, height: 30 * 9}, blurDistance: 3, connerClip: [0, 0, 0, 10] },
          {size: {width:15 * 30, height: 30 * 9}, blurDistance: 3, connerClip: [0, 0, 10, 0] },
          {size: {width:15 * 30, height: 30 * 9}, blurDistance: 3, connerClip: [0, 0, 0, 10] },
          {size: {width:15 * 30, height: 30 * 9}, blurDistance: 3, connerClip: [0, 0, 10, 0] },
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

      //开启接口服务
      thmInterfaceService.getFaultData(this);
      thmInterfaceService.getWarnData(this);
      mdpInterfaceService.getAirConditioner(this);
    },
    // methods: {
    //
    // }
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

