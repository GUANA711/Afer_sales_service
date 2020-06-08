package com.zgl.aftersales.service.impl;

import com.zgl.aftersales.dao.RoleMapper;
import com.zgl.aftersales.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service
public class RoleImpl implements RoleService {
    @Autowired
    RoleMapper roleMapper;

    @Override
    public Map<String, ?> selectByORoleName(String roleName) {
        return roleMapper.selectByORoleName(roleName);
    }

    @Override
    public void addRole(String rolename) {
        roleMapper.addRole(rolename);
    }

    @Override
    public void deleteRole(String roleID) {
        roleMapper.deleteRole(roleID);
    }

    @Override
    public List<Map<String, ?>> showAllRoles() {
        return roleMapper.showAllRoles();
    }

    @Override
    public List<String> showHaveResourcr(String userID) {
        return roleMapper.showHaveResourcr(userID);
    }

    @Override
    public void deleteRoleResource(String roleID,String resource) {
        roleMapper.deleteRoleResource(roleID,resource);
    }

    @Override
    public void addRoleResource(String roleID, String resource) {
        roleMapper.addRoleResource(roleID,resource);
    }

    @Override
    public List<String> showDontHaveResourcr(String userID) {
        return roleMapper.showDontHaveResourcr(userID);
    }
}
