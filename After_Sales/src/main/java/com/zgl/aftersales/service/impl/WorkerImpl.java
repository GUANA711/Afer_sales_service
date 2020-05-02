package com.zgl.aftersales.service.impl;

import com.zgl.aftersales.dao.WorkerMapper;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

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
}
