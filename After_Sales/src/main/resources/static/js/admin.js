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
       $("#tel").attr("readonly",true);
       $("#email").attr("readonly",true);
           // 此处写成功后提交给后台的数据代码！！！！！！！
       }else{
           $("#failModal").modal();
       }
      
   });
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
  $("#questions_check").click(function(){
      $("#info").slideToggle("slow");
  });
   //点击个人信息切换面板 
   $('.nav-pills li[role="presentation"]').click(function() {                        //tags的切换
        var i = $(this).index()-1;
        console.log(i);
        if(i!=2){
            $(this).addClass('active').siblings().removeClass('active');
            $('#info li').removeClass('active');
            $(".find_panel").children().hide();
            $(".pa_all").eq(i).show();
            $(".message").show();
        }
    });   
    //点击二级菜单
    $('#info li').click(function (e) { 
        var i = $(this).index();
        $('.nav-pills li[role="presentation"]').removeClass('active');
        $(this).addClass('active').siblings().removeClass('active');
        $(".find_panel").children().hide();
        $(".pa_all").eq(i+2).show();
        $(".message").show();
    });
    //加载页面信息
    $.ajax({
        type:'GET',

        data:'',

        contentType :'application/json',

        dataType:'json',

        url :'http://localhost:5050/worker_selectBy_Session_UserId',

        success :function(data) {
            // console.dir(data.status);
            if (data.status) {      //登录成功
                alert("验证码发送成功，请注意查收！");
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
   // 根据第一个选项决定第二个选项
//    $("#first_select").click(function(){ 
//           var value=$("#first_select").val();
//           switch (value) {
//               case "first":
//               $("#second_select").children().hide();
//                $("#firstshow").show();
//                break;
//                case "second":
//                $("#second_select").children().hide();
//                $("#secondshow").show();
//                break;
//                case "third":
//                $("#second_select").children().hide();
//                $("#thirdshow").show();
//                break;
//                case "fourth":
//                $("#second_select").children().hide();
//                $("#fourthshow").show();
//                break;
//               default:
//                   break;
//           }
//    });
});