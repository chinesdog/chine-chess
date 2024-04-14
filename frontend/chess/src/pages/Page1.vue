
<script setup>

import {useRouter} from "vue-router";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import {UserInfoStore} from "../plugins/userInfo.js";
import {draw} from "../logic/chessView.js";
import {onMounted} from "vue";
import {test} from "../logic/test.js";


const myrouter=useRouter();
function gotoSecond(){
  myrouter.push("/Page2")
}

onMounted(()=>{
  draw()
  // test()
})


</script>

<template>

<div class="row-cols-3">ada</div>
<canvas id="chess" style="margin-left: 200px"></canvas>

</template>

<style scoped>

#chess{
.box{


}
  #chess{
    display: block;
    margin-left: 100px;
  }
}
</style>