package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Items;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface ItemMapper {
    List<List<?>> selectAllItems(Map<String,Object> map);
    List<List<?>> fuzzyQuery(Map<String,Object> map);

}
