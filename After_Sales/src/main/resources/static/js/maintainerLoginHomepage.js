var dt;
var dt2;
// 预处理
$(document).ready(function(){
    // 加载维修人员页面信息
    $.ajax({
        type:'GET',
        data:'',
        contentType :'application/json',
        dataType:'json',
        url :'http://localhost:5050/worker/worker_selectBy_Session_UserId',
        success :function(data) {
            console.dir(data);
            $("#userId").val(data.User_id);
            $("#username").val(data.User_name);
            $("#tel").val(data.Tel);
            $("#email").val(data.Email);
            alert(data.User_name+"欢迎回来！");
        },
        //XMLHttpRequest 用于在后台与服务器交换数据。
        //这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
        error: function (XMLHttpRequest) {
            // 200: "OK"
            // 404: 未找到页面
            console.log(XMLHttpRequest.status);
            //readyState
            //存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
            // 0: 请求未初始化
            // 1: 服务器连接已建立
            // 2: 请求已接收
            // 3: 请求处理中
            // 4: 请求已完成，且响应已就绪
            console.log(XMLHttpRequest.readyState);
        }
    });

    // 点击编辑按钮
    $("#edit_bt").click(function(){
        $("#username").attr("readonly",false);
        $("#tel").attr("readonly",false);
        $("#email").attr("readonly",false);
    });
    // 点击保存按钮
    $("#save_bt").click(function(){
        var User_name = $("#username").val();
        var Tel = $("#tel").val();
        var Email = $("#email").val();
        var info = {
            "User_name":User_name,
            "Tel":Tel,
            "Email":Email
        };
        if($('#form_userinfo').valid()){
            $.ajax({
                type:'POST',
                data:JSON.stringify(info),
                contentType :'application/json',
                dataType:'json',
                url :'http://localhost:5050/worker/worker_updateBy_Session_UserId',
                success :function(data) {
                    console.dir(data);
                    $("#username").attr("readonly",true);
                    $("#tel").attr("readonly",true);
                    $("#email").attr("readonly",true);
                    $(this).text($(this).text()==='编辑');
                    $("#userId").val(data.User_id);
                    $("#username").val(data.User_name);
                    $("#tel").val(data.Tel);
                    $("#email").val(data.Email);
                    alert(data.status);
                },
                error: function (result) {
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                    alert(data.status);
                }
            });
        }else{
            alert(data.status);
        }
    });
    // 二级菜单的滑动处理
    $("#task_check").click(function(){
        $("#info").slideToggle("slow");
    });
    // 点击个人信息切换面板
    $("#user_info").click(function(){
        $(".find_panel").children().hide();
        $("#user_panel").show();
        $(".message").show() ;
    });
    // 修改基础信息验证
    $("#form_userinfo").validate({
        rules:{
            username : {
                required:true
            },
            tel:{
                required:true
            },
            email: {
                email: true
            }
        },
        messages: {
            username : {
                required:"请输入用户名"
            },
            tel : {
                required:"请输入电话号码"
            },
            email : {
                email: "电子邮件格式错误"
            }
        }
    });

    // 点击未接收任务切换面板
    $("#unrecieved_task").click(function(){
        $(".find_panel").children().hide();
        $("#task_check_panel").show();
        $(".message").show();
        /**
        $.ajax({
            type:"GET",
            url:"http://localhost:5050/worker/worker_show_unaccepted",
            success:function (data) {
                alert(data)
                var datalist=eval(data);

            },
            error: function (XMLHttpRequest) {
                // 200: "OK"
                // 404: 未找到页面
                console.log(XMLHttpRequest.status);
                //readyState
                //存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
                // 0: 请求未初始化
                // 1: 服务器连接已建立
                // 2: 请求已接收
                // 3: 请求处理中
                // 4: 请求已完成，且响应已就绪
                console.log(XMLHttpRequest.readyState);
            }

        })**/
        //加载未接收任务
        dt = $('#table').DataTable ({
                responsive : true,
                destroy: true,
                serviceSize : true,// 开启服务端模式
                ajax :
                    {
                        // 使用ajax异步请求的方式加载数据
                        type : 'GET',
                        async : false,
                        dataSrc : '',
                        contentType :'application/json',
                        dataType : 'json',
                        url : 'http://localhost:5050/worker/worker_show_unaccepted'

                    },
                columns : [
                    // 配置columns
                    // 使用对象数组，一定要配置columns
                    // 告诉 DataTables 每列对应的属性data
                    // 这里是固定不变的，name，position，salary，office 为你数据里对应的属性
                    {
                        "data" : "question_id",
                        className : "Question_id",
                        "searchable" : false
                    },
                    {
                        "data" : "question_type",
                        className : "Question_type"
                    },
                    {
                        "data" : "question_detail",
                        className : "Question_detail"
                    },
                    {
                        "data" : null,
                        render : function (data, type, row)
                        {
                            var html = '<a href="javascript:void(0);" class="operate-btn-accept">接收任务</a>';
                            return html;
                        }
                    }
                ],
                language :
                    {// 配置
                        "sProcessing" : "处理中...",
                        "sLengthMenu" : "显示 _MENU_ 项结果",
                        "sZeroRecords" : "没有匹配结果",
                        "sInfo" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                        "sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
                        "sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
                        "sInfoPostFix" : "",
                        "sSearch" : "搜索:",
                        "sUrl" : "",
                        "sEmptyTable" : "表中数据为空",
                        "sLoadingRecords" : "载入中...",
                        "sInfoThousands" : ",",
                        "oPaginate" :
                            {
                                "sFirst" : "首页",
                                "sPrevious" : "上页",
                                "sNext" : "下页",
                                "sLast" : "末页"
                            },
                        "oAria" :
                            {
                                "sSortAscending" : ": 以升序排列此列",
                                "sSortDescending" : ": 以降序排列此列"
                            }
                    }
            });

    });
$("body").on("click",".operate-btn-accept",function(){
    var question_id=$(this).parent().parent().find(".Question_id").text();
    var info = {
        "questionID":question_id
    };
    $.ajax({
        type:"POST",
        contentType :'application/json',
        dataType:"json",
        url:"http://localhost:5050/worker/worker_receive",
        data:JSON.stringify(info),
        success:function () {
            dt.ajax.reload();
        },
        error: function (XMLHttpRequest) {
            // 200: "OK"
            // 404: 未找到页面
            console.log(XMLHttpRequest.status);
            //readyState
            //存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
            // 0: 请求未初始化
            // 1: 服务器连接已建立
            // 2: 请求已接收
            // 3: 请求处理中
            // 4: 请求已完成，且响应已就绪
            console.log(XMLHttpRequest.readyState);
        }
    })
})
    // 点击接收按钮
    $("#recieve_bt").click(function(){
        $("#task_rec_successModal").modal();
        //向后台提交任务已接收信息！！！！！！
    })
    //点击接收按钮
    $("#recieve_bt").click(function(){
        //向后台提交task+1;
    });
    // 点击正处理任务切换面板
    $("#ing_task").click(function(){
        $(".find_panel").children().hide();
        $("#task_ing_panel").show();
        $(".message").show();

        dt2 = $('#table2').DataTable ({
            responsive : true,
            destroy: true,
            serviceSize : true,// 开启服务端模式
            ajax :
                {
                    // 使用ajax异步请求的方式加载数据
                    type : 'GET',
                    async : false,
                    dataSrc : '',
                    contentType :'application/json',
                    dataType : 'json',
                    url : 'http://localhost:5050/worker/worker_show_accepted'

                },
            columns : [
                // 配置columns
                // 使用对象数组，一定要配置columns
                // 告诉 DataTables 每列对应的属性data
                // 这里是固定不变的，name，position，salary，office 为你数据里对应的属性
                {
                    "data" : "Question_id",
                    className : "Question_id",
                    "searchable" : false
                },
                {
                    "data" : "Question_detail",
                    className : "Question_detail"
                },
                {
                    "data" : "User_id",
                    className : "User_id"
                },
                {
                    "data" : "Commit_time",
                    className : "Commit_time"
                },
                {
                    "data" : null,
                    render : function (data, type, row)
                    {
                        var html = '<a href="javascript:void(0);" class="operate-btn-finish">完成任务</a>';
                        return html;
                    }
                }
            ],
            language :
                {// 配置
                    "sProcessing" : "处理中...",
                    "sLengthMenu" : "显示 _MENU_ 项结果",
                    "sZeroRecords" : "没有匹配结果",
                    "sInfo" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
                    "sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix" : "",
                    "sSearch" : "搜索:",
                    "sUrl" : "",
                    "sEmptyTable" : "表中数据为空",
                    "sLoadingRecords" : "载入中...",
                    "sInfoThousands" : ",",
                    "oPaginate" :
                        {
                            "sFirst" : "首页",
                            "sPrevious" : "上页",
                            "sNext" : "下页",
                            "sLast" : "末页"
                        },
                    "oAria" :
                        {
                            "sSortAscending" : ": 以升序排列此列",
                            "sSortDescending" : ": 以降序排列此列"
                        }
                }
        });

    });
    $("body").on("click",".operate-btn-finish",function(){
        var question_id=$(this).parent().parent().find(".Question_id").text();
        var info = {
            "questionID":question_id
        };
        $.ajax({
            type:"POST",
            contentType :'application/json',
            url:"http://localhost:5050/worker/worker_finish",
            data:JSON.stringify(info),
            success:function (data) {
                // alert("???");
                dt2.ajax.reload();
                // alert("...");
            },
            error: function (XMLHttpRequest) {
                // 200: "OK"
                // 404: 未找到页面
                console.log(XMLHttpRequest.status);
                //readyState
                //存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
                // 0: 请求未初始化
                // 1: 服务器连接已建立
                // 2: 请求已接收
                // 3: 请求处理中
                // 4: 请求已完成，且响应已就绪
                console.log(XMLHttpRequest.readyState);
            }
        })
    })
    // 点击完成按钮
    $("#task_ing_bt").click(function(){
        // 向后台提交完成任务+1;
    });
    // 点击已完成任务切换面板
    $("#finished_task").click(function(){
        $(".find_panel").children().hide();
        $("#task_finished_panel").show();
        $(".message").show();

    });
    // 点击FAQ面板
    $("#faq_present").click(function(){
        $(".find_panel").children().hide();
        $("#faq_panel").show();
        $(".message").show();
    });
    // 点击Faq添加按钮
    $("#addFaq_bt").click(function(){
        $("#faq_panel").hide();
        $("#addFaq_panel").show();

    })
    // 点击Faq返回按钮
    $("#backFaq_bt").click(function(){
        $("#addFaq_panel").hide();
        $("#faq_panel").show();

    })
    // 点击Faq保存按钮
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
    // FAQ信息验证
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