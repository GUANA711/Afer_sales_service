package com.zgl.aftersales.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional

public class MaileImpl{
    @Value("${spring.mail.username}")
    private String from;
    @Autowired
    private JavaMailSender mailSender;

    public void sendMail(String to, String title, String content) {
        SimpleMailMessage message=new SimpleMailMessage();
        message.setFrom(from);
        System.out.println(from);
        message.setSubject(title);
        System.out.println(title);
        message.setTo(to);
        System.out.println(to);
        message.setText(content);
        System.out.println(content);
        mailSender.send(message);
        System.out.println(message);
    }
}
