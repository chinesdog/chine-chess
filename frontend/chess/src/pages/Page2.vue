
<script setup>
  import {useRouter} from "vue-router";
  import {onMounted} from "vue";
  import axios from "axios";
  import {ref} from "vue";
  import  {UserInfoStore} from "../plugins/userInfo.js";

  const router=useRouter();
  function gotoHome(){
    router.push("/Page1")
  }
  let imgurl=ref("#")
  onMounted(()=>{
    axios({
      method:'get',
      url:'http://localhost:8080/Usercenter',
      params:{
        username:UserInfoStore.username,
        password:UserInfoStore.password
      }
    }).then((res)=>{

      UserInfoStore.avatar=res.data
      console.log(UserInfoStore.avatar)
    })
  })


</script>

<template>
  <h1>页面2</h1>
  <button @click="gotoHome">主页</button>
<img :src="UserInfoStore.avatar">

</template>

<style scoped>

</style>
