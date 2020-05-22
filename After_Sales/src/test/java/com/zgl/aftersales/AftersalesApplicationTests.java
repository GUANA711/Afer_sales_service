package com.zgl.aftersales;

import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;
import com.zgl.aftersales.pojo.FAQs;
import com.zgl.aftersales.pojo.Items;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.*;
import com.zgl.aftersales.utiles.DesDecodeUtiles;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.apache.commons.lang.StringEscapeUtils;
import javax.sql.DataSource;
import java.sql.SQLException;
import java.text.ParseException;
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
    void dateShow(){
        Date date=new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println(formatter.format(date).toString());

    }
    @Test
    void dateDiff() throws ParseException {
        SimpleDateFormat simpleFormat = new SimpleDateFormat("yyyy-MM-dd");
        /*天数差*/
        String date="2018-03-01";
        Date fromDate1 = simpleFormat.parse(date);
        Date toDate1 = simpleFormat.parse("2018-04-12");
        long from1 = fromDate1.getTime();
        long to1 = toDate1.getTime();
        int days = (int) ((to1 - from1) / (1000 * 60 * 60 * 24));
        System.out.println("两个时间之间的天数差为：" + days);

    }

    @Test
    @Autowired

    void showallItems(){
        Map<String,Object> map=new HashMap<>();
        map.put("currIndex",1);
        map.put("pageSize",2);
       List<List<?>> lists= itemsService.selectAllItems(map);
        System.out.println(lists);
    }

    @Test
    void selectRoles(){
           List<String> list= userService.showRolesByUserID(25);
        System.out.println(list);
    }
    @Test
    void showuser(){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",1);
        map.put("pageSize",2);

        List<List<?>> lists=userService.showUser(map);
        System.out.println(lists);
    }
    @Autowired
    QuestionService questionService;

    @Test
    public void showWorker(){
        List<?> list=userService.showWorker();
        System.out.println(list);
    }

    @Test
    public void SqlEscapeExample() {

            String userName = "1' or '1'='1";
            String password = "123456;";
            userName = StringEscapeUtils.escapeSql(userName);
            password = StringEscapeUtils.escapeSql(password);
            System.out.println(userName+" "+password);

    }

}
