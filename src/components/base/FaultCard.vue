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
        <svg v-if="renderData.lvl === 'danger'" class="status-icon" x="0px" y="0px" viewBox="0 0 32 32">
          <path style="fill:#999999;" d="M22.4,13.5h2.8v5.9c0,0.8-0.6,1.4-1.4,1.4h-1.4V13.5z"/>
          <path style="fill:#FFFFFF;" d="M0.5,19.2C0.5,19.2,0.5,19.2,0.5,19.2c0,1.9,1.4,3.3,3.2,3.3h20.6c1.8,0,3.2-1.5,3.2-3.3v-6.9
			      c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1V8.8c0-1.8-1.4-3.3-3.2-3.3H14c-2.8,0-5.3,0.7-7.3,2.2c-1.6,1.1-3,2.7-4.1,4.7
			      C1.5,14.5,0.8,16.8,0.5,19.2L0.5,19.2z"/>
          <path style="fill:#4F7BBA;" d="M14.2,10.8v1.8H4.6c0.4-0.6,0.8-1.2,1.3-1.8c0,0,0.1,0,0.1,0H14.2z"/>
          <path style="fill:#C8DAED;" d="M3.7,20.7c-0.8,0-1.4-0.6-1.4-1.4c0.2-1.7,0.7-3.4,1.4-4.9h11.4c0.5,0,0.9-0.4,0.9-0.9V9.9
			      c0-0.5-0.4-0.9-0.9-0.9h-7c1.7-1.1,3.7-1.6,5.9-1.6h10.3c0.8,0,1.4,0.6,1.4,1.4v2.6H22c-0.5,0-0.9,0.4-0.9,0.9v8.4H3.7L3.7,20.7z"/>
          <path style="fill:#999999;" d="M3.2,20.8"/>
          <path style="fill:#FFFFFF;" d="M1.3,25c-0.5,0-0.8,0.5-0.8,1s0.4,1,0.8,1h22.2c0.3,0,0.6-0.2,0.8-0.5c0.2-0.3,0.2-0.7,0-1
			      c-0.2-0.3-0.5-0.5-0.8-0.5H1.3L1.3,25z"/>
          <path style="fill:#F04F2D;" d="M3.2,25.3"/>
          <circle style="fill:#E52C3E;" cx="24" cy="19" r="8"/>
          <path style="fill:#FFFFFF;" d="M26.2,22.6l-5.7-5.7c-0.4-0.4-0.4-1,0-1.4v0c0.4-0.4,1-0.4,1.4,0l5.7,5.7c0.4,0.4,0.4,1,0,1.4v0
				      C27.2,23,26.6,23,26.2,22.6z"/>
          <path style="fill:#FFFFFF;" d="M20.5,21.2l5.7-5.7c0.4-0.4,1-0.4,1.4,0v0c0.4,0.4,0.4,1,0,1.4l-5.7,5.7c-0.4,0.4-1,0.4-1.4,0v0
				      C20.1,22.2,20.1,21.6,20.5,21.2z"/>
        </svg>
        <svg v-if="renderData.lvl === 'check'" class="status-icon" x="0px" y="0px" viewBox="0 0 32 32">
          <path style="fill:#999999;" d="M22.4,13.5h2.8v5.9c0,0.8-0.6,1.4-1.4,1.4h-1.4V13.5z"/>
          <path style="fill:#FFFFFF;" d="M0.5,19.2C0.5,19.2,0.5,19.2,0.5,19.2c0,1.9,1.4,3.3,3.2,3.3h20.6c1.8,0,3.2-1.5,3.2-3.3v-6.9
            c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1V8.8c0-1.8-1.4-3.3-3.2-3.3H14c-2.8,0-5.3,0.7-7.3,2.2c-1.6,1.1-3,2.7-4.1,4.7
            C1.5,14.5,0.8,16.8,0.5,19.2L0.5,19.2z"/>
          <path style="fill:#4F7BBA;" d="M14.2,10.8v1.8H4.6c0.4-0.6,0.8-1.2,1.3-1.8c0,0,0.1,0,0.1,0H14.2z"/>
          <path style="fill:#C8DAED;" d="M3.7,20.7c-0.8,0-1.4-0.6-1.4-1.4c0.2-1.7,0.7-3.4,1.4-4.9h11.4c0.5,0,0.9-0.4,0.9-0.9V9.9
            c0-0.5-0.4-0.9-0.9-0.9h-7c1.7-1.1,3.7-1.6,5.9-1.6h10.3c0.8,0,1.4,0.6,1.4,1.4v2.6H22c-0.5,0-0.9,0.4-0.9,0.9v8.4H3.7L3.7,20.7z"
          />
          <path style="fill:#999999;" d="M3.2,20.8"/>
          <path style="fill:#FFFFFF;" d="M1.3,25c-0.5,0-0.8,0.5-0.8,1s0.4,1,0.8,1h22.2c0.3,0,0.6-0.2,0.8-0.5c0.2-0.3,0.2-0.7,0-1
            c-0.2-0.3-0.5-0.5-0.8-0.5H1.3L1.3,25z"/>
          <path style="fill:#F04F2D;" d="M3.2,25.3"/>
          <circle style="fill:#E28C10;" cx="24" cy="19" r="8"/>
          <polygon style="fill:#FFFFFF;" points="23.1,19.8 26.9,16 28.2,17.2 23.1,22.3 19.8,19 21.1,17.7 "/>
        </svg>
        <svg v-if="renderData.lvl === 'warning'" class="status-icon" x="0px" y="0px" viewBox="0 0 32 32">
          <path style="fill:#999999;" d="M22.4,13.5h2.8v5.9c0,0.8-0.6,1.4-1.4,1.4h-1.4V13.5z"/>
          <path style="fill:#FFFFFF;" d="M0.5,19.2C0.5,19.2,0.5,19.2,0.5,19.2c0,1.9,1.4,3.3,3.2,3.3h20.6c1.8,0,3.2-1.5,3.2-3.3v-6.9
              c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1V8.8c0-1.8-1.4-3.3-3.2-3.3H14c-2.8,0-5.3,0.7-7.3,2.2c-1.6,1.1-3,2.7-4.1,4.7
              C1.5,14.5,0.8,16.8,0.5,19.2L0.5,19.2z"/>
          <path style="fill:#4F7BBA;" d="M14.2,10.8v1.8H4.6c0.4-0.6,0.8-1.2,1.3-1.8c0,0,0.1,0,0.1,0H14.2z"/>
          <path style="fill:#C8DAED;" d="M3.7,20.7c-0.8,0-1.4-0.6-1.4-1.4c0.2-1.7,0.7-3.4,1.4-4.9h11.4c0.5,0,0.9-0.4,0.9-0.9V9.9
              c0-0.5-0.4-0.9-0.9-0.9h-7c1.7-1.1,3.7-1.6,5.9-1.6h10.3c0.8,0,1.4,0.6,1.4,1.4v2.6H22c-0.5,0-0.9,0.4-0.9,0.9v8.4H3.7L3.7,20.7z"
          />
          <path style="fill:#999999;" d="M3.2,20.8"/>
          <path style="fill:#FFFFFF;" d="M1.3,25c-0.5,0-0.8,0.5-0.8,1s0.4,1,0.8,1h22.2c0.3,0,0.6-0.2,0.8-0.5c0.2-0.3,0.2-0.7,0-1
              c-0.2-0.3-0.5-0.5-0.8-0.5H1.3L1.3,25z"/>
          <path style="fill:#F04F2D;" d="M3.2,25.3"/>
          <circle style="fill:#E28C10;" cx="24" cy="19" r="8"/>
          <path style="fill:#FFFFFF;"
                d="M24,21L24,21c-0.6,0-1-0.4-1-1v-5c0-0.6,0.4-1,1-1h0c0.6,0,1,0.4,1,1v5C25,20.6,24.6,21,24,21z"/>
          <path style="fill:#FFFFFF;"
                d="M24,24L24,24c-0.6,0-1-0.4-1-1v0c0-0.6,0.4-1,1-1h0c0.6,0,1,0.4,1,1v0C25,23.6,24.6,24,24,24z"/>
        </svg>
      </span>
    </div>
    <div class="control">
      <span class="block-span title-text-effect  ">[ 主控 ]</span>
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
      return {}
    },
    props: {
      status: {
        type: String,
        default: 'warning'
      },
      renderData: {
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

    grid-template-areas: "trainno speed temperature" "status status control" "status status route" "status status gap";

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

  .color-02 {
    color: #A8C023;
  }

  .color-03 {
    color: #D6BF55;
  }

  .color-04 {
    color: #5394EC;
  }

  .color-05 {
    color: #AE8ABE;
  }

  .color-06 {
    color: #299999;
  }

  .color-07 {
    color: #999999;
  }

  .color-08 {
    color: #555555;
  }

  .color-09 {
    color: #FF8785;
  }

  .color-11 {
    color: #FFFF00;
  }

  .color-12 {
    color: #7EAEF1;
  }

  .color-13 {
    color: #FF99FF;
  }

  .color-14 {
    color: #6CDADA;
  }

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
