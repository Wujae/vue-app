<template>
  <div class="cards-holder-div">
    <tech-frame v-bind="frameInitOptionsLk">
      <fault-card :render-data="renderData[0]" />
    </tech-frame>
    <tech-frame v-bind="frameInitOptionsRk">
      <fault-card :render-data="renderData[1]" />
    </tech-frame>
    <tech-frame v-bind="frameInitOptionsLk">
      <fault-card :render-data="renderData[2]"/>
    </tech-frame>
    <tech-frame v-bind="frameInitOptionsRk">
      <fault-card :render-data="renderData[3]"/>
    </tech-frame>
  </div>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import FaultCard from '../base/FaultCard'
  import { mapGetters } from 'vuex'

  export default {
    name: "CurrentFaultCards",
    components: {FaultCard, TechFrame},
    data () {
      return {
        frameInitOptionsLk: {
          size: {
            width: 30 * 15,
            height: 30 * 9
          },
          blurDistance: 3,
          connerClip: [0, 0, 0, 15]
        },
        frameInitOptionsRk: {
          size: {
            width: 30 * 15,
            height: 30 * 9
          },
          blurDistance: 3,
          connerClip: [0, 0, 15, 0]
        },
        renderData: []
      }
    },
    computed:{
      ...mapGetters([
        'getCurrentFaultCard'
      ])
    },
    watch: {
      getCurrentFaultCard (newv) { //newv 就是改变后的getTrains值
        this.getTopFour(newv);
      }
    },
    methods : {
      getTopFour (rawdata) {
        if (!rawdata || rawdata.length === 0) return;

        let result = rawdata.map((ele)=>{

          return {
            sn: ele.sn,
            freq: ele.trainNo,
            position: (ele.from ? ele.from : "") + '-' + (ele.to ? ele.to : ""),
            speed: ele.trainSleep,
            control: ele.master,
            temperature: ele.temperature,
            lvl: ele.lvl === 'A' ? 'danger' : ele.lvl === 'B' ? 'warning' : ele.lvl === 'C' ? 'check' : 'check'
          };
        }).slice(0, 4)

        console.log('top 4 fault trains' ,result)
        this.renderData = result
      }

    },
    mounted (){

    }
  }
</script>

<style scoped>
  .cards-holder-div {
    display: flex;
  }
</style>
