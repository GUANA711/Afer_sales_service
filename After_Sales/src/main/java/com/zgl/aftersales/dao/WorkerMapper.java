package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Maintenance;
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
    /**
     * 查询维修人员信息，维修人员Role_id=2
     * @param userID
     * @return
     */
    Users worker_selectBy_Session_UserId(int userID);

    /**
     * 维修人员可以修改名字，邮箱，电话，密码
     * @param map
     */
    void worker_updateBy_Session_UserId(Map<String, Object> map);

    /**
     * 接收任务后
     * @param questionID
     */
    void worker_update_ques_accept(String questionID);

    void worker_update_addtaskNum(int userID);

    /**
     * 完成任务后
     */
    void worker_update_ques_done(String questionID);

    void worker_update_reducetaskNum(int userID);


}
