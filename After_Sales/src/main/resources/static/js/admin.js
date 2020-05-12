$(document).ready(function(){
    // 加载个人页面信息
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
            // alert("ok!");
        },
        error: function (XMLHttpRequest,textStatus) {
            // 状态码
            // alert("test");
            console.log(XMLHttpRequest.status);
            // 状态
            console.log(XMLHttpRequest.readyState);
            // 错误信息
            alert("连接超时，请重试！");
        }
    });
    // 分页
    var pageSize =8;     //每页显示多少条记录
    $(function() {          //表格初始化
        itemsRequest(1,true);
        questionRequest(1,true);
        maintenanceRequest(1,true);
        faqRequest(1,true);
        logRequest(1,true);
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
                    var insert = '<tr id="showItems">'+
                                 '<td class="task_check_tb_td">' + 
                                 item.item_id + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.item_name + 
                                 '</td><td class="task_check_tb_td">' + 
                                 item.user_id + 
                                 '</td></tr>';
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
                                    item.user_id + 
                                    '</td><td class="task_check_tb_td">' + 
                                    item.operation + 
                                    '</td><td class="task_check_tb_td">' + 
                                    method + 
                                    '</td><td class="task_check_tb_td">' + 
                                    item.ip + 
                                    '</td><td class="task_check_tb_td">' + 
                                    item.creat_time + 
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
        init_page: function (totalPage,pageSize ,currentPage) {
            $("#items table tbody").html('');            /* 清空tbody内容 */
            if(totalPage == 0){
                $("#items table tbody").append("没有查询到相关数据！");
                return;
            }
            for(var i=0;i<items.data.length;i++){
                var item=items.data[i];
                var insert = '<tr id="showItems">'+
                                '<td class="task_check_tb_td">' + 
                                item.item_id +
                                '</td><td class="task_check_tb_td">' + 
                                item.item_name + 
                                '</td><td class="task_check_tb_td">' + 
                                item.user_id + 
                                '</td></tr>';
                $("#items table tbody").append(insert);
            }
            $('#pagination1').jqPaginator({ 
                totalPages: totalPage,        //页码整数
                visiblePages: pageSize,
                currentPage: currentPage,
                first: '<li><a href="javascript:void(0);">首页</a></li>',
                prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                next: '<li><a href="javascript:void(0);">下一页</a></li>',
                last: '<li><a href="javascript:void(0);">末页</a></li>',
                page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        items.page.pageNum= num;
                        items.splitStart = num;
                        items.searchFor();
                    }
                }
            });
        },
        calPage:function(){
            items.page.totalPage =  Math.ceil(items.page.length/items.page.pageSize);
        },
        searchFor:function(){
            axios
            .post('/adminLoing/searchItems/'+this.page.pageNum+'/'+this.page.pageSize, {
                "key": this.key,        
                "choice":this.selected    
            })
            .then(function (response) {
                items.data = response.data[0];
                items.page.length = response.data[1];
                items.calPage();
                items.init_page(items.page.totalPage,items.page.pageSize ,items.page.pageNum);    
            })
            .catch(function (error) { // 请求失败处理
                alert(error);
            });
        }
    }
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
        init_page: function (totalPage,pageSize,currentPage) {
            $("#questions table tbody").html('');            /* 清空tbody内容 */
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
                totalPages: totalPage,        //页码整数
                visiblePages: pageSize,
                currentPage: currentPage,
                first: '<li><a href="javascript:void(0);">首页</a></li>',
                prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                next: '<li><a href="javascript:void(0);">下一页</a></li>',
                last: '<li><a href="javascript:void(0);">末页</a></li>',
                page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        questions.page.pageNum= num;
                        questions.searchFor();
                    }
                }
            });
        },
        calPage:function(){
            questions.page.totalPage =  Math.ceil(questions.page.length/questions.page.pageSize);
        },
        searchFor:function(){
            // console.log(this.selected+this.key);
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
                // console.dir(questions.data);
                questions.init_page(questions.page.totalPage,questions.page.pageSize ,questions.page.pageNum);    
            })
            .catch(function (error) { // 请求失败处理
                alert(error);
                
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
            $("#maintenance table tbody").html('');            /* 清空tbody内容 */
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
                totalPages: totalPage,        //页码整数
                visiblePages: pageSize,
                currentPage: currentPage,
                first: '<li><a href="javascript:void(0);">首页</a></li>',
                prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                next: '<li><a href="javascript:void(0);">下一页</a></li>',
                last: '<li><a href="javascript:void(0);">末页</a></li>',
                page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        maintenances.page.pageNum= num;
                        maintenances.searchFor();
                    }
                }
            });
        },
        calPage:function(){
            maintenances.page.totalPage =  Math.ceil(maintenances.page.length/maintenances.page.pageSize);
        },
        searchFor:function(){
            axios
            .post('/adminLoing/searchMaintenance/'+this.page.pageNum+'/'+this.page.pageSize, {
                "key": this.key,        
                "choice":this.selected    
            })
            .then(function (response) {
                // console.log("response:"+response);
                maintenances.data = response.data[0];
                // console.log(maintenances.data);
                // console.log(maintenances.page);
                maintenances.page.length = response.data[1];
                maintenances.calPage();
                // console.dir(questions.data);
                maintenances.init_page(maintenances.page.totalPage,maintenances.page.pageSize ,maintenances.page.pageNum);    
            })
            .catch(function (error) { // 请求失败处理
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
                visiblePages: pageSize,
                currentPage: currentPage,
                first: '<li><a href="javascript:void(0);">首页</a></li>',
                prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                next: '<li><a href="javascript:void(0);">下一页</a></li>',
                last: '<li><a href="javascript:void(0);">末页</a></li>',
                page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        faqs.page.pageNum= num;
                        faqs.searchFor();
                    }
                }
            });
        },
        calPage:function(){
            faqs.page.totalPage =  Math.ceil(faqs.page.length/faqs.page.pageSize);
        },
        searchFor:function(){
            axios
            .post('/adminLoing/searchMaintenance/'+this.page.pageNum+'/'+this.page.pageSize, {
                "key": this.key,        
                "choice":this.selected    
            })
            .then(function (response) {
                faqs.data = response.data[0];
                faqs.page.length = response.data[1];
                faqs.calPage();
                faqs.init_page(faqs.page.totalPage,faqs.page.pageSize ,faqs.page.pageNum);    
            })
            .catch(function (error) { // 请求失败处理
                alert(error);
            });
        }
    }
});
var logs = new Vue({
    el:'#logVue',
    data: {
        selected: 0,
        key:"",
        placeholder:["日志ID","用户ID","操作描述","method","IP地址","操作时间"],
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
            $("#log table tbody").html('');            /* 清空tbody内容 */
            if(totalPage == 0){
                $("#log table tbody").append("没有查询到相关数据！");
                return;
            }
            for(var i=0;i<logs.data.length;i++){
                var item=logs.data[i];
                var insert = '<tr id="showItems">'+
                            '<td class="task_check_tb_td">' + 
                            item.log_id + 
                            '</td><td class="task_check_tb_td">' + 
                            item.user_id + 
                            '</td><td class="task_check_tb_td">' + 
                            item.operation + 
                            '</td><td class="task_check_tb_td">' + 
                            method + 
                            '</td><td class="task_check_tb_td">' + 
                            item.ip + 
                            '</td><td class="task_check_tb_td">' + 
                            item.creat_time + 
                            '</td></tr>';
                $("#log table tbody").append(insert);
            }
            $('#pagination5').jqPaginator({ 
                totalPages: totalPage,        //页码整数
                visiblePages: pageSize,
                currentPage: currentPage,
                first: '<li><a href="javascript:void(0);">首页</a></li>',
                prev: '<li><a href="javascript:void(0);">上一页</a></li>',
                next: '<li><a href="javascript:void(0);">下一页</a></li>',
                last: '<li><a href="javascript:void(0);">末页</a></li>',
                page: '<li><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        logs.page.pageNum= num;
                        logs.searchFor();
                    }
                }
            });
        },
        calPage:function(){
            logs.page.totalPage =  Math.ceil(logs.page.length/logs.page.pageSize);
        },
        searchFor:function(){
            axios
            .post('adminLoing/searchLog/'+this.page.pageNum+'/'+this.page.pageSize, {
                "key": this.key,        
                "choice":this.selected    
            })
            .then(function (response) {
                logs.data = response.data[0];
                logs.page.length = response.data[1];
                logs.calPage();
                logs.init_page(logs.page.totalPage,logs.page.pageSize ,logs.page.pageNum);    
            })
            .catch(function (error) { // 请求失败处理
                alert(error);
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
                $("#failModal").modal();
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