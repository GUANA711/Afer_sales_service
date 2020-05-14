package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.dao.MyLog;
import com.zgl.aftersales.pojo.Maintenance;
import com.zgl.aftersales.pojo.Question;
import com.zgl.aftersales.pojo.WorkerStatus;
import com.zgl.aftersales.service.MaintenanceService;
import com.zgl.aftersales.service.WorkerService;
import com.zgl.aftersales.utiles.DesDecodeUtiles;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.omg.CORBA.SystemException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;


/**
 * @author Alice
 */
@RestController//默认返回json类型数据
@ResponseBody
@CrossOrigin //允许跨域
@RequestMapping(value ="/worker")
@Slf4j
public class WorkerController {
    @Autowired
    private WorkerService workerService;

    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    /**
     * 根据session得到userID查询用户信息
     * 查询时不能查询出密码
     * @param req
     * @return
     */
    @RequestMapping(value = "/worker_selectBy_Session_UserId",method = RequestMethod.GET)
    public Map<String, Object> worker_selectBy_Session_UserId(HttpServletRequest req){

        int User_id= (int) req.getSession(false).getAttribute("userID");
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("User_id",User_id);
        map.put("User_name",workerService.worker_selectBy_Session_UserId(User_id).getUser_name());
        map.put("Tel",workerService.worker_selectBy_Session_UserId(User_id).getTel());
        map.put("Email",workerService.worker_selectBy_Session_UserId(User_id).getEmail());
        map.put("Task_num",workerService.worker_selectBy_Session_UserId(User_id).getTask_num());
        map.put("Role_id",workerService.worker_selectBy_Session_UserId(User_id).getRole_id());
        map.put("Item_id",workerService.worker_selectBy_Session_UserId(User_id).getItem_id());

        return map;
    }

    /**
     * 根据session得到userID来修改维修人员的信息
     * @param json
     * @param req
     * @return
     */
    @PostMapping("/worker_updateBy_Session_UserId")
    @MyLog(value = "修改users表用户的信息")  //这里添加了AOP的自定义注解
    public Map<String, Object> worker_updateBy_Session_UserId(@RequestBody JSONObject json, HttpServletRequest req) {

        //将登录的session的User_id取出来
        int User_id = (int) req.getSession(false).getAttribute("userID");

        Map<String, Object> map = new HashMap<String, Object>();

        String username = json.getString("User_name");
        String tel = json.getString("Tel");
        String email = json.getString("Email");

        /**
         * 验证手机号码
         *
         * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
         * 联通号码段:130、131、132、136、185、186、145
         * 电信号码段:133、153、180、189
         *
         * @param cellphone
         * @return
         */


        String patternTel = "^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$";
        String patternMail = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
        if (!username.equals("")) {
            if (Pattern.matches(patternTel, tel) && !tel.equals("")) {
                if (Pattern.matches(patternMail, email) && !email.equals("")) {
                    try {
                        map.put("User_id",User_id);
                        map.put("User_name",json.getString("User_name"));
                        map.put("Tel",json.getString("Tel"));
                        map.put("Email",json.getString("Email"));
                        map.put("status","修改成功");
                        map.put("code","0");
                        workerService.worker_updateBy_Session_UserId(map);
                    } catch (Exception e) {
                        map.put("User_id",User_id);
                        map.put("User_name",workerService.worker_selectBy_Session_UserId(User_id).getUser_name());
                        map.put("Tel",workerService.worker_selectBy_Session_UserId(User_id).getTel());
                        map.put("Email",workerService.worker_selectBy_Session_UserId(User_id).getEmail());
                        map.put("status","修改失败,该用户名已存在");
                        map.put("code","-1");
                    }
                } else {
                    map.put("User_id",User_id);
                    map.put("User_name",workerService.worker_selectBy_Session_UserId(User_id).getUser_name());
                    map.put("Tel",workerService.worker_selectBy_Session_UserId(User_id).getTel());
                    map.put("Email",workerService.worker_selectBy_Session_UserId(User_id).getEmail());
                    map.put("status","修改邮箱失败，请输入正确邮箱");
                    map.put("code","-1");
                }
            } else {
                map.put("User_id",User_id);
                map.put("User_name",workerService.worker_selectBy_Session_UserId(User_id).getUser_name());
                map.put("Tel",workerService.worker_selectBy_Session_UserId(User_id).getTel());
                map.put("Email",workerService.worker_selectBy_Session_UserId(User_id).getEmail());
                map.put("status","修改电话号码失败，请输入正确的电话号码");
                map.put("code","-1");
            }
        }else {
            map.put("User_id",User_id);
            map.put("User_name",workerService.worker_selectBy_Session_UserId(User_id).getUser_name());
            map.put("Password", DesDecodeUtiles.getEncryptString(workerService.worker_selectBy_Session_UserId(User_id).getPassword()));
            map.put("Tel",workerService.worker_selectBy_Session_UserId(User_id).getTel());
            map.put("Email",workerService.worker_selectBy_Session_UserId(User_id).getEmail());
            map.put("status","修改失败，用户名不能为空");
            map.put("code","-1");
        }
       return map;
    }

    /**
     * 维修人员接收任务后将数据插入到maintenance
     * 修改question表问题的状态为accept
     * 修改task-Num+1
     */
    @Autowired
    private MaintenanceService maintenanceService;
    @PostMapping("/worker_receive")
    @MyLog(value = "插入数据到maintenance表，修改question表的问题状态为accept，修改users表的task-Num+1")
    public WorkerStatus worker_receive(@RequestBody JSONObject json, HttpServletRequest req) {

        //true是没有session就新建一个  false是没有session就是null
        //将登录的session的User_id取出来
        int User_id = (int) req.getSession(false).getAttribute("userID");

        WorkerStatus workerStatus=new WorkerStatus();
        String questionID_String=json.getString("questionID");
        int questionID=Integer.parseInt(questionID_String);
        Maintenance maintenance=new Maintenance();

        Date date_Date=new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String date=formatter.format(date_Date).toString();

        try {
            maintenance.setQuestion_id(questionID);
            maintenance.setUser_id(User_id);
            maintenance.setStart_time(date);

            maintenanceService.insert(maintenance);
            workerService.worker_update_ques_accept(questionID_String);
            workerService.worker_update_addtaskNum(User_id);

            workerStatus.setMsg("接收任务成功");
            workerStatus.setStatus(true);
        }catch (Exception e){
            workerStatus.setMsg("接收任务失败");
            System.out.println(e);
        }
        return workerStatus;
    }

    /**
     * 维修人员完成任务后修改question表问题的状态为done
     * 修改task_Num-1
     */
    @PostMapping("/worker_finish")
    @MyLog(value = "修改question表的问题状态为done，修改users表的task-Num-1")
    public WorkerStatus worker_finish(@RequestBody JSONObject json, HttpServletRequest req) {

        //将登录的session的User_id取出来
        int User_id = (int) req.getSession(false).getAttribute("userID");

        WorkerStatus workerStatus=new WorkerStatus();
        String questionID_String=json.getString("questionID");

        Date date_Date=new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String date=formatter.format(date_Date ).toString();

        try {
            workerService.worker_update_ques_done(questionID_String);
            workerService.worker_update_reducetaskNum(User_id);

            workerStatus.setMsg("已完成任务");
            workerStatus.setStatus(true);
        }catch (Exception e){
            workerStatus.setMsg("未完成任务");
        }
        return workerStatus;
    }

    /**
     * 维修人员超过三天未接受任务，将问题的状态设置为overtime，任务由管理人员直接分配
     *
     * 维修人员接收任务三天未处理，将问题的状态设置为overtime，此时维修人员会被提醒，还是可以处理任务
     * update questions q,maintenance m set Question_status='overtime' where q.Question_id=m.Question_id and TIMESTAMPDIFF(DAY,m.Start_time,NOW())>3 and Question_status='accepted'
     *
     * 已提醒维修人员超时，三天后维修人员还是未处理任务，更改question状态unaccepted，将maintenance表
     * 中这一记录删掉，任务由管理人员直接分配
     *update questions q,maintenance m set Question_status='unaccepted' where q.Question_id=m.Question_id and TIMESTAMPDIFF(DAY,m.Start_time,NOW())>6 and Question_status='overtime'
     * delete from maintenance where TIMESTAMPDIFF(DAY,Start_time,NOW())>6
     */

    /**
     * 显示未接收得任务
     * @param req
     * @return
     */
    @RequestMapping(value = "/worker_show_unaccepted",method = RequestMethod.GET)
    public List<Question> worker_show_unaccepted(HttpServletRequest req){

        int User_id= (int) req.getSession(false).getAttribute("userID");
        return workerService.worker_show_unaccepted(User_id);
    }

    /**
     * 显示正在处理得任务
     * @param req
     * @return
     */
    @RequestMapping(value = "/worker_show_accepted",method = RequestMethod.GET)
    public List<Map<String, Object>> worker_show_accepted(HttpServletRequest req){

        int User_id= (int) req.getSession(false).getAttribute("userID");
        return workerService.worker_show_accepted(User_id);
    }

    /**
     * 显示已完成得任务
     * @param req
     * @return
     */
    @RequestMapping(value = "/worker_show_done",method = RequestMethod.GET)
    public List<Question> worker_show_done(HttpServletRequest req){

        int User_id= (int) req.getSession(false).getAttribute("userID");
        return workerService.worker_show_done(User_id);
    }

    /**
     *
     */

}
