<template>
  <tech-frame v-bind="frameInitOptions">
    <div class="title">车组配置</div>
    <div class="train-structure-display-div">
      <div class="lines-holder-div">
        <svg height="100%" width="100%" style="left: 10px; top:10px;">
          <path :d="`M ${160 + pointStart.x} ${510 + pointStart.y} c 80 0 80 ${-340 - gap} 160 ${-340 - gap}`" stroke="#66b3b3" stroke-width="2" fill="none" />
          <path d="M 460 160 c 80 0 80 150 160 150" stroke="#66b3b3" stroke-width="2" fill="none" />
          <path d="M 760 310 c 80 0 80 -250 160 -250" stroke="#66b3b3" stroke-width="2" fill="none" />
          <path d="M 1060 60 c 80 0 80 210 160 210" stroke="#66b3b3" stroke-width="2" fill="none" />
        </svg>
      </div>

      <template v-for="(dataTree, treeIdx) in dataTrees">
        <part-lane :display-data="dataTree" :node-selected="nodeSelected[treeIdx]" @part-lane-scrolled="laneScrollHandler($event, treeIdx)"></part-lane>
      </template>
    </div>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import mdpInterfaceService from '../../service/MdpInterfaceService'
  import { mapGetters } from 'vuex'
  import PartLane from '../base/PartLane'

  export default {
    name: "TrainStructure",
    components: {PartLane, TechFrame},
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
        nodeSelected: [9, 2, 5, 0, 4],
        pointStart: {
          x: 0,
          y: 0
        },
        gap: 0
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
      getTrainSelected (newv) { //newv 就是改变后的trainSelected值
        this.getNextStructure(newv, newv, true);

      }
    },
    methods: {
      getNextStructure(funcPath, train, isRebuild) {

        mdpInterfaceService.getTrainStracture(this, {params: {funcLocPath: funcPath, train: train}, onSuccess: result => {
          this.buildStructure(result, isRebuild)

        }})

      },
      buildStructure(data, isRebuild) {

        if(isRebuild) {}
        console.log(data);

      },
      laneScrollHandler(pos, idx) {

        this.pointStart.x = pos.x
        this.pointStart.y = pos.y
        this.gap = pos.y

        console.log(params, idx)
      }
    },
    created () {



    },
    mounted() {
      let remoteData = [
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01",
          "funcLocName": "CRH380BL-01车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-02",
          "funcLocName": "CRH380BL-02车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-03",
          "funcLocName": "CRH380BL-03车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-04",
          "funcLocName": "CRH380BL-04车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-05",
          "funcLocName": "CRH380BL-05车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-06",
          "funcLocName": "CRH380BL-06车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-07",
          "funcLocName": "CRH380BL-07车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-08",
          "funcLocName": "CRH380BL-08车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-09",
          "funcLocName": "CRH380BL-09车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-10",
          "funcLocName": "CRH380BL-10车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-11",
          "funcLocName": "CRH380BL-11车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-12",
          "funcLocName": "CRH380BL-12车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-13",
          "funcLocName": "CRH380BL-13车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-14",
          "funcLocName": "CRH380BL-14车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-15",
          "funcLocName": "CRH380BL-15车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 13,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-16",
          "funcLocName": "CRH380BL-16车模板",
          "pFuncLocPath": "3501",
          "train": "3501",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        }
      ];

      let r2 = [
        {
          "status": 7,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-01",
          "funcLocName": "车体及车端连接",
          "pFuncLocPath": "3501-01",
          "zmatnr": "1",
          "train": "3501",
          "equipid": "000000009000043270",
          "equipname": "车体及车端连接",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 2,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-02",
          "funcLocName": "转向架及传动装置",
          "pFuncLocPath": "3501-01",
          "train": "3501",
          "equipid": "000000009000043278",
          "equipname": "转向架及传动装置",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 5,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-03",
          "funcLocName": "高压供电及牵引系统",
          "pFuncLocPath": "3501-01",
          "train": "3501",
          "equipid": "000000009000043297",
          "equipname": "高压供电及牵引系统",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 8,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-04",
          "funcLocName": "辅助电气系统",
          "pFuncLocPath": "3501-01",
          "train": "3501",
          "equipid": "000000009000043301",
          "equipname": "辅助电气系统",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 99,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-05",
          "funcLocName": "供风及空气制动系统",
          "pFuncLocPath": "3501-01",
          "train": "3501",
          "equipid": "000000009000043303",
          "equipname": "供风及空气制动系统",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 7,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-06",
          "funcLocName": "网络控制系统",
          "pFuncLocPath": "3501-01",
          "train": "3501",
          "equipid": "000000009000043308",
          "equipname": "网络控制系统",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 7,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-07",
          "funcLocName": "旅客信息系统",
          "pFuncLocPath": "3501-01",
          "train": "3501",
          "equipid": "000000009000043314",
          "equipname": "旅客信息系统",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 4,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-08",
          "funcLocName": "车内环境控制",
          "pFuncLocPath": "3501-01",
          "train": "3501",
          "equipid": "000000009000043323",
          "equipname": "车内环境控制",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 5,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-09",
          "funcLocName": "给排水及卫生系统",
          "pFuncLocPath": "3501-01",
          "train": "3501",
          "equipid": "000000009000043326",
          "equipname": "给排水及卫生系统",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 11,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-10",
          "funcLocName": "车内设施",
          "pFuncLocPath": "3501-01",
          "train": "3501",
          "equipid": "000000009000043331",
          "equipname": "车内设施",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 10,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-11",
          "funcLocName": "司机室",
          "pFuncLocPath": "3501-01",
          "train": "3501",
          "equipid": "000000009000043333",
          "equipname": "司机室",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 4,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-12",
          "funcLocName": "行车安全装置",
          "pFuncLocPath": "3501-01",
          "train": "3501",
          "equipid": "000000009000043341",
          "equipname": "行车安全装置",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        },
        {
          "status": 5,
          "checked": false,
          "isParent": true,
          "open": false,
          "nocheck": false,
          "funcLocPath": "3501-01-13",
          "funcLocName": "其他",
          "pFuncLocPath": "3501-01",
          "train": "3501",
          "equipid": "000000009000043354",
          "equipname": "其他",
          "station": "TCSH0010",
          "pequipid": "ZYS350101",
          "isChecked": false,
          "isNocheck": false,
          "isOpen": false,
          "parent": false
        }
      ]

      this.dataTrees.push(remoteData)
      this.dataTrees.push(r2)
      this.dataTrees.push(r2)
      this.dataTrees.push(r2)
      this.dataTrees.push(r2)

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
</style>
