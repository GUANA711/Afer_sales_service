package com.zgl.aftersales.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.dao.UserMapper;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.UserService;
import com.zgl.aftersales.utiles.DesDecodeUtiles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class  UserImpl implements UserService {
    @Override
    public List<List<?>> showUser(Map<String, Object> map) {
        return userMapper.showUser(map);
    }

    @Override
    public List<List<?>> searchUser(Map<String, Object> map) {
        return userMapper.searchUser(map);
    }

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<String> showPermitByUserID(int userID) {
        return userMapper.showPermitByUserID(userID);
    }

    @Override
    public void addUser(Users user) {

        String codePwd=DesDecodeUtiles.getEncryptString(user.getPassword());
        user.setPassword(codePwd);
        userMapper.addUser(user);
    }

    @Override
    public Users selectByUsername(String username) {
        return userMapper.selectByUsername(username);
    }

    @Override
    public Users selectByEmail(String mail) {
        return userMapper.selectByEmail(mail);
    }

    @Override
    public void updateByEmailToPwd(Map<String, String> map) {
        userMapper.updateByEmailToPwd(map);
    }

    @Override
    public List<String> showRolesByUserID(int userID) {
        return userMapper.showRolesByUserID(userID);
    }

    @Override
    public void updateTask_num(String name) {
        userMapper.updateTask_num(name);
    }


}
