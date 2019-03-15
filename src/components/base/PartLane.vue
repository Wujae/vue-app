<template>
  <div class="train-part-level-div">
    <div class="scroll-tool-content">
      <tech-frame v-for="(part, idx ) in displayData" v-if="idx === nodeSelected"
                  v-bind="trainPartExpandBtnOptions">
        <div class="train-part-btn-div" style="color: black" @click="selectNode(idx, part)" :title="part.funcLocName">
          {{part.funcLocName}}
          <br>
          <div class="part-simple-name-div">
            <span>[ </span>
            {{part.funcLocName.substr(0,1)}}
            <span class="next-cursor" :class="{'no-child' : !part.isParent}"> ]</span>
          </div>
        </div>
      </tech-frame>
      <tech-frame v-else-if="idx !== nodeSelected" v-bind="trainPartFoldBtnOptions">
        <div class="train-part-btn-div fold" @click="selectNode(idx, part)" :title="part.funcLocName">
          <div style="width: 100%; padding: 0 15px; text-overflow: ellipsis;">
            {{part.funcLocName}}
          </div>
        </div>
      </tech-frame>
    </div>
    <div class="scroll-tool-div">
      <tech-frame v-bind="scrollToolUpBtnOptions">
        <i class="el-icon-arrow-up scroll-tool-icon" @click="scrollEv(-1)"></i>
      </tech-frame>
      <tech-frame v-bind="scrollToolDownBtnOptions">
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
        scrollToolUpBtnOptions: {
          size: {width: 30, height: 30},
          blurDistance: 1,
          connerClip: [10, 2, 2, 2],
          strokeColor: "white",
        },
        scrollToolDownBtnOptions: {
          size: {width: 30, height: 30},
          blurDistance: 1,
          connerClip: [2, 2, 10, 2],
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
          xs: 20,
          y: 0,
          xe: 160,
        },
        nodeSelected: 0,
        foldBtnHeight: 50,
        heightFix: 60,
      }
    },
    props: {
      displayData: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      displayData(newData){
        if(newData && newData.length){

          this.selectNode(0, newData[0])
        }
      }
    },
    methods: {
      scrollEv (delta) {
        this.$bScroll.scrollBy(0, 200 * delta, 500)
      },
      selectNode (idx, data) {
        this.nodeSelectedPos.y = idx * this.foldBtnHeight + this.heightFix

        this.nodeSelected = idx

        data.pos = this.nodeSelectedPos

        // console.log("node selected", data.pos, idx)

        this.$emit('lane-node-selected', data);

      }
    },
    mounted () {
      this.$nextTick(() => {

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

        this.selectNode(0, this.displayData[0])

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
    bottom: 5px;
    right: 0;
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
    word-break: keep-all;
    text-overflow: ellipsis;
    overflow: hidden;
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

  .next-cursor:not(.no-child):after {
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
