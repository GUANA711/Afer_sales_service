package com.zgl.aftersales.config;

        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.context.annotation.Configuration;
        import org.springframework.web.servlet.config.annotation.CorsRegistry;
        import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
        import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
        import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

        import java.util.ArrayList;
        import java.util.List;

/**
 * 等登录拦截器
 * @author 赵官凌
 */
@Configuration
public class MyWevMvcConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**").excludePathPatterns("/login_tags.html", "/css/*", "/img/*","/js/*","/index.html");
    }
}
