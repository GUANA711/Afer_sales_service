$(function(){
    // 点击顶部导航栏的通知弹出模态框
    $("#top_message").click(function(){
        $("#top_messageModal").modal();
    });
    // 点击顶部导航栏的帮助弹出模态框
    $("#top_help").click(function(){
        $("#top_helpModal").modal();
    });
    // 点击顶部导航栏的注销弹出模态框
    $("#top_destroy").click(function(){
        $("#top_destroyModal").modal();
    });
    // 点击注销的确认键之后
    $("#destroy_submit").click(function(){
        $("#top_destroyModal").modal('hide');
        alert("已成功注销！即将返回首页");
        // POST确认要注销用户
        var message = "true";
        $.ajax({
            type: 'POST',

            data:JSON.stringify(message),

            contentType :'application/json',

            dataType:'json',

            url :'/user/logout',

            success :function(data,XMLHttpRequest) {
                //跳转至首页
                console.log("前端跳转首页");
                window.location.href="index.html";
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 状态码
                // alert("test");
                console.log(XMLHttpRequest.status);
                // 状态
                console.log(XMLHttpRequest.readyState);
                // 错误信息
                console.log("Post失败");
                alert(textStatus);
            }
        });


    });

    //点击提交问题的提交按钮
    $("#question_submit").click(function(){
        var item_id = document.getElementById("item_id").value;
        var question_detail = document.getElementById("select_form").value+": "+document.getElementById("question_detail").value;
        var question_type = $("#first_select").find("option:selected").val();

        if (document.getElementById("question_detail").value==''){
            $("#failSubmitModal").modal();
        }else{
            var question = {
                "item_id": item_id,
                "question_detail": question_detail,
                "question_type": question_type
            };
            $.ajax({
                type: 'POST',

                data:JSON.stringify(question),

                contentType :'application/json',

                dataType:'json',

                url :'/question/addQuestion',

                success :function(data) {
                    $("#successSubmitModal").modal();
                    //清空文本域
                    $("#question_detail").val('');
                },
                error: function (XMLHttpRequest, textStatus) {
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

    // 点击编辑按钮
    $("#edit_bt").click(function(){
        $("#username").attr("readonly",false);
        $("#male").attr("disabled",false);
        $("#female").attr("disabled",false);
        $("#tel").attr("readonly",false);
        $("#email").attr("readonly",false);
    });
    // 点击保存按钮
    $("#save_bt").click(function(){
        $("#form_userinfo").validate();
        if($('#form_userinfo').valid()==true){
            $("#username").attr("readonly",true);
            $("#tel").attr("readonly",true);
            $("#email").attr("readonly",true);
            // 成功后提交给后台用户信息
            var username = document.getElementById("username").value;
            var tel = document.getElementById("tel").value;
            var email = document.getElementById("email").value;
            var userinfo = {
                "User_name":username,
                "Tel":tel,
                "Email":email
            };
            //post方式传输数据给后台
            $.ajax({
                type: 'POST',

                data:JSON.stringify(userinfo),

                contentType :'application/json',

                dataType:'json',

                url :'/worker/worker_updateBy_Session_UserId',

                success :function(data,XMLHttpRequest) {
                    if (data.status) {      //登录成功
                        // alert("编辑信息发送成功，请注意查收！");
                        $("#successModal").modal();
                        console.log(XMLHttpRequest.status);
                    } else {
                        alert(data.msg);
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
            //再次进行清空
            $("#select_form").empty();

        }else{
            $("#failModal").modal();
        }

    });
    // 修改基础信息验证
    $("#form_userinfo").validate({
        rules:{
            username : {
                required:true,
                minlength: 1,
                maxlength: 15
            },
            email: {
                required:true,
                email: true
            },
            tel:{
                required:true,
                minlength: 7,
                maxlength: 15
            }
        },
        messages: {
            username : {
                required:"请输入用户名",
                minlength: "长度不能小于1",
                maxlength: "长度不能大于15"
            },
            tel:{
                required:"请输入电话",
                minlength: "长度不能小于7",
                maxlength: "长度不能大于15"
            },
            email : {
                required:"请输入电子邮件",
                email: "电子邮件格式错误"
            }
        }
    });
});

// 预处理
$(document).ready(function(){
    //问题详情分类数据，用于动态生成option
    var firstform = ["软件运行较卡","软件打卡较慢","其他"];
    var secondform = ["异常退出","点击没有反应"];
    var thirdform = ["界面需完善","清理没有必要的广告","其他"];
    var fourthform = ["其他"];

    //  二级菜单的滑动处理
    $("#info_title").click(function(){
        $("#info").slideToggle("slow");
    });
    //点击个人信息切换面板
    $("#user_info").click(function(){
        $("#find_panel").children().hide();
        $("#default_panel").hide();
        $("#user_panel").show();
        $.ajax({
            type:'GET',
            data:'',
            contentType :'application/json',
            dataType:'json',
            url :'/question/checkPostMan',
            success :function(data) {
                // console.dir(data);
                document.getElementById("username").value = data['user_name'];
                document.getElementById("tel").value = data['tel'];
                document.getElementById("email").value = data['email'];
            },
            error: function (XMLHttpRequest) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
            }
        });
        $(".message").show() ;
    });
    // 点击已提交切换面板
    $("#alr_title").click(function(){
        $("#find_panel").children().hide();
        $("#default_panel").hide();
        //GET数据
        $.ajax({
            type:'GET',
            data:'',
            contentType :'application/json',
            dataType:'json',
            url :'/question/checkQuestionsubmited',
            success :function(data) {
                //动态生成面板
                //首先清空面板
                $("#alr_panel").empty();
                if (data.length==0){
                    $("#alr_panel").append("<div class=\"alert alert-info\" role=\"alert\">没有已提交的数据！</div>");
                }else {
                    // $("#alr_panel").append("<ul class=\"breadcrumb\"><li>首页</li><li>已提交的问题</li></ul>");
                    //设置面板
                    for(var i in data){
                        $("#alr_panel").append("<div class='pa_all panel panel-default' id="+i+">");
                        $("#alr_panel").append(" <div class=\"panel-heading\">" + "<h3 class=\"panel-title\">问题查看：</h3>" + "</div>"+"<div class=\"panel-body\">"+"<form>");
                        $("#alr_panel").append("<ul class=\"list-group\" >");
                        $("#alr_panel").append("<li class=\"list-group-item\"><label for=\"select\">问题分类:</label>"+"<input type=\"text\" id=\"select\" readonly=\"readonly\" value=\""+data[i].question_type+"\"></li>");
                        $("#alr_panel").append("<li class=\"list-group-item\"><label for=\"number\">项目编号:</label>"+"<input type=\"text\" id=\"number\" readonly=\"readonly\" value=\""+data[i].item_id+"\"></li>");
                        $("#alr_panel").append("<li class=\"list-group-item\"><span class='lable_textarea'>问题详情:</span>"+"<textarea rows=\"6\" cols=\"50\" readonly=\"readonly\">"+data[i].question_detail+"</textarea></li>");
                        $("#alr_panel").append("</ul>"+"</form>"+"</div>"+"</div>");
                    }
                }
            },
            error: function (XMLHttpRequest) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
            }
        });
        $("#alr_top").show();
        $("#alr_panel").show();
        $(".message").show();
    });
    //点击已完成切换面板
    $("#fin_title").click(function(){
        $("#find_panel").children().hide();
        $("#default_panel").hide();
        //GET数据
        $.ajax({
            type:'GET',
            data:'',
            contentType :'application/json',
            dataType:'json',
            url :'/question/checkQuestionfinished',
            success :function(data) {
                //动态生成面板
                //首先清空面板
                $("#fin_panel").empty();
                if (data.length==0){
                    $("#fin_panel").append("<div class=\"alert alert-info\" role=\"alert\">没有已完成的数据！</div>");
                }else{
                    //设置面板
                    for(var i in data){
                        $("#fin_panel").append("<div class='pa_all panel panel-default' id="+i+">");
                        $("#fin_panel").append(" <div class=\"panel-heading\">" + "<h3 class=\"panel-title\">问题查看：</h3>" + "</div>"+"<div class=\"panel-body\">"+"<form>");
                        $("#fin_panel").append("<ul class=\"list-group\" >");
                        $("#fin_panel").append("<li class=\"list-group-item\"><label for=\"select\">问题分类:</label>"+"<input type=\"text\" id=\"select\" readonly=\"readonly\" value=\""+data[i].question_type+"\"></li>");
                        $("#fin_panel").append("<li class=\"list-group-item\"><label for=\"number\">项目编号:</label>"+"<input type=\"text\" id=\"number\" readonly=\"readonly\" value=\""+data[i].item_id+"\"></li>");
                        $("#fin_panel").append("<li class=\"list-group-item\"><span class='lable_textarea'>问题详情:</span>"+"<textarea rows=\"6\" cols=\"50\" readonly=\"readonly\">"+data[i].question_detail+"</textarea></li>");
                        $("#fin_panel").append("</ul>"+"</form>"+"</div>"+"</div>");
                    }
                }
            },
            error: function (XMLHttpRequest) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
            }
        });
        $("#fin_top").show();
        $("#fin_panel").show();
        $(".message").show();
    });
    //点击处理中切换面板
    $("#ing_title").click(function(){
        $("#find_panel").children().hide();
        $("#default_panel").hide();
        //GET数据
        $.ajax({
            type:'GET',
            data:'',
            contentType :'application/json',
            dataType:'json',
            url :'/question/checkQuestionfinished',
            success :function(data) {
                //动态生成面板
                //首先清空面板
                $("#ing_panel").empty();
                if (data.length==0){
                    $("#ing_panel").append("<div class=\"alert alert-info\" role=\"alert\">没有处理中的数据！</div>");
                }else {
                    //设置面板
                    for(var i in data){
                        $("#ing_panel").append("<div class='pa_all panel panel-default' id="+i+">");
                        $("#ing_panel").append(" <div class=\"panel-heading\">" + "<h3 class=\"panel-title\">问题查看：</h3>" + "</div>"+"<div class=\"panel-body\">"+"<form>");
                        $("#ing_panel").append("<ul class=\"list-group\" >");
                        $("#ing_panel").append("<li class=\"list-group-item\"><label for=\"select\">问题分类:</label>"+"<input type=\"text\" id=\"select\" readonly=\"readonly\" value=\""+data[i].question_type+"\"></li>");
                        $("#ing_panel").append("<li class=\"list-group-item\"><label for=\"number\">项目编号:</label>"+"<input type=\"text\" id=\"number\" readonly=\"readonly\" value=\""+data[i].item_id+"\"></li>");
                        $("#ing_panel").append("<li class=\"list-group-item\"><span class='lable_textarea'>问题详情:</span>"+"<textarea rows=\"6\" cols=\"50\" readonly=\"readonly\">"+data[i].question_detail+"</textarea></li>");
                        $("#ing_panel").append("</ul>"+"</form>"+"</div>"+"</div>");
                    }
                }
            },
            error: function (XMLHttpRequest) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
            }
        });
        $("#ing_top").show();
        $("#ing_panel").show();
        $(".message").show();
    });
    //点击提交问题切换面板
    $("#wri_title").click(function(){
        $("#find_panel").children().hide();
        $("#wri_top").show();
        //get方法获取项目名item_name
        $.ajax({
            type:'GET',

            data:'',

            contentType :'application/json',

            dataType:'json',

            url :'/question/checkItemname',

            success :function(data) {
                //动态生成项目名
                for (var i in data){
                    $("#item_id").append("<option value='"+data[i].item_id+"'>"+data[i].item_name+"</option>");
                }
            },
            error: function (XMLHttpRequest) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
            }
        });
        $("#wri_panel").show();
        $(".message").show();
    });
    // 根据第一个选项决定第二个选项
    $("#first_select").click(function(){
        var value=$("#first_select").val();
        $("#select_form").empty();
        switch (value) {
            case "性能体验":
                for (var i in firstform){
                    $("#select_form").append("<option value="+firstform[i]+">"+firstform[i]+"</option>")
                }
                break;
            case "功能异常":
                for (var i in secondform){
                    $("#select_form").append("<option value="+secondform[i]+">"+secondform[i]+"</option>")
                }
                break;
            case "产品建议":
                for (var i in thirdform){
                    $("#select_form").append("<option value="+thirdform[i]+">"+thirdform[i]+"</option>")
                }
                break;
            case "其他反馈":
                for (var i in fourthform){
                    $("#select_form").append("<option value="+fourthform[i]+">"+fourthform[i]+"</option>")
                }
                break;
            default:
                break;
        }
    });

    let  default_panel = new Vue({
       el: default_panel,
        data: {
           title:""
        }
    });


});