//package com.zgl.aftersales.controller;
//import com.zgl.aftersales.dao.MyLog;
//import com.zgl.aftersales.pojo.Log;
//import com.zgl.aftersales.service.LogServive;
//import org.aspectj.lang.JoinPoint;
//import org.aspectj.lang.annotation.AfterReturning;
//import org.aspectj.lang.annotation.Aspect;
//import org.aspectj.lang.annotation.Pointcut;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import com.alibaba.fastjson.JSON;
//import org.aspectj.lang.reflect.MethodSignature;
//import javax.servlet.http.HttpServletRequest;
//import java.lang.reflect.Method;
//import java.util.Date;
//
///**
// * 系统日志：切面处理类
// * @author Alice
// */
//@Aspect
//@Component
//public class LogController {
//    @Autowired
//    private LogServive logServive;
//
//    //定义切点 @Pointcut
//    //在注解的位置切入代码
//    @Pointcut("@annotation( com.qfedu.rongzaiboot.annotation.MyLog)")
//    public void logPoinCut() {
//    }
//
//    //切面 配置通知
//    @AfterReturning("logPoinCut()")
//    public void saveSysLog(JoinPoint joinPoint) {
//        System.out.println("切面。。。。。");
//        //保存日志
//        Log log = new Log();
//
//        //从切面织入点处通过反射机制获取织入点处的方法
//        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
//        //获取切入点所在的方法
//        Method method = signature.getMethod();
//
//        //获取操作
//        MyLog myLog = method.getAnnotation(MyLog.class);
//        if (myLog != null) {
//            String value = myLog.value();
//            log.setOperation(value);//保存获取的操作
//        }
//
//        //获取请求的类名
//        String className = joinPoint.getTarget().getClass().getName();
//        //获取请求的方法名
//        String methodName = method.getName();
//        log.setMethod(className + "." + methodName);
//
//        //请求的参数
//        Object[] args = joinPoint.getArgs();
//        //将参数所在的数组转换成json
//        String params = JSON.toJSONString(args);
//        log.setParams(params);
//
//        log.setCreateDate(new Date());
//        //获取用户名
//        log.setUsername(ShiroUtils.getUserEntity().getUsername());
//        //获取用户ip地址
//        HttpServletRequest request = HttpContextUtils.getHttpServletRequest();
//        log.setIp(IPUtils.getIpAddr(request));
//
//        //调用service保存SysLog实体类到数据库
//        logServive.save(log);
//    }
//
//}
