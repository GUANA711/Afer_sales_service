package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
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
 * @author 赵官凌
 */
public class AdminLoginController {
    @Autowired
    ItemsService itemsService;

    /**
     * 项目显示(分页处理)
     * @return
     */
    @PostMapping("/showItems/{currenPage}/{pageSize}")
    public List<Items> showItems(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        List<Items>  itemsList=itemsService.selectAllItems(map);
        return itemsList;
    }

    /**
     * 项目查找(分页处理)
     * @param json
     * @return
     */
    @PostMapping("/searchItems/{currenPage}/{pageSize}")
    public List<Items> searchItems(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize ,@RequestBody JSONObject json){
        String key=json.getString("key");
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        map.put("text",key);
        List<Items>  itemsList=itemsService.fuzzyQuery(map);
        return itemsList;
    }

    /**
     * 问题处理对应关系显示(分页处理)
     */
    @Autowired
    MaintenanceService maintenanceService;
    @PostMapping("/showMaintenance/{currenPage}/{pageSize}")
    public List<Maintenance> showMaintenance(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        List<Maintenance> maintenanceList=maintenanceService.selectAll(map);
        return maintenanceList;

    }

    /**
     * 问题处理对应关系查找(分页处理)
     * @param json
     * @return
     */
    @PostMapping("/searchMaintenance/{currenPage}/{pageSize}")
    public List<Maintenance> searchMaintenance(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize,@RequestBody JSONObject json){
        String key=json.getString("key");
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        map.put("text",key);
        List<Maintenance> maintenanceList=maintenanceService.fuzzyQuery(map);
        return maintenanceList;
    }

    /**
     * 日志显示
     */
    @Autowired
    LogServive logServive;
    @PostMapping("/showLog")
    public List<Log> showLogs(){
        List<Log> logList=logServive.showLog();
        return logList;
    }

    /**
     * 问题显示(分页处理)
     */
    @Autowired
    QuestionService questionService;
    @PostMapping("/showquestion/{currenPage}/{pageSize}")
    public List<Question> showQuestion(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize ){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);

        List<Question> questionList=questionService.showAllQuestions(map);
        return  questionList;
    }

    /**
     *问题查找(分页处理)
     * @param json
     * @return
     */

    @PostMapping("/searchquestion/{currenPage}/{pageSize}")
    public List<Question> serchQuestion(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize,@RequestBody JSONObject json){
        String key=json.getString("key");
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        map.put("text",key);
        List<Question> questionList=questionService.fuzzyQuery(map);
        return questionList;
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
