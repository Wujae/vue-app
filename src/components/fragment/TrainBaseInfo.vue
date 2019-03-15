<template>
  <tech-frame v-bind="frameInitOptions">
    <div class="title">基础信息</div>

  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'

  export default {
    name: "TrainSetting",
    components: {TechFrame},
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
    }

  }
</script>

<style scoped>

  .title {
    padding-top: 20px;
    font-size: 20px;
    display: inline-block;
    font-weight: bold;
    color: #10ffeb;
  }

</style>
