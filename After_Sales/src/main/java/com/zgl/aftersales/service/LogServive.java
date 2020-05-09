package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.Log;

import java.util.List;
import java.util.Map;

/**
 * @author Alice
 */
public interface LogServive {
    void addLog(Log log);
    String selectUserName(int userId);

    List<List<?>> showLog(Map<String,Object> map);
    List<List<?>> saerchLog(Map<String,Object> map);

}
