package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.Items;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ItemMapper {
    List<Items> selectAllItems();
    List<Items> fuzzyQuery(String key);
}
