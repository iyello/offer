<template>
  <div class="list">
    <h1>{{message}}</h1>
    <!--输入框中输入的内容，enter后添加到列表中-->
    <input v-model="newItem"  v-on:keyup.enter="addNew">
    <ol>
      <!--遍历初li列表内容-->
      <!-- <li v-for="item in items"> -->
        {{item.value}}
      <!-- </li> -->
    </ol>
    <router-link to="/Bar">go Bar</router-link>
  </div>
</template>
<script>
//  引入store来进行存储itms
  // import store from '@/router/store'
  export default {
    name: 'list',
    data:function(){
      return {
        message: 'this is a work list',
        items:[
          {value:'coding'},
          ],
        newItem:''
      }
    },
    watch:{
      items:{
        handler:function (items) {
            store.save(items)
        },
      }
    },
    methods:{
      addNew:function(){
          this.items.push({
            value:this.newItem
          });
//          输入按enter后，清空输入框
        this.newItem=''
      }
    }
  }
</script>
<style scoped>
  input{
    width: 250px;
    height: 20px;
  }
  .list{
    width: 300px;
    height: 300px;
    background-color: #42b983;
    margin: 0 auto;
  }
  h1{
    font-size:30px;
    color: #ffd02d;
  }
</style>
