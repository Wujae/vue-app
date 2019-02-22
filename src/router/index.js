import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import ElementUI from '../components/ElementUI'
import Calendar from '../components/memo/Calendar'
import EchartsSunburst from '../components/echarts/EchartsSunburst'
import Portal from '../components/Portal'
import Layout from '../components/layout/Layout'
import AniTextDEMO from '../components/AniTextDEMO'

Vue.use(Router);

export default new Router({
  base: 'vue-app',
  routes: [
    { path: '/HelloWorld', name: 'HelloWorld', component: HelloWorld },
    { path: '/Element-ui', name: 'Element', component: ElementUI },
    { path: '/Calendar', name: 'Calendar', component: Calendar },
    { path: '/echarts-sunburst', name: 'EchartsSunburst', component: EchartsSunburst },
    { path: '/portal', name: 'Portal', component: Portal},
    { path: '/layout', name: 'Layout', component: Layout},
    { path: '/ani-text-demo', name: 'AniTextDEMO', component: AniTextDEMO}
  ]
})
