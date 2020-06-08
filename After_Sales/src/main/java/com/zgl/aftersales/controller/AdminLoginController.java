package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.dao.MyLog;
import com.zgl.aftersales.pojo.*;
import com.zgl.aftersales.service.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.ibatis.annotations.Param;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin //允许跨域
@RequestMapping(value ="/adminLoing",method = RequestMethod.POST)
@Slf4j

/**
 * @author GUANA
 */
public class AdminLoginController {
    @Autowired
    ItemsService itemsService;

    /**
     * 项目显示(分页处理)
     * @return
     */
    @PostMapping("/showItems/{currenPage}/{pageSize}")
    public  List<List<?>> showItems(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        List<List<?>>  itemsList=itemsService.selectAllItems(map);
        return itemsList;
    }

    /**
     * 项目查找(分页处理)
     * @param json
     * @return
     */
    @PostMapping("/searchItems/{currenPage}/{pageSize}")
    public List<List<?>> searchItems(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize ,@RequestBody JSONObject json){
        String key= StringEscapeUtils.escapeSql(json.getString("key"));

        String choice=json.getString("choice");
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        if(choice.equals("0")) {
            map.put("Item_id", key);
        }
        if (choice.equals("1")){
            map.put("Item_name", key);
        }
        if (choice.equals("2")){
            map.put("User_id", key);
        }


        List<List<?>>  itemsList=itemsService.fuzzyQuery(map);
        return itemsList;
    }

    /**
     * 问题处理对应关系显示(分页处理)
     */
    @Autowired
    MaintenanceService maintenanceService;
    @PostMapping("/showMaintenance/{currenPage}/{pageSize}")
    public List<List<?>> showMaintenance(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        List<List<?>> maintenanceList=maintenanceService.selectAll(map);
        return maintenanceList;

    }

    /**
     * 问题处理对应关系查找(分页处理)
     * @param json
     * @return
     */
    @PostMapping("/searchMaintenance/{currenPage}/{pageSize}")
    public List<List<?>> searchMaintenance(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize,@RequestBody JSONObject json){
        String key=StringEscapeUtils.escapeSql(json.getString("key"));
        String choice=json.getString("choice");
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        if(choice.equals("0")) {
            map.put("Question_id", key);
        }
        if (choice.equals("1")){
            map.put("User_id", key);
        }
        if (choice.equals("2")){
            map.put("Start_time", key);
        }
        List<List<?>> maintenanceList=maintenanceService.fuzzyQuery(map);
        return maintenanceList;
    }



    /**
     * 日志显示
     */
    @Autowired
    LogServive logServive;
    @PostMapping("/showLog/{currenPage}/{pageSize}")
    public List<List<?>> showLogs(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        List<List<?>> logList=logServive.showLog(map);
        return logList;
    }

    /**
     * 日志搜索
     * @param json
     * @param currenPage
     * @param pageSize
     * @return
     */
    @PostMapping("/searchLog/{currenPage}/{pageSize}")
    public List<List<?>> searchLog(@RequestBody JSONObject json ,@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        String key=StringEscapeUtils.escapeSql(json.getString("key"));
        String choice=json.getString("choice");
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        if(choice.equals("0")) {
            map.put("User_id", key);
        }
        if (choice.equals("1")){
            map.put("Operation", key);
        }
        if (choice.equals("2")){
            map.put("Method", key);
        }
        if (choice.equals("3")){
            map.put("IP", key);
        }
        if (choice.equals("4")){
            map.put("Creat_time", key);
        }
        List<List<?>> lists=logServive.saerchLog(map);
        return lists;
    }

    /**
     *@描述
     *@参数 显示faq
     *@返回值
     */
    @Autowired
    FAQService faqService;
    @PostMapping("/showfaq/{currenPage}/{pageSize}")
    public List<List<?>> showfaq(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        List<List<?>> lists=faqService.showFAQ(map);
        return  lists;
    }

    /**
     * 问题显示(分页处理)
     */
    @Autowired
    QuestionService questionService;
    @PostMapping("/showquestion/{currenPage}/{pageSize}")
    public List<List<?>> showQuestion(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize ){

        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);

        List<List<?>> questionList=questionService.showAllQuestions(map);
        return  questionList;
    }

    /**
     *问题查找(分页处理)
     * @param json
     * @return
     */

    @PostMapping("/searchquestion/{currenPage}/{pageSize}")
    public List<List<?>> serchQuestion(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize,@RequestBody JSONObject json){
        String key=StringEscapeUtils.escapeSql(json.getString("key"));
        String choice=json.getString("choice");
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);
        if(choice.equals("0")) {
            map.put("Question_id", key);
        }
        if (choice.equals("1")){
            map.put("item_id", key);
        }
        if (choice.equals("2")){
            map.put("Question_type", key);
        }
        if(choice.equals("3")) {
            map.put("Question_status", key);
        }
        if (choice.equals("4")){
            map.put("Question_detail", key);
        }
        if (choice.equals("5")){
            map.put("User_id", key);
        }
        if (choice.equals("6")){
            map.put("Commit_time", key);
        }

        List<List<?>> questionList=questionService.fuzzyQuery(map);
        return questionList;
    }

    /**
     * 用户显示
     * @param currenPage
     * @param pageSize
     * @return
     */
    @PostMapping("/showuser/{currenPage}/{pageSize}")
    public List<List<?>> showuser(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("currIndex",(currenPage-1)*pageSize);
        map.put("pageSize",pageSize);

        List<List<?>> lists=userService.showUser(map);
        return lists;

    }

    /**
     * 用户搜索
     * @param currenPage
     * @param pageSize
     * @param json
     * @return
     */
    @PostMapping("/searchuser/{currenPage}/{pageSize}")
    public List<List<?>> searchuser(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize,@RequestBody JSONObject json) {
        String key = StringEscapeUtils.escapeSql(json.getString("key"));
        String choice = json.getString("choice");
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("currIndex", (currenPage - 1) * pageSize);
        map.put("pageSize", pageSize);
        if (choice.equals("0")) {
            map.put("User_id", key);
        }
        if (choice.equals("1")) {
            map.put("User_name", key);
        }
        if (choice.equals("2")) {
            int k=Integer.parseInt(key);
            map.put("Role_id", k+1);
        }
        List<List<?>> lists=userService.searchUser(map);
        return lists;
    }





    /**
     * 任务分配——下拉框问题ID显示
     * @return
     */
    @PostMapping("/droplistID")
    public List<Integer> dropListID(){
        List<Integer> integerList=questionService.selectAll_id();
        Collections.sort(integerList);
        return integerList;

    }

    /**
     * 任务分配---根据问题号显示维修人员，且该维修人员先项目数<10
      * @param json
     * @return
     */
    @PostMapping("/wokername")
    public List<String> dropListWorker(@RequestBody JSONObject json){
        String questionID=json.getString("key");
        List<String> stringList=questionService.selectWorkerByQuesID(questionID);
        return stringList;
    }







    /**
     *管理员直接分配任务
     *
     */
    @Autowired
    UserService userService;
    @Autowired
    MailService mailService;
    @PostMapping("/allocation")
    @MyLog(value = "向maintenance表中添加数据，修改users中task_num字段，修改questions表中status字段")
    public Status allocationTask(@RequestBody JSONObject json){
        Status status=new Status();
        String questionID_String=json.getString("questionID");
        int questionID=Integer.parseInt(questionID_String);
        String workerName=json.getString("workerName");
        Maintenance maintenance=new Maintenance();

        Users worker=userService.selectByUsername(workerName);

        Date date_Date=new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String date=formatter.format(date_Date ).toString();

        try {
            Users user=userService.selectByUsername(workerName);
            maintenance.setQuestion_id(questionID);
            maintenance.setUser_id(user.getUser_id());
            maintenance.setStart_time(date);

            userService.updateTask_num(workerName);
            questionService.updateStatus(questionID_String);
            maintenanceService.insert(maintenance);

            //给维修人员发送邮箱提醒
            mailService.sendMail(worker.getEmail(),"您被分配了一条新任务，请查收","问题ID:"+questionID);




            status.setMsg("分配任务成功");
            status.setStatus(true);
        }catch (Exception e){
            status.setMsg("分配任务失败");
        }

        return status;

    }

    /**
     * 权限分配--添加权限
     * @param json
     * @return
     */
    @MyLog("动态分配权限--添加")
    @PostMapping("/addrole")
    public Status roleadd(@RequestBody JSONObject json){
        String user_id_string=json.getString("userID");
        int userID=Integer.parseInt(user_id_string);
        Status status=new Status();
        Map<String,Object> map=new HashMap<>();
        map.put("User_id",userID);

       try {
           String role_id_string=json.getString("roleID");
           int roleID=Integer.parseInt(role_id_string)+1;
           map.put("Role_id",roleID);
       }catch (Exception e){
           status.setMsg("权限修改失败,请选择角色在点击修改");
           return  status;
       }

        try {
            userService.insertRoleID(map);
            status.setMsg("权限修改成功");
            status.setStatus(true);
            return  status;
        }catch (Exception e){
            status.setMsg("权限修改失败,该用户已拥有此角色");
            return  status;
        }
    }

    /**
     * 权限分配--删除权限
     * @param json
     * @return
     */
    @MyLog("动态分配权限--删除")
    @PostMapping("/deleterole")
    public Status roledelete(@RequestBody JSONObject json){
        String user_id_string=json.getString("userID");
        int userID=Integer.parseInt(user_id_string);
        Status status=new Status();
        Map<String,Object> map=new HashMap<>();
        map.put("User_id",userID);
        try {
            String role_id_string=json.getString("roleID");
            int roleID=Integer.parseInt(role_id_string)+1;
            map.put("Role_id",roleID);
        }catch (Exception e){
            status.setMsg("权限删除失败,该用户没有课删除的角色");
            return  status;
        }

        try {
            userService.deleteRolID(map);
            status.setMsg("权限修改成功");
            status.setStatus(true);
            return  status;
        }catch (Exception e){
            status.setMsg("权限修改失败");
            return  status;
        }
    }

    /**
     * 显示处理超时的任务
     * @return
     */
    @PostMapping("/overtim_deal")
    public List<Question> overtimeAccepter(){
        List<Question> questionList=questionService.showOvertimeAccepte();
        return questionList;
    }

    /**
     * 显示超时未接收任务
     * @return
     */
    @PostMapping("/overtime_unaccept")
    public List<Question> overtimeUnaccepter(){
        List<Question> questionList=questionService.shoeOvertimeUnaccepte();
        return questionList;
    }

    /**
     *@描述  显示可选择成为项目负责人的维修人员
     *@参数
     *@返回值
     */
    @PostMapping("/item_worker")
    public List<?> showWorker(){
        return userService.showWorker();
    }

    /**
     * 项目负责人修改
     * @param json
     * @return
     */
    @PostMapping("/leaderEdit")
    @MyLog("修改项目负责人")
    public Status leaderEdit(@RequestBody JSONObject json){
        Status status=new Status();
        String itemID=json.getString("itemID");
        String userID=json.getString("userID");
        Map<String,Object> map=new HashMap<>();
        map.put("Item_id",itemID);
        map.put("Role_id","4");
        Subject subject = SecurityUtils.getSubject();
        List<Items> itemList=itemsService.select(map);
        Items item=itemList.get(0);
        String oldUserID=item.getUser_id();


        try {
            map.put("User_id",userID);
            if(userID.equals(oldUserID)){
                status.setMsg("修改失败，此用户以是该项目的负责人");
                return status;
            }
            maintenanceService.itemLeaderEdite(map);
            List<String> roleList=userService.showRolesByUserID(Integer.parseInt(userID));
            if(!roleList.contains("leader")){
                userService.insertRoleID(map);
            }


            map.remove("Item_id");
            map.put("User_id",oldUserID);
            if(itemsService.select(map) == null){
                userService.deleteRolID(map);
            }
            status.setStatus(true);
            status.setMsg("修改成功");
            return status;
        }catch (Exception e){

            e.printStackTrace();
            return status;
        }
    }

    /**
     * 显示所有角色
     */
    @Autowired
    RoleService roleService;
    @PostMapping("/role_show")
    public List<Map<String ,?>> roleShow(){
        return roleService.showAllRoles();
    }

    /**
     * 添加角色
     * @param json
     * @return
     */
    @PostMapping("/add_role")
    public Status addRole(@RequestBody JSONObject json){
        Status status=new Status();
        String rolename=json.getString("rolename");
        Map<String,?> map=new HashMap<>();

        try {
            roleService.selectByORoleName(rolename);
            if(map.isEmpty()){
                status.setMsg("添加失败,该角色已存在");
                status.setStatus(false);
                return status;
            }
            else {
                roleService.addRole(rolename);
            }

        }catch (Exception e){
            status.setMsg("添加失败");
            status.setStatus(false);
            e.printStackTrace();
            return status;
        }
        status.setMsg("添加成功");
        status.setStatus(true);
        return status;

    }

    @PostMapping("/delete_role")
    public Status deleteRole(@RequestBody JSONObject json){
        Status status=new Status();
        String roleID=json.getString("roleID");
        try {
            roleService.deleteRole(roleID);
        }catch (Exception e){
            status.setMsg("删除失败");
            status.setStatus(false);
            e.printStackTrace();
            return status;
        }
        status.setMsg("删除成功");
        status.setStatus(true);
        return status;
    }

    /**
     * 按roleID显示角色对应烦的资源
     * @param json
     * @return
     */
    @PostMapping("/role_have_resource")
    public List<String> roleHaveResource(@RequestBody JSONObject json){
        String roleID=json.getString("roleID");
        List<String> stringList=roleService.showHaveResourcr(roleID);
        return stringList;
    }

    /**
     * 显示角色可添加的资源
     * @param json
     * @return
     */
    @PostMapping("/role_dont_ave_resource")
    public List<String> roleDontHaveResource(@RequestBody JSONObject json){
        String roleID=json.getString("roleID");
        List<String> stringList=roleService.showDontHaveResourcr(roleID);
        return stringList;
    }

    /**
     * 给角色添加资源
     * @param json
     * @return
     */
    @PostMapping("/add_role_resource")
    public Status addRoleResource(@RequestBody JSONObject json) {
        Status status = new Status();
        String roleID = json.getString("roleID");
        String resource = json.getString("resource");
        try {

            roleService.addRoleResource(roleID, resource);

        } catch (Exception e) {
            status.setMsg("添加资源失败");
            status.setStatus(false);
            e.printStackTrace();
            return status;
        }
        status.setMsg("添加资源成功");
        status.setStatus(true);
        return status;
    }

    /**
     * 给角色删除资源
     * @param json
     * @return
     */
    @PostMapping("/delete_role_resource")
    public Status deleteRoleResource(@RequestBody JSONObject json) {
        Status status = new Status();
        String roleID = json.getString("roleID");
        String resource = json.getString("resource");
        try {

            roleService.deleteRoleResource(roleID, resource);

        } catch (Exception e) {
            status.setMsg("删除资源失败");
            status.setStatus(false);
            e.printStackTrace();
            return status;
        }
        status.setMsg("删除资源成功");
        status.setStatus(true);
        return status;
    }

    /**
     * 分页显示、搜索资源
     */
    @Autowired
    PermissionService permissionService;
    @PostMapping("/search_permission/{currenPage}/{pageSize}")
    public List<List<?>> searchPermission(@PathVariable("currenPage") int currenPage,@PathVariable("pageSize") int  pageSize,@RequestBody JSONObject json) {
        String key = StringEscapeUtils.escapeSql(json.getString("key"));
        String choice = json.getString("choice");
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("currIndex", (currenPage - 1) * pageSize);
        map.put("pageSize", pageSize);
        if (choice.equals("0")) {
            map.put("name", key);
        }
        if (choice.equals("1")) {
            map.put("perms", key);
        }

        List<List<?>> lists=permissionService.saerchPer(map);
        return lists;
    }

    /**
     * 添加资源
     * @param json
     * @return
     */
    @PostMapping("/permission_add")
    public Status permissionAdd(@RequestBody JSONObject json){
        Status status=new Status();
        String name=json.getString("name");
        String description=json.getString("description");
        String url=json.getString("url");
        String perms=json.getString("perms");
        String parent_id=json.getString("parent_id");
        String type=json.getString("type");
        Permission permission=new Permission();
        permission.setName(name);
        permission.setDescription(description);
        permission.setUrl(url);
        permission.setPerms(perms);
        permission.setParent_id(parent_id);
        permission.setType(type);
        try {
            permissionService.addPer(permission);
        }catch (Exception e){
            status.setMsg("添加失败");
            status.setStatus(false);
            e.printStackTrace();
            return status;
        }
        status.setMsg("添加成功");
        status.setStatus(true);
        return status;
    }

    @PostMapping("/permission_update")
    public Status permissionUpdate(@RequestBody JSONObject json){
        Status status=new Status();
        int  permission_id=Integer.parseInt(json.getString("permission_id"));
        String name=json.getString("name");
        String description=json.getString("description");
        String url=json.getString("url");
        String perms=json.getString("perms");
        String parent_id=json.getString("parent_id");
        String type=json.getString("type");
        Permission permission=new Permission();
        permission.setPermission_id(permission_id);
        permission.setName(name);
        permission.setDescription(description);
        permission.setUrl(url);
        permission.setPerms(perms);
        permission.setParent_id(parent_id);
        permission.setType(type);
        try {
            permissionService.updatePer(permission);
        }catch (Exception e){
            status.setMsg("更新失败");
            status.setStatus(false);
            e.printStackTrace();
            return status;
        }
        status.setMsg("更新成功");
        status.setStatus(true);
        return status;
    }

    @PostMapping("/delete_resource")
    public Status deleteResource(@RequestBody JSONObject json) {
        Status status = new Status();
        int permission_id = Integer.parseInt(json.getString("permission_id"));
        try {

            permissionService.deletePer(permission_id);

        } catch (Exception e) {
            status.setMsg("删除资源失败");
            status.setStatus(false);
            e.printStackTrace();
            return status;
        }
        status.setMsg("删除资源成功");
        status.setStatus(true);
        return status;
    }




















}
