import Vue from 'vue'
import Router from 'vue-router'
import newActivity from './views/newActivity.vue'
import index from './views/index.vue'

Vue.use(Router)

 // 2. 定义路由
 // 每个路由应该映射一个组件。 其中"component" 可以是
 // 通过 Vue.extend() 创建的组件构造器，
 // 或者，只是一个组件配置对象。
 // 3. 创建 router 实例，然后传 `routes` 配置 new就是创建实例
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
   { path: '/', redirect: '/index' },
   {
      name:'index',
      path:'/index',
      component:index
   },
   {
      name:'newActivity',
      path:'/newActivity',
      component:newActivity 
   },
   {
      name:'success',
      path:'/success',
      component:newActivity 
   },
    
  ]
})
