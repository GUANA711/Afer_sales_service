package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Users;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

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
    List<String> showPermitByUserID(int userID);


}
