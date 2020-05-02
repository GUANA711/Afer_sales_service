package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.Items;

import javax.annotation.Resource;
import java.util.List;
@Resource
public interface ItemsService {
    List<Items> selectAllItems();
    List<Items> fuzzyQuery(String key);
}
