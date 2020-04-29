package com.zgl.aftersales.config;

        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.context.annotation.Configuration;
        import org.springframework.web.servlet.config.annotation.CorsRegistry;
        import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
        import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
        import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

        import java.util.ArrayList;
        import java.util.List;

@Configuration
public class MyWevMvcConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE")
                //针对header单独设置，不然无法获取header中的请求信息，前端也无法拿到响应中的                    header信息，OPTIONS请求也会经过拦截器，在进行登录拦截时候要注意特殊处理
                .allowedHeaders("*")
                .exposedHeaders("access-control-allow-headers",
                        "access-control-allow-methods",
                        "access-control-allow-origin",
                        "access-control-max-age",
                        "X-Frame-Options")
                .maxAge(3600)
                .allowCredentials(true);
        }
    @Autowired
    private LoginInterceptor loginInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        List<String> patterns = new ArrayList();
        patterns.add("/webjars/**");
        patterns.add("/druid/**");
        patterns.add("/sys/login");
        patterns.add("/swagger/**");
        patterns.add("/v2/api-docs");
        patterns.add("/swagger-ui.html");
        patterns.add("/swagger-resources/**");
        patterns.add("/login");

        registry.addInterceptor(loginInterceptor).addPathPatterns("/**").addPathPatterns(patterns);
    }


}
