package com.zgl.aftersales;

import com.zgl.aftersales.pojo.FAQs;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.FAQService;
import com.zgl.aftersales.service.UserService;
import com.zgl.aftersales.service.WorkerService;
import com.zgl.aftersales.utiles.DesDecodeUtiles;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest
class AftersalesApplicationTests {
   @Autowired
    DataSource dataSource;

    @Test
    void contextLoads() throws SQLException {
        System.out.println(dataSource.getClass());
        System.out.println(dataSource.getConnection());
    }

    @Autowired
    UserService userService;
    @Test
    void addUser(){
        Users user=new Users();
        user.setUser_name("wx1");
        user.setPassword("123");
        user.setEmail("979563197@qq.com");
        user.setTask_num(0);
        user.setTel("2304153");
        userService.addUser(user);
    }

    @Test
    void selectByUsername(){
        String username="zgl";
        Users user=userService.selectByUsername(username);
        System.out.println(user);
    }

    @Autowired
    FAQService faqService;
    @Test
    void selectAllFAQ(){
        List<FAQs> faQs= faqService.selectAllFAQ();

        System.out.println(faQs);
    }

    @Autowired
    WorkerService workerService;
    @Test
    void worker_selectByUsername() {
        DesDecodeUtiles desDecodeUtiles=new DesDecodeUtiles();
        String username = "ctt";
        Users user = userService.selectByUsername(username);
        //密码解密之后输出
        user.setPassword(desDecodeUtiles.getDecryptString(user.getPassword()));

        System.out.println(user);
    }

    @Test
    void worker_updateByUsername() {
        DesDecodeUtiles desDecodeUtiles=new DesDecodeUtiles();
        //需要传一个map
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("User_name","wx2");
        map.put("Password",desDecodeUtiles.getEncryptString("1234"));
        map.put("Tel","17181561429");
        map.put("Email","3428986827@qq.com");
        map.put("User_id","47");

        workerService.worker_updateByUsername(map);
        System.out.println(map);
    }
}
