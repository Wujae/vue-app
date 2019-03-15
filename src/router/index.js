import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../components/Dashboard'
import HelloWorld from '../components/HelloWorld'
import ElementUI from '../components/ElementUI'
import Calendar from '../components/memo/Calendar'
import EchartsSunburst from '../components/echarts/EchartsSunburst'
import Portal from '../components/Portal'
import Layout from '../components/layout/Layout'
 import Layout2 from '../components/layout/Layout2'
import Layout3 from '../components/layout/Layout3'
import AniTextDEMO from '../components/AniTextDEMO'

Vue.use(Router);

export default new Router({
  base: 'vue-app',
  routes: [
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/HelloWorld', name: 'HelloWorld', component: HelloWorld },
    { path: '/Element-ui', name: 'Element', component: ElementUI },
    { path: '/Calendar', name: 'Calendar', component: Calendar },
    { path: '/echarts-sunburst', name: 'EchartsSunburst', component: EchartsSunburst },
    { path: '/portal', name: 'Portal', component: Portal},
    { path: '/layout', name: 'Layout', component: Layout},
     { path: '/layout2', name: 'Layout2', component: Layout2},
    { path: '/layout3', name: 'Layout2', component: Layout3},
    { path: '/ani-text-demo', name: 'AniTextDEMO', component: AniTextDEMO}
  ]
})
