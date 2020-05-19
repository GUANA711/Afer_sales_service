var dt_unaccepted;
var dt_ing;
var dt_done;
var dt_faq;
var dt_allocate;
var dt_deleteAllocate;
var dt_addAllocate;
// 预处理
$(document).ready(function() {
    // 加载维修人员页面信息
    $.ajax({
        type: 'GET',
        data: '',
        contentType: 'application/json',
        dataType: 'json',
        url: 'http://localhost:5050/worker/worker_selectBy_Session_UserId',
        // url2 :'http://localhost:5050/worker/worker_show_unaccepted',
        success: function (data) {
            console.dir(data);
            $("#userId").val(data.User_id);
            $("#username").val(data.User_name);
            $("#tel").val(data.Tel);
            $("#email").val(data.Email);
            $("#tasknum").val(data.Task_num);

            // $("#new_task1").val(data.Question_id);
            // alert(data.User_name+"欢迎回来！");
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
    notices.showNotice();
    // 点击编辑按钮
    $("#edit_bt").click(function () {
        $("#username").attr("readonly", false);
        $("#tel").attr("readonly", false);
        $("#email").attr("readonly", false);
    });
    // 点击保存按钮
    $("#save_bt").click(function () {
        var User_name = $("#username").val();
        var Tel = $("#tel").val();
        var Email = $("#email").val();
        var info = {
            "User_name": User_name,
            "Tel": Tel,
            "Email": Email
        };
        if ($('#form_userinfo').valid()) {
            $.ajax({
                type: 'POST',
                data: JSON.stringify(info),
                contentType: 'application/json',
                dataType: 'json',
                url: 'http://localhost:5050/worker/worker_updateBy_Session_UserId',
                success: function (data) {
                    console.dir(data);
                    $("#username").attr("readonly", true);
                    $("#tel").attr("readonly", true);
                    $("#email").attr("readonly", true);
                    $(this).text($(this).text() === '编辑');
                    $("#userId").val(data.User_id);
                    $("#username").val(data.User_name);
                    $("#tel").val(data.Tel);
                    $("#email").val(data.Email);
                    $("#tasknum").val(data.Task_num);
                    alert(data.status);
                },
                error: function (result) {
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                    alert(data.status);
                }
            });
        } else {
            alert(data.status);
        }
    });
    // 二级菜单的滑动处理
    $("#task_check").click(function () {
        $("#info").slideToggle("slow");
    });
    // 点击个人信息切换面板
    $("#user_info").click(function () {
        $(".find_panel").children().hide();
        $("#user_panel").show();
        $(".message").show();
    });
    // 修改基础信息验证
    $("#form_userinfo").validate({
        rules: {
            username: {
                required: true
            },
            tel: {
                required: true
            },
            email: {
                email: true
            }
        },
        messages: {
            username: {
                required: "请输入用户名"
            },
            tel: {
                required: "请输入电话号码"
            },
            email: {
                email: "电子邮件格式错误"
            }
        }
    });

    // 点击未接收任务切换面板
    $("#unrecieved_task").click(function () {
        $(".find_panel").children().hide();
        $("#task_check_panel").show();
        $(".message").show();

        //加载未接收任务
        dt_unaccepted = $('#table').DataTable({
            responsive: true,
            destroy: true,
            serviceSize: true,// 开启服务端模式
            ajax:
                {
                    // 使用ajax异步请求的方式加载数据
                    type: 'GET',
                    async: false,
                    dataSrc: '',
                    contentType: 'application/json',
                    dataType: 'json',
                    url: 'http://localhost:5050/worker/worker_show_unaccepted'

                },
            columns: [
                // 配置columns
                // 使用对象数组，一定要配置columns
                // 告诉 DataTables 每列对应的属性data
                // 这里是固定不变的，name，position，salary，office 为你数据里对应的属性
                {
                    "data": "question_id",
                    className: "Question_id",
                    "searchable": false
                },
                {
                    "data": "question_type",
                    className: "Question_type"
                },
                {
                    "data": "question_detail",
                    className: "Question_detail"
                },
                {
                    "data": null,
                    render: function (data, type, row) {
                        var html = '<a href="javascript:void(0);" class="operate-btn-accept">接收任务</a>';
                        return html;
                    }
                }
            ],
            language:
                {// 配置
                    "sProcessing": "处理中...",
                    "sLengthMenu": "显示 _MENU_ 项结果",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix": "",
                    "sSearch": "搜索:",
                    "sUrl": "",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands": ",",
                    "oPaginate":
                        {
                            "sFirst": "首页",
                            "sPrevious": "上页",
                            "sNext": "下页",
                            "sLast": "末页"
                        },
                    "oAria":
                        {
                            "sSortAscending": ": 以升序排列此列",
                            "sSortDescending": ": 以降序排列此列"
                        }
                }
        });

    });
    $("body").on("click", ".operate-btn-accept", function () {
        var question_id = $(this).parent().parent().find(".Question_id").text();
        var info = {
            "questionID": question_id
        };
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            dataType: "json",
            url: "http://localhost:5050/worker/worker_receive",
            data: JSON.stringify(info),
            success: function (data) {
                // if (data.status==true)
                dt_unaccepted.ajax.reload();
                alert(data.msg);
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
    });
    // 点击正处理任务切换面板
    $("#ing_task").click(function () {
        $(".find_panel").children().hide();
        $("#task_ing_panel").show();
        $(".message").show();

        dt_ing = $('#table2').DataTable({
            responsive: true,
            destroy: true,
            serviceSize: true,// 开启服务端模式
            ajax:
                {
                    // 使用ajax异步请求的方式加载数据
                    type: 'GET',
                    async: false,
                    dataSrc: '',
                    contentType: 'application/json',
                    dataType: 'json',
                    url: 'http://localhost:5050/worker/worker_show_accepted'

                },
            columns: [
                // 配置columns
                // 使用对象数组，一定要配置columns
                // 告诉 DataTables 每列对应的属性data
                // 这里是固定不变的，name，position，salary，office 为你数据里对应的属性
                {
                    "data": "Question_id",
                    className: "Question_id",
                    "searchable": false
                },
                {
                    "data": "Question_detail",
                    className: "Question_detail"
                },
                {
                    "data": "User_id",
                    className: "User_id"
                },
                {
                    "data": "Start_time",
                    className: "Start_time"
                },
                {
                    "data": null,
                    render: function (data, type, row) {
                        var html = '<a href="javascript:void(0);" class="operate-btn-finish">完成任务</a>';
                        return html;
                    }
                }
            ],
            language:
                {// 配置
                    "sProcessing": "处理中...",
                    "sLengthMenu": "显示 _MENU_ 项结果",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix": "",
                    "sSearch": "搜索:",
                    "sUrl": "",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands": ",",
                    "oPaginate":
                        {
                            "sFirst": "首页",
                            "sPrevious": "上页",
                            "sNext": "下页",
                            "sLast": "末页"
                        },
                    "oAria":
                        {
                            "sSortAscending": ": 以升序排列此列",
                            "sSortDescending": ": 以降序排列此列"
                        }
                }
        });

    });
    $("body").on("click", ".operate-btn-finish", function () {
        var question_id = $(this).parent().parent().find(".Question_id").text();
        var info = {
            "questionID": question_id
        };
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: "http://localhost:5050/worker/worker_finish",
            data: JSON.stringify(info),
            success: function (data) {
                // alert("???");
                dt_ing.ajax.reload();
                alert(data.msg);
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
    });

    // 点击已完成任务切换面板
    $("#finished_task").click(function () {
        $(".find_panel").children().hide();
        $("#task_finished_panel").show();
        $(".message").show();

        dt_done = $('#table3').DataTable({
            responsive: true,
            destroy: true,
            serviceSize: true,// 开启服务端模式
            ajax:
                {
                    // 使用ajax异步请求的方式加载数据
                    type: 'GET',
                    async: false,
                    dataSrc: '',
                    contentType: 'application/json',
                    dataType: 'json',
                    url: 'http://localhost:5050/worker/worker_show_done'

                },
            columns: [
                // 配置columns
                // 使用对象数组，一定要配置columns
                // 告诉 DataTables 每列对应的属性data
                // 这里是固定不变的，name，position，salary，office 为你数据里对应的属性
                {
                    "data": "question_id",
                    className: "Question_id",
                    "searchable": false
                },
                {
                    "data": "question_type",
                    className: "Question_type"
                },
                {
                    "data": "question_detail",
                    className: "Question_detail"
                },

                {
                    "data": "user_id",
                    className: "User_id"
                },
                // {
                //     "data" : null,
                //     render : function (data, type, row)
                //     {
                //         var html = '<a href="javascript:void(0);" class="operate-btn-accept">接收任务</a>';
                //         return html;
                //     }
                // }
            ],
            language:
                {// 配置
                    "sProcessing": "处理中...",
                    "sLengthMenu": "显示 _MENU_ 项结果",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix": "",
                    "sSearch": "搜索:",
                    "sUrl": "",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands": ",",
                    "oPaginate":
                        {
                            "sFirst": "首页",
                            "sPrevious": "上页",
                            "sNext": "下页",
                            "sLast": "末页"
                        },
                    "oAria":
                        {
                            "sSortAscending": ": 以升序排列此列",
                            "sSortDescending": ": 以降序排列此列"
                        }
                }
        });

    });
    // 点击项目分配面板
    $("#allocate_present").click(function () {
        $(".find_panel").children().hide();
        $("#allocate_panel").show();
        $(".message").show();
        dt_allocate = $('#allocate_table').DataTable({
            responsive: true,
            destroy: true,
            serviceSize: true,// 开启服务端模式
            ajax:
                {
                    // 使用ajax异步请求的方式加载数据
                    type: 'GET',
                    async: false,
                    dataSrc: '',
                    contentType: 'application/json',
                    dataType: 'json',
                    url: 'http://localhost:5050/worker/show_items'

                },
            columns: [
                // 配置columns
                // 使用对象数组，一定要配置columns
                // 告诉 DataTables 每列对应的属性data
                // 这里是固定不变的，user_id，item_id，item_name，为你数据里对应的属性
                {
                    "data": "user_id",
                    className: "User_id",
                    "searchable": false
                },
                {
                    "data": "item_id",
                    className: "Item_id"
                },
                {
                    "data": "item_name",
                    className: "Item_name"
                },
                {
                    "data": null,
                    render: function (data, type, row) {
                        var html = '<a href="javascript:void(0);" class="operate-btn-choose-delete" >移除人员</a>';
                        return html;
                    }
                },
                {
                    "data": null,
                    render: function (data, type, row) {
                        var html = '<a href="javascript:void(0);" class="operate-btn-choose-add" >添加人员</a>';
                        return html;
                    }
                }
            ],
            language:
                {// 配置
                    "sProcessing": "处理中...",
                    "sLengthMenu": "显示 _MENU_ 项结果",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix": "",
                    "sSearch": "搜索:",
                    "sUrl": "",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands": ",",
                    "oPaginate":
                        {
                            "sFirst": "首页",
                            "sPrevious": "上页",
                            "sNext": "下页",
                            "sLast": "末页"
                        },
                    "oAria":
                        {
                            "sSortAscending": ": 以升序排列此列",
                            "sSortDescending": ": 以降序排列此列"
                        }
                }
        });
    });
    //选择移除按钮
    $("body").on("click", ".operate-btn-choose-delete", function () {
        var Item_id = $(this).parent().parent().find(".Item_id").text();
        var info = {
            "Item_id": Item_id
        };
        // alert(Item_id);
        $("#allocate_panel").hide();
        $("#deleteAllocate_panel").show();
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: "http://localhost:5050/worker/show_item_workers",
            data: JSON.stringify(info),
            success: function (data) {
                // alert(data);
                dt_deleteAllocate = $('#deleteAllocate_table').DataTable({
                    responsive: true,
                    destroy: true,
                    serviceSize: true,// 开启服务端模式
                    data: data,
                    columns: [
                        {data: 'User_id'},
                        {
                            "data": null,
                            render: function (data, type, row) {
                                var html = '<a href="javascript:void(0);" class="operate-btn-delete" >移除该人员</a>';
                                return html;
                            }
                        }
                    ],
                    language:
                        {// 配置
                            "sProcessing": "处理中...",
                            "sLengthMenu": "显示 _MENU_ 项结果",
                            "sZeroRecords": "没有匹配结果",
                            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                            "sInfoPostFix": "",
                            "sSearch": "搜索:",
                            "sUrl": "",
                            "sEmptyTable": "表中数据为空",
                            "sLoadingRecords": "载入中...",
                            "sInfoThousands": ",",
                            "oPaginate":
                                {
                                    "sFirst": "首页",
                                    "sPrevious": "上页",
                                    "sNext": "下页",
                                    "sLast": "末页"
                                },
                            "oAria":
                                {
                                    "sSortAscending": ": 以升序排列此列",
                                    "sSortDescending": ": 以降序排列此列"
                                }
                        }
                });
                if(jQuery.isEmptyObject(data)){
                    alert("该项目没有维修人员，请添加！");
                }
            },
            error: function (XMLHttpRequest) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
            }
        });
        //选择添加按钮
        $("body").on("click", ".operate-btn-choose-add", function () {
            var Item_id = $(this).parent().parent().find(".Item_id").text();
            var info = {
                "Item_id": Item_id
            };
            // alert(Item_id);
            $("#allocate_panel").hide();
            $("#addAllocate_panel").show();
            $.ajax({
                type: "POST",
                contentType: 'application/json',
                url: "http://localhost:5050/worker/show_item_other_workers",
                data: JSON.stringify(info),
                success: function (data) {
                    // alert(data);
                    dt_addAllocate = $('#addAllocate_table').DataTable({
                        responsive: true,
                        destroy: true,
                        serviceSize: true,// 开启服务端模式
                        data: data,
                        columns: [
                            {data: 'User_id'},
                            {
                                "data": null,
                                render: function (data, type, row) {
                                    var html = '<a href="javascript:void(0);" class="operate-btn-add" >添加该人员</a>';
                                    return html;
                                }
                            }
                        ],
                        language:
                            {// 配置
                                "sProcessing": "处理中...",
                                "sLengthMenu": "显示 _MENU_ 项结果",
                                "sZeroRecords": "没有匹配结果",
                                "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                                "sInfoPostFix": "",
                                "sSearch": "搜索:",
                                "sUrl": "",
                                "sEmptyTable": "表中数据为空",
                                "sLoadingRecords": "载入中...",
                                "sInfoThousands": ",",
                                "oPaginate":
                                    {
                                        "sFirst": "首页",
                                        "sPrevious": "上页",
                                        "sNext": "下页",
                                        "sLast": "末页"
                                    },
                                "oAria":
                                    {
                                        "sSortAscending": ": 以升序排列此列",
                                        "sSortDescending": ": 以降序排列此列"
                                    }
                            }
                    });
                },
                error: function (XMLHttpRequest) {
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                }
            });
        });
        //点击移除按钮
        $("body").on("click", ".operate-btn-delete", function () {
            var Item_id = $(this).parent().parent().find(".Item_id").text();
            var User_id = $(this).parent().parent().find(".User_id").text();
            var info = {
                "Item_id": Item_id,
                "User_id": User_id
            };
            $.ajax({
                type: "POST",
                contentType: 'application/json',
                dataType: "json",
                url: "http://localhost:5050/worker/delete_item_worker",
                data: JSON.stringify(info),
                success: function (data) {
                    // if (data.status==true)
                    dt_deleteAllocate.ajax.reload();
                    alert(data.msg);
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
        //点击添加人员按钮
        $("body").on("click", ".operate-btn-add", function () {
            var Item_id = $(this).parent().parent().find(".Item_id").text();
            var User_id = $(this).parent().parent().find(".User_id").text();
            var info = {
                "Item_id": Item_id,
                "User_id": User_id
            };
            $.ajax({
                type: "POST",
                contentType: 'application/json',
                dataType: "json",
                url: "http://localhost:5050/worker/insert_item_other_workers",
                data: JSON.stringify(info),
                success: function (data) {
                    // if (data.status==true)
                    dt_addAllocate.ajax.reload();
                    alert(data.msg);
                },
                error: function (XMLHttpRequest) {
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                }
            })
        })
        // 点击FAQ面板
        $("#faq_present").click(function () {
            $(".find_panel").children().hide();
            $("#faq_panel").show();
            $(".message").show();
            dt_faq = $('#faq_table').DataTable({
                responsive: true,
                destroy: true,
                serviceSize: true,// 开启服务端模式
                ajax:
                    {
                        // 使用ajax异步请求的方式加载数据
                        type: 'GET',
                        async: false,
                        dataSrc: '',
                        contentType: 'application/json',
                        dataType: 'json',
                        url: 'http://localhost:5050/faq/selectAllFAQ'

                    },
                columns: [
                    // 配置columns
                    // 使用对象数组，一定要配置columns
                    // 告诉 DataTables 每列对应的属性data
                    // 这里是固定不变的，name，position，salary，office 为你数据里对应的属性
                    {
                        "data": "faq_id",
                        className: "Faq_id",
                        "searchable": false
                    },
                    {
                        "data": "faq_question",
                        className: "Faq_question"
                    },
                    {
                        "data": "faq_answer",
                        className: "Faq_answer"
                    },
                ],
                language:
                    {// 配置
                        "sProcessing": "处理中...",
                        "sLengthMenu": "显示 _MENU_ 项结果",
                        "sZeroRecords": "没有匹配结果",
                        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                        "sInfoPostFix": "",
                        "sSearch": "搜索:",
                        "sUrl": "",
                        "sEmptyTable": "表中数据为空",
                        "sLoadingRecords": "载入中...",
                        "sInfoThousands": ",",
                        "oPaginate":
                            {
                                "sFirst": "首页",
                                "sPrevious": "上页",
                                "sNext": "下页",
                                "sLast": "末页"
                            },
                        "oAria":
                            {
                                "sSortAscending": ": 以升序排列此列",
                                "sSortDescending": ": 以降序排列此列"
                            }
                    }
            });
        });

        // 点击Faq添加按钮
        $("#addFaq_bt").click(function () {
            $("#faq_panel").hide();
            $("#addFaq_panel").show();
            $("#faq_question").attr("readonly", false);
            $("#faq_answer").attr("readonly", false);

        })

        // 点击Faq保存按钮
        $("#saveFaq_bt").click(function () {
            //大写都是后端数据，小写都是js约束
            var Faq_question = $("#faq_question").val();
            var Faq_answer = $("#faq_answer").val();
            var info = {
                "Faq_question": Faq_question,
                "Faq_answer": Faq_answer,
            };
            if ($('#form_addFaq').valid()) {
                $.ajax({
                    type: 'POST',
                    data: JSON.stringify(info),
                    contentType: 'application/json',
                    dataType: 'json',
                    url: 'http://localhost:5050/faq/addFAQ',
                    success: function (data) {
                        console.dir(data);
                        $("#faq_question").attr("readonly", true);
                        $("#faq_answer").attr("readonly", true);
                        // $(this).text($(this).text()==='添加');
                        $("#faq_question").val(data.Faq_question);
                        $("#faq_answer").val(data.Faq_answer);
                        alert(data.faqmsg);
                        //保存之后返回到FAQ页面
                        $("#faq_panel").show();
                        $("#addFaq_panel").hide();
                        dt_faq.reload();
                    },
                    error: function (result) {
                        console.log(XMLHttpRequest.status);
                        console.log(XMLHttpRequest.readyState);
                        alert(data.status);
                    }
                });
            } else {
                alert(data.status);
            }
    });
    // FAQ信息验证
        // // 点击Faq返回按钮
        // $("#backFaq_bt").click(function(){
        //     $("#addFaq_panel").hide();
        //     $("#faq_panel").show();
        //     $("#faq_present")
        //     dt_faq.refresh();
        // })

        // FAQ信息验证
        $("#form_addFaq").validate({
            rules: {
                faq_question: {
                    required: true,
                    minlength: 10,
                },
                faq_answer: {
                    required: true,
                    minlength: 6,
                }
            },
            messages: {
                faq_question: {
                    required: "问题不能为空",
                    minlength: "问题内容最短不能少于10"
                },
                faq_answer: {
                    required: "问题解答不能为空",
                    minlength: "问题解答内容最短不能为6"
                }
            }
        });
        // 根据第一个选项决定第二个选项
        $("#first_select").click(function () {
            var value = $("#first_select").val();
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
})

//    function btn_recieved(){
//        document.task_check_tb.btn.value = "已接收";
//    };
// 点击项目分配面板
var notices = new Vue({
    el:'#notice',
    data:{
        data:'',
    },
    methods: {
        showNotice:function() {
            axios
            .get('/worker/worker_show_overtime')
            .then(function (response) {
                // notices.data = response.data;
                console.log(notices.data);
                console.log(response.data);
                if (notices.data.length==0) {
                    $("#notice table").hide();
                    $("#notice").append("没有超时未完成项目");
                }else if(notices.data.length>19){
                    setInterval(function(){ 
                        var body = $("#notice table tbody"); 
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
