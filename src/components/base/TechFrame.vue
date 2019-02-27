<template>
  <div class="hexagon" :style="outerStyle">
    <svg class="hexagon-background" width="100%" height="100%">
      <path class="halo-path" :fill="fillColor" :d="`M${blurDistance*2 + connerClip[0]} ${blurDistance*2}
      L${size.width - blurDistance*2 - connerClip[1]} ${blurDistance*2}
      L${size.width - blurDistance*2} ${blurDistance*2 + connerClip[1]}
      L${size.width - blurDistance*2} ${size.height - blurDistance*2 - connerClip[2]}
      L${size.width - blurDistance*2 - connerClip[2]} ${size.height - blurDistance*2}
      L${blurDistance*2 + connerClip[3]} ${size.height - blurDistance*2}
      L${blurDistance*2} ${size.height - blurDistance*2 - connerClip[3]}
      L${blurDistance*2} ${blurDistance*2 + connerClip[0]} Z`" />
      <path class="halo-path" :fill="fillColor" :d="`M${blurDistance*2 + connerClip[0]} ${blurDistance*2}
      L${size.width - blurDistance*2 - connerClip[1]} ${blurDistance*2}
      L${size.width - blurDistance*2} ${blurDistance*2 + connerClip[1]}
      L${size.width - blurDistance*2} ${size.height - blurDistance*2 - connerClip[2]}
      L${size.width - blurDistance*2 - connerClip[2]} ${size.height - blurDistance*2}
      L${blurDistance*2 + connerClip[3]} ${size.height - blurDistance*2}
      L${blurDistance*2} ${size.height - blurDistance*2 - connerClip[3]}
      L${blurDistance*2} ${blurDistance*2 + connerClip[0]} Z`"
            :filter="`blur(${blurDistance}px)`"/>
    </svg>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TechFrame",
    props: {
      initData: {
        type: Object,
        default: null
      },
      size: {
        type: Object,
        default: () => {
          return {
            width: 500,
            height: 300
          }
        }
      },
      blurDistance: {
        type: Number,
        default: 15
      },
      connerClip: {
        type: Array,
        default: () => {
          return [0, 0, 50, 0]
        }
      },
      fillColor: {
        type: String,
        default: () =>  "#1d2d47"
      }
    },
    computed : {
      outerStyle () {
        return {
          width: this.size.width + 'px',
          height: this.size.height + 'px',
          padding: this.blurDistance * 2 + 'px'};
      },
    },
    created () {

    }
  }
</script>

<style scoped>

  .hexagon {

   /* display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 25% 25% 25% 25%;

    grid-template-areas:
      "trainno weather temprature"
      "model control ."
      "status speed ."
      ". route gap";*/

    /*margin-top: 20px;*/
    position: relative;
  }

  .hexagon-background {
    position: absolute;
    top:0;
    left: 0;
  }

  .halo-path {
    /*fill-opacity: 0.1;*/
    stroke: #3a6a9f;
    stroke-width: 2px;

  }

  .content{
    width: 100%;
    height: 100%;

    padding: 5px;
    position: relative;
  }

</style>
