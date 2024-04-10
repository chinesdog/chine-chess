package com.example.demo;


import com.example.demo.utils.CustomFileReader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;

@SpringBootTest

class DemoApplicationTests {

	@Autowired
	private UserMapper userMapper;
	@Autowired
	private PostFavourMapper postFavourMapper;
	@Autowired
	private PostThumbMapper postThumbMapper;
	@Autowired
	private PostMapper postMapper;

	@Test
	public  void test() {
		String baseurl="D:\\JAVA\\智慧司法\\demo\\src\\main\\resources\\static\\txt_utf";
		File file=new File(baseurl);
		File []afile=file.listFiles();

		for(File item: afile){
			PostEntity entity=new PostEntity();
			String filename=item.getName().split("[.]")[0];
			postMapper.saveBooks(filename,"无","贷款",66);

		}
    }

}
