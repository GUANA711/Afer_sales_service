package com.zgl.aftersales.service.impl;

import com.zgl.aftersales.dao.FAQMapper;
import com.zgl.aftersales.pojo.FAQs;
import com.zgl.aftersales.service.FAQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FAQImpl implements FAQService {

    @Autowired
    private FAQMapper faqMapper;

    @Override
    public List<FAQs> selectAllFAQ() {
        List<FAQs> list;
        list=faqMapper.selectAllFAQ();
        return list;
    }

    @Override
    public void addFAQ(FAQs faQs) {
        faqMapper.addFAQ(faQs);
    }
}
