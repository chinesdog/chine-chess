package com.example.demo.Controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UseUserMapper;
import com.example.demo.entity.UserEntity;
import com.example.demo.utils.RELATIONS;
import com.example.demo.utils.Regulator;
import com.example.demo.utils.STATUS;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@ServerEndpoint("/websocket/{token}")
public class WebSocketServer {
    private  Session session;
    private static UseUserMapper userMapper;
    public String Username;

    public  String Status= STATUS.Prepare;

    public  String Opponents;

    public String Relations;
    public Regulator regulator;
    public static ConcurrentHashMap<String,WebSocketServer>Manager=new ConcurrentHashMap<>();
    @Autowired
    public void setUserMapper(UseUserMapper userMapper){
        WebSocketServer.userMapper=userMapper;
    }

    public  void switchStatus(String newstatus){
        synchronized(this.Status){
            this.Status=newstatus;
        }
    }
    @OnOpen
    public void onOpen(Session session, @PathParam("token") String token){
        try {
            String [] users=token.split("&");
            boolean conneted=false;

            if(users.length>=2){
                conneted= checkPassword(users[0],users[1]);
            }

            if(conneted==false){
                session.close();
                return;
            }

            Manager.put(users[0],this);
            Username=users[0];
            this.session=session;

        }catch (Exception e){
            e.printStackTrace();
        }
    }
    public boolean checkPassword(String username,String password){
        if(userMapper==null){
            System.out.println("null");
            return false;
        }
        UserEntity a=userMapper.getUserInfo(username);
        if(a!=null){
            if(a.getPassword().equals(password)) return true;
        }
        return false;
    }

    String getUserAvartarByName(String username){
        UserEntity a=userMapper.getUserInfo(username);
        return a.getAvatar();
    }
    @OnClose
    public void onClose(){
        if(this.Username!=null){
            Manager.remove(this.Username);
        }
        if(this.regulator!=null){
//            this.regulator.
        }
    }

    @OnMessage
    public void onMessage(String message,Session session){

        JSONObject data=JSONObject.parseObject(message);
        String event=data.getString("event");
        if(event.equals(STATUS.Match)){
            this.Status=STATUS.Match;
            StartMatching();
        }



    }
//    int cnt=0;
    public void tellMatch(WebSocketServer socket){

        socket.Status=STATUS.Fight;
        socket.Opponents=this.Username;
        String avatar=getUserAvartarByName(this.Username);
        JSONObject resp=new JSONObject();
        resp.put("event","ok");
        resp.put("opponent",this.Username);
        resp.put("opponent_avatar",avatar);
        try{
            socket.session.getBasicRemote().sendText(resp.toJSONString());
        }catch (IOException e){
            e.printStackTrace();
        }
//        设置两个连接的关系。只有属于主要的，才分配有资源
        this.Relations= RELATIONS.Dominate;
        socket.Relations=RELATIONS.Belongs;
//        this.regulator=new Regulator(this,socket);
//        this.regulator.start();
//        this.session.getBasicRemote().sendText(resp.toJSONString());
    }
    public void StartMatching(){
        synchronized (this.session){
            if(this.Status.equals(STATUS.Match)==false)return;
            try{
                for(Map.Entry<String,WebSocketServer> entry: Manager.entrySet()){
                    WebSocketServer opponent=entry.getValue();
                    if(opponent.Status.equals(STATUS.Match) && opponent.Username.equals(this.Username)==false){

                        this.Opponents= opponent.Username;
                        this.Status=STATUS.Fight;
                        String avatar=getUserAvartarByName(opponent.Username);
                        JSONObject resp=new JSONObject();
                        resp.put("event","ok");
                        resp.put("opponent",this.Opponents);
                        resp.put("opponent_avatar",avatar);
                        tellMatch(opponent);
                        this.session.getBasicRemote().sendText(resp.toJSONString());
                    }
                }


            }catch (IOException e){
                e.printStackTrace();
            }
        }
    }
    @OnError
    public void onError(Session session,Throwable error){
        error.printStackTrace();
    }

}
