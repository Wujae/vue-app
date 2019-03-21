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
        'getTrains'
      ])
    },
    watch: {
      getTrains (newv) { //newv 就是改变后的getTrains值
        this.getTopFour(newv);
      }
    },
    methods : {
      getTopFour (rawdata) {
        if (!rawdata || rawdata.length === 0) return;

        let tmpData = rawdata.map((ele)=>{

          return {
            count: ele.al_all,
            sn: ele.sn,
            freq: ele.train_no,
            position: ele.position,
            speed: ele.speed,
            control: ele.control,
            temperature: ele.temperature,
            lvl: ele.al_a > 0 ? 'danger' : ele.al_b > 0 ? 'warning' : ele.al_c > 0 ? 'check' : 'check'
        };
        })

        let result = tmpData.sort((a, b) =>{
          return b.count - a.count;
        }).slice(0, 4 )

        console.log('top 4 fault trains' ,result)
        this.renderData = result
      }

    }
  }
</script>

<style scoped>
  .cards-holder-div {
    display: flex;
  }
</style>
