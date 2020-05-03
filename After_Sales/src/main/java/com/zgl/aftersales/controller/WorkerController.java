package com.zgl.aftersales.controller;

import com.alibaba.fastjson.JSONObject;
import com.zgl.aftersales.pojo.Maintenance;
import com.zgl.aftersales.pojo.Users;
import com.zgl.aftersales.pojo.WorkerStatus;
import com.zgl.aftersales.service.MaintenanceService;
import com.zgl.aftersales.service.WorkerService;
import com.zgl.aftersales.utiles.DesDecodeUtiles;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;


/**
 * @author Alice
 */
@RestController
@ResponseBody
@CrossOrigin //允许跨域
@Slf4j
public class WorkerController {
    @Autowired
    private WorkerService workerService;

    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    /**
     * login之后会产生一个session，session里面保存的为当前登录的user_id,
     *      根据user_id来显示维修人员的信息
     *      测试时需先登录
     * @param req
     * @return
     */
    @RequestMapping(value = "/worker_selectBy_Session_UserId",method = RequestMethod.GET)
    public Users worker_selectBy_Session_UserId(HttpServletRequest req){

       //将登录的session的User_id取出来
        int User_id= (int) req.getSession(false).getAttribute("userID");

        Users user=workerService.worker_selectBy_Session_UserId(User_id);

        //密码解密之后输出
        user.setPassword(DesDecodeUtiles.getDecryptString(user.getPassword()));
        return user;
    }


    /**
     * login之后会产生一个session，session里面保存的为当前登录的user_id,
     *     根据user_id来修改维修人员的信息
     *     测试时需先登录
     * @param json
     * @param req
     * @return
     */
    @PostMapping("/worker_updateBy_Session_UserId")
    public Map<String, Object> worker_updateBy_Session_UserId(@RequestBody JSONObject json, HttpServletRequest req) {

        //将登录的session的User_id取出来
        int User_id = (int) req.getSession(false).getAttribute("userID");

        Map<String, Object> map = new HashMap<String, Object>();

        //修改信息时要注意是否满足要求

        //从前端输入的username
        String username = json.getString("User_name");
        String password = json.getString("Password");
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

        //不能全为数字，可以包含下划线
        String patternUserName = "^(?!\\d+$)[\\da-zA-Z_\\u4E00-\\u9FA5]+$";
        //必须由数字和字母组成，且长度大于6
        String patternPwd = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$";
        String patternTel = "^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$";
        String patternMail = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
        if (Pattern.matches(patternUserName, username) && !username.equals("")) {
            if (Pattern.matches(patternPwd, password) && !password.equals("")) {
                if (Pattern.matches(patternTel, tel) && !tel.equals("")) {
                    if (Pattern.matches(patternMail, email) && !email.equals("")) {
                        try {
                            map.put("User_id",User_id);
                            map.put("User_name",json.getString("User_name"));
                            map.put("Password", DesDecodeUtiles.getEncryptString(json.getString("Password")));
                            map.put("Tel",json.getString("Tel"));
                            map.put("Email",json.getString("Email"));
                            map.put("isupdate","修改成功");
                            workerService.worker_updateBy_Session_UserId(map);
                        } catch (Exception e) {
                            map.put("User_id",User_id);
                            map.put("User_name",workerService.worker_selectBy_Session_UserId(User_id).getUser_name());
                            map.put("Password", DesDecodeUtiles.getEncryptString(workerService.worker_selectBy_Session_UserId(User_id).getPassword()));
                            map.put("Tel",workerService.worker_selectBy_Session_UserId(User_id).getTel());
                            map.put("Email",workerService.worker_selectBy_Session_UserId(User_id).getEmail());
                            map.put("isupdate","修改失败,该用户名已存在");
                        }
                    } else {
                        map.put("User_id",User_id);
                        map.put("User_name",workerService.worker_selectBy_Session_UserId(User_id).getUser_name());
                        map.put("Password", DesDecodeUtiles.getEncryptString(workerService.worker_selectBy_Session_UserId(User_id).getPassword()));
                        map.put("Tel",workerService.worker_selectBy_Session_UserId(User_id).getTel());
                        map.put("Email",workerService.worker_selectBy_Session_UserId(User_id).getEmail());
                        map.put("isupdate","修改邮箱失败，请输入正确邮箱");
                    }
                } else {
                    map.put("User_id",User_id);
                    map.put("User_name",workerService.worker_selectBy_Session_UserId(User_id).getUser_name());
                    map.put("Password", DesDecodeUtiles.getEncryptString(workerService.worker_selectBy_Session_UserId(User_id).getPassword()));
                    map.put("Tel",workerService.worker_selectBy_Session_UserId(User_id).getTel());
                    map.put("Email",workerService.worker_selectBy_Session_UserId(User_id).getEmail());
                    map.put("isupdate","修改电话号码失败，请输入正确的电话号码");
                }
            } else {
                map.put("User_id",User_id);
                map.put("User_name",workerService.worker_selectBy_Session_UserId(User_id).getUser_name());
                map.put("Password", DesDecodeUtiles.getEncryptString(workerService.worker_selectBy_Session_UserId(User_id).getPassword()));
                map.put("Tel",workerService.worker_selectBy_Session_UserId(User_id).getTel());
                map.put("Email",workerService.worker_selectBy_Session_UserId(User_id).getEmail());
                map.put("isupdate","修改密码失败，密码格式错误，必须由数字和字母组成，且长度大于6");
            }
        }else {
            map.put("User_id",User_id);
            map.put("User_name",workerService.worker_selectBy_Session_UserId(User_id).getUser_name());
            map.put("Password", DesDecodeUtiles.getEncryptString(workerService.worker_selectBy_Session_UserId(User_id).getPassword()));
            map.put("Tel",workerService.worker_selectBy_Session_UserId(User_id).getTel());
            map.put("Email",workerService.worker_selectBy_Session_UserId(User_id).getEmail());
            map.put("isupdate","修改失败，用户名不符合格式，不能全为数字，可以包含下划线");
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
    public WorkerStatus worker_receive(@RequestBody JSONObject json, HttpServletRequest req) {

        //将登录的session的User_id取出来
        int User_id = (int) req.getSession(false).getAttribute("userID");

        WorkerStatus workerStatus=new WorkerStatus();
        String questionID_String=json.getString("questionID");
        int questionID=Integer.parseInt(questionID_String);
        Maintenance maintenance=new Maintenance();

        Date date_Date=new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String date=formatter.format(date_Date ).toString();

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
        }
        return workerStatus;
    }

    /**
     * 维修人员完成任务后修改question表问题的状态为done
     * 修改task_Num-1
     */
    @PostMapping("/worker_finish")
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
     *
     * 已提醒维修人员超时，三天后维修人员还是未处理任务，更改question状态unaccepted，将maintenance表
     * 中这一记录删掉，任务由管理人员直接分配
     *
     */

}
