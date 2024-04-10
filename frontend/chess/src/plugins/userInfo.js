import  {reactive} from "vue";
export  const UserInfoStore=reactive({
    username:'',
    password:'',
    avatar:'#',
    scores:'',

    storeLoginInfo(username,password,avatar){
        this.password=password;
        this.username=username;
        // this.avatar=avatar;
    }
})