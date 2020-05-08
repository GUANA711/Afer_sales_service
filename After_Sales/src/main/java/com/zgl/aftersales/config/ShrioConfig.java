package com.zgl.aftersales.config;

import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ShrioConfig {
    //ShiroFilterFactoryBean

    //DefaultWebSecurityManager


    //创建realm对象 需要自定义
    @Bean
    public  UserRealm userRealm(){
        return new UserRealm();
    }

}

