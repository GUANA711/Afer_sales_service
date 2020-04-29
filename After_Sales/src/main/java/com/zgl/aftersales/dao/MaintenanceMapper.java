package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Maintenance;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface MaintenanceMapper {
    List<Maintenance> selectAll();
    List<Maintenance> fuzzyQuery(String key);
}
