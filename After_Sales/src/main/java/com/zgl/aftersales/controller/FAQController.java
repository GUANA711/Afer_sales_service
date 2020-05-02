package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.pojo.FAQStatus;
import com.zgl.aftersales.pojo.FAQs;
import com.zgl.aftersales.pojo.Status;
import com.zgl.aftersales.service.FAQService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ResponseBody
@CrossOrigin //允许跨域
@Slf4j
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


    @PostMapping("/addFAQ")
    public FAQStatus addFAQ(@RequestBody JSONObject json) {

        /*因为没有新建关于faq的json
        JSONObject faqJson=json.getJSONObject("faq");
        所以用接口测时也不需要写成faq类的形式
         */

        FAQStatus faqStatus=new FAQStatus();

        FAQs faQs = new FAQs();

        faQs.setFaq_question(json.getString("Faq_question"));
        faQs.setFaq_answer(json.getString("Faq_answer"));

        if (faQs.getFaq_question().equals("")||faQs.getFaq_answer().equals("")) {
            faqStatus.setFaqstatus(false);
            faqStatus.setFaqmsg("添加的FAQ为空，请重新添加");
        }else {
            try {
                faqService.addFAQ(faQs);
                faqStatus.setFaqstatus(true);
                faqStatus.setFaqmsg("FAQ添加成功");
            }
            catch (Exception e){
                faqStatus.setFaqmsg("已存在此FAQ，FAQ添加失败");
            }
        }
        return faqStatus;
    }
}
