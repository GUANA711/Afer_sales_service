package com.zgl.aftersales.service;

import com.zgl.aftersales.dao.MaintenanceMapper;
import com.zgl.aftersales.pojo.Maintenance;

import java.util.List;
import java.util.Map;

public interface MaintenanceService {
    List<Maintenance> selectAll(Map<String, Object> map);
    List<Maintenance> fuzzyQuery(Map<String, Object> map);
    void insert(Maintenance maintenance);
}
