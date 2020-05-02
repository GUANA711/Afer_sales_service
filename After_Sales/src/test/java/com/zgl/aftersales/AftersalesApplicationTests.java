package com.zgl.aftersales;

import com.zgl.aftersales.pojo.FAQs;
import com.zgl.aftersales.pojo.Items;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.*;
import com.zgl.aftersales.utiles.DesDecodeUtiles;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

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

    @Test
    void addFAQ(){
        FAQs faQs=new FAQs();
        faQs.setFaq_question("question");
        faQs.setFaq_answer("answer");
        faqService.addFAQ(faQs);
        System.out.println(faQs);
    }


    @Autowired
    WorkerService workerService;
    @Test
    void worker_selectBy_Session_UserId() {
        DesDecodeUtiles desDecodeUtiles=new DesDecodeUtiles();
        int userID=47;
        Users user = workerService.worker_selectBy_Session_UserId(userID);
        //密码解密之后输出
        user.setPassword(desDecodeUtiles.getDecryptString(user.getPassword()));

        System.out.println(user);
    }

    @Test
    void worker_updateBy_Session_UserId() {
        DesDecodeUtiles desDecodeUtiles=new DesDecodeUtiles();
        //需要传一个map
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("User_name","wx2");
        map.put("Password",desDecodeUtiles.getEncryptString("1234"));
        map.put("Tel","17181561429");
        map.put("Email","3428986827@qq.com");
        map.put("User_id","47");

        workerService.worker_updateBy_Session_UserId(map);
        System.out.println(map);
    }
    @Autowired
    ItemsService itemsService;
    @Test
    void itme_selectall() {


        List<Items> itemsList = itemsService.selectAllItems();
        for (Items item : itemsList) {
            System.out.println(item);

        }
    }

    @Test
    void fuzzyQuery(){
        List<Items> itemsList=itemsService.fuzzyQuery("2");
        for (Items item : itemsList) {
            System.out.println(item);

        }
    }
    @Test
    void dateShow(){
        Date date=new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println(formatter.format(date).toString());

    }

}
