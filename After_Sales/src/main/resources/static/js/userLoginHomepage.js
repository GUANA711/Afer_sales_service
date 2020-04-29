$(function(){
    // 点击顶部导航栏的通知弹出模态框
    $("#top_message").click(function(){
        $("#top_messageModal").modal();
    });
    // 点击顶部导航栏的帮助弹出模态框
    $("#top_hlep").click(function(){
        $("#top_hlepModal").modal();
    });
    // 点击顶部导航栏的注销弹出模态框
    $("#top_destroy").click(function(){
        $("#top_destroyModal").modal();
    });
    // 点击注销的确认键之后
    $("#destroy_submit").click(function(){
        // 此处写向后台发送一个消息，确认要注销用户
        $("#top_destroyModal").modal('hide');
        alert("已成功注销！即将返回首页");
        window.location.href="file:///E:/%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B/%E9%A1%B9%E7%9B%AE/%E4%BF%A1%E6%81%AF%E9%A6%96%E9%A1%B5_%E6%9C%AA%E7%99%BB%E5%BD%95.html";

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
            $("#successModal").modal();
            $("#username").attr("readonly",true);
            // $("#male").attr("disabled",true);
            // $("#female").attr("disabled",true);
            $("#tel").attr("readonly",true);
            $("#email").attr("readonly",true);
            // 此处写成功后提交给后台的数据代码！！！！！！！
        }else{
            $("#failModal").modal();
        }

    });
    // 修改基础信息验证
    $("#form_userinfo").validate({
        rules:{
            username : {
                required:true,
                minlength:6,
                maxlength:20
            },
            email: {
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
                minlength: "长度不能小于6",
                maxlength: "长度不能大于20",
            },
            tel:{
                required:"请输入电话",
                minlength: "长度不能小于7",
                maxlength: "长度不能大于15",
            },
            email : {
                email: "电子邮件格式错误"
            }
        }
    });
    // 修改密码验证
    $("#pass_info").validate({
        rules:{
            password : {
                required: true,
                minlength: 10,
                maxlength: 20
            },
            fin_password: {
                required: true,
                equalTo: "#password"
            },
        },
        messages: {
            password:{
                required:"请输入密码",
                minlength: "长度不能小于10",
                maxlength: "长度不能大于20",
            },
            fin_password:{
                required:"请确认密码",
                equalTo: "密码不一致"
            }
        }
    });
});

// 预处理
$(document).ready(function(){
    //  二级菜单的滑动处理
    $("#info_title").click(function(){
        $("#info").slideToggle("slow");
    });
    //点击个人信息切换面板
    $("#user_info").click(function(){
        $(".find_panel").children().hide();
        $("#user_panel").show();
        $(".message").show() ;
    });
    //    点击已提交切换面板
    $("#alr_title").click(function(){
        $(".find_panel").children().hide();
        $("#alr_panel").show();
        $(".message").show();
    });
    //    点击已完成切换面板
    $("#fin_title").click(function(){
        $(".find_panel").children().hide();
        $("#fin_panel").show();
        $(".message").show();
    });
    //    点击处理中切换面板
    $("#ing_title").click(function(){
        $(".find_panel").children().hide();
        $("#ing_panel").show();
        $(".message").show();
    });
    //点击提交问题切换面板
    $("#wri_title").click(function(){
        $(".find_panel").children().hide();
        $("#wri_panel").show();
        $(".message").show();
    });
    // 根据第一个选项决定第二个选项
    $("#first_select").click(function(){
        var value=$("#first_select").val();
        switch (value) {
            case "first":
                $("#second_select").children().hide();
                $("#firstshow").show();
                break;
            case "second":
                $("#second_select").children().hide();
                $("#secondshow").show();
                break;
            case "third":
                $("#second_select").children().hide();
                $("#thirdshow").show();
                break;
            case "fourth":
                $("#second_select").children().hide();
                $("#fourthshow").show();
                break;
            default:
                break;
        }
    });




});