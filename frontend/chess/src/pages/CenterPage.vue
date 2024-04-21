<script setup>


import {onMounted} from "vue";
import axios from "axios";
import {UserInfoStore} from "../plugins/userInfo.js";

onMounted(()=>{
  axios({
    method:'get',
    url:'http://localhost:8080/Usercenter',
    params:{
      username:UserInfoStore.username,
      password:UserInfoStore.password
    }
  }).then((res)=>{

    let avatar= res.data.avatar
    let scores= res.data.scores
    UserInfoStore.setUserInfo(avatar,scores)

  })
})
</script>

<template>

  <div class="bg_center"></div>
  <div class="box">


    <div class="card mb-3" style="width: 18rem;">
      <div class="card-body" style="height: 300px" >
        <img :src="UserInfoStore.avatar" >
        <h5 class="card-title">用户名:{{UserInfoStore.username}}</h5>
        <p class="card-text"></p>
        <h1>分数:{{UserInfoStore.scores}}</h1>
      </div>
    </div>

  </div>


</template>

<style scoped>
.bg_center{
  position: fixed;

  width: 100%;
  height: 100%;

  background-image: url("../assets/user_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;

}
img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.box{
  //position: absolute;
  height: 300px;
  margin-left: 100px;
  margin-top: 50px;
}
.card{
  opacity: 0.6;
  background: aquamarine;
  color: orange;
}
</style>