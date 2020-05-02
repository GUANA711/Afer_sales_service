package com.zgl.aftersales.service;

import javax.annotation.Resource;

@Resource
public interface MailService {
    void sendMail(String to,String title,String content);
}
