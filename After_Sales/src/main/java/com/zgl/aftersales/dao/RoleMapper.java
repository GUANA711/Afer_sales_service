package com.zgl.aftersales.dao;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
import sun.plugin2.message.ShowDocumentMessage;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface RoleMapper {

    /**
     * 查询所有角色
     * @return
     */
    @Select("select * from role")
    @Results(id="roleResults",value = {
            @Result(property = "Role_id",column = "Role_id"),
            @Result(property = "Role_name",column = "Role_name")
    })
    List<Map<String,?>> showAllRoles();

    /**
     * 添加角色
     * @param rolename
     */
    @Insert("insert into role(Role_name) values(#{roleName}) ")
    void addRole(String rolename);

    /**
     * 删除角色
     * @param roleID
     */
    @Delete("delete from role where role_id=#{roleID}")
    void deleteRole(String roleID);

    @Select("select * from role where role_name=#{roleName}")
    Map<String,?> selectByORoleName(String roleName);

    /**
     * 按roleID显示角色拥有的人资源
     * @param userID
     * @return
     */
    @Select("select p.name from permission p,role_permission r  where p.permission_id=r.permission_id and r.role_id=#{roleID}")
    List<String> showHaveResourcr(String userID);
    /**
     * 按roleID显示角色未拥有的人资源
     * @param userID
     * @return
     */
    @Select("select distinct p.name from permission p,role_permission r  where  p.name not in (select p.name from permission p,role_permission r  where p.permission_id=r.permission_id and r.role_id=#{roleID})")
    List<String> showDontHaveResourcr(String userID);

    /**
     * 删除角色的资源
     * @param resource
     */
    @Delete("delete from role_permission  where role_id=#{roleID} and permission_id=(select  permission_id from permission  where name=#{resource})")
    void  deleteRoleResource(@Param("roleID") String roleID,@Param("resource") String resource);

    /**
     * 添加角色的资源
     * @param resource
     */
    @Insert("insert into role_permission(role_id,permission_id) select #{roleID}, permission_id from permission  where name=#{resource} ")
    void addRoleResource(@Param("roleID") String roleID,@Param("resource") String resource);

}
