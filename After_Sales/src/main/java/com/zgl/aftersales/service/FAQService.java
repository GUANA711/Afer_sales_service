package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.FAQs;
import com.zgl.aftersales.pojo.Users;

import javax.annotation.Resource;
import java.util.List;

@Resource
public interface FAQService {
    List<FAQs> selectAllFAQ();
}
