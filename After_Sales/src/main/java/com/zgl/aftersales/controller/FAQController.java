package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.dao.MyLog;
import com.zgl.aftersales.pojo.FAQStatus;
import com.zgl.aftersales.pojo.FAQs;
import com.zgl.aftersales.pojo.Status;
import com.zgl.aftersales.service.FAQService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Alice
 */
@RestController//默认返回json类型数据
@ResponseBody
@CrossOrigin //允许跨域
@RequestMapping(value ="/faq")
@Slf4j
public class FAQController {
    @Autowired
    private FAQService faqService;

    public FAQController(FAQService faqService) {
        this.faqService = faqService;
    }

    /**
     * 查看所有的FAQ
     * @return
     */
    @RequestMapping("/selectAllFAQ")
    public List<FAQs> selectAllFAQ(){
        return faqService.selectAllFAQ();
    }

    /**
     * 添加FAQ
     * 因为没有新建关于faq的json
     * JSONObject faqJson=json.getJSONObject("faq");
     * 所以用接口测时也不需要写成faq类的形式
     * @param json
     * @return
     */
    @PostMapping("/addFAQ")
    @MyLog(value = "添加数据到FAQ表")
    public FAQStatus addFAQ(@RequestBody JSONObject json) {
        FAQStatus faqStatus=new FAQStatus();

        FAQs faQs = new FAQs();

        //StringEscapeUtils.escapeJavaScript
        //防xss攻击,输入框传的值,后台的js过滤是为了不存入脏数据
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
