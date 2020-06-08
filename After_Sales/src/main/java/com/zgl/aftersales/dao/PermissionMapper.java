package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Permission;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface PermissionMapper {
    List<List<?>> saerchPer(Map<String,Object> per);

    @Delete("delete from permission where permission_id=#{id}")
    void deletePer(int id);

    @Insert("insert into permission(name,description,url,perms,parent_id,type) values(#{name},#{description},#{url},#{perms},#{parent_id},#{type})")
    void addPer(Permission permission);

    @Update("update permission p set p.name=#{name},p.description=#{description},p.url=#{url},p.perms=#{perms},p.parent_id=#{parent_id},p.`type`=#{type} where p.permission_id=#{permission_id}")
    void updatePer(Permission permission);
}
