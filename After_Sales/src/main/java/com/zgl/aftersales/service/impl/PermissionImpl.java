package com.zgl.aftersales.service.impl;

import com.zgl.aftersales.dao.PermissionMapper;
import com.zgl.aftersales.pojo.Permission;
import com.zgl.aftersales.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PermissionImpl implements PermissionService {
    @Autowired
    PermissionMapper permissionMapper;
    @Override
    public List<List<?>> saerchPer(Map<String, Object> per) {
        return permissionMapper.saerchPer(per);
    }

    @Override
    public void deletePer(int id) {
        permissionMapper.deletePer(id);
    }

    @Override
    public void addPer(Permission permission) {
        permissionMapper.addPer(permission);
    }

    @Override
    public void updatePer(Permission permission) {
       permissionMapper.updatePer(permission);
    }
}
