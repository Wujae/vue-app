<template>
    <div>
        <router-link  v-for="button in links" :to="button.path" href="javascript:">
          {{button.name}}
        </router-link>
    </div>
</template>

<script>
  export default {
    name: "Dashboard",
    data() {
      return {
        links: [
          { path: '/HelloWorld', name: 'HelloWorld'},
          { path: '/Element-ui', name: 'Element'},
          { path: '/Calendar', name: 'Calendar'},
          { path: '/echarts-sunburst', name: 'EchartsSunburst'},
          { path: '/portal', name: 'Portal'},
          { path: '/layout', name: 'Layout'},
          { path: '/ani-text-demo', name: 'AniTextDEMO'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
