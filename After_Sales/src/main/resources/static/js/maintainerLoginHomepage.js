$(function(){
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
    //点击接收按钮
    $("#recieve_bt").click(function(){
        $("#task_rec_successModal").modal();
        //向后台提交任务已接收信息！！！！！！
    })
    //点击Faq添加按钮
    $("#addFaq_bt").click(function(){
        $("#faq_panel").hide();
        $("#addFaq_panel").show();

    })
    //点击Faq返回按钮
    $("#backFaq_bt").click(function(){
        $("#addFaq_panel").hide();
        $("#faq_panel").show();

    })
    //点击Faq保存按钮
    $("#saveFaq_bt").click(function(){
        $("#form_addFaq").validate();
        if($('#form_addFaq').valid()==true){
            $("#addFaq_successModal").modal();
            //

            // $("#username").attr("readonly",true);
            // $("#male").attr("disabled",true);
            // $("#female").attr("disabled",true);
            // $("#tel").attr("readonly",true);
            // $("#email").attr("readonly",true);
            // 此处写成功后提交给后台的数据代码！！！！！！！
        }else{
            $("#addFaq_failModal").modal();
        }

    });
    //点击接收按钮
    $("#recieve_bt").click(function(){
        //向后台提交task+1;
    });
    //点击完成按钮
    $("#task_ing_bt").click(function(){
        //向后台提交完成任务+1;
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
    //FAQ信息验证
    $("#form_addFaq").validate({
        rules:{
            frequent_que_add:{
                required:true,
                minlength:10,
            },
            frequent_ans_add:{
                required:true,
                minlength:10,
            }
        },
        messages:{
            frequent_que_add:{
                required:"问题不能为空",
                minlength:"问题内容最短不能少于10"
            },
            frequent_ans_add:{
                required:"问题解答不能为空",
                minlength:"问题解答内容最短不能为10"
            }
        }
    });
});

// 预处理
$(document).ready(function(){
    //  二级菜单的滑动处理
    $("#task_check").click(function(){
        $("#info").slideToggle("slow");
    });
    //点击个人信息切换面板
    $("#user_info").click(function(){
        $(".find_panel").children().hide();
        $("#user_panel").show();
        $(".message").show() ;
    });
    //    点击未接收任务切换面板
    $("#unrecieved_task").click(function(){
        $(".find_panel").children().hide();
        $("#task_check_panel").show();
        $(".message").show();
    });
    //    点击正处理任务切换面板
    $("#ing_task").click(function(){
        $(".find_panel").children().hide();
        $("#task_ing_panel").show();
        $(".message").show();
    });
    //    点击已完成任务切换面板
    $("#finished_task").click(function(){
        $(".find_panel").children().hide();
        $("#task_finished_panel").show();
        $(".message").show();
    });
    //点击FAQ面板
    $("#faq_present").click(function(){
        $(".find_panel").children().hide();
        $("#faq_panel").show();
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
//    function btn_recieved(){
//        document.task_check_tb.btn.value = "已接收";
//    };