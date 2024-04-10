package com.example.demo.Mapper;

import com.example.demo.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UseUserMapper extends JpaRepository <UserEntity,Long>{
    @Query("select u from UserEntity u where u.username=:username ")
    public UserEntity getUserInfo(String username);
}
