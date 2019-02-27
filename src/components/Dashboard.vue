<template>
    <div>
      <div class="btn-div" v-for="button in links">
        <router-link   :to="button.path" href="javascript:">
          {{button.name}}
        </router-link>
      </div>
    </div>
</template>

<script>
  export default {
    name: "Dashboard",
    data() {
      return {
        links: [
          { path: '/layout', name: 'Layout'},
          { path: '/HelloWorld', name: 'HelloWorld'},
          { path: '/Element-ui', name: 'Element'},
          { path: '/Calendar', name: 'Calendar'},
          { path: '/echarts-sunburst', name: 'EchartsSunburst'},
          { path: '/portal', name: 'Portal'},
          { path: '/ani-text-demo', name: 'AniTextDEMO'}
        ]
      }
    }
  }
</script>

<style scoped>
  .btn-div{
    display: inline-block;
    padding: 5px;
    margin: 10px;
    border: 1px solid #7acf54;
    border-radius: 5px;
    background-color: #7acf54;

  }
</style>
