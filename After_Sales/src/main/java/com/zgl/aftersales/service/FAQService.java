package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.FAQs;
import com.zgl.aftersales.pojo.Users;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @author Alice
 */
@Resource
public interface FAQService {
    List<FAQs> selectAllFAQ();
    List<List<?>> showFAQ(Map<String,Object> map);

    void addFAQ(FAQs faQs);
}
