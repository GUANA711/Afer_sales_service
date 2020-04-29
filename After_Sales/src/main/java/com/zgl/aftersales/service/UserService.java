package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.Users;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import java.util.Map;

@Resource
public interface UserService {
    void addUser(Users user);
    Users selectByUsername(String username);
    Users selectByEmail(String mail);
    void  updateByEmailToPwd(Map<String,String> map);
    void logout();
}

