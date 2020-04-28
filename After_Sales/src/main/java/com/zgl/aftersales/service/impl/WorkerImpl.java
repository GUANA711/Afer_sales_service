package com.zgl.aftersales.service.impl;

import com.zgl.aftersales.dao.FAQMapper;
import com.zgl.aftersales.dao.WorkerMapper;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.WorkerService;
import com.zgl.aftersales.utiles.DesDecodeUtiles;
import org.apache.catalina.User;
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
    public Users worker_selectByUsername(String username) {
        return workerMapper.worker_selectByUsername(username);
    }

    @Override
    public void worker_updateByUsername(Map<String, Object> map) {
//        DesDecodeUtiles desDecodeUtiles=new DesDecodeUtiles();
//        //将输入的密码加密
//        String codePwd=desDecodeUtiles.getEncryptString(user.getPassword());
//        user.setPassword(codePwd);
        workerMapper.worker_updateByUsername(map);
    }
}
