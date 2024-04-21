package com.example.demo.wrapper;

public class UserWrapper {
    private String avatar;
    private int scores;

    public String getAvatar() {
        return avatar;
    }

    public UserWrapper(String avatar, int scores) {
        this.avatar = avatar;
        this.scores = scores;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public int getScores() {
        return scores;
    }

    public void setScores(int scores) {
        this.scores = scores;
    }

    @Override
    public String toString() {
        return "UserWrapper{" +
                "avatar='" + avatar + '\'' +
                ", scores=" + scores +
                '}';
    }
}
