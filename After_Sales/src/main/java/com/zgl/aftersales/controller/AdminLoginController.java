package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.pojo.Items;
import com.zgl.aftersales.pojo.Maintenance;
import com.zgl.aftersales.service.ItemsService;
import com.zgl.aftersales.service.MaintenanceService;
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
    @PostMapping("/showItems")
    public List<Items> showItems(){
        List<Items>  itemsList=itemsService.selectAllItems();
        return itemsList;
    }

    @PostMapping("/searchItems")
    public List<Items> searchItems(@RequestBody JSONObject json){
        String key=json.getString("key");
        List<Items>  itemsList=itemsService.fuzzyQuery(key);
        return itemsList;
    }

    @Autowired
    MaintenanceService maintenanceService;
    @PostMapping("/showMaintenance")
    public List<Maintenance> showMaintenance(){
        List<Maintenance> maintenanceList=maintenanceService.selectAll();
        return maintenanceList;

    }

    @PostMapping("/searchMaintenance")
    public List<Maintenance> searchMaintenance(@RequestBody JSONObject json){
        String key=json.getString("key");
        List<Maintenance> maintenanceList=maintenanceService.fuzzyQuery(key);
        return maintenanceList;
    }
}
