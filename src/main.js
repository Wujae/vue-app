// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js' //引入element ui
import './plugins/echarts.js' //引入echarts
import './plugins/filter.js' //引入filter
import './plugins/polyfill.js' //引入polyfill外源性增强
import store from './store'//引入store
import './assets/main.css'  //引入外部字体，全局样式设置
import axios from 'axios'
import VueJsonp from 'vue-jsonp'

Vue.use(VueJsonp)

Vue.config.productionTip = false

Vue.prototype.axios = axios

/**
 * @desc 统一加载注册组件资源
 */
Vue.prototype.registerComponent = (templateName, templatePath) =>{

  return Vue.component(templateName, () => import(`./components/${templatePath}`))

}

//获取服务器参数后创建Vue
axios.get('static/properties.json').then(response => {

  console.log("load interface server properties success");

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    beforeCreate() {
      this.$store.state.server = response.data.server;
      this.$store.state.displayMaincys = response.data.displayMaincys;
      this.$store.state.queryFunctions = response.data.queryFunctions;
      this.$store.state.token = response.data.token;
      this.$store.state.requestInterval = response.data.requestInterval;
      this.$store.state.trainAllocationInterval = response.data.trainAllocationInterval;

    }
  })

}, error => {

  console.error('load interface server properties error', error )

})





