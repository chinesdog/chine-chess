<script setup>
import {UserInfoStore} from "../plugins/userInfo.js";
import {useRouter} from "vue-router";
import axios from "axios";

let username;
  let password;
  const myrouter=useRouter();
  function  login(){

    UserInfoStore.storeLoginInfo(username,password)



    axios({
      method:'post',
      url:'http://localhost:8080/login',
      params:{
        username:UserInfoStore.username,
        password:UserInfoStore.password
      }
    }).then((res)=>{
      if(res.data==="success"){
        UserInfoStore.login()
        myrouter.push("/Match")
      }
      else {
        window.alert("密码错误")
      }
    })




  }
</script>

<template >
  <div class="bg_login"></div>



  <div class="container card" id="login" style="width:300px ;"  v-if="UserInfoStore.islogin===false">
    <div class="card-body" method="post">
      <div class="mb-3">
        <label for="text1" class="form-label">用户名</label>
        <input type="text" class="form-control" name="username" required v-model="username" maxlength="15">

      </div>
      <div class="mb-3">
        <label for="Password1" class="form-label">密码</label>
        <input type="password" class="form-control"  name="password" required v-model="password" maxlength="15">
      </div>

      <div class="mb-3">
        <input type="submit" class=" btn btn-primary" value="登录" @click="login">
      </div>


    </div>
  </div>




</template>

<style scoped>
.bg_login{
  position: fixed;

  width: 100%;
  height: 100%;

  background-image: url("../assets/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;

}
.card{
  top: 100px;
}
</style>