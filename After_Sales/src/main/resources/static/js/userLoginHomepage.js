$(function () {
    // $("#user_panel").load("info.html");
    $("#personal").load("info.html");

    //xss
    function filterXSS(str) {
        return str
            .replace(/&/g, '&amp;')
            // .replace(/ /g, '&nbsp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\r{0,}\n/g, '<br/>');
    }

    //faq的分页搜索
    $("#faq_title").click(function () {
        $("#find_panel").children().hide();
        $("#faq_top").show();
        $("#faq_table").bootstrapTable({
            url: '/faq/selectAllFAQ',
            methods: 'get',
            pagination: true,//显示分页
            striped: true,//显示行间距色
            pageSize: 5,//每一页的行数
            pageList: [5, 10, 20],//每页可选择的行数
            showRefresh: true,//显示刷新按钮
            search: true, //显示搜索框
            columns: [{
                field: 'faq_id',
                title: 'FAQ_ID',
                searchable: true,
            }, {
                field: 'faq_question',
                title: 'FAQ问题',
                searchable: true,
            }, {
                field: 'faq_answer',
                title: 'FAQ答案',
                searchable: true,
            },],
            queryParams: function (params) {
                //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
                var temp = {
                    rows: params.limit,                         //页面大小
                    page: (params.offset / params.limit) + 1,   //页码
                    sort: params.sort,      //排序列名
                    sortOrder: params.order //排位命令（desc，asc）
                };
                return temp;
            },
            responseHandler: function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].faq_question = filterXSS(data[i].faq_question);
                    data[i].faq_answer = filterXSS(data[i].faq_answer);
                }
                return data;
            }
        });
        $("#faq_panel").show();
        $(".message").show();
    });
    //个人信息
    //获取个人信息
    // var userinfoVue = new Vue({
    //     el: '#form_userinfo',
    //     data() {
    //         return {
    //             user: {
    //                 username: '',
    //                 email: '',
    //                 tel: '',
    //                 isReadOnly: true
    //             }

    //         }
    //     },
    //     methods: {
    //         edit: function () {
    //             userinfoVue.user.isReadOnly = false;
    //         },
    //         getData: function () {
    //             axios
    //                 .get('/question/checkPostMan')
    //                 .then(function (response) {
    //                     userinfoVue.user.username = response.data.user_name;
    //                     userinfoVue.user.email = response.data.email;
    //                     userinfoVue.user.tel = response.data.tel;
    //                 })
    //                 .catch(function (error) {
    //                     console.log(error);
    //                 });
    //         },
    //         postInfo() {
    //             axios.post('/worker/worker_updateBy_Session_UserId', { User_name: userinfoVue.user.username, Tel: userinfoVue.user.tel, Email: userinfoVue.user.email })
    //                 .then(res => {
    //                     if ($('#form_userinfo').valid() == true){
    //                         var username = userinfoVue.user.username;
    //                         var email = userinfoVue.user.email;
    //                         var tel = userinfoVue.user.tel;
    //                         userinfoVue.user.username = username;
    //                         userinfoVue.user.email = email;
    //                         userinfoVue.user.tel = tel;
    //                         Vue.set(userinfoVue.user.tel, 0, tel);
    //                         Vue.set(userinfoVue.user, 0, { username: username, tel: tel, email: email, isReadOnly: true });
    //                         $("#successModal").modal();
    //                     }
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 })
    //         }
    //     }
    // });
    // var queclear = new Vue({
    //     el:"#question_clear",
    //     created() {
    //         queclear.initEditor(queclear.question_clear);
    //     },
    //     data() {
    //         return {
    //             editor: {},
    //             uploadImgForm: {
    //                 Token: "40B8C283F7D339DFD2ABECD77C017C9C",
    //                 file: {},
    //                 SystemTag: "yiguan",
    //                 Name: "touxiang.png",
    //                 BusTag: ""
    //             }
    //         };
    //     },
    //     methods: {
    //         initEditor(id) {
    //             let self = queclear;
    //             queclear.$nextTick(() => {
    //                 self.editor = new Editor(queclear.$refs[id]);
    //
    //                 // 通过 url 参数配置 debug 模式。url 中带有 wangeditor_debug_mode=1 才会开启 debug 模式
    //                 self.editor.customConfig.debug =
    //                     location.href.indexOf("wangeditor_debug_mode=1") > 0;
    //                 // 或者 var editor = new E( document.getElementById('editor') )
    //
    //                 self.editor.customConfig.customUploadImg = function(files, insert) {
    //                     // files 是 input 中选中的文件列表
    //                     // insert 是获取图片 url 后，插入到编辑器的方法
    //
    //                     // 上传代码返回结果之后，将图片插入到编辑器中
    //                     self.filesToBase64(files);
    //                 };
    //
    //                 self.editor.create();
    //             });
    //         },
    //         filesToBase64(files) {
    //             let self = queclear;
    //             files.map(item => {
    //                 var reader = new FileReader();
    //                 reader.onload = function(e) {
    //                     self.uploadImage(e.target.result, item)
    //                 };
    //                 // 传入一个参数对象即可得到基于该参数对象的文本内容
    //                 reader.readAsDataURL(item);
    //             });
    //         },
    //         uploadImage(base64, file) {
    //             let self = queclear;
    //             let formdata = new FormData(); // 创建form对象
    //             // target.result 该属性表示目标对象的DataURL
    //             queclear.Base64toBlob({
    //                 base64,
    //                 success(blob) {
    //                     // 上传完成，表单储存数组
    //                     self.uploadImgForm.file = blob;
    //                     self.uploadImgForm.Name = file.name;
    //
    //                     // 转formData格式发送数据
    //                     Object.keys(self.uploadImgForm).forEach((key) => {
    //                         formdata.append(key, self.uploadImgForm[key]);
    //                     });
    //
    //                     axios.post("上传服务器地址url", formdata, {
    //                         headers: {
    //                             "Content-Type": "multipart/form-data"
    //                         }
    //                     }).then(res => {
    //                         let { data } = res;
    //                         // 插入图片到editor
    //                         self.editor.cmd.do('insertHtml', '<img src="' + data.data.Path + '" style="max-width:100%;"/>')
    //                     });
    //                 }
    //             });
    //         },
    //         Base64toBlob({ base64, success }) {
    //             var arr = base64.split(","),
    //                 mime = arr[0].match(/:(.*?);/)[1],
    //                 bstr = atob(arr[1]),
    //                 n = bstr.length,
    //                 u8arr = new Uint8Array(n);
    //             while (n--) {
    //                 u8arr[n] = bstr.charCodeAt(n);
    //             }
    //             let blob = new Blob([u8arr], { type: mime });
    //             success(blob);
    //         }
    //     }
    // });
    //问题提交
//     var queVue = new Vue({
//         el: '#question_panel',
//         data() {
//             return {
//                 question: {
//                     itemId: '',
//                     question_detail: '',
//                     question_type: '',
//                 }
//             }
//         },
//         methods: {
//             getItem: function () {
//                 axios
//                     .get('/question/checkItemId?item_id=' + queVue.question.itemId)
//                     .then(function (response) {
//                         if (response.data == 0) {
//                             //数据库中没有ID，提示ID错误
//                             $("#iDfailSubmitModal").modal();
//                             //清空文本域
//                             queVue.question.itemId = "";
//                             queVue.question.question_detail = "";
//                         } else {
//                             $("#successSubmitModal").modal();
//                         }
//                     })
//                     .catch(function (error) {
//                         console.log(error);
//                     });
//             },
//             postInfo() {
//                 axios.post('/question/addQuestion', { item_id: queVue.question.itemId, question_detail: queVue.question.question_detail, question_type: queVue.question.question_type })
//                     .then(res => {
//                         console.log("success!");
//                         //没有输入文本域
//                         if (queVue.question.question_type == "") {
//                             $("#failSubmitModal").modal();
//                         }
//                         //清空文本域
//                         queVue.question.itemId = "";
//                         queVue.question.question_detail = "";
//                     })
//                     .catch(err => {
//                         console.log(err);
//                     })
//             }
//         }
//     })
//
// });
});
// 预处理
$(document).ready(function () {
    //xss
    function filterXSS(str) {
        return str
            .replace(/&/g, '&amp;')
            // .replace(/ /g, '&nbsp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\r{0,}\n/g, '<br/>');
    }
    //****三大面板的分页******
    // 点击已提交切换面板
    $("#alr_title").click(function () {
        $("#find_panel").children().hide();
        $("#default_panel").hide();
        $("#arl_table").bootstrapTable({
            url: '/question/checkQuestionsubmited',
            methods: 'get',
            pagination: true,//显示分页
            sidePagination: "true",
            toolbar: "#toolbar",
            striped: true,//显示行间距色
            pageSize: 5,//每一页的行数
            pageList: [5, 10, 20],//每页可选择的行数
            showRefresh: true,//显示刷新按钮
            columns: [{
                field: 'question_id',
                title: '问题id'
            },{
                field: 'question_type',
                title: '问题分类'
            }, {
                field: 'item_id',
                title: '项目名称'
            }, {
                field: 'question_detail',
                title: '问题详情'
            },{
                field: 'price',
                title: '操作',
                width: 120,
                align: 'center',
                valign: 'middle',
                formatter: actionFormatter,
            },],
            responseHandler: function (data) {
                //**********注意**********\
                for (var i = 0; i < data.length; i++){
                    console.log(data[i].question_type);
                    data[i].question_type = filterXSS(data[i].question_type);
                    data[i].question_detail = filterXSS(data[i].question_detail);
                }
                return data;
            }
        });
        //操作栏的格式化
        function actionFormatter(value, row, index) {
            var id = value;
            var result = "";
            result += "<button class='btn btn-primary' title='查看图片'>查看图片</button>";
            console.log("id:"+id);
            console.log("result:"+result);
            console.log("row:"+row);
            // result += "<a href='javascript:;' class='btn btn-xs green' onclick=\"EditViewById('" + id + "', view='view')\" title='查看'><span class='glyphicon glyphicon-search'></span></a>";
            // result += "<a href='javascript:;' class='btn btn-xs blue' onclick=\"EditViewById('" + id + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'></span></a>";
            // result += "<a href='javascript:;' class='btn btn-xs red' onclick=\"DeleteByIds('" + id + "')\" title='删除'><span class='glyphicon glyphicon-remove'></span></a>";
            return result;
        }
        $("#alr_top").show();
        $("#alr_panel").show();
        $(".message").show();
    });
    //自定义规则
    jQuery.validator.addMethod("isPhone", function(value, element) {
        var length = value.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请填写正确的手机号码");//可以自定义默认提示信息
    // 修改基础信息验证
    $("#form_userinfo").validate({
        rules: {
            username: {
                required: true,
                minlength: 1,
                maxlength: 15
            },
            email: {
                required: true,
                email: true
            },
            tel: {
                required: true,
                digits:true,
                isPhone:true
            }
        },
        messages: {
            username: {
                required: "请输入用户名",
                minlength: "长度不能小于1",
                maxlength: "长度不能大于15"
            },
            tel: {
                required: "请输入电话",
                digits:"只能输入数字",
                isPhone: "格式错误"
            },
            email: {
                required: "请输入电子邮件",
                email: "电子邮件格式错误"
            }
        }
    });
    //点击已完成切换面板
    $("#fin_title").click(function () {
        $("#find_panel").children().hide();
        $("#default_panel").hide();
        $("#fin_table").bootstrapTable({
            url: '/question/checkQuestionfinished',
            methods: 'get',
            pagination: true,//显示分页
            striped: true,//显示行间距色
            sidePagination: "true",
            toolbar: "#toolbar",
            pageSize: 5,//每一页的行数
            pageList: [5, 10, 20],//每页可选择的行数
            showRefresh: true,//显示刷新按钮]
            columns: [{
                field: 'question_type',
                title: '问题分类'
            }, {
                field: 'item_id',
                title: '项目名称'
            }, {
                field: 'question_detail',
                title: '问题详情'
            },{
                field: 'price',
                title: '操作',
                width: 120,
                align: 'center',
                valign: 'middle',
                formatter: actionFormatter,
            },],
            responseHandler: function (data) {
                //**********注意**********\
                for (var i = 0; i < data.length; i++){
                    data[i].question_type = filterXSS(data[i].question_type);
                    data[i].question_detail = filterXSS(data[i].question_detail);
                }
                return data;
            }
        });
        //操作栏的格式化
        function actionFormatter(value, row, index) {
            var id = value;
            var result = "";
            result += "<a href='javascript:;' class='btn btn-xs green' onclick=\"EditViewById('" + id + "', view='view')\" title='查看'><span class='glyphicon glyphicon-search'></span></a>";
            result += "<a href='javascript:;' class='btn btn-xs blue' onclick=\"EditViewById('" + id + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'></span></a>";
            result += "<a href='javascript:;' class='btn btn-xs red' onclick=\"DeleteByIds('" + id + "')\" title='删除'><span class='glyphicon glyphicon-remove'></span></a>";
            return result;
        }
        $("#fin_top").show();
        $("#fin_panel").show();
        $(".message").show();
    });
    function showpic() {

    }
    //点击处理中切换面板
    $("#ing_title").click(function () {
        $("#find_panel").children().hide();
        $("#default_panel").hide();
        $("#ing_table").bootstrapTable({
            url: '/question/checkQuestiondealing',
            methods: 'get',
            pagination: true,//显示分页
            striped: true,//显示行间距色
            pageSize: 5,//每一页的行数
            pageList: [5, 10, 20],//每页可选择的行数
            showRefresh: true,//显示刷新按钮
            sortable: true, // 是否启用排序
            sidePagination: "true",
            toolbar: "#toolbar",
            columns: [{
                field: 'question_type',
                title: '问题分类'
            }, {
                field: 'item_id',
                title: '项目名称'
            }, {
                field: 'question_detail',
                title: '问题详情'
            },{
                field: 'price',
                title: '操作',
                width: 120,
                align: 'center',
                valign: 'middle',
                formatter: actionFormatter,
            },
            ],
            responseHandler: function (data) {
                //**********注意**********\
                for (var i = 0; i < data.length; i++){
                    data[i].question_type = filterXSS(data[i].question_type);
                    data[i].question_detail = filterXSS(data[i].question_detail);
                }
                return data;
            }
        });
        //操作栏的格式化
        function actionFormatter(value, row, index) {
            var id = value;
            var result = "";
            result += "<a href='javascript:;' class='btn btn-xs green' onclick=\"EditViewById('" + id + "', view='view')\" title='查看'><span class='glyphicon glyphicon-search'></span></a>";
            result += "<a href='javascript:;' class='btn btn-xs blue' onclick=\"EditViewById('" + id + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'></span></a>";
            result += "<a href='javascript:;' class='btn btn-xs red' onclick=\"DeleteByIds('" + id + "')\" title='删除'><span class='glyphicon glyphicon-remove'></span></a>";
            return result;
        }
        $("#ing_top").show();
        $("#ing_panel").show();
        $(".message").show();
    });
    // 根据第一个选项决定第二个选项
    $("#first_select").click(function () {
        var value = $("#first_select").val();
        $("#select_form").empty();
        switch (value) {
            case "性能体验":
                for (var i in firstform) {
                    $("#select_form").append("<option value=" + firstform[i] + ">" + firstform[i] + "</option>")
                }
                break;
            case "功能异常":
                for (var i in secondform) {
                    $("#select_form").append("<option value=" + secondform[i] + ">" + secondform[i] + "</option>")
                }
                break;
            case "产品建议":
                for (var i in thirdform) {
                    $("#select_form").append("<option value=" + thirdform[i] + ">" + thirdform[i] + "</option>")
                }
                break;
            case "其他反馈":
                for (var i in fourthform) {
                    $("#select_form").append("<option value=" + fourthform[i] + ">" + fourthform[i] + "</option>")
                }
                break;
            default:
                break;
        }
    });
    //点击个人信息切换面板
    $("#user_info").click(function () {
        var url = '/question/checkPostMan';
        $("#find_panel").children().hide();
        $("#default_panel").hide();
        $.ajax({
            type: 'GET',
            data: '',
            contentType: 'application/json',
            dataType: 'json',
            url: url,
            success: function (data) {
                console.log("1111111");
                console.log(data);
                document.getElementById("username").value = filterXSS(data['user_name']);
                document.getElementById("tel").value = filterXSS(data['tel']);
                document.getElementById("email").value = filterXSS(data['email']);
            },
            error: function (XMLHttpRequest) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
            }
        });
        $("#user_panel").show();
        $(".message").show();
    });
    // 点击顶部导航栏的通知弹出模态框
    $("#top_message").click(function () {
        $("#top_messageModal").modal();
    });
    // 点击顶部导航栏的帮助弹出模态框
    $("#top_help").click(function () {
        $("#top_helpModal").modal();
    });
    // 点击顶部导航栏的注销弹出模态框
    $("#top_destroy").click(function () {
        $("#top_destroyModal").modal();
    });
    // 点击注销的确认键之后
    $("#destroy_submit").click(function () {
        $("#top_destroyModal").modal('hide');
        alert("已成功注销！即将返回首页");
        // POST确认要注销用户
        var message = "true";
        $.ajax({
            type: 'POST',

            data: JSON.stringify(message),

            contentType: 'application/json',

            dataType: 'json',

            url: '/user/logout',

            success: function (data, XMLHttpRequest) {
                //跳转至首页
                console.log("前端跳转首页");
                window.location.href = "index.html";
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
    // 点击编辑按钮
    $("#edit_bt").click(function () {
        $("#username").attr("readonly", false);
        $("#male").attr("disabled", false);
        $("#female").attr("disabled", false);
        $("#tel").attr("readonly", false);
        $("#email").attr("readonly", false);
    });
    // 点击保存按钮
    $("#save_bt").click(function () {
        $("#form_userinfo").validate();
        if ($('#form_userinfo').valid() == true) {
            $("#username").attr("readonly", true);
            $("#tel").attr("readonly", true);
            $("#email").attr("readonly", true);
            // 成功后提交给后台用户信息
            var username = document.getElementById("username").value;
            var tel = document.getElementById("tel").value;
            var email = document.getElementById("email").value;
            var userinfo = {
                "User_name": username,
                "Tel": tel,
                "Email": email
            };
            //post方式传输数据给后台
            $.ajax({
                type: 'POST',

                data: JSON.stringify(userinfo),

                contentType: 'application/json',

                dataType: 'json',

                url: '/worker/worker_updateBy_Session_UserId',

                success: function (data, XMLHttpRequest) {
                    if (data.status) {      //登录成功
                        // alert("编辑信息发送成功，请注意查收！");
                        // console.log("post!!!");
                        // console.log(userinfo['User_name']);
                        // document.getElementById("username").value = data['user_name'];
                        // document.getElementById("tel").value = userinfo['Tel'];
                        // document.getElementById("email").value = data['email'];
                        // console.log("post2222222222");
                        // console.log(document.getElementById("username").value);
                        // console.log(document.getElementById("tel").value);
                        // console.log(document.getElementById("email").value);
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

        } else {
            $("#failModal").modal();
        }

    });

    //问题详情分类数据，用于动态生成option
    var firstform = ["软件运行较卡", "软件打卡较慢", "其他"];
    var secondform = ["异常退出", "点击没有反应"];
    var thirdform = ["界面需完善", "清理没有必要的广告", "其他"];
    var fourthform = ["其他"];
    //  二级菜单的滑动处理
    $("#info_title").click(function () {
        $("#info").slideToggle("slow");
    });

    //判断变量，用于表示图片是否上传成功
    var picflag = false;
    //用于获取上传成功后图片的id
    var picresult;
    //用于获取问题id
    var que_id;
    //富文本框
    var editor;

    /**
     * ajax上传多个图片
     */
    function uploadPic() {
        var form=new FormData();
        /**
         * 特别注意：fileForm,file是指form表单属性name的值
         * files是指一个数组
         * */
        var files = document.filesForm.files.files;
        for (var i=0;i<files.length;i++){
            form.append("files",files[i])
        }
        // //进行Ajax请求
        $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            // dataType: "json",//预期服务器返回的数据类型,可以不设置
            url: "/question/addImage",//url
            data: form,
            async: false,
            cache: false,
            contentType: false, //禁止设置请求类型
            processData: false, //禁止jquery对DAta数据的处理,默认会处理
            success: function (data) {
                // alert("上传成功");
                picflag = true;
                picresult = data;
                console.log(data);
            },
            error: function () {
                picflag = false;
                // alert("图片上传异常！");
                console.log("上传失败！");
            }
        });
    }
    //创建富文本框
    var E = window.wangEditor;
    editor = new E("#question_clear");
    // 自定义菜单配置
    editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'justify',  // 对齐方式
        'emoticon',  // 表情
        // 'image',  // 插入图片
        'undo'  // 撤销
    ];

    //上传图片
    editor.customConfig.uploadImgServer = '/question/addImage'; // 上传图片到服务器

    editor.customConfig.uploadImgHeaders = {
        'Accept': 'text/x-json'
    };
    // 隐藏“网络图片”tab
    editor.customConfig.showLinkImg = false;

    // 通过 url 参数配置 debug 模式。url 中带有 wangeditor_debug_mode=1 才会开启 debug 模式
    editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0;

    // 限制一次最多上传 5 张图片
    editor.customConfig.uploadImgMaxLength = 9;

    editor.customConfig.debug = true; //是否开启Debug 默认为false 建议开启 可以看到错误
    // editor.customConfig.debug = location.href.indexOf(‘wangeditor_debug_mode=1‘) > 0; // 同上 二选一

    editor.create();

    // $("#filesForm input[type='button']").click(function () {
    //     var form=new FormData();
    //     /**
    //      * 特别注意：fileForm,file是指form表单属性name的值
    //      * files是指一个数组
    //      * */
    //     var files = document.filesForm.files.files;
    //     for (var i=0;i<files.length;i++){
    //         form.append("files",files[i])
    //     }
    //     // //进行Ajax请求
    //     $.ajax({
    //     //几个参数需要注意一下
    //         type: "POST",//方法类型
    //         // dataType: "json",//预期服务器返回的数据类型,可以不设置
    //         url: "/question/addImage",//url
    //         data: form,
    //         async: false,
    //         cache: false,
    //         contentType: false, //禁止设置请求类型
    //         processData: false, //禁止jquery对DAta数据的处理,默认会处理
    //         success: function (data) {
    //             alert("上传成功");
    //             console.log(data);
    //         }
    //     // error: function () {
    //     // alert("异常！");
    //     // }
    //     });
    // });

    //点击提交问题切换面板
    $("#wri_title").click(function () {
        $("#find_panel").children().hide();
        $("#wri_top").show();
        $("#wri_panel").show();
        editor.txt.html("请在此输入问题详情描述");
        $(".message").show();
    });

    //点击提交问题的提交按钮
    $("#question_submit").click(function () {
        var text = editor.txt.text();
        var item_id = document.getElementById("item_id").value;
        var question_detail = document.getElementById("select_form").value + ": "+text;
        var question_type = $("#first_select").find("option:selected").val();
        if (text == '') {
            $("#failSubmitModal").modal();
        } else {

            var question = {
                "item_id": item_id,
                "question_detail": question_detail,
                "question_type": question_type
            };
            $.ajax({
                type: 'POST',

                data: JSON.stringify(question),

                contentType: 'application/json',

                dataType: 'json',

                url: '/question/addQuestion',

                success: function (data) {
                    //清空文本域
                    console.log("data:"+data);
                    //获取问题id
                    que_id = data;
                    $("#question_detail").val('');
                    $("#item_id").val('');
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
            //先检查项目ID对不对
            var url1 = "/question/checkItemId?item_id=" + item_id;
            $.ajax({
                type: 'GET',

                data: '',

                contentType: 'application/json',

                dataType: 'json',

                url: url1,

                success: function (data) {
                    console.log("data2!:"+data);
                    if (data == 0) {
                        $("#iDfailSubmitModal").modal();
                        //清空文本域
                        editor.txt.clear();
                        // $("#question_detail").val('');
                        $("#item_id").val('');
                    } else {
                        //成功后再考虑图片
                        //此时是选择了图片
                        if (document.querySelector("input[type=file]").files.length!=0){
                            //上传图片
                            uploadPic();
                            if(picflag==false){
                                //图片上传失败了
                                console.log("pic_fail!!!!");
                                $("#picfailSubmitModal").modal();
                            }else{
                                console.log("pic_success!!!!");
                                console.log(picresult);
                                console.log(que_id);
                                $("#successSubmitModal").modal();
                                //清空文本域
                                editor.txt.clear();
                                // $("#question_detail").val('');
                                $("#item_id").val('');
                            }
                        }else{
                            console.log("no pic success!!!!!");
                            //不上传图片，直接上传文本成功
                            $("#successSubmitModal").modal();
                            //清空文本域
                            editor.txt.clear();
                            // $("#question_detail").val('');
                            $("#item_id").val('');
                        }

                    }
                },
                error: function (XMLHttpRequest, textStatus, data) {
                    // 状态码
                    console.log(XMLHttpRequest.status);
                    // 状态
                    console.log(XMLHttpRequest.readyState);
                    // 错误信息
                    // alert(textStatus);
                }
            });
        }
    });
//

});
