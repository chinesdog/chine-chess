package com.example.demo;

public class thread extends Thread{
    private String name;
    thread(String name){
        this.name=name;
    }

    @Override
    public void run() {
        boolean flag=vote.get_one();

        if(flag){
            System.out.println(this.name+"get a tickets");
        }
        else {
            System.out.println(this.name+"get nothing");
        }
    }
}
