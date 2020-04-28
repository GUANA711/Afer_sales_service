package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.pojo.Status;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.WorkerService;
import com.zgl.aftersales.utiles.DesDecodeUtiles;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;


@RestController
@ResponseBody
@CrossOrigin //允许跨域
@Slf4j
public class WorkerController {
    @Autowired
    private WorkerService workerService;

    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @RequestMapping("/worker_selectByUsername")
    public Users worker_selectByUsername(@RequestBody JSONObject json){
        DesDecodeUtiles desDecodeUtiles=new DesDecodeUtiles();

        Status status=new Status();

        String username=json.getString("username");//前台传入的名字
        Users user=workerService.worker_selectByUsername(username);

        //密码解密之后输出
        user.setPassword(desDecodeUtiles.getDecryptString(user.getPassword()));
        return user;
    }

    @PostMapping("/worker_updateByUsername")
    public Map<String, Object> worker_updateByUsername(@RequestBody JSONObject json, HttpServletRequest req){
        DesDecodeUtiles desDecodeUtiles=new DesDecodeUtiles();

        //将登录的session的User_id取出来
        int User_id= (int) req.getSession(true).getAttribute("userID");

        Map<String,Object> map=new HashMap<String, Object>();
        map.put("User_id",User_id);
        map.put("User_name",json.getString("User_name"));
        map.put("Password",desDecodeUtiles.getEncryptString(json.getString("Password")));
        map.put("Tel",json.getString("Tel"));
        map.put("Email",json.getString("Email"));
        workerService.worker_updateByUsername(map);
        return map;
    }
}
