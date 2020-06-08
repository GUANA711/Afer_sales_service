package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Users;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author GUANA
 */
@Mapper
@Repository
public interface UserMapper {
    //插入用户
    void addUser(Users user);
    Users selectByUsername(String username);
    Users selectByEmail(String mail);
    void  updateByEmailToPwd(Map<String,String> map);
    List<String> selectByQuesion_name(String qestID);
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
     * 点击邮箱中的激活码进行激活，根据激活码查询用户，之后再进行修改用户状态为1进行激活
     * @param code
     * @return
     */
    Users checkCode(String code);

    /**
     * 激活账户，修改用户状态为“1”进行激活
     * @param user
     */
    void updateUserStatus(Users user);






}
