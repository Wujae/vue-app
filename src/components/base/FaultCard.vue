<template>
  <div class="goft">
    <div>
      <span class="block-span title-text-effect ">[ 车组 ]</span>
      <span class="block-span context-text-effect ">{{renderData.sn | dealNull('--')}}</span>
    </div>
    <div class="speed">
      <span class="block-span title-text-effect  ">[ 速度 ]</span>
      <span class="block-span context-text-effect ">{{renderData.speed | dealNull('--')}}KM/H</span>
    </div>
    <div class="temperature">
      <span class="block-span title-text-effect ">[ 外温 ]</span>
      <span class="block-span context-text-effect ">{{renderData.temperature | dealNull('--')}}°C</span>
    </div>
    <div class="status">
      <span class="block-span context-text-effect ">
        <svg  v-if="renderData.lvl === 'danger'" class="status-icon" x="0px" y="0px" viewBox="0 0 53 53">
          <polygon style="fill:#6e2e38;" points="7,8.5 47,8.5 47,0.5 0,0.5 0,45.5 7,45.5 "/>
          <rect x="7" y="8.5" style="fill:#d81d6b;" width="46" height="44"/>
          <line style="fill:none;stroke:#6e2e38;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" x1="37.778" y1="22.722" x2="22.222" y2="38.278"/>
          <line style="fill:none;stroke:#6e2e38;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" x1="37.778" y1="38.278" x2="22.222" y2="22.722"/>
        </svg>
        <svg v-if="renderData.lvl === 'check'" class="status-icon" x="0px" y="0px" viewBox="0 0 53 53">
          <circle style="fill:#7a5128;" cx="24" cy="24" r="24"/>
          <circle style="fill:#f6bf13;" cx="29" cy="29" r="24"/>
          <polyline style="fill:none;stroke:#7a5128;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="42,24 26,38 18,30 "/>
        </svg>
        <svg v-if="renderData.lvl === 'warning'" class="status-icon"  x="0px" y="0px" viewBox="0 0 55 55">
          <polygon style="fill:#803637;" points="25, 0 50, 45 0, 45"/>
          <polygon style="fill:#ff7137;" points="30, 5 55, 50 5, 50"/>
      	  <path style="fill:#803637;" d="M29.597,19.307c-0.553,0-1,0.447-1,1v17c0,0.553,0.447,1,1,1s1-0.447,1-1v-17 C30.597,19.754,30.149,19.307,29.597,19.307z"/>
	        <path style="fill:#803637;" d="M29.597,40.307c-0.553,0-1,0.447-1,1v2c0,0.553,0.447,1,1,1s1-0.447,1-1v-2 C30.597,40.754,30.149,40.307,29.597,40.307z"/>
        </svg>
      </span>
    </div>
    <div class="control">
      <span class="block-span title-text-effect  ">[ 操纵 ]</span>
      <span class="block-span context-text-effect ">{{renderData.control | dealNull('--')}}</span>
    </div>

    <div class="route">
      <span class="block-span title-text-effect  ">[ 交路 ]</span>
      <span class="block-span context-text-effect ">{{renderData.freq | dealNull('--')}}</span>
    </div>
    <div class="gap">
      <span class="block-span title-text-effect  ">[ 区间 ]</span>
      <span class="block-span context-text-effect ">{{renderData.position | dealNull('--')}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FaultCard",
    data () {
      return {
      }
    },
    props: {
      status: {
        type: String,
        default: 'warning'
      },
      renderData:{
        type: Object,
        default: () => {
          return {
            sn: null,
            temperature: null,
            speed: null,
            control: null,
            freq: null,
            position: null,
            lvl: 'check'
          }
        }
      }

    }
  }
</script>

<style scoped>
  .goft {

    display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 25% 25% 25% 25%;

    grid-template-areas:
      "trainno speed temperature"
      "status status control"
      "status status route"
      "status status gap";

    margin-top: 20px;

    position: relative;

  }

  .status-icon {
    width: 100px;
  }

  .block-span {
    display: block;
    width: 100%;
  }

  .status {
    grid-area: status;
    padding: 25px 10px;
  }

  .control {
    grid-area: control;
  }

  .speed {
    grid-area: speed;
  }

  .route {
    grid-area: route;
  }

  .gap {
    grid-area: gap;
  }

  .color-02 { color: #A8C023; }
  .color-03 { color: #D6BF55; }
  .color-04 { color: #5394EC; }
  .color-05 { color: #AE8ABE; }
  .color-06 { color: #299999; }
  .color-07 { color: #999999; }
  .color-08 { color: #555555; }
  .color-09 { color: #FF8785; }
  .color-11 { color: #FFFF00; }
  .color-12 { color: #7EAEF1; }
  .color-13 { color: #FF99FF; }
  .color-14 { color: #6CDADA; }


  .title-text-effect {
    color: white;
    padding-left: 20px;
    padding-top: 10px;
    text-align: left;
  }

  .context-text-effect {
    color: white;
    padding-left: 20px;
    text-align: left
  }

  .halo-red {
    color: #FF6B68;
    text-shadow: 0 0 5px #ff514d,
    0 0 10px #ff514d,
    0 0 15px #ff514d,
    0 0 20px #FF6B68,
    0 0 35px #FF6B68,
    0 0 40px #FF6B68,
    0 0 50px #ff8580,
    0 0 75px #ff8580;
  }

  .halo-yellow {
    color: #f6ff8e;
    text-shadow: 0 0 5px #FFFF00,
    0 0 10px #FFFF00,
    0 0 15px #f7ff63,
    0 0 20px #f7ff63,
    0 0 35px #f7ff63,
    0 0 40px #f7ff63,
    0 0 50px #fffaad,
    0 0 75px #fffaad;
  }

  .halo-green {
    color: #83ff00;
    text-shadow: 0 0 5px #6ec015,
    0 0 10px #6ec015,
    0 0 15px #87ff00,
    0 0 20px #87ff00,
    0 0 35px #87ff00,
    0 0 40px #87ff00;
  }


  .halo-white {
    text-shadow: 0 0 5px #fff,
    0 0 10px #001da6,
    0 0 15px #2262a6,
    0 0 20px #2262a6,
    0 0 35px #2262a6,
    0 0 40px #2262a6,
    0 0 50px #2262a6,
    0 0 75px #2262a6;
  }

  .halo-path {
    fill-opacity: 0.1;
    fill: #1E1A1F;
    stroke: white;
    stroke-width: .5px;

  }
</style>
