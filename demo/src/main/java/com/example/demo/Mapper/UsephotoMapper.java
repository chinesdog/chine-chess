package com.example.demo.Mapper;

import com.example.demo.entity.PhotosEntity;
import com.example.demo.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface UsephotoMapper extends JpaRepository<PhotosEntity,Long> {
    @Query("select u from PhotosEntity u where u.username=:username ")
    public PhotosEntity getPhoto(String username);
    @Transactional
    @Modifying
    @Query(value = "update photos set photos.imgdata=:a where  photos.username=:username ",nativeQuery = true)
    public void updatePhotos(byte[]a,String username);

}
