package com.example.demo;

public class vote {
    public static int total=2;
    public static boolean get_one(){

        if(total>0){
            total--;

            return true;
        }
        return false;
    }
}
