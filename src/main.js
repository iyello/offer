import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import dateTime from 'vue-date-time-m'
Vue.component('data-time', dateTime)

Vue.prototype.$ajax = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('body')

// 4. 创建和挂载根实例。
 // 记得要通过 router 配置参数注入路由，
 // 从而让整个应用都有路由功能
 //,
//ES6语法 Vue.js 里面的 createElement 函数，
//这个函数的作用就是生成一个 VNode节点，render 函数得到这个 VNode 节点之后，
//返回给 Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点上。


