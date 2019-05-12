<template>
    <div id="index" ref="homePage">
      <!-- 日历 -->
        <div id="calendar"> 
            <div class="box">
            <div class="fold-btn" @click="isShow=!isShow">
                <span>{{nowyear}}</span>                
                {{ isShow ? '︿' : '﹀' }} <span :class="{topArrow: isShow, bottomArrow: !isShow}"></span>              
            </div>
            <div class="all-btn" @click="getAllMsg()"></div>
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
        <div class="show-box" v-show="!downIcon">
          <b :style="{display: `${allHide}`}">{{MonthAndDay}}</b>
          <b :style="{display: `${allShow}`}">全部预约信息</b>   
          <br><br>
          <div id="message-container" :style="{height:msgHeight}">
              <ul :style="{height:ulHeight}">
                  <li v-for="(message) in messages">
                      <div class="cBox">
                        <p id="content" :style="{display: `${allHide}`}">●&nbsp;{{message.content}}</p>
                        <p id="date" :style="{display: `${allShow}`}">●&nbsp;{{message.date}}</p>
                        <p id="place" :style="{display: `${allHide}`}">{{message.place}}</p>
                        <p id="content-place" :style="{display: `${allShow}`}">{{message.content}}&nbsp;{{message.place}}</p>
                      </div>
                      <div style="display:none">{{message.date}}{{message.id }}{{message.mark }}</div>
                      <div id="dele" @click="setMaskShow();getId(message.id,message.mark)">
                      </div>
                      <div class="time">
                          <p id="start" >{{message.start }}</p>
                          <p id="end" >{{message.end }}</p>
                      </div>
                  </li>
              </ul>
          </div>
          <div class="add" @click="addActivity()">           
            <div class="add-logo"></div>
            <p style="font-weight:540; color:#126964; font-size:1rem;">添加活动</p>          
          </div>
        </div>
        <!-- 日历下拉显示的隐藏div    -->
        <div id="hidden-box" v-show="downIcon">
          <br>
          <span>{{MonthAndDay}}</span>
          <div class="add2-logo" @click="addActivity()"></div>
        </div>
        <!-- 删除框和遮罩层 -->
        <div class="dele-container">
          <div class="mask" v-show="maskShow" @click="setMaskShow()"></div>
          <div class="dele-box" id="dele-box" v-show="maskShow">
              <span style="color:white; font-size:1.5rem; margin:0rem -1rem; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;取消预约</span>
              <button @click="setMaskShow();close()" class="close-btn"></button>
              <input type="text" id="mark" class="ID-text" name="" placeholder="标识" v-model="markText"> 
              <!-- v-model="text_content"  -->
              <button @click="deleMessage()" class="yes-btn">确定</button>              
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
      return {
        clientHeight:'',//屏幕高度
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
        show : document.getElementById('show-box'),
        hidden : document.getElementById('hidden-box'),
        maskShow: false,
        downIcon :false,
        clickValue : true, 
        isDay : false, 
        msgHeight : '0rem' ,  //显示信息框的高度
        ulHeight : '48.6%' ,
        markText : '',
        indexId : '',//当前id
        indexMark : '',//当前标识,
        allHide : "block",
        allShow : "none",//当显示全部，样式改变
        //模拟数据
        fakeMessages : [
            {
              content : "技术晚修自习",
              place : "办公室",
              start : "19:00",
              end : "21:00",
              date : "2019年4月6日",
              id : "1",
              mark : "666666"
            },
            {
              content : "tt自习",
              place : "办公室",
              start : "19:00",
              end : "21:00",
              date : "2019年3月4日",
              id : "2",
              mark : "555555"
            },
            {
              content : "77自习",
              place : "办公室",
              start : "19:00",
              end : "21:00",
              date : "2019年4月17日",
              id : "3",
              mark : "444444"
            },
            {
              content : "55自习",
              place : "办公室",
              start : "19:00",
              end : "21:00",
              date : "2019年3月20日",
              id : "4",
              mark : "666688"
            },
            {
              content : "55自习",
              place : "办公室",
              start : "19:00",
              end : "21:00",
              date : "2019年4月12日",
              id : "4",
              mark : "666777"
            },
             {
              content : "55自习",
              place : "办公室",
              start : "19:00",
              end : "21:00",
              date : "2019年4月16日",
              id : "4",
              mark : "555577"
            },
          ],
          messages : [] //存放后台数据  
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
      //请求后台数据
      const url="39.108.0.22/api/store"
      this.$ajax.get(url).then(function (response) {
        message = JSON.parse(response)
      })
      .catch(function (error) {
      console.log(error);
      });
      //调用
      this.getMessage(); 
      // 获取浏览器可视区域高度
      this.clientHeight =   `${document.documentElement.clientHeight}`          //document.body.clientWidth;
      
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
     
      this.middleDivCalendar = {year: new Date().getFullYear(), month: new Date().getMonth()+1 }
      // 当日历收起的时候，日历高度刚好只够显示三行日期
      this.calendarContainerHeight = 3*(document.querySelector('.date-block').getBoundingClientRect().height) + 'px'
      this.$nextTick(function () {
        // DOM更新完成后
        const today = document.querySelector('.todayBlock')      
        today.scrollIntoView()    
        console.log(this.calendarContainerHeight)
      })

      
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
      this.changeFixed(this.clientHeight)
      },

      isShow(){
        //切换div
        this.downIcon = !this.downIcon

        // 监听日历的收起与展开，改变日历的高度
        const height = document.querySelector('.date-block').getBoundingClientRect().height + 'px'
        this.calendarContainerHeight = this.isShow ? '25rem' : height
      
        if (!this.isShow){
          const today = document.querySelector('.todayBlock')
          today.scrollIntoView()
          this.calendarContainerHeight = 3*(document.querySelector('.date-block').getBoundingClientRect().height) + 'px'
          console.log(this.calendarContainerHeight)
        }
      },
      middleDivCalendar () { // 监听中间div日历的时间,根据中间div的日历获取上下div的日历
        this.preDivCalendar = this.getPrevMonth(this.middleDivCalendar.month, this.middleDivCalendar.year)
        this.nextMiddleDivCalendar = this.getNextMonth(this.middleDivCalendar.month, this.middleDivCalendar.year)
      }
    },
    
    methods: {
      changeFixed(clientHeight){   //动态修改样式
        this.$refs.homePage.style.height = clientHeight+'px';
     },
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
      // 点击改变日期
      changeDay(event){       
        const n = (event.target.parentElement.parentElement.previousElementSibling.innerHTML).substring(0,4)
        const y = parseInt(event.target.parentElement.parentElement.previousElementSibling.innerHTML.substring(5,8))
        const r = event.target.innerHTML
        //判断是不是过去的日期 && parseInt(ny.substring(5,8)) <= this.m && ri < this.d)
        if(n < this.y || ( n == this.y && ( y < this.m || ( y == this.m && r < this.d ))))
        {
          this.clickValue = false
        }
        else
        {
          this.clickValue = true
        }       
        this.MonthAndDay = n + "年" + y + "月" + r + "日"
      },

      //获取点击日期的预约信息
      getMessage(){
        this.messages = []
        this.isDay = false
        this.msgHeight = '0rem'
        this.allHide = "block"
        this.allShow = "none"
        //循环获取该日期预约内容
        let array = this.fakeMessages
        for(let i=0;i<array.length;i++)
        {
          let obj = array[i].date       
          const toStr1 = JSON.stringify(obj) //对象->数组去比较
          const toStr2 = JSON.stringify(this.MonthAndDay)
          if(toStr1 == toStr2)
          {
            this.messages.push(array[i])
          }
        }
        if(this.messages.length == 1) 
        {
          this.ulHeight = '91.6%'
          this.msgHeight = '7rem'
        }
        else if(this.messages.length > 1)
        {
          this.ulHeight = '48.6%'
          this.msgHeight = '14rem'
        }       
      },

      //获取全部预约信息
      getAllMsg() {
        this.messages = []
        this.isDay = false
        this.msgHeight = '0rem'
        this.allHide = "none"
        this.allShow = "block"
        //循环获取该日期预约内容
        let array = this.fakeMessages
        for(let i=0;i<array.length;i++)
        {
            this.messages.push(array[i])
        }
        if(this.messages.length == 1) 
        {
          this.ulHeight = '91.6%'
          this.msgHeight = '7rem'
        }
        else if(this.messages.length > 1)
        {
          this.ulHeight = '48.6%'
          this.msgHeight = '14rem'
        }
      },

      //div隐藏和显示
      setMaskShow(){
          this.maskShow = !this.maskShow;         
      },
      close() {
          this.markText = "" //清空输入框
      },
      getId(id,mark) {
          this.indexId = id
          this.indexMark = mark
      },
      addActivity(){
        if(this.clickValue == true)//选定的时间符合
        {
          this.$router.push({
            path : '/newActivity', //路由跳转页面
            name : 'newActivity',
            query : {
              date : this.MonthAndDay
            }
          })
        }
        if(this.clickValue == false)//选定的时间符合
        {
          alert("过去的时间不能预约哦！");
        }
        
      },
      deleMessage() {        
        if(this.indexMark == this.markText) //如标识符匹配，传要删除的预约信息id给后端
        {
          const url = "39.108.0.22/api/store";
          this.$ajax
          .post(url, {
            id: this.indexId
          })
          .catch(err => {
              console.log(err);
          });
          alert("删除成功！")
          //关闭弹窗
          this.maskShow = !this.maskShow;
        }
        else
        {
          alert("请输入正确的标识！")          
        }
        this.markText = "" //清空输入框
      }
      
    },
  }
</script>
 
<style lang="less" scoped>
  #index{
    width:100%;
    background:url("../assets/BG.png") no-repeat left top;
    background-size:100% 100%;
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
  .all-btn {
    display: flex;
    background: url("../assets/all.png");
    float: right;
    width: 3rem;
    height: 1.3rem;
    margin:-4.5rem 0rem;
    background-size:100%;

  }
  .calendar-container{    
    overflow-y: scroll;
    transition: height 0.5s ease;
    margin:2rem 0;
    &::-webkit-scrollbar { //去除滚动条，设置滚动条的背景颜色为透明 
      background-color: transparent;
      display:none;
    }
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
        font-size:1.2rem;
        color:white;
        border-radius: 5rem;
        background:#48a2a1;
        height:2rem;
        width:2rem;
        display: block;
        line-height: 2rem;
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
    width:5rem;
    margin:-1rem 12rem;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
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
    height:16rem;
    overflow-y: scroll;
    // -webkit-overflow-scrolling: touch; //滚动流畅
    transition: height 0.5s ease;
     &::-webkit-scrollbar { //去除滚动条，设置滚动条的背景颜色为透明 
      background-color: transparent;
      display:none;
    }
    ul{
      line-height:2rem;
      margin:auto;
      width:95%;
      height:48.6%;
    }
    li{
      margin:0.2rem auto;
      width:100%;
      height:99%;
      box-shadow: 0.05rem 0.02rem 0.2rem 0.0rem #bec0c0;
    }
    p{
      font-size:1.3rem;
    }
  }
  #content,#date{
    font-size:1.5rem;
    font-weight:540; 
    color:#126964;
  }
  #place,#content-place{
    float:left; 
    margin:0rem 1.3rem;
  }
  .cBox{
    float:left;
    margin:1.5rem 2rem;
  }
  .time{
      float: right;
      margin:1.5rem 0rem;
  }
  #dele{
      float: right;
      width: 7%;
      height: 31%;
      margin:2.3rem 1.5rem;
      background: url("../assets/delelogo.png");
      background-size:100%;
  }
  #add{
    margin:0rem 0rem;
    display: flex;
    p{
      font-size:1.3rem;
    }   
  }
  .add-logo{
    background:url("../assets/add.png");
    height:3rem;
    width:3rem;
    background-size:98%;
    margin:auto;
  }
  #hidden-box{
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
    height:2.2rem;
    width:2.2rem;
    background-size:100%;
    float:right;
    margin:0rem 2rem;
  }
.dele-container{
    
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
    text-align:center;
    background:url("../assets/dele1.png") no-repeat;
    background-size:100%;
    position: fixed;
    width: 24rem;
    height: 24rem;
    line-height: 8rem;
    top: calc(50% - 9rem);
    left: calc(50% - 10.5rem);
}
.close-btn{
  background:url("../assets/delelogo2.png");
  background-size:97%;
  width: 1.8rem;
  height: 1.9rem;
  margin:3rem 3.6rem;
  float:right;
  outline:none;
}
.ID-text{
  text-align:center;
  width:15rem;
  height:3rem;
  background:white;
  border-radius:1.5rem;
  margin:0rem 3.5rem;
  display: flex;
  border:none;
  font-size:1.8rem;
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
  width:5rem;
  height:2rem;
  background:#126964;
  color:white;
  display: block;
  outline:none;
  border-radius:1.3rem;
  margin:3rem 8.7rem;
  text-align: center;
}
</style>