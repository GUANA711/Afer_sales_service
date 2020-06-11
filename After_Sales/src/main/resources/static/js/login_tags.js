var isValidata = false;
$(document).ready(function(){
        var bgs = new Array(4);
        bgs[0] = "img/bg4.jpg";
        bgs[3] = "img/bg2.jpg";
        bgs[1] = "img/bg3.jpg";
        bgs[2] = "img/bg1.jpg";
        var curIndex = 0;
        function changeBackground(){
            if (curIndex == bgs.length - 1) {
                curIndex = 0;
                } else {
                curIndex += 1;
                }
                $('.bgImg').css("background-image", "url("+bgs[curIndex]+")").fadeOut(0).fadeIn(1200);
        } 
        setInterval(changeBackground,5000);
        $('.form_tags ul li').click(function() {                        //tags的切换
                var i = $(this).index()-1;
                // console.log(i);
                if (i!=-1) {
                        $(this).addClass('active').siblings().removeClass('active');
                        $('#forms .itme').eq(i).addClass('active').siblings().removeClass('active');
                }
        });
        SlidingValidation.create($('#slide'),{},function(){isValidata = true;}); 
        //验证码的计时timer处理函数
        var InterValObj; //timer变量，控制时间
        var count = 60; //间隔函数，1秒执行
        var curCount;//当前剩余秒数
        function SetRemainTime() {
                if (curCount == 0) {                
                        window.clearInterval(InterValObj);//停止计时器
                        $("#getCode").removeAttr("disabled");//启用按钮
                        $("#getCode").text("重新发送");
                }
                else {
                        curCount--;
                        $("#getCode").attr("disabled", true);
                        $("#getCode").text("重新发送("+ curCount + ")");
                }
        }
        //验证码
        $("#getCode").click(function (e) { 
                var pwd_email = $("input[name=pwd_email]").val();
                var email_reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
                if (!email_reg.test(pwd_email)) {
                        alert("邮箱不正确！");
                }else{
                        curCount = count;               //时间
                        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
                        document.getElementById("getCode").style.fontSize = 12 + 'px';
                        var user = {
                            "mail":pwd_email
                        };
                        $.ajax({
                            type:'POST',

                            data:JSON.stringify(user),

                            contentType :'application/json',

                            dataType:'json',

                            url :'/user/mailSend',

                            success :function(data) {
                                if (data.status) {      //登录成功
                                    alert("验证码发送成功，请注意查收！");
                                } else {
                                    alert(data.msg);
                                }

                            },

                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                // 状态码
                                console.log(XMLHttpRequest.status);
                                // 状态
                                console.log(XMLHttpRequest.readyState);
                                // 错误信息
                                alert(textStatus);
                            }
                        });
                }
                
        });    
});
//清除表单默认事件
$('form').submit(function (event) {

    event.preventDefault();
    
    return false;
    
    });
//登录的检验
$(".itme form").validate({
        rules:{
                login_name : {
                    required: true,
                    minlength: 1,
                    maxlength: 15
                },
                login_pwd : {
                    required: true,
                    minlength: 6,
                    maxlength: 20  
                }
            },
            messages: {
                login_name :{
                    required: "此项不能为空",
                    maxlength: "长度不能大于15",
                },
                login_pwd : {
                    required: "此项不能为空",
                    minlength: "长度不能小于6",
                    maxlength: "长度不能大于20"
                }
            }
});
function login_check(){
        var num_reg = RegExp("[0-9]");
        var letter_reg = RegExp("[A-Za-z]");
        var name = $("input[name=login_name]").val();
        var pwd = $("input[name=login_pwd]").val();
        if (isValidata) {
            isValidata = false;
            if (name=='') {
                alert("用户名不能为空！");
                $('#slide').html('');
                SlidingValidation.create($('#slide'),{},function(){isValidata = true;});
                return false; 
            } 
            if(!num_reg.test(pwd)||!letter_reg.test(pwd)){
                    alert("密码应包含字母和数字！");
                    $('#slide').html('');
                    SlidingValidation.create($('#slide'),{},function(){isValidata = true;});
                    return false; 
            }
            var user={
                    "username":name,
                    "pwd":pwd
                    };
            $.ajax({

                    type:'POST',

                    async:false,                //同步请求
            
                    data:JSON.stringify(user),

                    contentType :'application/json',
            
                    dataType:'json',
            
                    url :'/user/login',
            
                    success :function(data) {
                        if (data.status) {      //登录成功
                            if (data.code==5) {
                                alert("当前用户不允许登录，请联系管理员！");
                                $('#slide').html('');
                                SlidingValidation.create($('#slide'),{},function(){isValidata = true;});
                            }else{
                                $(window).attr("location",data.data);
                            }
                        } else {
                            $('#slide').html('');
                            SlidingValidation.create($('#slide'),{},function(){isValidata = true;});
                            alert(data.msg);
                        }
                    },

                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // 状态码
                    // alert("test");
                    $('#slide').html('');
                    SlidingValidation.create($('#slide'),{},function(){isValidata = true;});
                    console.log(XMLHttpRequest.status);
                    // 状态
                    console.log(XMLHttpRequest.readyState);
                    // 错误信息
                    alert(textStatus);
                }

            });
        }else{
            alert("请先滑动验证块！");
            return false;
        }
        return true;
}
//注册的检验
function register_check(){
        var name = $("input[name=register_name]").val();
        var pwd = $("input[name=register_pwd]").val();
        var repwd = $("input[name=register_repwd]").val();
        var tel = $("input[name=register_tel]").val();
        var email = $("input[name=register_email]").val();
        var tel_reg = RegExp("^1(3|4|5|7|8)\\d{9}$");
        var email_reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        var num_reg = RegExp("[0-9]");
        var letter_reg = RegExp("[A-Za-z]");
        if (name=='') {
                alert("用户名不能为空！");
                return false;
        }
        if(!num_reg.test(pwd)||!letter_reg.test(pwd)){
                alert("密码应包含字母和数字！");
                return false;
        }
        if(pwd!=repwd){
                alert("两次密码不一致！");
                return false;
        }
        if (!tel_reg.test(tel)) {
                alert("电话格式不正确！");
                return false;
        }
        if (!email_reg.test(email)) {
                alert("邮箱格式不正确！");
                return false;
        }
        var user={
            "user":{
                "User_name":name,
                "Password":pwd,
                "Tel":tel,
                "Email":email
             },
            "repwd":repwd
        };
        $.ajax({

                type:'POST',

                data:JSON.stringify(user),
        
                contentType :'application/json',
        
                dataType:'json',
        
                url :'/user/register',
        
                success :function(data) {
                    if (data.status) {      //注册成功
                        if (beActive()) {   //active_code
                            alert(data.msg+"，请前往邮箱激活");
                        } else {
                            alert(data.msg +"登录时激活账户");
                        }      
                        $('form')[1].reset();
                    } else {
                        alert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus) {
                    // 状态码
                    // alert("test");
                    console.log(XMLHttpRequest.status);
                    // 状态
                    console.log(XMLHttpRequest.readyState);
                    // 错误信息
                    alert(textStatus);
                }
        });
        return true;

}
function beActive() {
    $.ajax({
        type: "post",
        contentType: 'application/json',
        url: "/user/checkCode",
        data: "",
        dataType: "json",
        success: function (data) {
            console.log(data);
            return true;
            // if (data.status) {      //注册成功
            //     alert(data.msg);

            //     $('form')[1].reset();
            // } else {
            //     alert(data.msg);
            // }
        },
        error: function (XMLHttpRequest, textStatus) {
            // 状态码
            // alert("test");
            console.log(XMLHttpRequest.status);
            // 状态
            console.log(XMLHttpRequest.readyState);
            // 错误信息
            alert(textStatus);

        }
    });
    return false;
}
//找回密码的检验
function find_check() {
        var email = $("input[name=pwd_email]").val();
        var code = $("input[name=pwd_code]").val();
        var pwd = $("input[name=pwd_pwd]").val();
        var repwd = $("input[name=pwd_repwd]").val();
        var email_reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
        var num_reg = RegExp("[0-9]");
        var letter_reg = RegExp("[A-Za-z]");
        if (!email_reg.test(email)) {
                alert("邮箱格式不正确！");
                return false; 
        }        
        if (code.length<1) {
                alert("验证码不能为空！");
                return false; 
        }
        if(!num_reg.test(pwd)||!letter_reg.test(pwd)){
                alert("密码应包含字母和数字！");
                return false; 
        }
        if(pwd!=repwd){
                alert("两次密码不一致！");
                return false; 
        }      
        var user={
                "mail":email,
                "checkcode":code,
                "newPwd":pwd,
                "rePwd":repwd,
                
             };
        $.ajax({

                type:'POST',

                // async:false,                //同步请求

                data:JSON.stringify(user),
        
                contentType :'application/json',
        
                dataType:'json',
        
                url :'/user/resetpwd',
        
                success :function(data) {

                    if (data.status) {      //验证成功
                        alert(data.msg);
                        $('form')[2].reset();
                    } else {
                        alert("error:"+data.msg);
                    }
                },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 状态码
                // alert("test");
                console.log(XMLHttpRequest.status);
                // 状态
                console.log(XMLHttpRequest.readyState);
                // 错误信息
                alert(textStatus);
            }
        

        });
        return true;  
}