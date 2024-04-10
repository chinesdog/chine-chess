package com.example.demo.entity;

import jakarta.persistence.*;

import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "photos", schema = "posts", catalog = "")
public class PhotosEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "username")
    private String username;
    @Basic
    @Column(name = "imgdata")
    private byte[] imgdata;

//    public PhotosEntity(String username) {
//        this.username = username;
//    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public byte[] getImgdata() {
        return imgdata;
    }

    public void setImgdata(byte[] imgdata) {
        this.imgdata = imgdata;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhotosEntity that = (PhotosEntity) o;
        return id == that.id && Objects.equals(username, that.username) && Arrays.equals(imgdata, that.imgdata);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, username);
        result = 31 * result + Arrays.hashCode(imgdata);
        return result;
    }
}
