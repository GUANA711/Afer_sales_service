package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Log;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Alice
 */
@Mapper
@Repository
public interface LogMapper {
    List<Log> showLog();
    void addLog(Log log);
    String selectUserName(int userId);
}
