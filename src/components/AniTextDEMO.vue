<template>
  <div class="container" id="particles-js">

    <span class="block-span title-text-effect halo-red">错误文字 [ TEXT ERROR ]</span>
    <span class="block-span title-text-effect halo-yellow">警告文字测试 [ TEXT WARNING ]</span>
    <span class="block-span title-text-effect halo-green">成功文字 [ TEXT SUCCESS ]</span>
    <span class="block-span title-text-effect halo-white">一般文字 [ TEXT NORMAL ]</span>

    <tech-frame :size="{width: 1300, height: 220}" :blur-distance="5" :coner-clip="[50, 0, 50, 0]">
      <div>
        <div style="text-align: left; padding-left: 63px;" class="halo-green">{{tableTitle.replace(/ /g, '&nbsp;')}}</div>
        <animated-text :animation-type="'SLIDE_DOWN'" :animation-delay="5000" :text-arr="dataT(0)"></animated-text>
        <animated-text :animation-type="'SLIDE_DOWN'" :animation-delay="5000" :text-arr="dataT(1)"></animated-text>
        <animated-text :animation-type="'SLIDE_DOWN'" :animation-delay="5000" :text-arr="dataT(2)"></animated-text>
        <animated-text :animation-type="'SLIDE_DOWN'" :animation-delay="5000" :text-arr="dataT(3)"></animated-text>
        <animated-text :animation-type="'SLIDE_DOWN'" :animation-delay="5000" :text-arr="dataT(4)"></animated-text>
        <animated-text :animation-type="'SLIDE_DOWN'" :animation-delay="5000" :text-arr="dataT(5)"></animated-text>
      </div>
    </tech-frame>
    <div class="goft">
      <svg class="goft-background" width="100%" height="100%">
        <path class="halo-path"  d="M30 30 L470 30 L470 220 L420 270 L30 270 Z" />
        <path class="halo-path"  d="M30 30 L470 30 L470 220 L420 270 L30 270 Z" filter="blur(15px)"/>
      </svg>

      <div>
        <span class="block-span title-text-effect halo-white">[ 车组 ]</span>
        <span class="block-span context-text-effect halo-white">3501</span>
      </div>
      <div>
        <span class="block-span title-text-effect halo-white">[ 天气 ]</span>
        <span class="block-span context-text-effect halo-white">晴</span>
      </div>
      <div>
        <span class="block-span title-text-effect halo-white">[ 外温 ]</span>
        <span class="block-span context-text-effect halo-white">36°C</span>
      </div>
      <div>
        <span class="block-span title-text-effect  halo-white">[ 车型 ]</span>
        <span class="block-span context-text-effect halo-white">CRH380BL</span>
      </div>
      <div class="status">
        <span class="block-span title-text-effect  halo-white">[ 车组状态 ]</span>
        <span class="block-span context-text-effect halo-green">正常</span>
      </div>
      <div class="control">
        <span class="block-span title-text-effect  halo-white">[ 操纵 ]</span>
        <span class="block-span context-text-effect halo-white">1</span>
      </div>
      <div class="speed">
        <span class="block-span title-text-effect  halo-white">[ 速度 ]</span>
        <span class="block-span context-text-effect halo-white">300KM/H</span>
      </div>
      <div class="route">
        <span class="block-span title-text-effect  halo-white">[ 交路 ]</span>
        <span class="block-span context-text-effect halo-white">G7503</span>
      </div>
      <div class="gap">
        <span class="block-span title-text-effect  halo-white">[ 区间 ]</span>
        <span class="block-span context-text-effect halo-white">秦安-南京南</span>
      </div>
    </div>
  </div>

</template>

<script>

  import AnimatedText from '../components/base/AnimatedText'
  import TechFrame from '../components/base/TechFrame'

  export default {
    name: "AniTextDEMO",
    data () {
      return {
        tableTitle : "[ 车系 ] [ 车型 ]       [ 车组 ] [ 车辆 ] [ 系统 ]             [ 代码 ] [ 现象 ]                                         [ 级别 ] [ 时间 ]                            [ 上线 ] [ 状态 ] [ 类型 ]         [ 模式 ] [ 操作 ]",
        displayDT : [
          'CRH3     CRH380B 3616    08        辅助电气系统 6812    电气设备柜火警                         A           2019-01-08 15:07:25 否          发生     司机故障     非维护 未处理',
          'CRH3     CRH380B 3616    06        辅助电气系统 6812    电气设备柜火警                         A           2019-01-08 15:07:25 否          发生     乘务员故障 非维护 未处理',
          'CRH3     CRH380B 3616    02        辅助电气系统 6812    电气设备柜火警                         A           2019-01-08 15:07:25 否          发生     HMI故障        非维护 未处理',
          'KDZ15   CRH3A      3103    01        供风制动         5551    UB环路打开                                A           2019-01-08 15:07:16 否          恢复     详细故障     非维护 未处理',
          'KDZ15   CRH3A      3103    08        供风制动         5002    ATP施加1级制动                         A           2019-01-08 15:07:16 否          发生     详细故障     非维护 未处理',
          'KDZ15   CRH3A      3103    03        供风制动         5551    UB环路打开                                A           2019-01-08 15:07:15 否          恢复     详细故障     非维护 未处理',
          'KDZ15   CRH3A      3103    08        供风制动         5004    ATP施加7级制动                         A           2019-01-08 15:07:15 否          恢复     详细故障     非维护 未处理',
          'KDZ15   CRH3A      3106    02        供风制动         5502    制动缸压力根据制动级位成功 A           2019-01-08 15:07:05 否          恢复     详细故障     非维护 未处理',
          'KDZ15   CRH3A      3106    04        供风制动         5502    制动缸压力根据制动级位成功 A           2019-01-08 15:07:03 否          恢复     详细故障     非维护 未处理',
          'KDZ15   CRH3A      3106    07        供风制动         5551    UB环路打开                                A           2019-01-08 15:07:03 否          发生     详细故障     非维护 未处理'
        ]
      };
    },
    mounted () {
      // particlesJS.load('particles-js', './static/data/particlesjs-config.json', function() {
      //   console.log('callback - particles.js config loaded');
      // });
    },
    methods : {
      dataT (mount) {
        let wanghan = [...this.displayDT];
        wanghan.concat(wanghan.splice(0, mount));
        return wanghan;
      }
    },
    components: {AnimatedText, TechFrame}
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .container {
    background-color: #181419;
    overflow: hidden;
    font: inherit;
    color: #ffffff;
    text-shadow: 0 0 5px #fff,
    0 0 10px #001da6,
    0 0 15px #2262a6,
    0 0 20px #2262a6,
    0 0 35px #2262a6,
    0 0 40px #2262a6,
    0 0 50px #2262a6,
    0 0 75px #2262a6;    height: 100%;
    position: relative;

    font-family: Jura-light;

  }

  .block-span {
    display: block;
    width: 100%;
  }

  .goft {

    display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 25% 25% 25% 25%;

    grid-template-areas:
      "trainno weather temprature"
      "model control ."
      "status speed ."
      ". route gap";

    margin-top: 20px;
    padding: 30px;

    width: 500px;
    height: 300px;

    position: relative;

  }

  .goft-background {
    position: absolute;
  }

  .status {
    grid-area: status;
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
