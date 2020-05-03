package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Log;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Mapper
@Repository
public interface LogMapper {
    List<Log> showLog();
//    void insertLog(Map<String,Object> map);

}
