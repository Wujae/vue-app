<template>
  <div class="train-part-level-div">
    <div class="scroll-tool-content">
      <tech-frame v-for="(data, idx ) in displayData" v-if="idx === nodeSelected"
                  v-bind="trainPartExpandBtnOptions">
        <div class="train-part-btn-div" style="color: black" @click="selectNode(idx)">
          {{data.funcLocName}}
          <br>
          <div class="part-simple-name-div">
            <span>[ </span>
            {{data.funcLocName.substr(0,1)}}
            <span class="next-cursor"> ]</span>
          </div>
        </div>
      </tech-frame>
      <tech-frame v-else-if="idx !== nodeSelected" v-bind="trainPartFoldBtnOptions">
        <div class="train-part-btn-div fold" @click="selectNode(idx)">
          {{data.funcLocName}}
        </div>
      </tech-frame>
    </div>
    <div class="scroll-tool-div">
      <tech-frame v-bind="scrollToolBtnOptions">
        <i class="el-icon-arrow-up scroll-tool-icon" @click="scrollEv(-1)"></i>
      </tech-frame>
      <tech-frame v-bind="scrollToolBtnOptions">
        <i class="el-icon-arrow-down scroll-tool-icon" @click="scrollEv(1)"></i>
      </tech-frame>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import TechFrame from '../base/TechFrame'

  export default {
    name: "PartLane",
    components: {TechFrame},
    data () {
      return {
        scrollToolBtnOptions: {
          size: {width: 30, height: 30},
          blurDistance: 1,
          connerClip: [2, 2, 2, 2],
          strokeColor: "white",
        },
        trainPartExpandBtnOptions: {
          size: {width: 150, height: 120},
          blurDistance: 5,
          connerClip: [10, 0, 20, 0],
          strokeColor: "white",
          fillColor: "#66b3b3",
          customStyle: {"margin-left": "15px"}
        },
        trainPartFoldBtnOptions: {
          size: {width: 180, height: 50},
          blurDistance: 5,
          connerClip: [2, 2, 2, 2],
          strokeColor: "white"
        },
        nodeSelectedPos: {
          x: 0,
          y: 0,
          xe: 160,
        },
        foldBtnHeight: 60,
        heightFix: 60,
      }
    },
    props: {
      displayData: {
        type: Array,
        default: () => []
      },
      nodeSelected: {
        type: Number,
        default: () => 0
      }
    },
    methods: {
      scrollEv (delta) {
        this.$bScroll.scrollBy(0, 200 * delta, 500)
      },
      selectNode (idx) {
        this.nodeSelectedPos.y = idx * this.foldBtnHeight + this.heightFix
      }
    },
    mounted () {
      this.$nextTick(() => {

        console.log(this.$el)

        this.$bScroll = new BScroll(this.$el,
          {
            scrollX: false,
            scrollY: true,
            momentum: false
          })

        this.$bScroll.on("beforeScrollStart", () => {

        })

        this.$bScroll.on("scrollEnd", (pos) => {

          this.$emit('part-lane-scrolled',pos);
        })
      })
    }
  }
</script>

<style scoped>

  .train-part-level-div {
    margin-right: 90px;
    position: relative;
    width: 210px;
    height: 100%;
    overflow: hidden;
  }

  .scroll-tool-div {
    position: absolute;
    color: white;
    right: 0;
    top: 0;
  }

  .scroll-tool-icon {
    cursor: pointer;
  }

  .scroll-tool-content {

  }

  .train-part-btn-div {
    cursor: pointer;
    color: white;
    position: relative;
    font-size: 12px;
    height: 100%;
  }

  .train-part-btn-div.fold:before {
    color: #66b3b3;
    content: "\e600 ";
    position: absolute;
    left: 0;
    font-size: 14px;
    font-family: element-icons !important;
  }

  .train-part-btn-div.fold:after {
    color: #66b3b3;
    content: " \e604";
    position: absolute;
    right: 0;
    top: 2px;
    font-size: 14px;
    font-family: element-icons, serif !important;
  }

  .train-part-btn-div.fold > div {
    padding: 0 5px;
    word-break: keep-all;
    overflow: hidden;
    height: 100%;
    width: 100px;
  }

  .next-cursor:after {
    font-family: element-icons, serif !important;
    content: " \e60e";
    right: 0;
    top: 28px;
    font-size: 36px;
    position: absolute;
  }

  .part-simple-name-div {
    font-size: 30px;
    padding-top: 8px;
    line-height: 45px;
  }
</style>
