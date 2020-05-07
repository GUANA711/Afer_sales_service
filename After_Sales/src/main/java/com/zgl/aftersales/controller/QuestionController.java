package com.zgl.aftersales.controller;

import com.zgl.aftersales.dao.MyLog;
import com.zgl.aftersales.pojo.Question;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.List;

@CrossOrigin
@RestController   //控制器注解
public class QuestionController {
    @Qualifier("questionImpl")
    @Autowired
    QuestionService db;

    @RequestMapping("/web")  //路径注解
    public String web() {
        return "Hello Spring Boot!";   //显示文字内容
    }

    @MyLog(value = "添加问题到数据库")
    @PostMapping("/addQuestion")
    public int addQuestion(@RequestBody Question question) {
        return db.addQuestion(question);
    }

    @GetMapping("/checkQuestion")
    public Question checkQuestion(int Question_id) {
        return db.checkQuestion(Question_id);
    }



//    @GetMapping("/checkQuestionsubmited")
//    public List<Question> checkQuestionsubmited(Integer User_id) {
//        return db.checkQuestionsubmited(User_id);
//    }
//
//
//    @GetMapping("/checkQuestionfinished")
//    public List<Question> checkQuestionfinished(Integer User_id) {
//        return db.checkQuestionfinished(User_id);
//    }
//
//    @GetMapping("/checkQuestiondealing")
//    public List<Question> checkQuestiondealing(Integer User_id) {
//        return db.checkQuestiondealing(User_id);
//    }
//
//
//    @GetMapping("/checkPostMan")
//    public Users checkPostMan(int User_id) {
//        return db.checkPostMan(User_id);
//    }


    @GetMapping("/tsetin")
    public void testin(HttpServletRequest req){
        HttpSession session=req.getSession();
        session.setAttribute("userID","25");
        return;
    }

    @GetMapping("/tsetout")
    public String testout(HttpServletRequest req,String key) {
        String mess=(String)req.getSession().getAttribute(key);
        return mess;
    }



    @GetMapping("/checkQuestionsubmited")
    public List<Question> checkQuestionsubmited(HttpServletRequest req) {
        return db.checkQuestionsubmited(Integer.parseInt(req.getSession(false).getAttribute("userID").toString()));
    }


    @GetMapping("/checkQuestionfinished")
    public List<Question> checkQuestionfinished(HttpServletRequest req) {
        return db.checkQuestionfinished(Integer.parseInt(req.getSession(false).getAttribute("userID").toString()));
    }

    @GetMapping("/checkQuestiondealing")
    public List<Question> checkQuestiondealing(HttpServletRequest req) {
        return db.checkQuestiondealing(Integer.parseInt(req.getSession(false).getAttribute("userID").toString()));
    }


    @GetMapping("/checkPostMan")
    public Users checkPostMan(HttpServletRequest req) {
        return db.checkPostMan(Integer.parseInt(req.getSession(false).getAttribute("userID").toString()));
    }


    @MyLog(value = "修改数据库中用户")
    @GetMapping("/updateUser")
    public int updateUser(List<Users> list) {
        return db.updateUser(list);
    }
}
