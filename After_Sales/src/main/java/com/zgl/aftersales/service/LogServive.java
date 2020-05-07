package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.Log;

import java.util.List;

/**
 * @author Alice
 */
public interface LogServive {
    List<Log> showLog();
    void addLog(Log log);
    String selectUserName(int userId);
}
