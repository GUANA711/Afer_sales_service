package com.zgl.aftersales.controller;


import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.dao.MyLog;
import com.zgl.aftersales.pojo.Status;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.MailService;
import com.zgl.aftersales.service.UserService;
import com.zgl.aftersales.utiles.DesDecodeUtiles;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.web.bind.annotation.*;


import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Pattern;

/**
 * @author GUANA
 */
@RestController
@CrossOrigin //允许跨域
@RequestMapping(value ="/user",method = RequestMethod.POST)
@Slf4j

public class LoginController {
    @Autowired
    private UserService userService;
    @Autowired
    private MailService mailService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 注册
     *
     * @param json
     * @return
     */
    @PostMapping("/register")
    @MyLog(value = "添加数据到users表")
    public Status addUser(@RequestBody JSONObject json){

        JSONObject userJson=json.getJSONObject("user");
        Users user=new Users();
        user.setUser_name(StringEscapeUtils.escapeSql(userJson.getString("User_name")));
        user.setPassword(StringEscapeUtils.escapeSql(userJson.getString("Password")));
        user.setTel(StringEscapeUtils.escapeSql(userJson.getString("Tel")));
        user.setEmail(StringEscapeUtils.escapeSql(userJson.getString("Email")));

        String repwd=json.getString("repwd");


        System.out.println(user);
        Status status=new Status();
        Boolean flag=true;

        String userName=user.getUser_name();
        String pwd=user.getPassword();
        String tel=user.getTel();
        String mail=user.getEmail();

        //不能全为数字，可以包含下划线
        String patternUserName="^(?!\\d+$)[\\da-zA-Z_\\u4E00-\\u9FA5]+$";
        String patternPwd= "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$";//必须由数字和字母组成，且长度大于6
        String patternTel="^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$";
        String patternMail="^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
        if(Pattern.matches(patternUserName,userName)&&!userName.equals("")){
            if(Pattern.matches(patternPwd,pwd)&&!pwd.equals("")){
                if(repwd.equals(pwd)) {

                    if (Pattern.matches(patternTel, tel) && !tel.equals("")) {
                        if (Pattern.matches(patternMail, mail) && !mail.equals("")) {
                            try {
                                userService.addUser(user);
                                Users selectUser=userService.selectByUsername(userName);
                                int userID=selectUser.getUser_id();
                                Map<String,Object> map=new HashMap<>();
                                map.put("User_id",userID);
                                map.put("Role_id","3");
                                userService.insertRoleID(map);
                                status.setStatus(true);
                                status.setMsg("注册成功");
                            }
                            catch (Exception e){
                                status.setMsg("注册失败,该用户已存在" );

                            }

                        } else {
                            status.setMsg("注册失败，请输入正确邮箱");
                        }
                    } else {
                        status.setMsg("注册失败，请输入正确的电话号码");
                    }
                }else {
                    status.setMsg("注册失败，密码确认失败");
                }

            }else {
                status.setMsg("注册失败，密码格式错误");
            }


        }else {
            status.setMsg("注册失败，用户名不符合格式");
        }

        return status;

    }

    /**
     * 登录
     * @param json
     * @param req
     * @param resp
     * @return
     */
    @PostMapping("/login")
    @MyLog("用户登录")
    public Status selectByUsername(@RequestBody JSONObject json, HttpServletRequest req,HttpServletResponse resp){
        DesDecodeUtiles desDecodeUtiles=new DesDecodeUtiles();
        Status status=new Status();
        //前台传入的用户名
        String loginUsername=json.getString("username");
        //前台传入的密码
        String loginPwd=StringEscapeUtils.escapeSql(json.getString("pwd"));
       Users user=userService.selectByUsername(loginUsername);
       String codPwd=DesDecodeUtiles.getEncryptString(loginPwd);
        //获取当前用户

        //封装用户登录数据
        UsernamePasswordToken token=new UsernamePasswordToken(loginUsername,codPwd);
        try {
            SecurityUtils.getSubject().login(token);
            Subject subject= SecurityUtils.getSubject();
            HttpSession seesion=req.getSession(true);
            seesion.setAttribute("userID",user.getUser_id());
            System.out.println(subject.hasRole("admin"));
            List<String> list=userService.showRolesByUserID(user.getUser_id());
            if(subject.hasRole("admin")){
                status.setData("admin.html");
            }else if(subject.hasRole("worker")){
                status.setData("maintainer_homepage_login.html");
            }else if(subject.hasRole("user")){
                status.setData("user_homepage_login.html");
            }else {
                status.setCode(5);//没有权限
            }

            status.setMsg("登录成功");
            status.setStatus(true);
            return status;
        }catch (UnknownAccountException e){
            status.setMsg("该用户不存在");
            return status;
        }catch (IncorrectCredentialsException e){
            status.setMsg("密码错误");
            return status;
        }

    }

    /**
     * 邮箱验证码发送
     *
     * @param json
     * @param req
     * @return
     */
    @PostMapping("/mailSend")
    public Status mailSend(@RequestBody JSONObject json,HttpServletRequest req){

        String toMail=json.getString("mail");
        Status status=new Status();
        String patternMail="^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
        if(Pattern.matches(patternMail,toMail)){
            if(userService.selectByEmail(toMail)!=null){
                String checkCode = String.valueOf(new Random().nextInt(899999) + 100000);

                try {
                    mailService.sendMail(toMail,"软件售后服务公司验证码","您的验证码是："+checkCode);

                    status.setMsg("验证码发送成功");
                    status.setData(checkCode);
                    status.setStatus(true);
                    ServletContext servletContext =req.getServletContext();
                    servletContext.setAttribute("code",checkCode);


                }catch (Exception e){
                    status.setMsg("验证码发送失败");
                    e.printStackTrace();
                }
            }else {
                status.setMsg("该邮箱不存在");
            }
        }else {
            status.setMsg("请输入正确邮箱");
        }
        //生成随机验证码

        return status;
    }

    /**
     * 密码重置
     * @param json
     * @param req
     * @return
     */
    @PostMapping("/resetpwd")
    @MyLog(value = "修改users表中的pwd字段")
    public Status resetpwd(@RequestBody JSONObject json,HttpServletRequest req){
        Status status=new Status();
        DesDecodeUtiles desDecodeUtiles=new DesDecodeUtiles();
        Map<String,String> map=new HashMap<String,String>();
        ServletContext servletContext = req.getServletContext();
        String mail=json.getString("mail");
        String checkCode=(String)servletContext.getAttribute("code");

        String postCheckCode=json.getString("checkcode");
        System.out.println(checkCode+";"+postCheckCode);
        String newPwd=json.getString("newPwd");
        String rePwd=json.getString("rePwd");

        String patternPwd= "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$";//必须由数字和字母组成，且长度大于6

        if(checkCode.equals(postCheckCode)){
            if(Pattern.matches(patternPwd,newPwd)){
                if(newPwd.equals(rePwd)){
                    map.put("pwd",DesDecodeUtiles.getEncryptString(newPwd));
                    map.put("mail",mail);
                    userService.updateByEmailToPwd(map);
                    status.setMsg("密码重置成功！");
                    status.setStatus(true);
                }else {
                    status.setMsg("重置失败，两次密码输入不相同");
                }
            }else{
                status.setMsg("重置失败，密码格式错误，必须包含字母和数字");
            }
        }else {
            status.setMsg("重置失败，验证码错误");
        }
        return status;
    }

    /**
     * 注销
     * @param
     * @param resp
     */
    @PostMapping("/logout")
    public int logout(HttpServletResponse resp) throws IOException {
        Subject subject = SecurityUtils.getSubject();
        try {
            if (subject.isAuthenticated()) {
                subject.logout();
                return 1;//注销成功
            }
            return 0;
        } catch (Exception e) {
            return 0;//注销失败
        }


    }

    /**
     * 传递用户角色
     * @param req
     * @return
     */
    @PostMapping("/hasroles")
    public List<String> hasRoles(HttpServletRequest req){
        HttpSession session=req.getSession(false);
        int userID=(int)session.getAttribute("userID");
        List<String> list=userService.showRolesByUserID(userID);
        return list;


    }



}

