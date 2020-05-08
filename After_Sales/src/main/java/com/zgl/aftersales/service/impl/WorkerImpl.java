package com.zgl.aftersales.service.impl;

import com.zgl.aftersales.dao.WorkerMapper;
import com.zgl.aftersales.pojo.Question;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * @author Alice
 */
@Service
@Transactional
public class WorkerImpl implements WorkerService {
    @Autowired
    private WorkerMapper workerMapper;

    @Override
    public Users worker_selectBy_Session_UserId(int userID) {
        return workerMapper.worker_selectBy_Session_UserId(userID);
    }

    @Override
    public void worker_updateBy_Session_UserId(Map<String, Object> map) {
        workerMapper.worker_updateBy_Session_UserId(map);
    }

    @Override
    public void worker_update_ques_accept(String questionID) {
        workerMapper.worker_update_ques_accept(questionID);
    }

    @Override
    public void worker_update_addtaskNum(int userID) {
        workerMapper.worker_update_addtaskNum(userID);
    }

    @Override
    public void worker_update_ques_done(String questionID) {
        workerMapper.worker_update_ques_done(questionID);
    }

    @Override
    public void worker_update_reducetaskNum(int userID) {
        workerMapper.worker_update_reducetaskNum(userID);
    }

    @Override
    public List<Question> worker_show_unaccepted(int userId) {
        return workerMapper.worker_show_unaccepted(userId);
    }

    @Override
    public List<Map<String, Object>> worker_show_accepted(int userId) {
        return workerMapper.worker_show_accepted(userId);
    }

    @Override
    public List<Question> worker_show_done(int userId) {
        return workerMapper.worker_show_done(userId);
    }

}
