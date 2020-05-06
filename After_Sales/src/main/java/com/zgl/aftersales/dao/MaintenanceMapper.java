package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Maintenance;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface MaintenanceMapper {

    List<Maintenance> selectAll(Map<String, Object> map);
    List<Maintenance> fuzzyQuery(Map<String, Object> map);
    void insert(Maintenance maintenance);
}
