import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('body')

//自适应
(function (doc, win) {
  var docEl = doc.documentElement,
      code,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () 
      {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          var BaseFontSize = 24 * (clientWidth / 750);
          docEl.style.fontSize = BaseFontSize + 'px';
      };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
  
  })

  //左右滑动
  import VueTouch from 'vue-touch'
  Vue.use(VueTouch, {name: 'v-touch'})
  VueTouch.config.swipe = {
     threshold: 100 //手指左右滑动距离
  }
