<template>
  <tech-frame v-bind="frameInitOptions">
    <div id="baiduOfflineDivContainer" class="baidu-offline-map-div"></div>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  export default {
    name: "BaiduOfflineMap",
    components: {TechFrame},
    data: function () {
      return {
        frameInitOptions: {
          size: {width: 7 * 150, height: 150 * 5},
          blurDistance: 3,
          connerClip: [0, 0,  0, 0]
        }
      }
    },
    mounted () {

      // 百度地图API功能
      let map = new BMap.Map("baiduOfflineDivContainer");    // 创建Map实例
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      let point = new BMap.Point(116.404, 39.915);  // 创建点坐标
      map.centerAndZoom(point, 6);                 // 初始化地图，设置中心点坐标和地图级别
      map.setMaxZoom(8);
      map.setMinZoom(5);
      // map.addControl(new BMap.NavigationControl());   //缩放按钮
      // map.addControl(new BMap.MapTypeControl( {mapTypes: [BMAP_NORMAL_MAP]} ));   //添加地图类型控件 离线只支持普通、卫星地图; 三维不支持

    }
  }
</script>

<style scoped>

  .baidu-offline-map-div {
    height: 100%;
  }

  .anchorBL {
    display:none
  }

</style>
