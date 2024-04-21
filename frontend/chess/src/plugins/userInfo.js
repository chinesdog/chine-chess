import  {reactive} from "vue";


// 调试模式下，自动登录
export  const UserInfoStore=reactive({
    username:'',
    password:'',
    avatar:'#',
    scores:'',
    islogin:false,
    storeLoginInfo(username,password,avatar){
        this.password=password;
        this.username=username;
        // this.avatar=avatar;
    },
    setUserInfo(avatar,scores){
      this.avatar=avatar
      this.scores=scores
    },
    login(){
        this.islogin=true
    },
    logout(){
      this.islogin=false
    }

})