<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  const DEFAULT_CLIENT_WIDTH = 1800 + 20;
  const DEFAULT_CLIENT_HEIGHT = 1350 + 15;

  export default {
    name: 'app',
    data () {
      return {};
    },
    mounted () {
      this.bindResizeWindow();
    },
    methods: {
      bindResizeWindow () {
        let innerWidth = window.innerWidth;
        let innerHeight = window.innerHeight;
        window.addEventListener('resize', e => {

          this.scaleTransform(innerWidth, innerHeight)
        });

        let resizeEvent = new Event('resize');
        window.dispatchEvent(resizeEvent);

      },
      scaleTransform (width, height) {
        let scaleW = width / DEFAULT_CLIENT_WIDTH;
        let scaleH = height / DEFAULT_CLIENT_HEIGHT;

        let scale = scaleH > scaleW ? scaleH : scaleW;
        document.body.style.transform = `scale(${scale})`;
        document.body.style.marginLeft = `${(width - DEFAULT_CLIENT_WIDTH * scale) / 2 }px`;

      }

    }
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;

  }

  body {
    width: 1800px;
    height: 1350px;
    margin: 0;
    padding: 0;
    transform-origin: left top 0;
    transition: transform ease-in-out .18s;
    background-color: #151923;
  }

  @font-face {
    /* font-test*/
    font-family: Jura-light;
    src: url('/static/font/Jura-Light.ttf');

  }

  #app {
    font-family: 'Jura-light', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
</style>
