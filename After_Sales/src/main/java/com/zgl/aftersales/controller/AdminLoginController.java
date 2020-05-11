package com.zgl.aftersales.controller;

import com.alibaba.druid.sql.ast.statement.SQLIfStatement;
import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.dao.MyLog;
import com.zgl.aftersales.pojo.*;
import com.zgl.aftersales.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin //允许跨域
@RequestMapping(value ="/adminLoing",method = RequestMethod.POST)
@Slf4j

/**
 * @author GUANA
 */
public class AdminLoginController {
    @Autowired
    ItemsService itemsService;

    /**
     * 项目显示(分页处理)
     * @return
     */
    @PostMapping("/showItems/{currenPage}/{pageSize}")
    public  List<List<?>> showItems(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        List<List<?>>  itemsList=itemsService.selectAllItems(map);
        return itemsList;
    }

    /**
     * 项目查找(分页处理)
     * @param json
     * @return
     */
    @PostMapping("/searchItems/{currenPage}/{pageSize}")
    public List<List<?>> searchItems(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize ,@RequestBody JSONObject json){
        String key=json.getString("key");
        String choice=json.getString("choice");
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        if(choice.equals("0")) {
            map.put("Item_id", key);
        }
        if (choice.equals("1")){
            map.put("Item_name", key);
        }
        if (choice.equals("2")){
            map.put("User_id", key);
        }


        List<List<?>>  itemsList=itemsService.fuzzyQuery(map);
        return itemsList;
    }

    /**
     * 问题处理对应关系显示(分页处理)
     */
    @Autowired
    MaintenanceService maintenanceService;
    @PostMapping("/showMaintenance/{currenPage}/{pageSize}")
    public List<List<?>> showMaintenance(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        List<List<?>> maintenanceList=maintenanceService.selectAll(map);
        return maintenanceList;

    }

    /**
     * 问题处理对应关系查找(分页处理)
     * @param json
     * @return
     */
    @PostMapping("/searchMaintenance/{currenPage}/{pageSize}")
    public List<List<?>> searchMaintenance(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize,@RequestBody JSONObject json){
        String key=json.getString("key");
        String choice=json.getString("choice");
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        if(choice.equals("0")) {
            map.put("Question_id", key);
        }
        if (choice.equals("1")){
            map.put("User_id", key);
        }
        if (choice.equals("2")){
            map.put("Start_time", key);
        }
        List<List<?>> maintenanceList=maintenanceService.fuzzyQuery(map);
        return maintenanceList;
    }



    /**
     * 日志显示
     */
    @Autowired
    LogServive logServive;
    @PostMapping("/showLog/{currenPage}/{pageSize}")
    public List<List<?>> showLogs(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        List<List<?>> logList=logServive.showLog(map);
        return logList;
    }

    /**
     * 日志搜索
     * @param json
     * @param currenPage
     * @param pageSize
     * @return
     */
    @PostMapping("/searchLog/{currenPage}/{pageSize}")
    public List<List<?>> searchLog(@RequestBody JSONObject json ,@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        String key=json.getString("key");
        String choice=json.getString("choice");
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        if(choice.equals("0")) {
            map.put("User_id", key);
        }
        if (choice.equals("1")){
            map.put("Operation", key);
        }
        if (choice.equals("2")){
            map.put("Method", key);
        }
        if (choice.equals("3")){
            map.put("IP", key);
        }
        if (choice.equals("4")){
            map.put("Creat_time", key);
        }
        List<List<?>> lists=logServive.saerchLog(map);
        return lists;
    }

    @Autowired
    FAQService faqService;
    @PostMapping("/showfaq/{currenPage}/{pageSize}")
    public List<List<?>> showfaq(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        List<List<?>> lists=faqService.showFAQ(map);
        return  lists;
    }

    /**
     * 问题显示(分页处理)
     */
    @Autowired
    QuestionService questionService;
    @PostMapping("/showquestion/{currenPage}/{pageSize}")
    public List<List<?>> showQuestion(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize ){

        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);

        List<List<?>> questionList=questionService.showAllQuestions(map);
        return  questionList;
    }

    /**
     *问题查找(分页处理)
     * @param json
     * @return
     */

    @PostMapping("/searchquestion/{currenPage}/{pageSize}")
    public List<List<?>> serchQuestion(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize,@RequestBody JSONObject json){
        String key=json.getString("key");
        String choice=json.getString("choice");
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        if(choice.equals("0")) {
            map.put("Question_id", key);
        }
        if (choice.equals("1")){
            map.put("item_id", key);
        }
        if (choice.equals("2")){
            map.put("Question_type", key);
        }
        if(choice.equals("3")) {
            map.put("Question_status", key);
        }
        if (choice.equals("4")){
            map.put("Question_detail", key);
        }
        if (choice.equals("5")){
            map.put("User_id", key);
        }
        if (choice.equals("6")){
            map.put("Commit_time", key);
        }

        List<List<?>> questionList=questionService.fuzzyQuery(map);
        return questionList;
    }

    /**
     * 用户显示
     * @param currenPage
     * @param pageSize
     * @return
     */
    @PostMapping("/showuser/{currenPage}/{pageSize}")
    public List<List<?>> showuser(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);

        List<List<?>> lists=userService.showUser(map);
        return lists;

    }

    /**
     * 用户搜索
     * @param currenPage
     * @param pageSize
     * @param json
     * @return
     */
    @PostMapping("/searchuser/{currenPage}/{pageSize}")
    public List<List<?>> searchuser(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize,@RequestBody JSONObject json) {
        String key = json.getString("key");
        String choice = json.getString("choice");
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("currIndex", (currenPage - 1) * pageSize);
        map.put("pageSize", pageSize);
        if (choice.equals("0")) {
            map.put("User_id", key);
        }
        if (choice.equals("1")) {
            map.put("User_name", key);
        }
        if (choice.equals("2")) {
            map.put("Role_name", key);
        }
        List<List<?>> lists=userService.searchUser(map);
        return lists;
    }


    /**
     * 任务分配——下拉框问题ID显示
     * @return
     */
    @PostMapping("/droplistID")
    public List<Integer> dropListID(){
        List<Integer> integerList=questionService.selectAll_id();
        Collections.sort(integerList);
        return integerList;

    }

    /**
     * 任务分配---根据问题号显示维修人员，且该维修人员先项目数<10
      * @param json
     * @return
     */
    @PostMapping("/wokername")

    public List<String> dropListWorker(@RequestBody JSONObject json){
        String questionID=json.getString("key");
        List<String> stringList=questionService.selectWorkerByQuesID(questionID);
        return stringList;
    }


    /**
     *管理员直接分配任务
     *
     */
    @Autowired
    UserService userService;
    @Autowired
    MailService mailService;
    @PostMapping("/allocation")
    @MyLog(value = "向maintenance表中添加数据，修改users中task_num字段，修改question表中status字段")
    public Status allocationTask(@RequestBody JSONObject json){
        Status status=new Status();
        String questionID_String=json.getString("questionID");
        int questionID=Integer.parseInt(questionID_String);
        String workerName=json.getString("workerName");
        Maintenance maintenance=new Maintenance();

        Users worker=userService.selectByUsername(workerName);

        Date date_Date=new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String date=formatter.format(date_Date ).toString();

        try {
            Users user=userService.selectByUsername(workerName);
            maintenance.setQuestion_id(questionID);
            maintenance.setUser_id(user.getUser_id());
            maintenance.setStart_time(date);

            userService.updateTask_num(workerName);
            questionService.updateStatus(questionID_String);
            maintenanceService.insert(maintenance);

            //给维修人员发送邮箱提醒
            mailService.sendMail(worker.getEmail(),"您被分配了一条新任务，请查收","问题ID:"+questionID);




            status.setMsg("分配任务成功");
            status.setStatus(true);
        }catch (Exception e){
            status.setMsg("分配任务失败");
        }

        return status;

    }

    /**
     * 权限分配
     * @param json
     * @return
     */
    @MyLog("修改users表中的权限id")
    public Status roleEdit(@RequestBody JSONObject json){
        String user_id_string=json.getString("userID");
        String role_id_string=json.getString("roleID");
        int userID=Integer.parseInt(user_id_string);
        int roleID=Integer.parseInt(role_id_string);
        Status status=new Status();
        Users user=new Users();
        user.setRole_id(roleID);
        user.setUser_id(userID);
        List<Users> usersList=new ArrayList<>();
        usersList.add(user);
        try {
            questionService.updateUser(usersList);
            status.setMsg("权限修改成功");
            status.setStatus(true);
            return  status;
        }catch (Exception e){
            status.setMsg("权限修改失败");
            return  status;
        }
    }

    /**
     * 显示处理超时的任务
     * @return
     */
    @PostMapping("/overtim_deal")
    public List<Question> overtimeAccepter(){
        List<Question> questionList=questionService.showOvertimeAccepte();
        return questionList;
    }

    /**
     * 显示超时未接收任务
     * @return
     */
    @PostMapping("/overtime_unaccept")
    public List<Question> overtimeUnaccepter(){
        List<Question> questionList=questionService.shoeOvertimeUnaccepte();
        return questionList;
    }













}
