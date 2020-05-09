//package com.zgl.aftersales.config;
//
//import com.zgl.aftersales.pojo.Users;
//import com.zgl.aftersales.service.UserService;
//import org.apache.shiro.authc.*;
//import org.apache.shiro.authz.AuthorizationInfo;
//import org.apache.shiro.authz.SimpleAuthorizationInfo;
//import org.apache.shiro.realm.AuthorizingRealm;
//import org.apache.shiro.subject.PrincipalCollection;
//import org.springframework.beans.factory.annotation.Autowired;
//
//
//import java.util.List;
//
///**
// * @author GUANA
// */
////自定义的Realm
//public class UserRealm extends AuthorizingRealm {
//    @Autowired
//    UserService userService;
//    //授权
//    @Override
//    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
//        System.out.println("执行了授权");
//        Users user =(Users) principalCollection.getPrimaryPrincipal();
//        System.out.println(user);
//        //获取当前用户角色
//        List<String> roleNameList=userService.showRolesByUserID(user.getUser_id());
//        SimpleAuthorizationInfo info=new SimpleAuthorizationInfo();
//        info.addRoles(roleNameList);
//        //获取权限
//        List<String> permitList=userService.showPermitByUserID(user.getUser_id());
//        info.addStringPermissions(permitList);
//
//        return info;
//    }
//
//    // 认证
//    @Override
//    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
//        UsernamePasswordToken userToken=(UsernamePasswordToken) authenticationToken;
//        Users user=userService.selectByUsername(userToken.getUsername());
//        if(user==null)
//        {
//            return null;//抛出用户不存在异常
//        }
//        return new SimpleAuthenticationInfo(user,user.getPassword(),"");
//    }
//}
