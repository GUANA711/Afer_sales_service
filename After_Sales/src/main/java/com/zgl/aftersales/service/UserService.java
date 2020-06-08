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
    void insertRoleID(Map<String,Object> map);
    void deleteRolID(Map<String,Object> map);
    int isLeader(int userID);
    List<String> selectPreByRole(String roleName);

    List<List<?>> showUser(Map<String,Object> map);
    List<List<?>> searchUser(Map<String,Object> map);
    List<?> showWorker();

    /**
     * 根据激活码code查询用户，之后再进行修改状态
     * @param code
     * @return
     */
    Users checkCode(String code);

    /**
     * 激活账户，修改用户状态为“1”
     * @param user
     */
    void updateUserStatus(Users user);
}

