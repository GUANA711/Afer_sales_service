package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.Permission;

import java.util.List;
import java.util.Map;

public interface PermissionService {
    List<List<?>> saerchPer(Map<String,Object> per);
    void deletePer(int id);
    void addPer(Permission permission);
    void updatePer(Permission permission);
}
