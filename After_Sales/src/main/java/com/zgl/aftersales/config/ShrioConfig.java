//package com.zgl.aftersales.config;
//
//import org.apache.commons.collections.map.LinkedMap;
//import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
//import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.LinkedHashMap;
//import java.util.Map;
//
///**
// * @author GUANA
// *
// */
//@Configuration
//public class ShrioConfig {
//    //ShiroFilterFactoryBean
//    @Bean
//    public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("securityManager") DefaultWebSecurityManager defaultWebSecurityManager ){
//        ShiroFilterFactoryBean bean=new ShiroFilterFactoryBean();
//        //设置安全管理器
//        bean.setSecurityManager(defaultWebSecurityManager);
//        //添加shiro过滤器
//        /**
//         * anon:无需认证即可访问
//         * authc:必须认证才能访问
//         * user:必须拥有记住我功能
//         * perms:拥有某个资源的权限才能访问
//         * roles:拥有某个角色权限才能访问
//         */
//        //拦截
//        Map<String,String> filterMap = new LinkedHashMap<>();
//        filterMap.put("/index.html","anon");
//        filterMap.put("/login_tags.html","anon");
//        filterMap.put("/user/*","anon");
//        filterMap.put("/faq/selectAllFAQ","authc");
//        filterMap.put("/faq/addFAQ","roles[admin]");
//        filterMap.put("/faq/addFAQ","roles[worker]");
//        filterMap.put("/admin.html","roles[admin]");
//        filterMap.put("/adminLoing/*","roles[admin]");
//        filterMap.put("/maintainer_homepage_login.html","roles[worker]");
//        filterMap.put("/worker/*","roles[worker]");
//        filterMap.put("/user_homepage_login.html","roles[user]");
//        filterMap.put("/question/*","roles[user]");
//        bean.setFilterChainDefinitionMap(filterMap);
//
//        //未获得权限界面
//        bean.setLoginUrl("/index.html");
//        bean.setUnauthorizedUrl("/index.html");
//        return bean;
//    }
//
//    //DefaultWebSecurityManager
//    @Bean(name="securityManager")
//    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("userRealm") UserRealm userRealm){
//        DefaultWebSecurityManager securityManager=new DefaultWebSecurityManager();
//        //绑定Realm
//        securityManager.setRealm(userRealm);
//        return securityManager;
//    }
//
//    //创建realm对象 需要自定义
//    @Bean
//    public  UserRealm userRealm(){
//        return new UserRealm();
//    }
//
//}
//
