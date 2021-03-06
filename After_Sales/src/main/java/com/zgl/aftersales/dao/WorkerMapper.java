package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Items;
import com.zgl.aftersales.pojo.Maintenance;
import com.zgl.aftersales.pojo.Question;
import com.zgl.aftersales.pojo.Users;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
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
     * 维修人员可以修改名字，邮箱，电话，
     * @param map
     */
    void worker_updateBy_Session_UserId(Map<String, Object> map);


    /**
     * 接收任务后
     * @param userID
     * @return
     */
    int worker_select_taskNum(int userID);
    void worker_update_ques_accept(String questionID);

    void worker_update_addtaskNum(int userID);

    /**
     * 完成任务后
     */
    void worker_update_ques_done(String questionID);

    void worker_update_reducetaskNum(int userID);

    /**
     * 显示未接受任务
     * @param userId
     * @return
     */
    List<Question> worker_show_unaccepted(int userId);

    List<Question> worker_show_accepted(int userId);

    List<Question> worker_show_done(int userId);

    /**
     * 显示该负责人负责的所有项目
     * @param userId
     * @return
     */
    List<Items> show_items(int userId);

    List<?> show_item_workers(Map<String, Object> map);

    List<?> select_userid(int userId);

    void delete_item_worker(Map<String, Object> map);

    List<?> show_item_other_workers(int itemID);

    void insert_item_other_workers(Map<String,Object> map);

    List<Map<String, Object>> worker_show_overtime(int userId);
}
