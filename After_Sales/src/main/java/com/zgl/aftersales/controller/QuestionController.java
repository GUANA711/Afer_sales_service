package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.dao.MyLog;
import com.zgl.aftersales.pojo.*;
import com.zgl.aftersales.service.QuestionService;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringEscapeUtils;
import org.mybatis.logging.Logger;
import org.mybatis.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.sql.Blob;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public int addQuestion(@RequestBody JSONObject json,HttpServletRequest req) throws IOException {
        Question question = new Question();
        Date date=new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String date1=formatter.format(date).toString();
        System.out.println(formatter.format(date).toString());
        int User_id = (int) req.getSession(false).getAttribute("userID");

        question.setItem_id(json.getInteger("item_id"));
        //工具类，防sql注入
        question.setQuestion_detail(json.getString(StringEscapeUtils.escapeSql("question_detail")));



        question.setQuestion_status("unaccepted");
        question.setCommit_time(date1);
        question.setUser_id(User_id);
        question.setQuestion_type(json.getString(StringEscapeUtils.escapeSql("question_type")));


        try {
            db.addQuestion(question);
        }catch (Exception e){
            return 0;//插入失败
        }
        return 1;//插入成功
    }

    /**
     * jqw
     * 上传图片
     */
//    @PostMapping("/addImage")
//    public int addImage(@RequestBody List<Image> images) throws IOException {
//        try {
//             db.addImage(images);
//        }catch (Exception e){
//            return 0;//插入失败
//        }
//        return 1;//插入成功
//    }


    @PostMapping("/addImage")
    public int addImage(@RequestBody JSONObject json,HttpServletRequest req) throws IOException {
        try {
            Image image = new Image();
            image.setImageBlob(json.getString("ImageBlob"));
            db.addImage(image);
        }catch (Exception e){
            return 0;//插入失败
        }
        return 1;//插入成功
    }

    /**
     * jqw
     * 添加关联到image_question表
     */
    @PostMapping("/addImageQuestion")
    public int addImageQuestion(@RequestBody JSONObject json,HttpServletRequest req) throws IOException {
        Map<String, Integer> map=new HashMap<>();
        try {
            map.put("Image_id",json.getInteger("Image_id"));
            map.put("Question_id",json.getInteger("Question_id"));
            db.addImageQuestion(map);
        }catch (Exception e){
            return 0;//插入失败
        }
        return 1;//插入成功
    }



    /**
     * 查询图片
     */

    @GetMapping("/checkImages")
    public List<Image> checkImages(Integer Question_id) {
        return db.checkImages(Question_id);
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

    /**
     * 查找item是否存在
     */
    @GetMapping("/checkItemname")
    public List<Items> checkItemname(){
        return db.checkItemname();
    }

    @GetMapping("/checkItemId")
    public int checkItemId(@RequestParam (value = "item_id",required = false)Integer item_id){
        System.out.println(item_id);

        if(db.checkItemId(item_id)==0){
            return 0;//项目不存在
        }else {
            return 1;//项目存在
        }
    }

    /**
     * 模糊查找Faq
     */
    @GetMapping("/checkFaqs")
    public List<FAQs> checkFaqs(String faq_String){
        return db.checkFaqs(StringEscapeUtils.escapeSql(faq_String));
    }

}
