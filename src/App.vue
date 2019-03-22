<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <router-link to="/foo" tag="li">foo</router-link>
    <li>foo</li>
    <router-view></router-view> -->
    <!-- 首页 -->
    <index></index>
  </div>
</template>

<script>
import index from './views/index.vue'

export default {
  name: 'app',
  components: {
    index
  },
  data() {
    return {
      messages: {}
    };
  },
  computed: {
  }
}
</script>

<style>
*{margin: 0;padding: 0;border:0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:38.5rem;
  /* background-image:url(./assets/bg.jpg); */
  background-size:100%;
}
#app b {
  font-family:"微软雅黑";
  display: block;
  color:darkcyan;
  font-size:2rem;
  float:left;
  margin:0rem 2rem;
}
</style>
