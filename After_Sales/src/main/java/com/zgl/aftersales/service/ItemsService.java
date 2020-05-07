package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.Items;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Resource
public interface ItemsService {
    List<Items> selectAllItems(Map<String,Object> map);
    List<Items> fuzzyQuery(Map<String,Object> map);
}
