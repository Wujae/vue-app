<template>
  <tech-frame v-bind="frameInitOptions">
    <div class="title">运用信息</div>

  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'

  export default {
    name: "TrainStatus",
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
    components: {TechFrame},
    created () {
      let serverData = {
        "axisData": [
          "车组总数",
          "上线",
          "未上线",
          "热备",
          "高级修",
          "扣修",
          "库停"
        ],
        "seriesData": [
          [
            "754",
            "670",
            "84",
            "11",
            "5",
            "24",
            "42"
          ]
        ]
      }
    }
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