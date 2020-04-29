package com.zgl.aftersales.dao;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.pojo.Users;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
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
    void logout();

}
