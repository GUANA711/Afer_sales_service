package com.zgl.aftersales.service;

import com.zgl.aftersales.dao.MaintenanceMapper;
import com.zgl.aftersales.pojo.Maintenance;

import java.util.List;

public interface MaintenanceService {
    List<Maintenance> selectAll();
    List<Maintenance> fuzzyQuery(String key);
    void insert(Maintenance maintenance);
}
