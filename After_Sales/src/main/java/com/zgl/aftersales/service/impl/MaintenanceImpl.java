package com.zgl.aftersales.service.impl;

import com.zgl.aftersales.dao.MaintenanceMapper;
import com.zgl.aftersales.pojo.Maintenance;
import com.zgl.aftersales.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MaintenanceImpl implements MaintenanceService {
    @Autowired
    private MaintenanceMapper maintenanceMapper;
    @Override
    public List<Maintenance> selectAll() {
        return maintenanceMapper.selectAll();
    }

    @Override
    public void insert(Maintenance maintenance) {
         maintenanceMapper.insert(maintenance);
    }

    @Override
    public List<Maintenance> fuzzyQuery(String key) {
        return maintenanceMapper.fuzzyQuery(key);
    }
}
