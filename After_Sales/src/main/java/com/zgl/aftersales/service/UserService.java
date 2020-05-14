package com.zgl.aftersales.service;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.pojo.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Resource
public interface UserService {
    void addUser(Users user);
    Users selectByUsername(String username);
    Users selectByEmail(String mail);
    void  updateByEmailToPwd(Map<String,String> map);
    void updateTask_num(String name);
    //shiro
    List<String> showRolesByUserID(int userID);


    List<List<?>> showUser(Map<String,Object> map);
    List<List<?>> searchUser(Map<String,Object> map);
}

