//package com.zgl.aftersales.config;
//
//
//import com.zgl.aftersales.pojo.Status;
//
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.io.PrintWriter;
//
////登录拦截器
//@Component
//public class LoginInterceptor implements HandlerInterceptor {
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//
//        if(request.getSession(false)!=null && request.getCookies()!=null){
//            returnJson(response,request);
//            return false;
//        }
//
//        return true;
//    }
//
//    private void returnJson(HttpServletResponse resp,HttpServletRequest req) throws IOException {
//        HttpServletResponse httpResponse = (HttpServletResponse) resp;
//        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
//        httpResponse.setHeader("Access-Control-Allow-Origin", req.getHeader("Origin"));
//        PrintWriter writer=resp.getWriter();
//        resp.setCharacterEncoding("UTF-8");
//        resp.setContentType("application/json; charset=utf-8");
//
//        Status status=new Status();
//        status.setStatus(false);
//        status.setMsg("用户未登录");
//        status.setCode(403);
//        writer.print(status);
//        writer.close();
//
//    }
//
//}
