<template>
  <div id="newActivity" ref="addPage">
    <img class="close" @click="close" src="../../static/img/close.png">
    <div v-if="unsubmit" style="margin:4.5rem 3.5rem;">
      <div class="main">
        <h6>新建活动</h6>
        <h3>预约</h3>
        <transition name="toChange1">
          <div v-if="show1" id="toChange1">
            <form class="inputbox">
              <h5>姓名</h5>
              <input
                @input="getname"
                @blur="msgname"
                v-model="name"
                id="name"
                class="name"
                type="text"
                name="name"
              >
              <p v-if="noname">请输入姓名</p>
              <h5>方向</h5>
              <input
                @input="getdire"
                @blur="msgdire"
                v-model="direction"
                id="direction"
                maxlength="9"
                class="direction"
                v-bind:class="{'direcolor':a}"
                readonly="readonly"
                type="text"
                name="direction"
              >
              <img class="more" @click="isShow" src="../../static/img/more.png">
              <ul class="dire" v-if="show4">
                <div class="dires">
                  <li @click="getValue" value="策划方向">策划方向</li>
                  <li @click="getValue" value="产品方向">产品方向</li>
                  <li @click="getValue" value="公关方向">公关方向</li>
                  <li @click="getValue" value="新媒体方向">新媒体方向</li>
                  <li @click="getValue" value="视觉方向">视觉方向</li>
                  <li @click="getValue" value="视频方向">视频方向</li>
                  <li @click="getValue" value="摄影方向">摄影方向</li>
                  <li @click="getValue" value="Android方向">Android方向</li>
                  <li @click="getValue" value="Web方向">Web方向</li>
                  <li @click="getValue" value="IOS方向">IOS方向</li>
                </div>
              </ul>
              <p v-if="nodire">请输入方向</p>

              <h5>电话</h5>
              <input
                @input="gettele"
                @blur="msgtele"
                v-model="telephone"
                id="telephone"
                class="telephone"
                type="text"
                name="telephone"
              >
              <p v-if="notele">请输入电话</p>
            </form>
          </div>
        </transition>
        <transition name="toChange2">
          <div v-if="show2" id="toChange2">
            <form class="inputbox">
              <h5>标题</h5>
              <input
                @input="gettitle"
                @blur="msgtitle"
                v-model="title"
                id="title"
                class="title"
                type="text"
                name="title"
              >
              <p v-if="notitle">请输入标题</p>
              <h5>标识</h5>
              <input
                @input="getmark"
                @blur="msgmark"
                v-model="mark"
                id="mark"
                class="mark"
                type="text"
                name="mark"
              >
              <p v-if="nomark">请输入标识</p>
              <h5>地点</h5>
              <input
                @input="getloca"
                @blur="msgloca"
                v-model="location"
                id="location"
                class="location"
                type="text"
                name="location"
                readonly="readonly"
                v-bind:class="{'direcolor':a}"
              >
              <img class="more" @click="isShow" src="../../static/img/more.png">
              <ul class="dire" v-if="show4">
                <div class="locas">
                  <li @click="getValue2" value="办公室">办公室</li>
                  <li @click="getValue2" value="七楼茶水间">七楼茶水间</li>
                  <li @click="getValue2" value="八楼茶水间">八楼茶水间</li>
                </div>
              </ul>
              <p v-if="noloca">请输入地点</p>
            </form>
          </div>
        </transition>
        <transition name="toChange3">
          <div v-if="show3" id="toChange3">
            <form class="inputbox">
              <br>
              <p style="font-size:1.5rem; color:#126964;">{{MonthAndDay}}</p>
              <h5>开始</h5>
              <div class="date-time-input">
                <input
                  @blur="msgstart"
                  v-model="start"
                  @click="sshow"
                  id="start"
                  class="start"
                  readonly="readonly"
                  type="text"
                  name="start"
                >
              </div>
              <date-time ref="dateTime1" type="time" @confirm="select1"></date-time>
              <p v-if="nostart">请选择开始时间</p>
              <h5>结束</h5>
              <div class="date-time-input">
                <input
                  @blur="msgend"
                  v-model="end"
                  @click="eshow"
                  id="end"
                  class="end"
                  readonly="readonly"
                  type="text"
                  name="end"
                >
                <p v-if="noend">请选择结束时间</p>
              </div>
              <date-time ref="dateTime2" type="time" @confirm="select2"></date-time>

              <p v-if="bigend">结束时间不能小于开始时间</p>
            </form>
          </div>
        </transition>
      </div>
      <div class="button">
        <img
          @click="priorclick"
          v-if="btn"
          id="prior"
          class="prior"
          src="../../static/img/prior.png"
        >
        <img @click="priorsclick" v-if="btns" class="priors" src="../../static/img/priors.png">
        <img
          @click="nextclick(),clickJump()"
          id="next"
          class="next"
          src="../../static/img/next.png"
        >
      </div>
    </div>

    <div class="ok" v-if="submitted">
      <img class="finish" @click="back" src="../../static/img/submitted.png">
    </div>
  </div>
</template>

<script>
import DateTime from "vue-date-time-m";
import axios from "axios";
(function(doc, win) {
  var docEl = doc.documentElement,
    // code,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      /* var clientHeight = docEl.clientHeight;
         if (!clientHeight) return;
         var BaseFontSize = 100* (clientHeight/568);
         docEl.style.fontSize = BaseFontSize + 'px';*/
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      var BaseFontSize = 24 * (clientWidth / 750);
      docEl.style.fontSize = BaseFontSize + "px";
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
export default {
  name: "newActivity",
  components: {
    DateTime
  },
  data() {
    return {
      transitionName: "slide-left",
      clientHeight: "",
      name: "",
      noname: "",
      direction: "",
      nodire: "",
      telephone: "",
      notele: "",
      title: "",
      notitle: "",
      mark: "",
      nomark: "",
      location: "",
      noloca: "",
      start: "",
      nostart: "",
      end: "",
      noend: "",
      bigend: "",
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      btn: true,
      btns: false,
      unsubmit: true,
      submitted: false,
      divindex: 1,
      btnindex: 1,
      a: false,
      MonthAndDay: "",
      warn1: "",
      warn2: "",
      warn3: "",
      count: "" ,//倒计时
    };
  },
  mounted() {
    //防止安卓软键盘使布局乱

    //路由传送日期
    let routerParams = this.$route.query.date;
    this.MonthAndDay = routerParams;

    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },

  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    }
  },

  methods: {
    changeFixed(clientHeight) {
      //动态修改样式
      // console.log(clientHeight);
      this.$refs.addPage.style.height = clientHeight + "px";
    },
    close() {
      this.$router.push("/index"); //路由跳转页面
    },
    getname() {
      this.noname = false;
    },
    getdire() {
      this.nodire = false;
    },
    gettele() {
      this.notele = false;
    },
    gettitle() {
      this.notitle = false;
    },
    getmark() {
      this.nomark = false;
    },
    getloca() {
      this.noloca = false;
    },
    msgname() {
      if (!this.name) {
        this.noname = true;
      }
    },
    msgdire() {
      if (!this.direction) {
        this.nodire = true;
      }
    },
    msgtele() {
      if (!this.telephone) {
        this.notele = true;
      }
    },
    msgtitle() {
      if (!this.title) {
        this.notitle = true;
      }
    },
    msgmark() {
      if (!this.mark) {
        this.nomark = true;
      }
    },
    msgloca() {
      if (!this.location) {
        this.noloca = true;
      }
    },
    msgstart() {
      if (!this.start) {
        this.nostart = true;
      }
    },
    msgend() {
      if (!this.end) {
        this.noend = true;
      }
    },
    nextclick() {
      if (this.divindex == 1) {
        (this.noname = false), (this.nodire = false), (this.notele = false);
        if (this.name == "" || this.direction == "" || this.telephone == "") {
          if (this.name == "") {
            this.noname = true;
          }
          if (this.direction == "") {
            this.nodire = true;
          }
          if (this.telephone == "") {
            this.notele = true;
          }
          return false;
        } else {
          this.divindex++;
          (this.show1 = false),
            (this.show2 = true),
            (this.show3 = false),
            (this.btn = false),
            (this.btns = true);
        }
      } else if (this.divindex == 2) {
        (this.notitle = false), (this.nomark = false), (this.noloca = false);
        if (this.title == "" || this.mark == "" || this.location == "") {
          if (this.title == "") {
            this.notitle = true;
          }
          if (this.mark == "") {
            this.nomark = true;
          }
          if (this.location == "") {
            this.noloca = true;
          }
          return false;
        } else {
          (this.show1 = false),
            (this.show2 = false),
            (this.show3 = true),
            (this.btn = false),
            (this.btns = true);
          this.divindex++;
        }
      } else if (this.divindex == 3) {
        (this.nostart = false), (this.noend = false), (this.bigend = false);
        if (this.start == "" || this.end == "") {
          if (this.start == "") {
            this.nostart = true;
          }
          if (this.end == "") {
            this.noend = true;
          }
          return false;
        } else if (this.start > this.end) {
          this.bigend = true;
        } else {
          var url = "39.108.0.22:8088/api/store";
          axios.post(url, {
              name: this.name,
              direction: this.direction,
              telephone: this.telephone,
              title: this.title,
              mark: this.mark,
              location: this.location,
              start: this.start,
              end: this.end,
              date: this.MonthAndDay
            })
            .catch(err => {
              console.log(err);
            });
           (this.unsubmit = false), (this.submitted = true);
        }
      }
    },
    //几秒后进入跳转页面
    clickJump() {
      const timejump = 5;
      if (this.submitted == true) {
        if (!this.timer) {
          this.count = timejump;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= timejump) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
              //跳转的页面写在此处
              this.$router.push({ path: "/index" });
            }
          }, 100);
        }
      }
    },
    priorclick() {
      this.$router.push("/index"); //路由跳转页面
    },
    priorsclick() {
      this.divindex--;
      if (this.divindex == 1) {
        (this.show1 = true),
          (this.show2 = false),
          (this.show3 = false),
          (this.btn = true),
          (this.btns = false);
      } else if (this.divindex == 2) {
        (this.show1 = false),
          (this.show2 = true),
          (this.show3 = false),
          (this.btn = false),
          (this.btns = true);
      } else if (this.divindex == 3) {
        (this.show1 = false),
          (this.show2 = false),
          (this.show3 = true),
          (this.btn = false),
          (this.btns = true);
      }
    },
    isShow() {
      this.a = !this.a;
      this.show4 = !this.show4;
    },
    back() {
      this.$router.push("/index"); //路由跳转页面
    },
    getValue(event) {
      var e = event.currentTarget;
      var states = e.innerHTML;
      this.direction = states;
      this.nodire = false;
      this.a = false;
      this.show4 = !this.show4;
    },
    getValue2(event) {
      var e = event.currentTarget;
      var states = e.innerHTML;
      this.location = states;
      this.nodire = false;
      this.a = false;
      this.show4 = !this.show4;
    },
    sshow() {
      this.$refs.dateTime1.show();
    },
    eshow() {
      this.$refs.dateTime2.show();
    },
    select1(val) {
      this.nostart = false;
      this.start = val;
    },
    select2(val) {
      this.noend = false;
      this.end = val;
      if (this.end > this.start) {
        this.begin = false;
      }
    }
  }
};
</script>

<style>
@import "../../static/css/newActivity.css";
@import "../../static/font/font.css";
</style>