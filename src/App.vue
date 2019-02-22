<template>
  <div id="app">
    <el-header class="header">
      <img src="./assets/page-title-crrc-w.png" class="banner-img">

      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#3c6893"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">远程监控</el-menu-item>
        <el-menu-item index="2">业务管理</el-menu-item>
        <el-menu-item index="3" disabled>信息查询</el-menu-item>
        <el-menu-item index="4">统计分析</el-menu-item>
        <el-menu-item index="5">功能设置</el-menu-item>
      </el-menu>
      <div class="notification">
        <span class="separator"></span>
        <span class="nt-icon">
          <i class="el-icon-circle-check-outline" ></i>
          <i>0</i>
        </span>
        <span class="nt-icon">
          <i class="el-icon-message" ></i>
          <i>2</i>
        </span>
        <span class="nt-icon">
          <i class="el-icon-bell" ></i>
          <i>13</i>
        </span>
          <span class="separator"></span>
      </div>

      <Avatar style="float: right; height: 60px"></Avatar>

      <img class="logout-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADFwAAAxcBwpsE1QAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOtSURBVGiB7Zrbax1VFMZ/O01MVdRqmjRE+6qgaEWwgqKg9UWrraBFFF8riAUF3wTx3RcvDyr6VyjeXoq1rRWTSrWpNqlXvCBoxVrQ1Grz82HWMUPI5czMntOm9HsZzsxe3/r2rLP3XrPXhnM4s5ByEakXADcCtwIbgWHgMmAI6ItmfwBfAVPAB8DOlNLvuTTUhrpKvVd9Uz1pdfyrvq1uUweaaKkVkXC6A3gKuDxuzwATwB7gQ+Bn4BhFFDoYAa4Grgc2ATcB/fHsB+B54NWU0kwdXZWgblI/L73VQ+rj6sU1uIbUR9WPS3zfqFva0N5xOqC+XHJ4RL07I/8d6kSJ/3X1/Fz8HScj6u5wMKM+rQ5mdVL46VN3qH+Gr0/UdbnI16vfBvGP6sYsxEv7vEY9HD6n1fVNCYdLhB+po5m0duN7qDR2ptWRukQXqvuD6IB6SWat3Wi4SB0PDRO1/s7qS0HwZS8jsYCO4ZhYVF+sanybespikdvQksYqeq5T/1Jn1Tu7NTovoqD6bMsau4b6RGnaX92NwfYwmLRh2pATFunQgdD25HKN+9Wvo/G2HmnsGupdoe2nJaOiPhgND6t9izasLmC3+qk63JAnlaLycPnZfLEngJPAMyml2SZO52EQ2ADsbNKZlJLAa/HzkRzCKsEixZmMN3mwSWdiofxb/ccaiWpjqGucSwqn1bEGXLuCZ2vnXrZxsBxSSseAe4AvgCuB9xpEZldcb84grR7UtepnTSKj3hf2b7WhsYqQUeeS0cpjxiI7Vp1qS2MVMcPRicqRiaiq/rrQw72eXoxX6MjqsPn/27482PsXsOklrNE223ZWbVisB51VutI4ce6v9UubGrsRUrsTYX/6B7s6pk51xoW6pgbH/WH/RudezxbEELAWeBe4CpgENsdCWRXXxrX3EckRiRJXZ4bdnFNjN47La0b7SaO6NRo9UFv1wrzjOToRXI8F1ztLNWrrw+p9dV+GTiz6YTW/4SqLdEH1oSZO24BFCUP1O5fbT/Bs2HwIg7NjOyiMbrGoJq3cDbqS8XPxBlbulmkQDKp7gmDlbmIH0aUWpTXtfVlh1KLQo03KCiXCK+x9oeeGks/mhZ4Sca9Kb/0xO82Er3ylt5KT1oqhFiv2FueqxbPqC11PszWdtlGe3l/iO6LeXpWrzQMD3wNHgaMppVMWafs6lj8w8EpK6UQdXbXhSj/CsUin5h+qGQNGKY5tDADHgd+AQ8BBYB+wN6V0PJeGcziT8B+GoBCGxye14AAAAABJRU5ErkJggg==">
    </el-header>
    <el-container class="main">
      <el-aside width="auto">
        <Navigator/>
      </el-aside>
      <el-container>
        <el-main>
            <router-view/>
        </el-main>
        <el-footer style="height: 30px">版权所有：中车唐山机车车辆有限公司 技术支持：上海杰之能软件科技有限公司 </el-footer>
      </el-container>
    </el-container>

    <router-view/>

  </div>
</template>

<script>
import Navigator from './Navigator.vue'
import Avatar from './components/base/Avatar.vue'

export default {
  name: 'app',
  data() {
    return {
      activeIndex: '2',
    };
  },
  components: {
    Navigator,
    Avatar
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
    width: 100%;
    height: 100%;
  }

  body {
    height: 100%;
    width: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }

  .header {
    height: 60px;
    display: none;
  }

  .notification {
    width: 250px;
    position: absolute;
    right: 200px;
  }

  .nt-icon {
    font-size: 20px;
    padding: 0 10px;

  }

  .banner-img {
    position: absolute;
    height: 45px;
    top: 5px;
    left: 5px;
  }

  .separator {
    border-left: 1px solid white;
    padding: 0;
    height: 30px;
    display: inline-block;
    top: 10px;
    position: relative;
  }

  .logout-icon {
    width: 25px;
    height: 25px;
    position: absolute;
    right: 15px;
    top: 18px;
  }

  .el-menu-demo {
    width: 500px;
    right: 400px;
    position: absolute;
  }

  .el-menu.el-menu--horizontal {
    border: unset;
  }

  .el-menu--horizontal > .el-menu-item {
    height: 60px;
    line-height: 60px
  }

  .main {
    height: calc(100% - 60px);
    background-color: #e8e8e8;
    display: none;
  }

  .el-aside {
    background-color: #545c64;
  }

  .el-header, .el-footer {
    background-color: #3c6893;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    line-height: 30px;
    font-size: 14px;

  }
</style>
