<template>
  <tech-frame v-bind="frameInitOptions">
    <div class="route">
      <span class="block-span title-text-effect  ">[ 序列号 ]</span>
      <span class="block-span context-text-effect breathe-animation">{{displayData.sn | dealNull('--')}}</span>
    </div>
    <div class="route">
      <span class="block-span title-text-effect  ">[ 供应商 ]</span>
      <span class="block-span context-text-effect breathe-animation">{{displayData.supplier | dealNull('--')}}</span>
    </div>
    <div class="route">
      <span class="block-span title-text-effect  ">[ 型号 ]</span>
      <span class="block-span context-text-effect breathe-animation">{{displayData.typeNo | dealNull('--')}}</span>
    </div>
    <div class="route">
      <span class="block-span title-text-effect  ">[ 批次号 ]</span>
      <span class="block-span context-text-effect breathe-animation">{{displayData.batchNo | dealNull('--')}}</span>
    </div>
    <div class="route">
      <span class="block-span title-text-effect  ">[ 软件版本 ]</span>
      <span class="block-span context-text-effect breathe-animation">{{displayData.version | dealNull('--')}}</span>
    </div>
    <div class="route">
      <span class="block-span title-text-effect  ">[ 装车日期 ]</span>
      <span class="block-span context-text-effect breathe-animation">{{displayData.mountOnDate | dealNull('--')}}</span>
    </div>
    <div class="route">
      <span class="block-span title-text-effect  ">[ 运行里程 ]</span>
      <span class="block-span context-text-effect breathe-animation">{{displayData.partMileTotal | dealNull('--')}}</span>
    </div>
    <div class="route">
      <span class="block-span title-text-effect  ">[ 车组里程 ]</span>
      <span class="block-span context-text-effect breathe-animation">{{displayData.trainMileTotal | dealNull('--')}}</span>
    </div>

  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'

  export default {
    name: "StructureInfo",
    components: {TechFrame},
    data () {
      return {
        frameInitOptions: {
          size: {width: 300, height: 500},
          blurDistance: 10,
          strokeColor: "white",
          connerClip: [5, 0, 45, 0]
        }

      }

    },
    props: {
      displayData: {
        type: Object,
        default: () => {
          return {
            sapCode: 'CNR0000006923',
            batchNo: 'DEMO',
            typeNo: 'DEMO',
            trainMileTotal: 1986569,
            mountOnDate: 'DEMO',
            supplier: 'DEMO',
            trainNo: 'DEMO',
            sn: 'DEMO',
            version: 'V.DEMO',
            partMileTotal: 1258956
          }
        }
      }

    }
  }
</script>

<style scoped>

  .block-span {
    display: block;
    width: 100%;
  }


  .title-text-effect {
    color: white;
    padding-left: 20px;
    padding-top: 10px;
    text-align: left;
  }

  .context-text-effect {
    color: white;
    padding-left: 20px;
    text-align: left;
    font-size: 18px;
  }

  .breathe-animation {
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-name: breathe;
    -webkit-animation-duration: 1500ms;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
  }

  @-webkit-keyframes breathe {
    0% {
      opacity: .4;
    }

    100% {
      opacity: 1;
    }
  }

</style>
