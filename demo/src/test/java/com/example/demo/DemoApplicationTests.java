package com.example.demo;



import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.util.ArrayList;
import java.util.List;


class DemoApplicationTests {


	public static List<Thread>list;

	public static void main(String[] args) {
		list=new ArrayList<>();
		for(int i=0;i<=15;i++){
			list.add(new thread("he"+String.valueOf(i)));
		}
		for(int i=0;i<=15;i++){
			list.get(i).start();
		}
		try {
			Thread.sleep(2000);
			System.out.println("剩余的票数" +vote.total);
		}catch (InterruptedException e){
			e.printStackTrace();
		}


	}

}
