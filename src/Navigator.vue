<template>
  <div class="nav">
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <el-tooltip :disabled="!isCollapse" content="展开" placement="right" effect="dark">
      <div @click="togglePanel" class="nav-panel-toggle">
        <i :class="collapseIcon"></i>
        <span slot="title">{{collapseTitle}}</span>
      </div>
    </el-tooltip>
    <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">运用管理</span>
        </template>
        <el-menu-item index="/HelloWorld">上线计划</el-menu-item>
        <el-menu-item index="/Element-ui">日检计划</el-menu-item>
        <el-menu-item index="/Element-ui-1">检修派工</el-menu-item>
        <el-menu-item index="/Element-ui-2">检修回填</el-menu-item>
        <el-menu-item index="/Element-ui-3">转属配属</el-menu-item>
        <el-menu-item index="/Element-ui-4">修程履历</el-menu-item>
        <el-menu-item index="/Element-ui-5">交路维护</el-menu-item>
        <el-menu-item index="/Element-ui-6">备轮保养</el-menu-item>
        <el-menu-item index="/Element-ui-7">站交接班</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">故障管理</span>
        </template>
        <el-menu-item index="/Calendar">故障录入</el-menu-item>
        <el-menu-item index="/Calendar-1">录入审核</el-menu-item>
        <el-menu-item index="/Calendar-2">故障派工</el-menu-item>
        <el-menu-item index="/Calendar-3">故障回填</el-menu-item>
        <el-menu-item index="/Calendar-4">处理审核</el-menu-item>
        <el-menu-item index="/Calendar-5">故障报告</el-menu-item>
        <el-menu-item index="/Calendar-6">故障反馈</el-menu-item>
        <el-menu-item index="/Calendar-7">一体化申请</el-menu-item>
        <el-menu-item index="/Calendar-8">安监维护</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span slot="title">通知管理</span>
        </template>
        <el-menu-item index="/portal">通知编制</el-menu-item>
        <el-menu-item index="/Calendar-19">通知派工</el-menu-item>
        <el-menu-item index="/Calendar-20">通知回填</el-menu-item>
        <el-menu-item index="/Calendar-21">通知反馈</el-menu-item>
        <el-menu-item index="/echarts-sunburst">一体化申请</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span slot="title">物流管理</span>
        </template>
        <el-menu-item index="/layout">物料库存</el-menu-item>
        <el-menu-item index="/Calendar-24">定检工具</el-menu-item>
        <el-menu-item index="/Calendar-25">发料退料</el-menu-item>
        <el-menu-item index="/Calendar-26">物流台账</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">配置管理</span>
        </template>
        <el-menu-item index="/ani-text-demo">车组软件</el-menu-item>
        <el-menu-item index="/Calendar-28">设备软件</el-menu-item>
        <el-menu-item index="/Calendar-29">轮轴使用</el-menu-item>
        <el-menu-item index="/Calendar-30">轮轴基本信息</el-menu-item>
        <el-menu-item index="/Calendar-31">轮轴基本信息审核</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navi',
  data () {
    return {
      isCollapse: true
    }
  },
  computed: {
    collapseIcon () {
      return this.isCollapse ? 'el-icon-more-outline' : 'el-icon-back'
    },
    collapseTitle () {
      return this.isCollapse ? '' : '收起　'
    }
  },
  methods: {
    togglePanel () {
      this.isCollapse = !this.isCollapse
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .nav {
    overflow: hidden;
    cursor: pointer;
  }

  .nav-panel-toggle {
    height: 45px;
    line-height: 45px;
    font-size: 14px;

    color: white;
    transition: border-color .3s, background-color .3s, color .3s;
  }

  .nav-panel-toggle:hover {
    background-color: rgb(67, 74, 80);
  }

  .el-menu-vertical-demo {
    overflow: hidden;
    border: none;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  a {
    text-decoration: none;
    color: unset;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>
