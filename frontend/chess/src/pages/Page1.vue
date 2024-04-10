
<script setup>

import {useRouter} from "vue-router";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import {UserInfoStore} from "../plugins/userInfo.js";
import {draw} from "../logic/chessView.js";
import {onMounted} from "vue";


const myrouter=useRouter();
function gotoSecond(){
  myrouter.push("/Page2")
}

onMounted(()=>{
  draw()
})


</script>

<template>

<!--  <div class="mybtn"><button @click="gotoSecond" type="button" class="btn btn-success">下一页</button></div>-->
<!-- <div class="Chessboard">-->
<!--   <img class="chess" src="../img/stype_2/b_c.png">-->
<!--   <img class="chess" src="../img/stype_2/b_c.png">-->
<!--   <img class="chess" src="../img/stype_2/b_c.png">-->

<!-- </div>-->
<!--  <img src="../img/stype_2/bg.png">-->

<canvas id="chess" width="800px" height="400px" ></canvas>
</template>

<style scoped>
.Chessboard{
  background-image: url("../img/stype_2/bg.png");
  background-repeat: no-repeat;


}
.chess{
  width: 57px;
}
</style>