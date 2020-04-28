package com.zgl.aftersales.controller;

import com.zgl.aftersales.pojo.Question;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController   //控制器注解
public class QuestionController {
    @Qualifier("questionImpl")
    @Autowired
    QuestionService db;
    @RequestMapping("/web")  //路径注解
    public String web(){
        return  "Hello Spring Boot!";   //显示文字内容
    }
    @PostMapping("/addQuestion")
    public int addQuestion(@RequestBody Question question) {
        return db.addQuestion(question);
    }

    @GetMapping("/checkQuestion")
    public Question checkQuestion(int Question_id){
        return db.checkQuestion(Question_id);
    }



    @GetMapping("/checkPostMan")
    public Users checkPostMan(int User_id){
        return db.checkPostMan(User_id);
    }

//    @GetMapping("/DeleteUser")
//    public int DeleteUser(int User_id){
//        return db.DeleteUser(User_id);
//    }

    @GetMapping("/updateUser")
    public int updateUser(@RequestBody List<Users> list){
        return db.updateUser(list);
    }






}
