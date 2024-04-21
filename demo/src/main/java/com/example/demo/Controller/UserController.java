package com.example.demo.Controller;

import com.example.demo.Mapper.UseUserMapper;
import com.example.demo.Mapper.UsephotoMapper;
import com.example.demo.entity.PhotosEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.wrapper.UserWrapper;
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


    @GetMapping("/Usercenter")
    public UserWrapper getUserInfo(String username, String password){

        if(checkPassword(username,password)){
            UserEntity a=userMapper.getUserInfo(username);
            UserWrapper res=new UserWrapper(a.getAvatar(),a.getScores());
            return res;
        }
        return null;
    }




    public boolean checkPassword(String username,String password){

        UserEntity a=userMapper.getUserInfo(username);
        if(a!=null){
            if(a.getPassword().equals(password)) return true;
        }
        return false;
    }


}
