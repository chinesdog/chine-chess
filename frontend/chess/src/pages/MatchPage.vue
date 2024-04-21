<script setup>
import {socketStore} from "../plugins/socketStore.js";
import axios from "axios";
import {UserInfoStore} from "../plugins/userInfo.js";
import {useRouter} from "vue-router";
import {onMounted, onUnmounted} from "vue";
import {Match,Fight,Prepare} from "../logic/status.js";

let myroute=useRouter();
let time;
onMounted(()=>{
  let socket =new WebSocket(`ws://localhost:8080/websocket/${UserInfoStore.username}&${UserInfoStore.password}`)
  socketStore.setInfo(socket)

  socket.onopen=function (){
    console.log("连接")
  }
  socket.onclose=function (){
    console.log("断开连接")
  }
  socket.onmessage=function (msg){

    window.clearInterval(time)
    const data=JSON.parse(msg.data);
    console.log(data.event)
  }
  socketStore.status=Prepare
})
onUnmounted(()=>{

  socketStore.socket.close();
})
function match(){
  socketStore.status=Match
  time=window.setInterval(sendmessage,2000)
}
function sendmessage(){
  socketStore.socket.send(JSON.stringify({
    event:socketStore.status
  }))
}


</script>

<template>
<div class="bg_match"></div>


  <div class="row box" style="margin-top: 50px">
    <div class="col-6 photo">
      <img :src="UserInfoStore.avatar" >
    </div>
    <div class="col-6 photo">
      <img v-if="socketStore.opponent=='' " src="../img/unknown.png" >
      <img v-else :src="socketStore.opponent_avatar">
    </div>
  </div>
  <div class="row box">
    <div class="col-6 box1">
      <h1>{{UserInfoStore.username}}</h1>
    </div>
    <div class="col-6 box2">
      <h1>{{socketStore.opponent}}</h1>
    </div>
  </div>
  <div class="row box">
    <button  v-if="socketStore.status===Prepare" @click="match" type="button" class="btn btn-warning col-4">匹配</button>
    <button  v-if="socketStore.status===Match" type="button" class="btn btn-success col-4">匹配中</button>
  </div>





</template>

<style scoped>
.bg_match{
  position: fixed;

  width: 100%;
  height: 100%;

  background-image: url("../assets/match_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  z-index: -1;

}
.box{
  margin-left: 25%;
  margin-right: 25%;

}

.photo{

  height: 300px;
  //background: white;
}
img{
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>