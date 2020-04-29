package com.zgl.aftersales.service.impl;

import com.zgl.aftersales.dao.ItemMapper;
import com.zgl.aftersales.pojo.Items;
import com.zgl.aftersales.service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ItemsImpl implements ItemsService {
    @Autowired
    ItemMapper itemMapper;

    @Override
    public List<Items> fuzzyQuery(String key) {
        return itemMapper.fuzzyQuery(key);
    }

    @Override
    public List<Items> selectAllItems() {
        return itemMapper.selectAllItems();
    }
}
