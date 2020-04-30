package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.pojo.Items;
import com.zgl.aftersales.pojo.Log;
import com.zgl.aftersales.pojo.Maintenance;
import com.zgl.aftersales.pojo.Question;
import com.zgl.aftersales.service.ItemsService;
import com.zgl.aftersales.service.LogServive;
import com.zgl.aftersales.service.MaintenanceService;
import com.zgl.aftersales.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/searchquestion")
    public List<Question> serchQuestion(@RequestBody JSONObject json){
        String key=json.getString("key");
        List<Question> questionList=questionService.fuzzyQuery(key);
        return questionList;
    }




}
