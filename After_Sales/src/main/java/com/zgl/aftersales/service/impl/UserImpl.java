package com.zgl.aftersales.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.dao.UserMapper;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.MailService;
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
    private MailService mailService;


    @Override
    public void insertRoleID(Map<String, Object> map) {
        userMapper.insertRoleID(map);
    }

    @Override
    public List<String> selectPreByRole(String roleName) {
        return userMapper.selectPreByRole(roleName);
    }

    @Override
    public List<?> showWorker() {
        return userMapper.showWorker();
    }

    //点击邮箱中的激活码进行激活，根据激活码查询用户，之后再进行修改用户状态为1进行激活
    @Override
    public Users checkCode(String code) {
        return userMapper.checkCode(code);
    }
    //激活账户，修改用户状态为“1”进行激活
    @Override
    public void updateUserStatus(Users user) {
        userMapper.updateUserStatus(user);
    }

    @Override
    public int isLeader(int userID) {
        return userMapper.isLeader(userID);
    }

    @Override
    public void deleteRolID(Map<String, Object> map) {
       userMapper.deleteRolID(map);
    }

    /**
     * 用户注册，同时发送一封激活邮件
     * @param user
     */
    @Override
    public void addUser(Users user) {

        String codePwd=DesDecodeUtiles.getEncryptString(user.getPassword());
        user.setPassword(codePwd);
        userMapper.addUser(user);
        //获取激活码
        String code = user.getCode();
        System.out.println("code:"+code);
        //主题
        String subject = "来自软件售后服务系统网站的激活邮件";
        //user/checkCode?code=code(激活码)是我们点击邮件链接之后根据激活码查询用户，如果存在说明一致，将用户状态修改为“1”激活
        //上面的激活码发送到用户注册邮箱
        String context = "<a href=\"/user/checkCode?code="+code+"\">激活请点击:"+code+"</a>";
        //发送激活邮件
        mailService.sendMail (user.getEmail(),subject,context);
        //
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
