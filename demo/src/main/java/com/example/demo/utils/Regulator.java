package com.example.demo.utils;

import com.example.demo.Controller.WebSocketServer;

public class Regulator extends Thread{
    private int count=0;
    WebSocketServer server1;
    WebSocketServer server2;
    public boolean exit;
    public Regulator(WebSocketServer server1 ,WebSocketServer server2){
        this.server1=server1;
        this.server2=server2;
    }
    @Override
    public void run() {
        exit=false;
        while(exit==false){
            count+=1;
//            System.out.println(count+":"+server1.Username);
            System.out.println(count);
            try{
                Thread.sleep(200);
            }catch (InterruptedException e){
                e.printStackTrace();
            }
        }
        System.out.println("执行完毕");
    }

    public static void main(String[] args) {
//        Regulator regulator= new Regulator();
//        regulator.start();
//        try{
//            Thread.sleep(3000);
//            regulator.exit=true;
//        }catch (InterruptedException e){
//            e.printStackTrace();
//        }


    }
}
