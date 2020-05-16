package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.Items;
import com.zgl.aftersales.pojo.Question;
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
     * 维修人员可以修改名字，邮箱，电话
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

    List<Question> worker_show_unaccepted(int userId);

    List<Map<String, Object>> worker_show_accepted(int userId);

    List<Question> worker_show_done(int userId);

    List<Items> show_items(int userId);

    List<List<?>> show_item_workers(Map<String, Object> map);

}
