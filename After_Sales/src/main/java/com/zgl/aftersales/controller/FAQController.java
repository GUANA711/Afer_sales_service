package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.dao.FAQMapper;
import com.zgl.aftersales.pojo.FAQs;
import com.zgl.aftersales.pojo.Status;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.FAQService;
import com.zgl.aftersales.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ResponseBody
public class FAQController {
    @Autowired
    private FAQService faqService;

    public FAQController(FAQService faqService) {
        this.faqService = faqService;
    }

    @RequestMapping("/selectAllFAQ")
    public List<FAQs> selectAllFAQ(){
        return faqService.selectAllFAQ();
    }
}
