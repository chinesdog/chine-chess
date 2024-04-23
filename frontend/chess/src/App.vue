<script setup>

import {useRouter} from "vue-router";
import {UserInfoStore} from "./plugins/userInfo.js";
import {socketStore} from "./plugins/socketStore.js";
import {Prepare} from "./logic/status.js";

let myrouter=useRouter()

function cancelConnect(){
  if(socketStore.isConnected==true){
    if(socketStore.isMatching==true){
      window.clearInterval(socketStore.solid_timer)
    }
    socketStore.status=Prepare
    socketStore.isConnected=false
    socketStore.socket.close()
    socketStore.opponent=''
    socketStore.opponent_avatar='../img/unknown.png'
    socketStore.isMatching=false
  }
}
function match(){
  cancelConnect()
  myrouter.push("/Match")
}
function login(){
  cancelConnect()
  myrouter.push("/")
}
function user(){
  cancelConnect()
  myrouter.push("Center")
}
function rank(){
  cancelConnect()
  myrouter.push("Rank")
}

</script>

<template>

    <ul class="nav nav-tabs" >
      <li class="nav-item">
        <a class="nav-link "  @click="match" href="#">匹配</a>
      </li>
      <li class="nav-item">
        <a class="nav-link " @click="user"  href="#">个人界面</a>
        <!--      <a class="nav-link" href="#">Link</a>-->
      </li>
      <li class="nav-item">
        <a class="nav-link "  @click="rank" href="#">排行榜</a>
        <!--      <a class="nav-link" href="#">Link</a>-->
      </li>
      <li class="nav-item">
        <a class="nav-link "  @click="login" href="#">登录</a>
        <!--      <a class="nav-link" href="#">Link</a>-->
      </li>

    </ul>


  <router-view></router-view>
</template>

<style scoped>

</style>
