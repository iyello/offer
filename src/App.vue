<template>
  <div id="app">
    <transition :name="transitionName">  
      <router-view class="child-view"></router-view>  
    </transition> 
    <!-- 首页 -->   
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      clientHeight:'',
      messages: {}
    };
  },
  mounted(){
   
  },
  watch:{
     //监听路由的路径，可以通过不同的路径去选择不同的切换效果   
    '$route' (to, from) {  
      if(to.path == '/index'){  
        this.transitionName = 'slide-right';  
      }else{  
        this.transitionName = 'slide-left';  
      }  
    }  
     
  },
  method:{
     
  },
  computed: {
  }
}
</script>

<style>
*{margin: 0;padding: 0;border:0;}

.child-view {  
  position: absolute;  
  left: 0;  
  top: 0;  
  width: 100%;  
  height: 100%;  
  transition: all .5s cubic-bezier(.55,0,.1,1);  
}  
.slide-left-enter, .slide-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(30px, 0);  
  transform: translate(30px, 0);  
}  
.slide-left-leave-active, .slide-right-enter {  
  opacity: 0;  
  -webkit-transform: translate(-30px, 0);  
  transform: translate(-30px, 0);  
}  

#app {
  font-family:sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
#app b {
  font-family:"微软雅黑";
  display: block;
  color:#126964;
  font-size:2rem;
  font-weight:600;
  float:left;
  margin:-1rem 2rem;
}
</style>
