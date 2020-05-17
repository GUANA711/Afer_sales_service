package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.Items;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Resource
public interface ItemsService {
    List<List<?>> selectAllItems(Map<String,Object> map);
    List<List<?>> fuzzyQuery(Map<String,Object> map);


}
