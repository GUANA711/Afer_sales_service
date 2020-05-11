package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Log;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author Alice
 */
@Mapper
@Repository
public interface LogMapper {

    void addLog(Log log);
    String selectUserName(int userId);

    List<List<?>> showLog(Map<String,Object> map);
    List<List<?>> saerchLog(Map<String,Object> map);



}
