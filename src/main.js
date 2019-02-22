// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import echarts from 'echarts'
import App from './App'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/**
 * @desc 统一加载注册组件资源
 */
Vue.prototype.registerComponent = (templateName, templatePath) =>{

  return Vue.component(templateName, () => import(`./components/${templatePath}`))

}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
