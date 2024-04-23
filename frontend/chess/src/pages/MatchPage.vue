<script setup>
import {socketStore} from "../plugins/socketStore.js";
import axios from "axios";
import {UserInfoStore} from "../plugins/userInfo.js";
import {useRouter} from "vue-router";
import {onMounted, onUnmounted, Static} from "vue";
import {Match,Fight,Prepare} from "../logic/status.js";
import {delay} from "../logic/delay.js";

let myroute=useRouter();;
function connect(){



  let socket =new WebSocket(`ws://localhost:8080/websocket/${UserInfoStore.username}&${UserInfoStore.password}`)
  socketStore.setInfo(socket)

  socket.onopen=function (){
    console.log("连接")
  }
  socket.onclose=function (){
    console.log("断开连接")
  }
  socket.onmessage=function (msg) {


    const data = JSON.parse(msg.data);
    if (data.event === "ok") {
      socketStore.opponent = data.opponent;
      socketStore.opponent_avatar = data.opponent_avatar;
      socketStore.status = Fight
      socketStore.isMatching=false;
      window.clearInterval(socketStore.solid_timer)
      setTimeout(() => {
        myroute.push("Fight")
      }, 2000)
    }
  }
}

function match(){
  connect()
  socketStore.isConnected=true;
  socketStore.isMatching=true
  socketStore.status=Match
  socketStore.solid_timer=window.setInterval(sendmessage,2000)
}
function sendmessage(){
  console.log(socketStore.status)
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
    <button    v-if="socketStore.status===Prepare" @click="match" type="button" class="btn btn-warning col-4">匹配</button>
    <button  v-if="socketStore.status===Match" type="button" class="btn btn-success col-4">匹配中</button>
    <button  v-if="socketStore.status===Fight" type="button" class="btn btn-success col-4">匹配成功</button>
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
.bg_main{
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("../assets/main_bg.jpg");
  background-repeat: no-repeat;
  z-index: -1;
}
</style>