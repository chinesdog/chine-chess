import  {reactive} from "vue";
import {Prepare,Match,Fight} from "../logic/status.js";

export  const socketStore=reactive({
    status:Prepare,
    socket:null,
    opponent:'',
    opponent_avatar:'../img/unknown.png',
    direction:'',
    isConnected:false,
    solid_timer:null,
    isMatching:false,
    setInfo(socket,opponent='',opponent_avatar=''){
        this.socket=socket
        this.opponent=opponent
        this.opponent_avatar=opponent_avatar
    }
})