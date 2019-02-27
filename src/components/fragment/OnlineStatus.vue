<template>
    <tech-frame v-bind="frameInitOptions">
      <div class="level-band-container-div">
        <div class="level-band-holder">
          <div class="level-band level-a"></div>
          <div>一级(A)</div>
        </div>
        <div class="level-band-holder">
          <div class="level-band level-b"></div>
          <div>二级(B)</div>
        </div>
        <div class="level-band-holder">
          <div class="level-band level-c"></div>
          <div>三级(C)</div>
        </div>
        <div class="level-band-holder">
          <div class="level-band level-normal"></div>
          <div>正常</div>
        </div>
      </div>
      <wrap-table></wrap-table>
    </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import WrapTable from '../base/WrapTable'

  export default {
    name: "OnlineStatus",
    data: function () {
      return {
        frameInitOptions: {
          size: {width: 5 * 150, height: 150 * 5},
          blurDistance: 3,
          connerClip: [0, 0, 20, 0]
        }
      }
    },
    components: {WrapTable, TechFrame}
  }
</script>

<style scoped>
  .level-band-container-div{
    position: relative;
    width: 100%;
    padding: 10px;
  }

  .level-band-holder {
    width: 20%;
    height: 30px;
    display: inline-block;
  }

  .level-band {
    width: 100%;
    height: 15px;
  }

  .level-a {
    background-color: #c43838;
  }

  .level-b {
    background-color: #cf8c2d;

  }

  .level-c {
    background-color: #cdcd40;
  }

  .level-normal {
    background-color: #5ab943;
  }
</style>
