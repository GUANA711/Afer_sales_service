package com.zgl.aftersales.service.impl;

import com.zgl.aftersales.dao.LogMapper;
import com.zgl.aftersales.pojo.Log;
import com.zgl.aftersales.service.LogServive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class LogImpl implements LogServive {
    @Autowired
    private LogMapper logMapper;
    @Override
    public List<Log> showLog() {
        return logMapper.showLog();
    }
}
