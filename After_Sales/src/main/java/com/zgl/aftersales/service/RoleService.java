package com.zgl.aftersales.service;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface RoleService {
    List<Map<String,?>> showAllRoles();
    void addRole(String rolename);
    void deleteRole(String roleID);
    Map<String,?> selectByORoleName(String roleName);
    List<String> showHaveResourcr(String userID);
    List<String> showDontHaveResourcr(String userID);
    void  deleteRoleResource(String roleID,String resource);
    void addRoleResource(String roleID, String resource);
}
