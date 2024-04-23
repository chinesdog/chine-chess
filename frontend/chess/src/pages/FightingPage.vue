
<script setup>

import {useRouter} from "vue-router";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import {UserInfoStore} from "../plugins/userInfo.js";
import {draw} from "../logic/chessView.js";
import {onMounted, onUnmounted} from "vue";
import {test} from "../logic/test.js";
import {socketStore} from "../plugins/socketStore.js";


const myrouter=useRouter();


onMounted(()=>{
  draw()

})
onUnmounted(()=>{

})

</script>

<template>
  <div class="bg_main"></div>


 <canvas id="chess" style="margin-left: 200px; margin-top: 100px"></canvas>

</template>

<style scoped>

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