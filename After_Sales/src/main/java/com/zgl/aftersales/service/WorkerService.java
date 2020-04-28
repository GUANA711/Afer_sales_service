package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.Users;
import org.apache.ibatis.annotations.Param;

import javax.annotation.Resource;
import java.util.Map;

@Resource
public interface WorkerService {
    //根据Username查询维修人员信息，维修人员Role_id=2
    Users worker_selectByUsername(String username);

    //维修人员可以修改名字，邮箱，电话，密码
    void worker_updateByUsername(Map<String, Object> map);
}
