package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.pojo.*;
import com.zgl.aftersales.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin //允许跨域
@RequestMapping(value ="/adminLoing",method = RequestMethod.POST)
@Slf4j
public class AdminLoginController {
    @Autowired
    ItemsService itemsService;

    /**
     * 项目显示
     * @return
     */
    @PostMapping("/showItems")
    public List<Items> showItems(){
        List<Items>  itemsList=itemsService.selectAllItems();
        return itemsList;
    }

    /**
     * 项目查找
     * @param json
     * @return
     */
    @PostMapping("/searchItems")
    public List<Items> searchItems(@RequestBody JSONObject json){
        String key=json.getString("key");
        List<Items>  itemsList=itemsService.fuzzyQuery(key);
        return itemsList;
    }

    /**
     * 问题处理对应关系显示
     */
    @Autowired
    MaintenanceService maintenanceService;
    @PostMapping("/showMaintenance")
    public List<Maintenance> showMaintenance(){
        List<Maintenance> maintenanceList=maintenanceService.selectAll();
        return maintenanceList;

    }

    /**
     * 问题处理对应关系查找
     * @param json
     * @return
     */
    @PostMapping("/searchMaintenance")
    public List<Maintenance> searchMaintenance(@RequestBody JSONObject json){
        String key=json.getString("key");
        List<Maintenance> maintenanceList=maintenanceService.fuzzyQuery(key);
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
     * 问题显示
     */
    @Autowired
    QuestionService questionService;
    @PostMapping("/showquestion")
    public List<Question> showQuestion(){
        List<Question> questionList=questionService.showAllQuestions();
        return  questionList;
    }

    /**
     *问题查找
     * @param json
     * @return
     */

    @PostMapping("/searchquestion")
    public List<Question> serchQuestion(@RequestBody JSONObject json){
        String key=json.getString("key");
        List<Question> questionList=questionService.fuzzyQuery(key);
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

    @Autowired
    UserService userService;
    @PostMapping("/allocation")
    public Status allocationTask(@RequestBody JSONObject json){
        Status status=new Status();
        String questionID_String=json.getString("questionID");
        int questionID=Integer.parseInt(questionID_String);
        String workerName=json.getString("workerName");
        Maintenance maintenance=new Maintenance();

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

            status.setMsg("分配任务成功");
            status.setStatus(true);
        }catch (Exception e){
            status.setMsg("分配任务失败");
        }

        return status;



    }









}
