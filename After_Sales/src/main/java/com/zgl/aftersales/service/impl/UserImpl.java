package com.zgl.aftersales.service.impl;

import com.zgl.aftersales.dao.UserMapper;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.UserService;
import com.zgl.aftersales.utiles.DesDecodeUtiles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional
public class UserImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public void addUser(Users user) {
        DesDecodeUtiles desDecodeUtiles=new DesDecodeUtiles();
        String codePwd=desDecodeUtiles.getEncryptString(user.getPassword());
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
    public void logout(){
        userMapper.logout();
    };
}
