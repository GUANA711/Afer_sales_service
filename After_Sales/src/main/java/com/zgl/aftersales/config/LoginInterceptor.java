package com.zgl.aftersales.config;


import com.zgl.aftersales.pojo.Status;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 登录拦截器
 *
 *   @author 赵官凌
 *
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("进入登录拦截器");
        if(request.getSession(false)!=null && request.getCookies()!=null){

            return true;
        }
        response.sendRedirect(request.getContextPath()+"/index.html");

        return true;
    }



}
