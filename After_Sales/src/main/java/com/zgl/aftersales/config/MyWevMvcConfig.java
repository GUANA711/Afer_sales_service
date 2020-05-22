package com.zgl.aftersales.config;

        import org.springframework.context.annotation.Configuration;
        import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
        import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * 等登录拦截器
 * @author GUANA
 */
@Configuration
public class MyWevMvcConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**").excludePathPatterns("/login_tags.html", "/css/*", "/img/*", "/js/*", "/index.html", "/user/*","/faq/selectAllFAQ");

    }
}
