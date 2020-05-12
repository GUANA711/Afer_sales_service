package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.dao.MyLog;
import com.zgl.aftersales.pojo.Question;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController   //控制器注解
@RequestMapping(value ="/question")
@Slf4j
@ResponseBody

/**
 * 问题处理类（增、查）
 * @author jqw
 */
public class QuestionController {
    @Qualifier("questionImpl")
    @Autowired
    QuestionService db;

    /**
     * 添加问题
     * @param json
     * @return
     */
    @MyLog(value = "添加问题到数据库")
    @PostMapping("/addQuestion")
    public int addQuestion(@RequestBody JSONObject json,HttpServletRequest req) {
        Question question = new Question();
        Date date=new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String date1=formatter.format(date).toString();
        System.out.println(formatter.format(date).toString());

        int User_id = (int) req.getSession(false).getAttribute("userID");

        question.setItem_id(json.getInteger("item_id"));
        question.setQuestion_detail(json.getString("question_detail"));
        question.setQuestion_status("unaccepted");
        question.setCommit_time(date1);
        question.setUser_id(User_id);
        question.setQuestion_type(json.getString("question_type"));

        try {
            db.addQuestion(question);
        }catch (Exception e){
            return 0;//插入失败
        }
        return 1;//插入成功
    }


    /**
     * 查询已提交的问题问题
     * 问题status：unaccepted
     */
    @GetMapping("/checkQuestionsubmited")
    public List<Question> checkQuestionsubmited(HttpServletRequest req) {
        return db.checkQuestionsubmited(Integer.parseInt(req.getSession(false).getAttribute("userID").toString()));
    }

    /**
     * 查询已处理完成的问题问题
     * 问题status：done
     */
    @GetMapping("/checkQuestionfinished")
    public List<Question> checkQuestionfinished(HttpServletRequest req) {
        return db.checkQuestionfinished(Integer.parseInt(req.getSession(false).getAttribute("userID").toString()));
    }

    /**
     * 查询正在处理的问题问题
     * 问题status：accepted
     */
    @GetMapping("/checkQuestiondealing")
    public List<Question> checkQuestiondealing(HttpServletRequest req) {
        return db.checkQuestiondealing(Integer.parseInt(req.getSession(false).getAttribute("userID").toString()));
    }


    /**
     * 查询用户个人信息
     */
    @GetMapping("/checkPostMan")
    public Users checkPostMan(HttpServletRequest req) {
        return db.checkPostMan(Integer.parseInt(req.getSession(false).getAttribute("userID").toString()));
    }


}
