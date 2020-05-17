 /* jshint esversion: 6 */
$(document).ready(function(){
    $.ajax({
        type:'GET',
        data:'',
        contentType :'application/json',
        dataType:'json',
        url :'/worker/worker_selectBy_Session_UserId',
        success :function(data) {
            console.dir(data);
            $("#userId").val(data.User_id);
            $("#username").val(data.User_name);
            $("#tel").val(data.Tel);
            $("#email").val(data.Email);            
        },
        error: function () {
            alert("连接超时，请重试！");
        }
    });
    items.searchFor(true);
    questions.searchFor(true);
    maintenances.searchFor(true);
    faqs.searchFor(true);
    roles.searchFor(true);
    logs.searchFor(true);
    selects.firstOptions();
    notices.showNotice();
});
$(window).ajaxStart(function () {
    NProgress.start();
});
$(window).ajaxStop(function () {
    NProgress.done();
});
var items = new Vue({
    el:'#vueItem',
    data: {
        selected: 0,
        key:"",
        placeholder:["项目ID","项目名","负责人"],
        page: {
            pageSize: 8,
            pageNum: 1,
            length:1,
            totalPage: 0
        },
        data:'',
        chooseIndex:''
    },
    methods:{
        init_page: function (totalPage,currentPage) {
            if(totalPage == 0){
                $("#items table tbody").html('');
                $("#items table tbody").append("没有查询到相关数据！");
                return;
            }
            $('#pagination1').jqPaginator({ 
                totalPages: totalPage,
                visiblePages: 6,
                currentPage: currentPage,
                first: '<li><a href="javascript:void(0);">首页</a></li>',
                prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                next: '<li><a href="javascript:void(0);">下一页</a></li>',
                last: '<li><a href="javascript:void(0);">末页</a></li>',
                page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        items.page.pageNum= num;
                        items.searchFor(false);
                    }
                }
            });
        },
        calPage:function(){
            items.page.totalPage =  Math.ceil(items.page.length/items.page.pageSize);
        },
        searchFor:function(initial){
            if (initial) {
                this.page.pageNum = 1;
            }
            axios
            .post('/adminLoing/searchItems/'+this.page.pageNum+'/'+this.page.pageSize, {
                "key": this.key,        
                "choice":this.selected    
            })
            .then(function (response) {
                items.data = response.data[0];
                items.page.length = response.data[1];
                items.calPage();
                items.init_page(items.page.totalPage,items.page.pageNum);    
            })
            .catch(function (error) {
                $('#failModal .modal-body').text(error); 
                $("#failModal").modal();
            });
        },
        showWorker:function(index){
            axios
            .post('/adminLoing/item_worker')
            .then(function (response) {
                itemModal.workers = response.data;
                items.chooseIndex = index;
                $("#itemModal").modal();
            })
            .catch(function (error) {
                $('#failModal .modal-body').text(error); 
                $("#failModal").modal();
            });
        }
    }
});
var itemModal = new Vue({
    el:"#itemModal",
    data:{
        workers:''
    },
});
var questions = new Vue({
    el:'#vueQuestion',
    data: {
        selected: 0,
        key:"",
        placeholder:["问题ID","项目ID","问题类型","问题状态","问题描述","用户ID"],
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
    methods:{
        init_page: function (totalPage,currentPage) {
            $("#questions table tbody").html('');
            if(totalPage == 0){
                $("#questions table tbody").append("没有查询到相关数据！");
                return;
            }
            for(var i=0;i<questions.data.length;i++){
                var item=questions.data[i];
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
                                 '</td><td class="task_check_tb_td">'+
                                 item.user_id + 
                                 '</td></tr>';
                $("#questions table tbody").append(insert);
            }
            $('#pagination2').jqPaginator({ 
                totalPages: totalPage,
                visiblePages: 6,
                currentPage: currentPage,
                first: '<li><a href="javascript:void(0);">首页</a></li>',
                prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                next: '<li><a href="javascript:void(0);">下一页</a></li>',
                last: '<li><a href="javascript:void(0);">末页</a></li>',
                page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        questions.page.pageNum= num;
                        questions.searchFor(false);
                    }
                }
            });
        },
        calPage:function(){
            questions.page.totalPage =  Math.ceil(questions.page.length/questions.page.pageSize);
        },
        searchFor:function(initial){
            if (initial) {
                this.page.pageNum = 1;
            }
            axios
            .post('/adminLoing/searchquestion/'+this.page.pageNum+'/'+this.page.pageSize, {
                "key": this.key,        
                "choice":this.selected    
            })
            .then(function (response) {
                console.log("response:"+response);
                questions.data = response.data[0];
                console.log(questions.data);
                console.log(questions.page);
                questions.page.length = response.data[1];
                questions.calPage();
                questions.init_page(questions.page.totalPage,questions.page.pageNum);    
            })
            .catch(function (error) {
                $('#failModal .modal-body').text(error); 
                $("#failModal").modal();
            });
        }
    }
});
var maintenances = new Vue({
    el:'#dealVue',
    data: {
        selected: 0,
        key:"",
        placeholder:["问题ID","维护员ID","处理时间"],
        page: {
            pageSize: 8,
            pageNum: 1,
            length:1,
            totalPage: 0
        },
        data:''
    },
    methods:{
        init_page: function (totalPage,currentPage) {
            $("#maintenance table tbody").html('');
            if(totalPage == 0){
                $("#maintenance table tbody").append("没有查询到相关数据！");
                return;
            }
            for(var i=0;i<maintenances.data.length;i++){
                var item=maintenances.data[i];
                var insert = '<tr id="showItems">'+
                '<tr id="showItems">'+
                '<td class="task_check_tb_td">' + 
                item.question_id + 
                '</td><td class="task_check_tb_td">' + 
                item.user_id + 
                '</td><td class="task_check_tb_td">' + 
                item.start_time + 
                '</td></tr>';
                $("#maintenance table tbody").append(insert);
            }
            $('#pagination3').jqPaginator({ 
                totalPages: totalPage,
                visiblePages: 6,
                currentPage: currentPage,
                first: '<li><a href="javascript:void(0);">首页</a></li>',
                prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                next: '<li><a href="javascript:void(0);">下一页</a></li>',
                last: '<li><a href="javascript:void(0);">末页</a></li>',
                page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        maintenances.page.pageNum= num;
                        maintenances.searchFor(false);
                    }
                }
            });
        },
        calPage:function(){
            maintenances.page.totalPage =  Math.ceil(maintenances.page.length/maintenances.page.pageSize);
        },
        searchFor:function(initial){
            if (initial) {
                this.page.pageNum = 1;
            }
            axios
            .post('/adminLoing/searchMaintenance/'+this.page.pageNum+'/'+this.page.pageSize, {
                "key": this.key,        
                "choice":this.selected    
            })
            .then(function (response) {
                maintenances.data = response.data[0];
                maintenances.page.length = response.data[1];
                maintenances.calPage();
                maintenances.init_page(maintenances.page.totalPage,maintenances.page.pageNum);    
            })
            .catch(function (error) {
                alert(error);
            });
        }
    }
});
var faqs = new Vue({
    el:'#vueFaq',
    data: {
        selected: 0,
        key:"",
        placeholder:["问题ID","问题","问题解答"],
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
    methods:{
        init_page: function (totalPage,pageSize,currentPage) {
            $("#faq table tbody").html('');            /* 清空tbody内容 */
            if(totalPage == 0){
                $("#faq table tbody").append("没有查询到相关数据！");
                return;
            }
            for(var i=0;i<faqs.data.length;i++){
                var item=faqs.data[i];
                var insert = '<tr id="showItems">'+
                '<tr id="showItems">'+
                '<td class="task_check_tb_td">' + 
                item.question_id + 
                '</td><td class="task_check_tb_td">' + 
                item.user_id + 
                '</td><td class="task_check_tb_td">' + 
                item.start_time + 
                '</td></tr>';
                $("#faq table tbody").append(insert);
            }
            $('#pagination4').jqPaginator({ 
                totalPages: totalPage,        //页码整数
                visiblePages: 6,
                currentPage: currentPage,
                first: '<li><a href="javascript:void(0);">首页</a></li>',
                prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                next: '<li><a href="javascript:void(0);">下一页</a></li>',
                last: '<li><a href="javascript:void(0);">末页</a></li>',
                page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        faqs.page.pageNum= num;
                        faqs.searchFor(false);
                    }
                }
            });
        },
        calPage:function(){
            faqs.page.totalPage =  Math.ceil(faqs.page.length/faqs.page.pageSize);
        },
        searchFor:function(initial){
            if (initial) {
                this.page.pageNum = 1;
            }
            axios
            .post('/adminLoing/searchMaintenance/'+this.page.pageNum+'/'+this.page.pageSize, {
                "key": this.key,        
                "choice":this.selected    
            })
            .then(function (response) {
                faqs.data = response.data[0];
                faqs.page.length = response.data[1];
                faqs.calPage();
                faqs.init_page(faqs.page.totalPage,faqs.page.pageNum);    
            })
            .catch(function (error) {
                $('#failModal .modal-body').text(error); 
                $("#failModal").modal();
            });
        }
    }
});
var selects = new Vue({
    el:'#selectVue',
    data: {
        firstSelected:0,
        secondSelected:0,
        firstContain:'',
        secondContain:'',
        final:''
    },
    methods:{
        firstOptions:function(){
            axios
            .post('/adminLoing/droplistID')
            .then(response => (selects.firstContain = response.data))
            .catch(function (error) {
                $('#failModal .modal-body').text(error); 
                $("#failModal").modal();
            });
        },
        secondOptions:function(){
            axios
            .post('/adminLoing/wokername',{
                "key":selects.firstSelected
            })
            .then(response => (selects.secondContain = response.data))
            .catch(function (error) {
                $('#failModal .modal-body').text(error); 
                $("#failModal").modal();
            });
        },
        cancel:function(){
            selects.firstSelected=0;
            selects.secondSelected=0;
        },
        assign:function(){
            axios
            .post('/adminLoing/wokername',{
                "questionID":selects.firstSelected,
                "workerName":selects.secondSelected
            })
            .then(function(response){
                selects.final = response.data;
                if (selects.final.status) {
                    $('#successModal .modal-body').text("任务指派成功"); 
                    $("#successModal").modal();
                }
            })
            .catch(function (error) { // 请求失败处理
                $('#failModal .modal-body').text(error); 
                $("#failModal").modal();
            });

        }
    }

});
var roles = new Vue({
    el:'#roleControl',
    data: {
        selected: 0,
        roleSearch:0,
        roleChoice:[],
        key:"",
        roleOptions:["管理员","维护人员","普通用户","负责人","null"],
        placeholder:["用户ID","用户名","角色","角色分配"],
        page: {
            pageSize: 8,
            pageNum: 1,
            length:1,
            totalPage: 0
        },
        data:''
    },
    methods:{
        init_page: function (totalPage,currentPage) {
            if(totalPage == 0){
                $("#role table tbody").html('');
                $("#role table tbody").append("没有查询到相关数据！");
                return;
            }
            $('#pagination6').jqPaginator({ 
                totalPages: totalPage,        //页码整数
                visiblePages: 6,
                currentPage: currentPage,
                first: '<li><a href="javascript:void(0);">首页</a></li>',
                prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                next: '<li><a href="javascript:void(0);">下一页</a></li>',
                last: '<li><a href="javascript:void(0);">末页</a></li>',
                page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        roles.page.pageNum= num;
                        for (const i in roles.data) {
                            roles.data[i].Role_id -= 1;
                            roles.roleChoice[i] = roles.data[i].Role_id;
                        }
                        roles.searchFor(false);
                    }
                }
            });
        },
        calPage:function(){
            roles.page.totalPage =  Math.ceil(roles.page.length/roles.page.pageSize);
        },
        searchFor:function(initial){
            if (initial) {
                this.page.pageNum = 1;
            }
            if (this.selected==2) {
                this.key = this.roleSearch;
            }
            axios
            .post('/adminLoing/searchuser/'+this.page.pageNum+'/'+this.page.pageSize, {
                "key": this.key,        
                "choice":this.selected    
            })
            .then(function (response) {
                roles.data = response.data[0];
                roles.page.length = response.data[1];
                roles.calPage();
                for (const i in roles.data) {
                    roles.data[i].Role_id -= 1;
                    roles.roleChoice[i] = roles.data[i].Role_id;
                }
                roles.init_page(roles.page.totalPage,roles.page.pageNum);    
            })
            .catch(function (error) {
                $('#failModal .modal-body').text(error); 
                $("#failModal").modal();
            });
        },
        alterRole:function(index){
            if (roles.data[index].Role_id==roles.roleChoice[index] ) {
                $('#failModal .modal-body').text("id为"+
                roles.data[index].User_id+
                "的用户已拥有"+
                roles.roleOptions[roles.data[index].Role_id]+
                "的权限了"); 
                $("#failModal").modal();
            }else{
                axios
                .post('/adminLoing/addrole', {
                    "userID":roles.data[index].User_id,
                    "roleID":roles.roleChoice[index] 
                })
                .then(function (response) {
                    if (response.data.status) {
                        $('#successModal .modal-body').text(response.data.msg);
                        $("#successModal").modal();
                        roles.searchFor(false);
                    }else{
                        $('#failModal .modal-body').text(response.data.msg); 
                        $("#failModal").modal();
                    }
                })
                .catch(function (error) {
                    $('#failModal .modal-body').text(error); 
                    $("#failModal").modal();
                });
            }
        },
        deleteRole:function(index){
            if (confirm("确定删除id为"+
            roles.data[index].User_id+
            "的"+
            roles.roleOptions[roles.data[index].Role_id]+
            "角色吗？")) {
                axios
                .post('/adminLoing/deleterole', {
                    "userID":roles.data[index].User_id,
                    "roleID":roles.roleChoice[index] 
                })
                .then(function (response) {
                    if (response.data.status) {
                        $('#successModal .modal-body').text(response.data.msg);
                        $("#successModal").modal();
                        roles.searchFor(false);
                    }else{
                        $('#failModal .modal-body').text(response.data.msg); 
                        $("#failModal").modal();
                    }
                })
                .catch(function (error) {
                    $('#failModal .modal-body').text(error); 
                    $("#failModal").modal();
                });
            }
        }
    }
});
var logs = new Vue({
    el:'#logVue',
    data: {
        selected: 0,
        key:"",
        placeholder:["用户ID","操作描述","method","IP地址","操作时间","日志ID"],
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
    methods:{
        init_page: function (totalPage,currentPage) {
            $("#log table tbody").html('');
            if(totalPage == 0){
                $("#log table tbody").append("没有查询到相关数据！");
                return;
            }
            for(var i=0;i<logs.data.length;i++){
                var item=logs.data[i];
                var str = item.method;
                var method = str;
                if (str != null) {
                    method = str.split('.')[5];
                }
                var insert = '<tr id="showItems">'+
                            '<td class="task_check_tb_td">' + 
                            item.user_id + 
                            '</td><td class="task_check_tb_td">' + 
                            item.operation + 
                            '</td><td class="task_check_tb_td">' + 
                            method + 
                            '</td><td class="task_check_tb_td">' + 
                            item.ip + 
                            '</td><td class="task_check_tb_td">' + 
                            item.creat_time + 
                            '</td><td class="task_check_tb_td">' + 
                            item.log_id + 
                            '</td></tr>';
                $("#log table tbody").append(insert);
            }
            $('#pagination5').jqPaginator({ 
                totalPages: totalPage,        //页码整数
                visiblePages: 6,
                currentPage: currentPage,
                first: '<li><a href="javascript:void(0);">首页</a></li>',
                prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                next: '<li><a href="javascript:void(0);">下一页</a></li>',
                last: '<li><a href="javascript:void(0);">末页</a></li>',
                page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        logs.page.pageNum= num;
                        logs.searchFor(false);
                    }
                }
            });
        },
        calPage:function(){
            logs.page.totalPage =  Math.ceil(logs.page.length/logs.page.pageSize);
        },
        searchFor:function(initial){
            if (initial) {
                this.page.pageNum = 1;
            }
            axios
            .post('/adminLoing/searchLog/'+this.page.pageNum+'/'+this.page.pageSize, {
                "key": this.key,        
                "choice":this.selected    
            })
            .then(function (response) {
                logs.data = response.data[0];
                logs.page.length = response.data[1];
                logs.calPage();
                logs.init_page(logs.page.totalPage,logs.page.pageNum);    
            })
            .catch(function (error) { // 请求失败处理
                $('#failModal .modal-body').text(error); 
                $("#failModal").modal();
            });
        }
    }
});
var notices = new Vue({
    el:'#notice',
    data:{
        data1:'',
        temp1:[],
        data2:'',
        temp2:[]
    },
    methods: {
        showNotice:function() {
            axios
            .post('/adminLoing/overtime_unaccept')
            .then(function (response) {
                notices.data1 = response.data;
                if (notices.data1.length==0) {
                    $("#notice1 table").hide();
                    $("#notice1").append("没有超时待处理项目");
                }else if(notices.data1.length>6){
                    setInterval(function(){ 
                        var body = $("#notice1 table tbody"); 
                        var liHeight = body.find("tr:last").height()+10;
                        body.animate({marginTop : liHeight +"px"},1000,function(){ 
                            body.find("tr:last").prependTo(body);
                            body.css({marginTop:'10px'}); 
                        });         
                    },2000); 
                }
            })
            .catch(function (error) { // 请求失败处理
                $('#failModal .modal-body').text(error); 
                $("#failModal").modal();
            });
            axios
            .post('/adminLoing/overtim_deal')
            .then(function (response) {
                notices.data2 = response.data;
                if (notices.data2.length==0) {
                    $("#notice2 table").hide();
                    $("#notice2").append("没有超时未完成项目");
                }else if(notices.data2.length>6){
                    setInterval(function(){ 
                        var body = $("#notice2 table tbody"); 
                        var liHeight = body.find("tr:last").height()+10;
                        body.animate({marginTop : liHeight +"px"},1000,function(){ 
                            body.find("tr:last").prependTo(body);
                            body.css({marginTop:'10px'}); 
                        });         
                    },2000);
                }
            })
            .catch(function (error) { // 请求失败处理
                $('#failModal .modal-body').text(error); 
                $("#failModal").modal();
            });
        }
    }
});


/* 一些触发事件 */
$(document).on('click','#modalBtn',function () {
    var index = $("input[name='worker']:checked").val();
    console.log(itemModal.workers);
    $("#itemModal").modal('hide');
    axios
    .post('/adminLoing/leaderEdit',{
        "itemID":items.data[items.chooseIndex].item_id,
        "userID":itemModal.workers[index].User_id
    })
    .then(function (response) {
        if (response.data.status) {
            items.data[items.chooseIndex].User_id = itemModal.workers[index].User_id;
            $("#successModal").modal();
            $('#successModal .modal-body').text(response.data.msg);
        } else {
            $('#failModal .modal-body').text(response.data.msg); 
            $("#failModal").modal();
        }
    })
    .catch(function (error) {
        $('#failModal .modal-body').text(error); 
        $("#failModal").modal();
    });
});
$("#loginOut").click(function () { 
    $.ajax({
        type:'post',
        data:'',
        contentType :'application/json',
        dataType:'json',
        url :'/user/logout',
        success :function(data) {
            if (data==1) {
                $(window).attr("location",'/');
            }else{
                alert("退出登录失败！");
            }
        },
        error: function () {
            alert("连接超时，请重试！");
        }
    });
});
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
                if(data.code == 0){      //修改成功
                    $("#successModal").modal();
                    $('#successModal .modal-body').text("修改成功！");
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
            error: function (textStatus) {
                $("#failModal").modal();
                $('#failModal .modal-body').text(textStatus); 
            }
        });            
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