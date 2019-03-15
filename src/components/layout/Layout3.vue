<template>
  <grid-layout class="grid-layout" :layout.sync="layout" :col-num="12" :row-height="150" :is-draggable="true" :is-resizable="true"
               :is-mirrored="false" :vertical-compact="true" :margin="[0, 0]" :use-css-transforms="true" >

    <grid-item v-for="( item, i ) in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
               :is-draggable="item.isDraggable" :is-resizable="item.isResizable" :i="item.i" >
      <component :is="item.innerComponent" :frameInitOptions="gridVolume[i]" />
    </grid-item>
  </grid-layout>
</template>

<script>
  import VueGridLayout from 'vue-grid-layout';
  // import thmInterfaceService from '../../service/ThmInterfaceService'
  // import mdpInterfaceService from '../../service/MdpInterfaceService'

  export default {
    name: '',
    components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem
    },
    data (){
      return {
        layout: [
          {"x":0, "y":0, "w":6, "h":4.5, "i":"0", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa0", "componentPath": "fragment/Layout3Status" },
          {"x":6, "y":0, "w":6, "h":4.5, "i":"1", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa1", "componentPath": "fragment/Layout3Status-2"  },
          {"x":0, "y":4.5, "w":12, "h":4.5, "i":"2", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa2", "componentPath": "fragment/Layout3Status-3"  },
          // {"x":40, "y":18, "w":20, "h":9, "i":"3", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa3", "componentPath": "fragment/OnlineStatus5"  },
          // {"x":40, "y":27, "w":20, "h":9, "i":"4", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa4", "componentPath": "fragment/OnlineStatus6"  },
          // {"x":0, "y":36, "w":15, "h":9, "i":"5", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa5", "componentPath": "fragment/OnlineStatus3"  },
          // {"x":15, "y":36, "w":15, "h":9, "i":"6", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa6", "componentPath": "fragment/OnlineStatus3"  },
          // {"x":30, "y":36, "w":15, "h":9, "i":"7", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa7", "componentPath": "fragment/OnlineStatus3"  },
          // {"x":45, "y":36, "w":15, "h":9, "i":"8", isDraggable: false, isResizable: false, "innerComponent":"async-echarts-compa8", "componentPath": "fragment/OnlineStatus3"  },
        ],
        gridVolume: [
          {size: {width: 6 * 150, height:150 * 4.5}, blurDistance: 3, connerClip: [0, 0,  0, 0] },
          {size: {width: 6 * 150, height:150 * 4.5}, blurDistance: 3, connerClip: [0, 0, 0, 0] },
          {size: {width: 12 * 150, height:150 * 4.5}, blurDistance: 3, connerClip: [0, 0,0, 0] }

        ],
        callbackdata:{},//返回数据
      }
    },
    created () {

      this.layout.forEach(item => {

        this.registerComponent(item.innerComponent, item.componentPath);
      });
    },
    // mounted () {
    //
    //   //车组上线状态数据
    //   thmInterfaceService.getOnlineStatusData(this);
    //
    //   mdpInterfaceService.getUsageData(this, {
    //     params: {
    //       areaCenter: '1K2300020000',
    //       startDate: '2017-01-01',
    //       endDate: '2018-12-30'
    //     }
    //   });
    //   thmInterfaceService.getFaultData(this);
    //   thmInterfaceService.getWarnData(this);
    //   //thmInterfaceService.getTrainParamsData(this);
    // },
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
</style>

