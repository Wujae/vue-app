<template>
  <tech-frame v-bind="frameInitOptions">
    <div class="title">车组配属信息</div>
    <div class="station-container-div">
      <template v-for="(station, i) in stations">
        <tech-frame v-bind="stationButtonOptions" :fillColor="selectedBtn.indexOf(i) > -1 ? 'rgba(255, 0, 0, 0.2)': '#182134'">
          <div class="station-btn-div" @click="switchStationData(i, station.code)">
            <span style="color: #66b3b3">[ </span>{{station.name}}<span style="color: #66b3b3"> ]</span>
          </div>
        </tech-frame>
      </template>
    </div>
    <echarts-force :raw-data="rawData"></echarts-force>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import EchartsBar from '../echarts/EchartsSunburst'
  import EchartsForce from '../echarts/EchartsForce'
  import { mapGetters } from 'vuex'


  export default {
    name: "TrainAllocation",
    components: {EchartsForce, EchartsBar, TechFrame},
    data: function () {
      return {
        stationButtonOptions: {
          size: {width: 150, height: 40},
          blurDistance: 2,
          connerClip: [3, 0, 15, 0],
          fillColor: "#182134"
        },
        stations: [],
        rawData: [],
        separatedByStation: [],
        selectedBtn: [],
        staCodeSelected: []
      }
    },
    props: {
      frameInitOptions: {
        type: Object,
        default: () => {
          return {
            size: {width: 7 * 150, height: 150 * 4},
            blurDistance: 3,
            connerClip: [0, 0,  0, 0]
          }
        }
      }
    },
    computed:{
      ...mapGetters([
        'getTrains'
      ])
    },
    watch: {
      getTrains (newv) { //newv 就是改变后的getTrains值

        this.separatedByStation = this.separateStation(newv);

        this.rawData = this.separatedByStation[0].trains

        this.selectedBtn = [0]

        this.staCodeSelected = [this.separatedByStation[0].code]


      },
      staCodeSelected (newV) {
        this.$store.commit('updateStationSelected', newV);

      }
    },
    methods: {
      switchStationData (index, staCode) {

        let pos = this.selectedBtn.indexOf(index);

        if(pos > -1) {
          this.selectedBtn.splice(pos, 1)
          this.staCodeSelected.splice(pos, 1)

        }else {
          this.selectedBtn.push(index)
          this.staCodeSelected.push(staCode)

        }

        this.rawData = this.separatedByStation.reduce((p, c) => {

          if(this.staCodeSelected && this.staCodeSelected.length > 0){
            if(this.staCodeSelected.indexOf(c.code) > -1){

              p = p.concat(c.trains)
            }

          }
          return p;

        }, []);

      },
      separateStation (data) {
        if(data){
          let station = [], stationObjs = [], result;

          result = data.reduce((p, c, i)=>{

            let stationIdx = station.indexOf(c.station);
            //找到服务站
            if(stationIdx > -1){
              let curStation = p[stationIdx];
              curStation.trains.push(c);

            }else{ //找不到服务站

              station.push(c.station);
              stationObjs.push({name: c.station, code: c.stationCode});
              let newStation = {name: c.station, code: c.stationCode};
              newStation.trains = [c];
              p.push(newStation);

            }
            return p;
          }, []);

          this.stations = stationObjs;

          return result;
        }

        this.stations = [];
        return null;
      }
    }
  }
</script>

<style scoped>
  .title {
    height: 40px;
    font-size: 25px;
  }

  .station-container-div {
    width: 180px;
    display: inline-block;
    float: left;
    text-align: left;

    padding-left: 40px;
  }

  .station-btn-div {
    cursor: pointer;

  }
</style>
