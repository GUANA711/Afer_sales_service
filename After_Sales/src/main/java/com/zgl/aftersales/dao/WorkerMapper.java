package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Users;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
 * @author Alice
 */
@Mapper
@Repository
public interface WorkerMapper {
   //查询维修人员信息，维修人员Role_id=2
    Users worker_selectBy_Session_UserId(int userID);

    //维修人员可以修改名字，邮箱，电话，密码
    void worker_updateBy_Session_UserId(Map<String, Object> map);
}
