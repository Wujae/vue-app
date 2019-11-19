<template>
  <tech-frame v-bind="frameInitOptions">
    <div class="title">车组配置</div>
    <div class="train-structure-display-div">
      <div class="lines-holder-div">
        <svg height="100%" width="100%" style="left: 10px; top:10px;">
          <template v-for="(line, idx) in nodeLines">
            <path v-if="line.renderale"  :d="`M ${line.xs + gap * idx} ${line.ys + line.ysFix}
                        c ${lineGap / 2} 0 ${lineGap / 2} ${line.ye - line.ys + line.yeFix - line.ysFix}
                        ${lineGap} ${line.ye - line.ys + line.yeFix - line.ysFix}`"
                  stroke="#66b3b3" stroke-width="2" fill="none" class="breathe-animation" />
          </template>
        </svg>
      </div>

      <template v-for="(dataTree, treeIdx) in dataTrees">
        <part-lane :display-data="dataTree" @lane-node-clicked="getNodeSelectedInfo($event, treeIdx)" @lane-node-expanded="nodeExpandedHandler($event, treeIdx)" @part-lane-scrolled="laneScrollHandler($event, treeIdx)"></part-lane>
      </template>

      <structure-info v-show="showInfo" class="structure-info" :display-data="bomInfo"></structure-info>
    </div>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import mdpInterfaceService from '../../service/MdpInterfaceService'
  import { mapGetters } from 'vuex'
  import PartLane from '../base/PartLane'
  import StructureInfo from './StructureInfo'

  export default {
    name: "TrainStructure",
    components: {StructureInfo, PartLane, TechFrame},
    data() {
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
        dataTrees: [],
        nodeLines:[],
        nodeLineBase: {
          renderale: false,
          xs: 160,
          ys: 60,
          ye: null,
          ysFix: 0,
          yeFix: 0,
        },
        gap: 300,
        lineGap: 160,
        bomInfo: {
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
        },
        showInfo: false
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
    computed:{
      ...mapGetters([
        'getTrainSelected'
      ])
    },
    watch: {
      getTrainSelected (newTrain) { //newv 就是改变后的trainSelected值

        this.nodeLines.length = 0
        this.getNextStructure(newTrain, newTrain, 0)

      }
    },
    methods: {
      /**
       * 获取service接口数据
       * @param funcPath 功能路径
       * @param train 车组
       * @param idx
       */
      getNextStructure(funcPath, train, idx) {

        mdpInterfaceService.getTrainStructure(this, {params: {funcLocPath: funcPath, train: train}, onSuccess: result => {

          this.buildStructure(result, idx)

        }})

      },
      /**
       * 创建结构
       * @param data
       * @param idx
       */
      buildStructure(data, idx) {

        // console.log(data, idx);

        this.dataTrees.splice(idx, this.dataTrees.length - idx)
        if(data && data.length > 0) {
          this.dataTrees.push(data)
        }

      },
      buildLine(idx){
        if(!this.nodeLines[idx]) {
          this.nodeLines.push(JSON.parse(JSON.stringify(this.nodeLineBase)))
        }else{
          this.nodeLines.splice(idx+1, this.nodeLines.length)
        }
        return this.nodeLines[idx]

      },
      laneScrollHandler(pos, idx) {
        // console.log(pos, idx)

        this.updateLine(pos, idx, "scroll")
      },
      nodeExpandedHandler(nodeSelected, idx) {

        //console.log("node select handler", nodeSelected.pos, idx)

        this.getNextStructure(nodeSelected.funcLocPath, nodeSelected.train, idx + 1)

        this.updateLine(nodeSelected.pos, idx, "node")
      },
      getNodeSelectedInfo(nodeSelected){
        //console.log("node selected on ", nodeSelected)

        this.showInfo = false;

        mdpInterfaceService.getBomByFuncLocPath(this, {
          params: {funcLocPath: nodeSelected.funcLocPath, train: nodeSelected.train},
          onSuccess: result => {

            if(result.status === 'success'){

              this.showInfo = true;
              this.bomInfo = result.data.bom;
            }
          }
        })

      },
      updateLine(pos, nodeIdx, mode){

        if(!mode) return;

        let mae = nodeIdx - 1, tsugi

        if(mode === "scroll") {

          if(mae < 0){ //0
            mae = this.nodeLines[nodeIdx]

            mae.ysFix = pos.y

          }else { //others
            mae = this.nodeLines[mae]
            mae.yeFix = pos.y

            tsugi = this.nodeLines[nodeIdx]
            if(tsugi){
              tsugi.ysFix = pos.y
            }

          }
        }else if(mode === "node") {

          if(mae < 0){ //0

            mae = this.buildLine(nodeIdx)

            mae.xs = pos.xe
            mae.ys = pos.y
            mae.renderale = true;

          }else { //others

            mae = this.nodeLines[mae]
            mae.ye = pos.y
            mae.renderale = true;

            tsugi = this.buildLine(nodeIdx)
            if(tsugi){
              tsugi.xs = pos.xe
              tsugi.ys = pos.y
              tsugi.renderale = false
            }

          }
        }

      }
    },
    created () {



    },
    mounted() {

    }
  }

</script>

<style scoped>

  .structure-info{
    position: absolute !important;
    right: 0;
  }

  .title {
    width: 40px;
    height: 100%;
    font-size: 25px;
    display: inline-block;
    float: left;
    padding-top: 180px;
    padding-left: 20px;
    color: white;
  }

  .train-structure-display-div {
    margin-left: 60px;
    display: flex;
    height: 100%;
  }

  .lines-holder-div {
    position: absolute;
    width: 100%;
    height: 100%;
    float: left;
  }

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
    top:0;
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
