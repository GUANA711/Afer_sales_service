package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.Users;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @author Alice
 */
@Resource
public interface WorkerService {
    /**
     * 根据Username查询维修人员信息，维修人员Role_id=2
     * @param userID
     * @return
     */
    Users worker_selectBy_Session_UserId(int userID);

    /**
     * 维修人员可以修改名字，邮箱，电话，密码
     * @param map
     */
    void worker_updateBy_Session_UserId(Map<String, Object> map);
}
