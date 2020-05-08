package com.zgl.aftersales.service.impl;

import com.zgl.aftersales.dao.MaintenanceMapper;
import com.zgl.aftersales.pojo.Maintenance;
import com.zgl.aftersales.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MaintenanceImpl implements MaintenanceService {
    @Autowired
    private MaintenanceMapper maintenanceMapper;

    @Override
    public List<List<?>> selectAll(Map<String, Object> map) {
        return maintenanceMapper.selectAll(map);
    }

    @Override
    public List<List<?>> fuzzyQuery(Map<String, Object> map) {
        return maintenanceMapper.fuzzyQuery(map);
    }

    @Override
    public void insert(Maintenance maintenance) {
         maintenanceMapper.insert(maintenance);
    }


}
