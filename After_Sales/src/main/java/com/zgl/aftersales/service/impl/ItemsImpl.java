package com.zgl.aftersales.service.impl;

import com.zgl.aftersales.dao.ItemMapper;
import com.zgl.aftersales.pojo.Items;
import com.zgl.aftersales.service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ItemsImpl implements ItemsService {
    @Autowired
    ItemMapper itemMapper;

    @Override
    public List<Items> selectAllItems(Map<String, Object> map) {
        return itemMapper.selectAllItems(map);
    }

    @Override
    public List<Items> fuzzyQuery(Map<String, Object> map) {
        return itemMapper.fuzzyQuery(map);
    }
}
