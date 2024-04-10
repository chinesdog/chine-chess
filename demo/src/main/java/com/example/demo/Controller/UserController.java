package com.example.demo.Controller;

import com.example.demo.Mapper.UseUserMapper;
import com.example.demo.Mapper.UsephotoMapper;
import com.example.demo.entity.PhotosEntity;
import com.example.demo.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    UseUserMapper userMapper;
    @Autowired
    UsephotoMapper usephotoMapper;
    long maxlen=60*1024;
    @PostMapping("/login")
    public String Login(String username,String password){

        if(checkPassword(username,password)){
            return "success";
        }
        return "fail";

    }

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file,
                              @RequestParam("username") String username,
                              @RequestParam("password") String password){

        if(checkPassword(username,password)){
            try {

                if(file.isEmpty()==false&&file.getSize()<maxlen){

                    usephotoMapper.updatePhotos(file.getBytes(),username);
                    return "success";
                }
                else {
                    return "保存失败";
                }


            }catch (IOException e){
                e.printStackTrace();
            }

        }


        return "保存失败";
    }


    @GetMapping("/Usercenter")
    public String getUserInfo(String username,String password){
        if(checkPassword(username,password)){
            UserEntity a=userMapper.getUserInfo(username);
            String res=a.getAvatar();
            return res;
        }
        return null;
    }

    @PostMapping("/register")
    public String register(String username,String password){
        if(userMapper.getUserInfo(username)==null){
            UserEntity a=new UserEntity();
            a.setPassword(password);
            a.setUsername(username);
            userMapper.save(a);
        }
        return "success";
    }


    public boolean checkPassword(String username,String password){

        UserEntity a=userMapper.getUserInfo(username);
        if(a!=null){
            if(a.getPassword().equals(password)) return true;
        }
        return false;
    }


}
