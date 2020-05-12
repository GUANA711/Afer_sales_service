$(document).ready(function(){
    //加载个人页面信息
    // $.ajax({
    //     type:'GET',
    //     data:'',
    //     contentType :'application/json',
    //     dataType:'json',
    //     url :'/worker/worker_selectBy_Session_UserId',
    //     success :function(data) {
    //         console.dir(data);
    //         $("#userId").val(data.User_id);
    //         $("#username").val(data.User_name);
    //         $("#tel").val(data.Tel);
    //         $("#email").val(data.Email);            
    //         // alert("ok!");
    //     },
    //     error: function (XMLHttpRequest,textStatus) {
    //         // 状态码
    //         // alert("test");
    //         console.log(XMLHttpRequest.status);
    //         // 状态
    //         console.log(XMLHttpRequest.readyState);
    //         // 错误信息
    //         alert(textStatus);
    //     }
    // });
    // 分页
    var pageSize =8;     //每页显示多少条记录
    $(function() {          //表格初始化
        itemsRequest(1,true);
        // questionRequest(1,true);
        // maintenanceRequest(1,true);
        // faqRequest(1,true);
        // logRequest(1,true);
    });
    function itemsRequest(currPage,isFirst) {
        $.ajax({
            type:'post',
            dataType: "json",
            url:'/adminLoing/showItems/'+currPage+'/'+pageSize,
            success:function(data){
                $("#items table tbody").html('');       /* 清空tbody内容 */
                for(var i=0;i<data[0].length;i++){
                    var item=data[0][i];
                    var insert = '<tr id="showItems"><td class="task_check_tb_td">' + item.item_id + '</td><td class="task_check_tb_td">' + item.item_name + '</td><td class="task_check_tb_td">' + item.user_id + '</td></tr>';
                    $("#items table tbody").append(insert);
                }
                if (isFirst) {          /* 第一次加载页面 */
                    $('#pagination1').jqPaginator({ 
                        totalPages: Math.ceil(data[1]/pageSize),        //页码整数
                        visiblePages: 6,
                        currentPage: 1,
                        first: '<li><a href="javascript:void(0);">首页</a></li>',
                        prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                        next: '<li><a href="javascript:void(0);">下一页</a></li>',
                        last: '<li><a href="javascript:void(0);">末页</a></li>',
                        page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
/* 设置页码的Html结构,其中可以使用{{page}}代表当前页，{{totalPages}}代表总页数，{{totalCounts}}代表总条目数*/
                        onPageChange: function (num, type) {
                            itemsRequest(num,false);
                        }
                    });
                }
            },
            error:function(){alert("请求超时，请重试！");}
        });
    }
    function questionRequest(currPage,isFirst) {
        $.ajax({
            type:'post',
            dataType: "json",
            url:'/adminLoing/showquestion/'+currPage+'/'+pageSize,
            success:function(data){
                // console.log(data);
                $("#questions table tbody").html('');       /* 清空tbody内容 */
                for(var i=0;i<data[0].length;i++){
                    var item=data[0][i];
                    var insert = '<tr id="showItems">'+
                                 '<td class="task_check_tb_td">' + 
                                 item.question_id + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.item_id + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.question_type + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.question_status + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.question_detail + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.commit_time + 
                                 '</td><td class="task_check_tb_td">'+
                                 item.user_id + 
                                 '</td></tr>';
                    $("#questions table tbody").append(insert);
                }
                if (isFirst) {          /* 第一次加载页面 */
                    $('#pagination2').jqPaginator({ 
                        totalPages: Math.ceil(data[1]/pageSize),        //页码整数
                        visiblePages: 6,
                        currentPage: 1,
                        first: '<li><a href="javascript:void(0);">首页</a></li>',
                        prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                        next: '<li><a href="javascript:void(0);">下一页</a></li>',
                        last: '<li><a href="javascript:void(0);">末页</a></li>',
                        page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
/* 设置页码的Html结构,其中可以使用{{page}}代表当前页，{{totalPages}}代表总页数，{{totalCounts}}代表总条目数*/
                        onPageChange: function (num, type) {
                            questionRequest(num,false);
                            // console.log(num);
                            
                        }
                    });
                }
            },
            error:function(){alert("请求超时，请重试！");}
        });
    }
    function maintenanceRequest(currPage,isFirst) {
        $.ajax({
            type:'post',
            dataType: "json",
            url:'/adminLoing/showMaintenance/'+currPage+'/'+pageSize,
            success:function(data){
                // console.log(data);
                $("#maintenance table tbody").html('');       /* 清空tbody内容 */
                for(var i=0;i<data[0].length;i++){
                    var item=data[0][i];
                    var insert = '<tr id="showItems">'+
                                 '<td class="task_check_tb_td">' + 
                                 item.question_id + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.user_id + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.start_time + 
                                 '</td></tr>';
                    $("#maintenance table tbody").append(insert);
                }
                if (isFirst) {          /* 第一次加载页面 */
                    $('#pagination3').jqPaginator({ 
                        totalPages: Math.ceil(data[1]/pageSize),        //页码整数
                        visiblePages: 6,
                        currentPage: 1,
                        first: '<li><a href="javascript:void(0);">首页</a></li>',
                        prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                        next: '<li><a href="javascript:void(0);">下一页</a></li>',
                        last: '<li><a href="javascript:void(0);">末页</a></li>',
                        page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
/* 设置页码的Html结构,其中可以使用{{page}}代表当前页，{{totalPages}}代表总页数，{{totalCounts}}代表总条目数*/
                        onPageChange: function (num, type) {
                            maintenanceRequest(num,false);
                            // console.log(num);
                            
                        }
                    });
                }
            },
            error:function(){alert("请求超时，请重试！");}
        });
    }
    function faqRequest(currPage,isFirst) {
        $.ajax({
            type:'post',
            dataType: "json",
            url:'/adminLoing/showfaq/'+currPage+'/'+pageSize,
            success:function(data){
                // console.log(data);
                $("#faq table tbody").html('');       /* 清空tbody内容 */
                for(var i=0;i<data[0].length;i++){
                    var item=data[0][i];
                    var insert = '<tr id="showItems">'+
                                 '<td class="task_check_tb_td">' + 
                                 item.faq_id + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.faq_question + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.faq_answer + 
                                 '</td>s</tr>';
                    $("#faq table tbody").append(insert);
                }
                if (isFirst) {          /* 第一次加载页面 */
                    $('#pagination4').jqPaginator({ 
                        totalPages: Math.ceil(data[1]/pageSize),        //页码整数
                        visiblePages: 6,
                        currentPage: 1,
                        first: '<li><a href="javascript:void(0);">首页</a></li>',
                        prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                        next: '<li><a href="javascript:void(0);">下一页</a></li>',
                        last: '<li><a href="javascript:void(0);">末页</a></li>',
                        page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
/* 设置页码的Html结构,其中可以使用{{page}}代表当前页，{{totalPages}}代表总页数，{{totalCounts}}代表总条目数*/
                        onPageChange: function (num, type) {
                            faqRequest(num,false);
                        }
                    });
                }
            },
            error:function(){alert("请求超时，请重试！");}
        });
    }
    function logRequest(currPage,isFirst) {
        $.ajax({
            type:'post',
            dataType: "json",
            url:'/adminLoing/showLog/'+currPage+'/'+pageSize,
            success:function(data){
                // console.log(data);
                $("#log table tbody").html('');       /* 清空tbody内容 */
                for(var i=0;i<data[0].length;i++){
                    var item=data[0][i];
                    var str = item.method;
                    var method = str;
                    if (str != null) {
                        method = str.split('.')[5];
                    }
                    var insert = '<tr id="showItems">'+
                                 '<td class="task_check_tb_td">' + 
                                 item.log_id + 
                                 '</td><td class="task_check_tb_td">' + 
                                 method + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.operation + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.creat_time + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.ip + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.user_id + 
                                 '</td></tr>';
                    $("#log table tbody").append(insert);
                }
                if (isFirst) {          /* 第一次加载页面 */
                    $('#pagination5').jqPaginator({ 
                        totalPages: Math.ceil(data[1]/pageSize),        //页码整数
                        visiblePages: 6,
                        currentPage: 1,
                        first: '<li><a href="javascript:void(0);">首页</a></li>',
                        prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                        next: '<li><a href="javascript:void(0);">下一页</a></li>',
                        last: '<li><a href="javascript:void(0);">末页</a></li>',
                        page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
/* 设置页码的Html结构,其中可以使用{{page}}代表当前页，{{totalPages}}代表总页数，{{totalCounts}}代表总条目数*/
                        onPageChange: function (num, type) {
                            logRequest(num,false);
                        }
                    });
                }
            },
            error:function(){alert("请求超时，请重试！");}
        });
    }
});
var items = new Vue({
    el:'#vueItem',
    data: {
        selected: 0,
        key:"",
        placeholder:["项目ID","项目名","用户ID"],
        page: {
            //页内条目数
            pageSize: 8,
            //当前页
            pageNum: 1,
            //记录总数
            length:1,
            //总页数
            totalPage: 0
        },
        data:''
    },
    // watch: {
    //     //监听数据，注意修改为正确的变量名
    //     // page: function() {
    //     //     //这里的第二个参数其实可以随便填，我完全是为了占位，而且我下面写死了
    //     //    this.init_page(this.page.totalPages,this.page.pageSize,this.page.pageNum);
    //     //    console.log(this.page.totalPages,this.page.pageSize,this.page.pageNum);
    //     // // this.totelPage();
    //     // }
    // },
    methods:{
        init_page: function (totalPage,pageSize ,currentPage) {
            if(totalPage == 0){
               return;
           }
        //    this.searchFor(currentPage);
           $("#items table tbody").html('');       /* 清空tbody内容 */
                for(var i=0;i<items.data.length;i++){
                    var item=items.data[i];
                    // console.log(item);
                    var insert = '<tr id="showItems"><td class="task_check_tb_td">' + item.item_id + '</td><td class="task_check_tb_td">' + item.item_name + '</td><td class="task_check_tb_td">' + item.user_id + '</td></tr>';
                    $("#items table tbody").append(insert);
                }
                // console.log(Math.ceil(this.data[1][0]/8));
                // console.log("data:"+items.data[1][0]);
                // console.log(this.pageSize);
                $('#pagination1').jqPaginator({ 
                    totalPages: totalPage,        //页码整数
                    visiblePages: pageSize,
                    currentPage: currentPage,
                    first: '<li><a href="javascript:void(0);">首页</a></li>',
                    prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                    next: '<li><a href="javascript:void(0);">下一页</a></li>',
                    last: '<li><a href="javascript:void(0);">末页</a></li>',
                    page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
/* 设置页码的Html结构,其中可以使用{{page}}代表当前页，{{totalPages}}代表总页数，{{totalCounts}}代表总条目数*/
                    onPageChange: function (num, type) {
                        if (type == 'change') {
                            //注意修改为正确的参数名
                            items.page.pageNum= num;
                            items.searchFor();
                        }
                    }
                });
        },
        calPage:function(){
            items.page.totalPage =  Math.ceil(items.page.length/items.page.pageSize);
        },
        searchFor:function(){
            // console.log(this.selected+this.key);
            axios
            .post('/adminLoing/searchItems/'+this.page.pageNum+'/'+this.page.pageSize, {
                "key": this.key,        
                "choice":this.selected    
            })
            .then(function (response) {
                // console.log("response:"+response);
                items.data = response.data[0];
                // console.log(items.data);
                // console.log(items.page);
                items.page.length = response.data[1];
                items.calPage();
                // console.dir(this);
                // console.dir(items);
                // console.log(this.page.totalPage);    
                items.init_page(items.page.totalPage,items.page.pageSize ,items.page.pageNum);    
            })
            .catch(function (error) { // 请求失败处理
                alert(error);
                // console.log(error);
                
            });
        }
    }
});



/* 一些触发事件 */
// 点击编辑按钮
$("#edit_bt").click(function(){
    var readonly = $("#username").attr("readonly")==='readonly'?false:true;
    $("#username").attr("readonly",readonly);
    $("#tel").attr("readonly",readonly);
    $("#email").attr("readonly",readonly);
    $("#form_userinfo").validate();
    $(this).text($(this).text()==='编辑'?'取消':'编辑');
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
    $("#form_userinfo").validate();
    if($('#form_userinfo').valid()){
        $.ajax({
            type:'POST',
            data:JSON.stringify(info),
            contentType :'application/json',
            dataType:'json',
            url :'/worker/worker_updateBy_Session_UserId',
            success :function(data) {
                // console.dir(data);
                if(data.code == 0){      //修改成功
                    $("#successModal").modal();
                 }else{
                    $('#failModal .modal-body').text(data.status); 
                    $("#failModal").modal();
                 }
                $("#userId").val(data.User_id);
                $("#username").attr("readonly",true).val(data.User_name);
                $("#tel").attr("readonly",true).val(data.Tel);
                $("#email").attr("readonly",true).val(data.Email);
                $('#edit_bt').text('编辑');
            },
            error: function (XMLHttpRequest,textStatus) {
                // 状态码
                // alert("test");
                // console.log(XMLHttpRequest.status);
                // 状态
                // console.log(XMLHttpRequest.readyState);
                // 错误信息
                // $("#failModal").modal();
                // alert('ajax '+textStatus);
                $("#failModal").modal();
            }
        });            
    }
});
// //选择搜索项
// $(".searchSel").on('change',function () {
//     // console.log("下标"+$(".searchSel").index(this));
//     var index = $(".searchSel").index(this);
//     var selectText = $(":selected").eq(index).text();
//     console.log(selectText);
//     $('.searchIn').eq(index).attr('placeholder', '按'+selectText+'搜索');
// });
//点击Faq添加按钮
$("#addFaq_bt").click(function(){
    $("#faq_panel").hide();
    $("#addFaq_panel").show();

});
//点击Faq返回按钮
$("#backFaq_bt").click(function(){
    $("#addFaq_panel").hide();
    $("#faq_panel").show();

});
//点击Faq保存按钮
$("#saveFaq_bt").click(function(){
    $("#form_addFaq").validate();
    if($('#form_addFaq').valid()){
        $("#addFaq_successModal").modal();
    }else{
        $("#addFaq_failModal").modal();
    }
   
});
// 修改基础信息验证
$("#form_userinfo").validate({
    rules:{
        username : {
            required:true,
            minlength:1,
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
            minlength: "不能为空",
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

//  二级菜单的滑动处理
$("#questions_check").click(function(){
  $("#info").slideToggle("slow");
});
//点击个人信息切换面板 
$('.nav-pills li[role="presentation"]').click(function() {                        //tags的切换
    var i = $(this).index()-1;
    if(i!=2){
        i >= 4 ? i=i+1 : i = i;
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