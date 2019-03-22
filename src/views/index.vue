<template>
    <div id="index">
      <!-- 日历 -->
        <div id="calendar"> 
            <!-- v-bind:style="{backgroundImage: 'url(' + albumpic_big + ')'}" -->
            <div class="box">
            <div class="fold-btn" @click="isShow=!isShow">
                <span>{{nowyear}}</span>
                {{ isShow ? '︿' : '﹀' }} <span :class="{topArrow: isShow, bottomArrow: !isShow}"></span>
            </div>
            <div class="date-title" >
                <div>日</div>
                <div>一</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div>六</div>
            </div>
            <div class="calendar-container"  :style="{height: `${calendarContainerHeight}`}" v-on:scroll="scrollDebounce">
                <div class="date-container premonth">
                <div class="date-header">{{ `${preDivCalendar.year}年${preDivCalendar.month + 1}月` }}</div>
                <div class="date-board">
                    <div v-for="i in new Date(preDivCalendar.year, preDivCalendar.month, 1).getDay()" :key="-i"></div>
                    <div class="date-block"
                        :class="{todayBlock: i === 1}"
                        v-for="i in getMonthDayByMonthYear(preDivCalendar.month, preDivCalendar.year)"
                        :key="i">
                    <span @click="changeDay($event);getMessage()">{{ i }}</span>
                    </div>
                </div>
                </div>
                <div class="date-container middlemonth">
                <div class="date-header">{{ `${middleDivCalendar.year}年${middleDivCalendar.month + 1}月` }}</div>
                <div class="date-board">
                    <div v-for="i in new Date(middleDivCalendar.year, middleDivCalendar.month, 1).getDay()" :key="-i"></div>
                    <div class="date-block"
                        :class="{todayBlock: i === 1}"
                        v-for="i in getMonthDayByMonthYear (middleDivCalendar.month, middleDivCalendar.year)"
                        :key="i">
                    <span @click="changeDay($event);getMessage()">{{ i }}</span>
                    </div>
                </div>
                </div>
                <div class="date-container nextmonth">
                <div class="date-header">{{ `${nextMiddleDivCalendar.year}年${nextMiddleDivCalendar.month + 1}月` }}</div>
                <div class="date-board">
                    <div v-for="i in new Date(nextMiddleDivCalendar.year, nextMiddleDivCalendar.month, 1).getDay()" :key="-i"></div>
                    <div class="date-block"
                        :class="{todayBlock: i === 1}"
                        v-for="i in getMonthDayByMonthYear (nextMiddleDivCalendar.month, nextMiddleDivCalendar.year)"
                        :key="i">
                    <span @click="changeDay($event);getMessage()">{{ i }}</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <br>
        <!-- 信息显示 -->
        <div class="showDiv" v-show="!downIcon">
          <b>{{MonthAndDay}}</b>
          <br><br><br><br>        
          <div id="message-container" >
              <ol>
                  <li>
                      <p id="content">{{content}}</p>
                      <p id="place" >{{place}}</p>
                      <div id="dele" @click="setMaskShow">
                      </div>
                      <div id="time">
                          <p id="start" >{{start}}</p>
                          <p id="end" >{{end}}</p>
                      </div>
                  </li>
                  <li>
                      <p id="content">{{content}}</p>
                      <p id="place" >{{place}}</p>
                      <div id="dele" @click="setMaskShow">
                      </div>
                      <div id="time">
                          <p id="start" >{{start}}</p>
                          <p id="end" >{{end}}</p>
                      </div>                   
                  </li>
                  <li>
                      <p id="content">{{content}}</p>
                      <p id="place" >{{place}}</p>
                      <div id="dele" @click="setMaskShow">
                      </div>
                      <div id="time">
                          <p id="start" >{{start}}</p>
                          <p id="end" >{{end}}</p>
                      </div>                   
                  </li>
              </ol>
          </div>
          <div class="add" @click="addActivity()">
            <div class="add-logo"></div>
            <p>添加活动</p>
          </div>
        </div>
        <!-- 日历下拉显示的隐藏div        -->
        <div id="hiddenDiv" v-show="downIcon">
          <br>
          <span>{{MonthAndDay}}</span>
          <div class="add2-logo"></div>
        </div>
        <!-- 删除框和遮罩层 -->
        <div class="dele-container">
          <div class="mask" v-show="maskShow" @click="setMaskShow"></div>
          <div class="dele-box" id="dele-box" v-show="maskShow">
              <span style="color:white; font-size:1.5rem; margin:0rem -1rem; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;取消预约</span>
              <button @click="setMaskShow" class="close-btn"></button>
              <input type="text" id="ID-text" name="" placeholder="标识" > 
              <!-- v-model="text_content"  -->
              <button @click="setMaskShow" class="yes-btn">&nbsp;&nbsp;&nbsp;确定</button>              
          </div>
        </div>
    </div>
</template>
 
<script>
  export default {    
    data () {     
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const nowday = year + "年" + month + "月" + day + "日"   
      
      //模拟数据
      const message = [
        {
          content : "技术晚修自习",
          place : "办公室",
          start : "19:00",
          end : "21:00"
        },
        {
          content : "视觉开会",
          place : "办公室",
          start : "15:00",
          end : "17:00"
        },
      ]
      return {
        y: year,
        m: month,
        d: day,
        nowyear: year ,
        isShow: false, // 控制日历的收起与展开
        calendarContainerHeight: '0', // 日历的高度
        scrollTimer: null, // 滚动定时器，用于滚动事件防抖动
        preDivCalendar: {year: 2018, month: 6}, // 第一个div显示的日历
        middleDivCalendar: {year: 2018, month: 7}, // 中间div显示的日历
        nextMiddleDivCalendar: {year: 2018, month: 8}, // 最后一个div显示的日历
        MonthAndDay:nowday   ,
        albumpic_big : "../assets/bg1.png" ,
        show : document.getElementById('showDiv'),
        hidden : document.getElementById('hiddenDiv'),
        inputData: [],
        newItem: '' ,
        content : message[1].content,
        place : "办公室",
        start : "19:00",
        end : "21:00",
        maskShow: false,
        downIcon :false,
        clickValue : true
      }
    },
    computed: {
      //计算当前日期,忽略warn
      // eslint-disable-next-line
      MonthAndDay: {
        set: function() {          
        }   
    },
    },
    
    mounted () {
      this.middleDivCalendar = {year: new Date().getFullYear(), month: new Date().getMonth()+1}
      // 当日历收起的时候，日历高度刚好只够显示两行日期
      this.calendarContainerHeight = 2*(document.querySelector('.date-block').getBoundingClientRect().height) + 'px'
      //遮罩层高度获取
      // this.$refs.mask.style.height = doc.getElementById('app').clientHeight + 'px'
      this.$nextTick(function () {
        // DOM更新完成后
        const today = document.querySelector('.todayBlock')
        today.scrollIntoView()
      })
    },
    watch: {
      isShow(){
        //切换div
        this.downIcon = !this.downIcon
        //切换背景图
        this.albumpic_big = "../assets/bg2.png"
        //  const img = document.getElementById('calendar')
        //  console.log(img)
        // this.bgImg.style.background.url ='../assets/bg2.png' //背景图切换失败
        
        // 监听日历的收起与展开，改变日历的高度
        const height = document.querySelector('.date-block').getBoundingClientRect().height + 'px'
        this.calendarContainerHeight = this.isShow ? '22rem' : height
      
        if (!this.isShow){
         
          this.albumpic_big = "../assets/bg1.png"
          const today = document.querySelector('.todayBlock')
          today.scrollIntoView()
          this.calendarContainerHeight = 2*(document.querySelector('.date-block').getBoundingClientRect().height) + 'px'
          // img.style.background = "url('../assets/bg1.png')" 
        }
      },
      middleDivCalendar () { // 监听中间div日历的时间,根据中间div的日历获取上下div的日历
        this.preDivCalendar = this.getPrevMonth(this.middleDivCalendar.month, this.middleDivCalendar.year)
        this.nextMiddleDivCalendar = this.getNextMonth(this.middleDivCalendar.month, this.middleDivCalendar.year)
      }
    },
    methods: {
      getPrevMonth: function (m, y) {  // 获取上一个月
        let month = m || 11
        let year = y
        year -= m === 0
        month -= m !== 0
        return { year, month }
      },
      getNextMonth: function (m, y) {  // 获取下一个月
        let month = m
        let year =  y
        year += m === 11
        month = (1 + month) % 12
        return { year, month }
      },
      getMonthDayByMonthYear (month, year) { // 获取某年某月的天数
        // 判断是否为闰年
        const isLeap = (year % 100 === 0) ?  (year % 400 === 0 ? 1 : 0) :  (year % 4 === 0) ? 1 : 0
        const monthDay = [31, 28 + isLeap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 数组中的每一项代表每个月的天数
        return monthDay[month]
      },
      scrollDebounce (e) {
        clearTimeout(this.scrollTimer)
        let self = this
        // 设置定时器，防止scroll抖动
        this.scrollTimer = setTimeout(function() {
          if (e.target.scrollTop === 0) {
            self.middleDivCalendar = self.getPrevMonth(self.middleDivCalendar.month, self.middleDivCalendar.year)
            self.$nextTick(function () {
              // DOM 更新了
              const premonth = document.querySelector('.premonth')
              e.target.scrollTop = premonth.offsetHeight
            })
          }
          if (e.target.scrollTop + e.target.clientHeight + 1 >= e.target.scrollHeight){
            self.middleDivCalendar = self.getNextMonth(self.middleDivCalendar.month, self.middleDivCalendar.year)
            self.$nextTick(function () {
              // DOM 更新了
              const nextmonth = document.querySelector('.nextmonth')
              e.target.scrollTop = e.target.scrollHeight - e.target.clientHeight - nextmonth.offsetHeight
            })
          }
        }, 100)
      },
      //点击改变日期
      changeDay(event){
        const n = (event.target.parentElement.parentElement.previousElementSibling.innerHTML).substring(0,4)
        const y = parseInt(event.target.parentElement.parentElement.previousElementSibling.innerHTML.substring(5,8))
        const r = event.target.innerHTML
        //判断是不是过去的日期 && parseInt(ny.substring(5,8)) <= this.m && ri < this.d)
        if(n < this.y || ( n == this.y && ( y < this.m || ( y == this.m && r < this.d ))))
        {
          this.clickValue = false
          console.log(this.clickValue)
        }
        this.MonthAndDay = n + "年" + y + "月" + r + "日"
      },
      //获取点击日期的预约信息
      getMessage(){
        
      },
      //div隐藏和显示
      setMaskShow(){
          this.maskShow = !this.maskShow;
      }
    },
  }
</script>
 
<style lang="less" scoped>
  #index{

  }
  #calendar{   
    background:url("../assets/bg2.png");
    background-repeat: no-repeat;
    background-size:100% 100%;  
  }
  .box{
    
    height:95%;
    width:90%;
    margin:auto;
  }
  .date-title {
    color:white;
    font-size:0.7rem;
    display: flex;
    padding: 1rem 0;
    margin:-2.5rem 0;
    text-align: center;
    div {
      flex: 1;
    }
  }
  .calendar-container{
    
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    transition: height 0.5s ease;
    margin:2rem 0;
    .date-container {
    .date-header {
      text-align:left;
      padding: 1.5rem 0;
      color:white;
      font-size:2rem;
      
    }
    .date-board {
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
      text-align: center;
     
      div {
        width: 14.28571%;
        padding: 1rem 0;
        
      }
      span{
        color:white;
        border-radius: 5rem;
        background:#48a2a1;
        height:1.5rem;
        width:1.5rem;
        display: block;
        line-height: 1.5rem;
        opacity:0.7;
        margin:auto;
      }
    }
  }
  .date-board :hover{
    span{
    border-radius: 5rem;
    background:white;
    color:#48a2a1;
    }
  }
  }
  .fold-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.0rem 0;
    color:white;
    .topArrow {
      font-size: 0;
      line-height: 0;
      margin-left: .10rem;
      border: .05rem solid;
      border-color: transparent transparent #0893FF transparent;
    }
    .bottomArrow {
      font-size: 0;
      line-height: 0;
      margin-left: .10rem;
      border: .05rem solid;
      border-color: #0893FF transparent transparent transparent;
    }    
  }
  #message-container{
    height:10rem;
    overflow-y: scroll;
    // -webkit-overflow-scrolling: touch; //滚动流畅
    transition: height 0.5s ease;
    ol{
      list-style:none;
      margin:auto;
      width:90%;
      height:50%;
    }
    li{
      margin:auto;
      width:100%;
      height:90%;
      box-shadow: 0.05rem 0.05rem 0.5rem 0.05rem #bec0c0;
    }
  }
  #time{
      float: right;
      margin:-12% 20%;
  }
  #dele{
      float: right;
      width: 25px;
      height: 26px;
      margin:-11% 8%;
      background: url("../assets/delelogo.png");
  }
  #add{
    margin:0rem 0rem;
    display: flex;
  }
  .add-logo{
    background:url("../assets/add.png");
    height:3.2rem;
    width:3.2rem;
    margin:auto;
  }
  #hiddenDiv{
    box-shadow: 0.05rem 0.05rem 0.5rem 0.05rem #bec0c0;
    border-radius:0.5rem;
    margin:auto;
    width:95%;
    height:5rem;
    span{
      font-size:1.5rem;
      line-height:2rem;
      text-align: center;
      color:#66bab7;
    }
   
  }
  .add2-logo{
    background:url("../assets/add2.png");
    height:2rem;
    width:2rem;
    float:right;
    margin:0rem 2rem;
  }
.dele-container{
    width: 100%;
    height: 100%;
}
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.7;
}
.dele-box{
    background:url("../assets/dele1.png");
    position: fixed;
    width: 19rem;
    height: 20rem;
    line-height: 8rem;
    top: calc(50% - 9rem);
    left: calc(50% - 9rem);
}
.close-btn{
  background:url("../assets/delelogo2.png");
  width: 1rem;
  height: 1.1rem;
  margin:2.3rem 3.2rem;
  float:right;
  outline:none;
}
#ID-text{
  width:11.5rem;
  height:2rem;
  background:white;
  border-radius:1.3rem;
  margin:-1rem 3rem;
  display: flex;
  outline:none;
  font-size:1rem;
  font-family:"微软雅黑";
  color:#66bab7;
 
} 
:-ms-input-placeholder{
  color:#66bab7;
}
::-webkit-input-placeholder{
  color:#66bab7;
}
.yes-btn{
  font-family:"微软雅黑";
  width:3.2rem;
  height:1.5rem;
  background:#126964;
  color:white;
  display: flex;
  outline:none;
  border-radius:1.3rem;
  margin:3rem 6.9rem;
}
</style>