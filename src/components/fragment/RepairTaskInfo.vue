<template>
  <tech-frame v-bind="frameInitOptions">
    <div class="title">检修信息</div>

  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'

  export default {
    name: "RepairTaskInfo",
    data: function () {
      return {

      }
    },
    props: {
      frameInitOptions: {
        type: Object,
        default: () => {
          return {
            size: {width: 5 * 150, height: 150 * 2},
            blurDistance: 3,
            connerClip: [0, 0,  0, 0]
          }
        }
      }
    },
    components: {TechFrame}
  }
</script>

<style scoped>
  .title {
    width: 40px;
    height: 100%;
    font-size: 25px;
    display: inline-block;
    float: left;
    padding-top: 60px;
  }
</style>
