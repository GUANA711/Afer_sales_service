package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.dao.MyLog;
import com.zgl.aftersales.pojo.*;
import com.zgl.aftersales.service.QuestionService;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.RequestContext;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.mybatis.logging.Logger;
import org.mybatis.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.sql.Blob;
import java.text.SimpleDateFormat;
import java.util.*;

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
        return question.getQuestion_id();//插入成功
    }

    /**
     * jqw
     * 上传图片
     */

//    @PostMapping("/addImage")
//    public int addImage(@RequestBody JSONObject json, HttpServletRequest req, HttpServletResponse resp) throws IOException {
//        try {
//            Image image = new Image();
//            image.setImageBlob(json.getBytes("ImageBlob"));
//            db.addImage(image);
//        }catch (Exception e){
//            return 0;//插入失败
//        }
//        return 1;//插入成功
//    }

//    @RequestMapping("/addImage")
//    @ResponseBody
//    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
//        if (!file.isEmpty()) {
//            try {
//                /*
//                 * 这段代码执行完毕之后，图片上传到了工程的跟路径； 大家自己扩散下思维，如果我们想把图片上传到
//                 * d:/files大家是否能实现呢？ 等等;
//                 * 这里只是简单一个例子,请自行参考，融入到实际中可能需要大家自己做一些思考，比如： 1、文件路径； 2、文件名；
//                 * 3、文件格式; 4、文件大小的限制;
//                 */
//                BufferedOutputStream out = new BufferedOutputStream(
//                        new FileOutputStream(new File(file.getOriginalFilename())));
//                System.out.println(file.getName());
//                out.write(file.getBytes());
//                Image image = new Image();
//                image.setImageBlob(file.getBytes());
//                db.addImage(image);
//                out.flush();
//                out.close();
//            } catch (FileNotFoundException e) {
//                e.printStackTrace();
//                return "上传失败," + e.getMessage();
//            } catch (IOException e) {
//                e.printStackTrace();
//                return "上传失败," + e.getMessage();
//            }
//
//            return "上传成功";
//
//        } else {
//            return "上传失败，因为文件是空的.";
//        }
//    }

    @RequestMapping(value = "/addImage", method = RequestMethod.POST)
    @ResponseBody
    public String handleFileUpload(HttpServletRequest req) {
        MultipartHttpServletRequest params=((MultipartHttpServletRequest) req);
        List<MultipartFile> files = ((MultipartHttpServletRequest) req)
                .getFiles("files");
        String name=params.getParameter("name");
        System.out.println("name:"+name);
        String id=params.getParameter("id");
        System.out.println("id:"+id);
        MultipartFile file = null;
        BufferedOutputStream stream = null;
        for (int i = 0; i < files.size(); ++i) {
            file = files.get(i);
            if (!file.isEmpty()) {
                try {
                    byte[] bytes = file.getBytes();
                    Image image = new Image();
                    image.setImageBlob(file.getBytes());
                    db.addImage(image);
                    stream = new BufferedOutputStream(new FileOutputStream(
                            new File(file.getOriginalFilename())));
                    stream.write(bytes);
                    stream.close();
                } catch (Exception e) {
                    stream = null;
                    return "You failed to upload " + i + " => "
                            + e.getMessage();
                }
            } else {
                return "You failed to upload " + i
                        + " because the file was empty.";
            }
        }
        return "upload successful";
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
