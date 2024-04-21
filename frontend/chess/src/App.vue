<script setup>

import {useRouter} from "vue-router";
import {UserInfoStore} from "./plugins/userInfo.js";

let myrouter=useRouter()
function match(){
  myrouter.push("/Match")
}
function login(){
  myrouter.push("/")
}
function user(){
  myrouter.push("Center")
}
function rank(){
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
