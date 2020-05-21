package com.zgl.aftersales.config;

import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author GUANA
 */
//自定义的Realm
public class UserRealm extends AuthorizingRealm {
    @Autowired
    UserService userService;
    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //System.out.println("执行了授权");
        Users user =(Users) principalCollection.getPrimaryPrincipal();
        //获取当前用户角色
        List<String> roleNameList=userService.showRolesByUserID(user.getUser_id());

        //获取用户权限
        Set<String> perset =new HashSet();
        for(String rolename:roleNameList){
            List<String> permitList=userService.selectPreByRole(rolename);
            System.out.println(permitList);
            for(String perlist_for:permitList){
                String permlist=perlist_for;
                for( String perset_for:permlist.split(";")){
                     perset.add(perset_for);
                }


            }
        }

        SimpleAuthorizationInfo info=new SimpleAuthorizationInfo();
        //添加角色
        info.addRoles(roleNameList);
        //如果是项目组组长，授权leader角色
        if(userService.isLeader(user.getUser_id())!=0){
             info.addRole("leader");
        }
        //添加权限
        info.addStringPermissions(perset);





        return info;
    }

    // 认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        UsernamePasswordToken userToken=(UsernamePasswordToken) authenticationToken;
        Users user=userService.selectByUsername(userToken.getUsername());
        if(user==null)
        {
            return null;//抛出用户不存在异常
        }
        return new SimpleAuthenticationInfo(user,user.getPassword(),"");
    }
}
