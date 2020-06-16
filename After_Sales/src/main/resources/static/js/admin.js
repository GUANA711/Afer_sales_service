/* jshint esversion: 6 */
$(document).ready(function () {
    notices.showNotice();
});
$(window).ajaxStart(function () {
    NProgress.start();
});
$(window).ajaxStop(function () {
    NProgress.done();
});
// 菜单
var menu = new Vue({
    el: "#menu",
    data() {
        return {
            
        };
    },
    methods: {
        clickThis: function (i) {
            $('#info li').removeClass('active');
            $('#author li').removeClass('active');
            $(".find_panel").children().hide();
            $(".pa_all").eq(i).show();
            $(".message").show();
            switch (i-1) {
                case 0:
                    items.searchFor(0);
                    break;
                case 1:
                    questions.searchFor(0);
                    break;
                case 2:
                    maintenances.searchFor(0);
                    break;
                case 3:
                    faqs.searchFor(0);
                    break;
                case 4:
                    selects.firstOptions();
                    break;
                case 5:
                    roles.searchFor(0);
                    break;
                case 6:
                    // roles.searchFor(0);
                    break;
                case 7:
                    resourceControl.searchFor(0);
                    break;
                default:
                    logs.searchFor(0);
                    break;
            }
        }
    },
});
// 项目管理
var items = new Vue({
    el: '#vueItem',
    data: {
        selected: 0,
        key: "",
        placeholder: ["项目ID", "项目名", "负责人"],
        page: {
            pageSize: 8,
            pageNum: 1,
            length: 1,
            totalPage: 0
        },
        data: '',
        chooseIndex: ''
    },
    methods: {
        init_page: function (totalPage, currentPage) {
            // 
            if (totalPage == 0) {
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
                        items.page.pageNum = num;
                        items.searchFor(2);
                    }
                }
            });
        },
        calPage: function () {
            items.page.totalPage = Math.ceil(items.page.length / items.page.pageSize);
        },
        searchFor: function (initial) {
            if (initial == 1) {
                this.page.pageNum = 1;
            } else if (initial == 0) {
                this.page.pageNum = 1;
                this.key = '';
                this.selected = 0;
            }
            axios
                .post('/adminLoing/searchItems/' + this.page.pageNum + '/' + this.page.pageSize, {
                    "key": this.key,
                    "choice": this.selected
                })
                .then(function (response) {
                    items.data = response.data[0];
                    items.page.length = response.data[1];
                    items.calPage();
                    items.init_page(items.page.totalPage, items.page.pageNum);
                })
                .catch(function (error) {
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });
        },
        showWorker: function (index) {
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
//项目管理的模态框
var itemModal = new Vue({
    el: "#itemModal",
    data: {
        workers: ''
    },
});
//资源管理的模态框
var alterResModal = new Vue({
    el: "#alterResModal",
    data: {
        name: '',
        description: '',
        url: '',
        perms: '',
        parent_id: '',
        type: '',
        permission_id: '',
    },
    methods: {
        comfirm: function () {
            console.log(alterResModal);
            axios
                .post('/adminLoing/permission_update', {
                    "name":alterResModal.name,
                    "description": alterResModal.description,
                    "url": alterResModal.url,
                    "perms": alterResModal.perms,
                    "parent_id": alterResModal.parent_id,
                    "type": alterResModal.type,
                    "permission_id": alterResModal.permission_id
                })
                .then(function (response) {
                    console.log(response);
                    if (response.data.status) {
                        $('#successModal .modal-body').text(response.data.msg);
                        $("#successModal").modal();
                        resourceControl.searchFor(2);
                    } else {
                        $('#failModal .modal-body').text(response.data.msg);
                        $("#failModal").modal();
                    }
                })
                .catch(function (error) {
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });
            $("#alterResModal").modal('hide');

        }
    },
});
//用户问题
var questions = new Vue({
    el: '#vueQuestion',
    data: {
        selected: 0,
        key: "",
        placeholder: ["问题ID", "项目ID", "问题类型", "问题状态", "问题描述", "用户ID"],
        page: {
            //页内条目数
            pageSize: 8,
            //当前页
            pageNum: 1,
            //记录总数
            length: 1,
            //总页数
            totalPage: 0
        },
        data: ''
    },
    methods: {
        init_page: function (totalPage, currentPage) {
            // 
            if (totalPage == 0) {
                $("#questions table tbody").html('');
                $("#questions table tbody").append("没有查询到相关数据！");
                return;
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
                        questions.page.pageNum = num;
                        questions.searchFor(2);
                    }
                }
            });
        },
        calPage: function () {
            questions.page.totalPage = Math.ceil(questions.page.length / questions.page.pageSize);
        },
        searchFor: function (initial) {
            if (initial == 1) {
                this.page.pageNum = 1;
            } else if (initial == 0) {
                this.page.pageNum = 1;
                this.key = '';
                this.selected = 0;
            }
            axios
                .post('/adminLoing/searchquestion/' + this.page.pageNum + '/' + this.page.pageSize, {
                    "key": this.key,
                    "choice": this.selected
                })
                .then(function (response) {
                    console.log("response:" + response);
                    questions.data = response.data[0];
                    console.log(questions.data);
                    console.log(questions.page);
                    questions.page.length = response.data[1];
                    questions.calPage();
                    questions.init_page(questions.page.totalPage, questions.page.pageNum);
                })
                .catch(function (error) {
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });
        }
    }
});
//问题处理
var maintenances = new Vue({
    el: '#dealVue',
    data: {
        selected: 0,
        key: "",
        placeholder: ["问题ID", "维护员ID", "处理时间"],
        page: {
            pageSize: 8,
            pageNum: 1,
            length: 1,
            totalPage: 0
        },
        data: ''
    },
    methods: {
        init_page: function (totalPage, currentPage) {
            // 
            if (totalPage == 0) {
                $("#maintenance table tbody").html('');
                $("#maintenance table tbody").append("没有查询到相关数据！");
                return;
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
                        maintenances.page.pageNum = num;
                        maintenances.searchFor(2);
                    }
                }
            });
        },
        calPage: function () {
            maintenances.page.totalPage = Math.ceil(maintenances.page.length / maintenances.page.pageSize);
        },
        searchFor: function (initial) {
            if (initial == 1) {
                this.page.pageNum = 1;
            } else if (initial == 0) {
                this.page.pageNum = 1;
                this.key = '';
                this.selected = 0;
            }
            axios
                .post('/adminLoing/searchMaintenance/' + this.page.pageNum + '/' + this.page.pageSize, {
                    "key": this.key,
                    "choice": this.selected
                })
                .then(function (response) {
                    maintenances.data = response.data[0];
                    maintenances.page.length = response.data[1];
                    maintenances.calPage();
                    maintenances.init_page(maintenances.page.totalPage, maintenances.page.pageNum);
                })
                .catch(function (error) {
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });
        }
    }
});
//faq
var faqs = new Vue({
    el: '#vueFaq',
    data: {
        selected: 0,
        key: "",
        placeholder: ["问题ID", "问题", "问题解答"],
        page: {
            //页内条目数
            pageSize: 8,
            //当前页
            pageNum: 1,
            //记录总数
            length: 1,
            //总页数
            totalPage: 0
        },
        data: ''
    },
    methods: {
        init_page: function (totalPage, currentPage) {
            // 
            if (totalPage == 0) {
                $("#faq table tbody").html('');
                $("#faq table tbody").append("没有查询到相关数据！");
                return;
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
                        faqs.page.pageNum = num;
                        faqs.searchFor(2);
                    }
                }
            });
        },
        calPage: function () {
            faqs.page.totalPage = Math.ceil(faqs.page.length / faqs.page.pageSize);
        },
        searchFor: function (initial) {
            if (initial == 1) {
                this.page.pageNum = 1;
            } else if (initial == 0) {
                this.page.pageNum = 1;
                this.key = '';
                this.selected = 0;
            }
            axios
                .post('/adminLoing/showfaq/' + this.page.pageNum + '/' + this.page.pageSize, {
                    "key": this.key,
                    "choice": this.selected
                })
                .then(function (response) {
                    faqs.data = response.data[0];
                    faqs.page.length = response.data[1];
                    faqs.calPage();
                    faqs.init_page(faqs.page.totalPage, faqs.page.pageNum);
                })
                .catch(function (error) {
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });
        }
    }
});
//任务指派
var selects = new Vue({
    el: '#selectVue',
    data: {
        firstSelected: 0,
        secondSelected: 0,
        firstContain: '',
        secondContain: '',
        final: ''
    },
    methods: {
        firstOptions: function () {
            axios
                .post('/adminLoing/droplistID')
                .then(response => (selects.firstContain = response.data))
                .catch(function (error) {
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });
        },
        secondOptions: function () {
            axios
                .post('/adminLoing/wokername', {
                    "key": selects.firstSelected
                })
                .then(response => (selects.secondContain = response.data))
                .catch(function (error) {
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });
        },
        cancel: function () {
            selects.firstSelected = 0;
            selects.secondSelected = 0;
        },
        assign: function () {
            axios
                .post('/adminLoing/allocation', {
                    "questionID": selects.firstSelected,
                    "workerName": selects.secondSelected
                })
                .then(function (response) {
                    selects.final = response.data;
                    if (selects.final.status) {
                        $('#successModal .modal-body').text(selects.final.msg);
                        $("#successModal").modal();
                    } else {
                        $('#failModal .modal-body').text(selects.final.msg);
                        $("#failModal").modal();
                    }
                })
                .catch(function (error) { // 请求失败处理
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });

        }
    }

});
//角色控制
var roles = new Vue({
    el: '#roleControl',
    data: {
        selected: 0,
        roleSearch: 0,
        roleChoice: [],
        key: "",
        roleOptions: ["管理员", "维护人员", "普通用户", "负责人", "null"],
        placeholder: ["用户ID", "用户名", "角色", "角色分配"],
        page: {
            pageSize: 8,
            pageNum: 1,
            length: 1,
            totalPage: 0
        },
        data: ''
    },
    methods: {
        init_page: function (totalPage, currentPage) {
            $("#role table tbody").html('');
            if (totalPage == 0) {
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
                        roles.page.pageNum = num;
                        for (const i in roles.data) {
                            roles.data[i].Role_id -= 1;
                            roles.roleChoice[i] = roles.data[i].Role_id;
                        }
                        roles.searchFor(2);
                    }
                }
            });
        },
        calPage: function () {
            roles.page.totalPage = Math.ceil(roles.page.length / roles.page.pageSize);
        },
        searchFor: function (initial) {
            if (initial == 1) {
                this.page.pageNum = 1;                
            } else if (initial == 0) {
                this.page.pageNum = 1;
                this.key = '';
                this.selected = 0;
            }
            if (this.selected == 2) {
                this.key = this.roleSearch;
            }
            axios
                .post('/adminLoing/searchuser/' + this.page.pageNum + '/' + this.page.pageSize, {
                    "key": this.key,
                    "choice": this.selected
                })
                .then(function (response) {
                    roles.data = response.data[0];
                    roles.page.length = response.data[1];
                    roles.calPage();
                    for (const i in roles.data) {
                        roles.data[i].Role_id -= 1;
                        roles.roleChoice[i] = roles.data[i].Role_id;
                    }
                    roles.init_page(roles.page.totalPage, roles.page.pageNum);
                })
                .catch(function (error) {
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });
        },
        alterRole: function (index) {
            if (roles.data[index].Role_id == roles.roleChoice[index]) {
                $('#failModal .modal-body').text("id为" +
                    roles.data[index].User_id +
                    "的用户已拥有" +
                    roles.roleOptions[roles.data[index].Role_id] +
                    "的权限了");
                $("#failModal").modal();
            } else {
                axios
                    .post('/adminLoing/addrole', {
                        "userID": roles.data[index].User_id,
                        "roleID": roles.roleChoice[index]
                    })
                    .then(function (response) {
                        if (response.data.status) {
                            $('#successModal .modal-body').text(response.data.msg);
                            $("#successModal").modal();
                            roles.searchFor(2);
                        } else {
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
        deleteRole: function (index) {
            if (confirm("确定删除id为" +
                roles.data[index].User_id +
                "的" +
                roles.roleOptions[roles.data[index].Role_id] +
                "角色吗？")) {
                axios
                    .post('/adminLoing/deleterole', {
                        "userID": roles.data[index].User_id,
                        "roleID": roles.roleChoice[index]
                    })
                    .then(function (response) {
                        if (response.data.status) {
                            $('#successModal .modal-body').text(response.data.msg);
                            $("#successModal").modal();
                            roles.searchFor(2);
                        } else {
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
//资源分配
var resourceAllow = new Vue({
    el: "#resourceAllow",
    data() {
        return {
            selected: 0,
            roleSearch: 0,
            roleChoice: [],
            key: "",
            roleOptions: ["管理员", "维护人员", "普通用户", "负责人"],
            placeholder: ["id","资源名称", "资源描述", "路径", "权限", "父资源id"],
            page: {
                pageSize: 8,
                pageNum: 1,
                length: 1,
                totalPage: 0
            },
            data: ''
        };
    },
    methods: {
        init_page: function (totalPage, currentPage) {
            if (totalPage == 0) {
                $("#role_resource table tbody").html('');
                $("#role_resource table tbody").append("没有查询到相关数据！");
                return;
            }
            $('#pagination7').jqPaginator({
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
                        resourceAllow.page.pageNum = num;
                        for (const i in resourceAllow.data) {
                            resourceAllow.data[i].Role_id -= 1;
                            resourceAllow.roleChoice[i] = resourceAllow.data[i].Role_id;
                        }
                        resourceAllow.searchFor(2);
                    }
                }
            });
        },
        calPage: function () {
            resourceAllow.page.totalPage = Math.ceil(resourceAllow.page.length / resourceAllow.page.pageSize);
        },
        searchFor: function (initial) {
            if (initial == 1) {
                this.page.pageNum = 1;
            } else if (initial == 0) {
                this.page.pageNum = 1;
                this.key = '';
                this.selected = 0;
            }
            if (this.selected == 2) {
                this.key = this.roleSearch;
            }
            axios
                .post('/adminLoing/searchuser/' + this.page.pageNum + '/' + this.page.pageSize, {
                    "key": this.key,
                    "choice": this.selected
                })
                .then(function (response) {
                    resourceAllow.data = response.data[0];
                    resourceAllow.page.length = response.data[1];
                    resourceAllow.calPage();
                    // for (const i in resourceAllow.data) {
                    //     resourceAllow.data[i].Role_id -= 1;
                    //     resourceAllow.roleChoice[i] = resourceAllow.data[i].Role_id;
                    // }
                    resourceAllow.init_page(resourceAllow.page.totalPage, resourceAllow.page.pageNum);
                })
                .catch(function (error) {
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });
        },
        deleteRole: function (index) {
            if (confirm("确定删除id为" +
                resourceAllow.data[index].User_id +
                "的" +
                resourceAllow.roleOptions[resourceAllow.data[index].Role_id] +
                "角色吗？")) {
                axios
                    .post('/adminLoing/deleterole', {
                        "userID": resourceAllow.data[index].User_id,
                        "roleID": resourceAllow.roleChoice[index]
                    })
                    .then(function (response) {
                        if (response.data.status) {
                            $('#successModal .modal-body').text(response.data.msg);
                            $("#successModal").modal();
                            resourceAllow.searchFor(2);
                        } else {
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
//资源管理
var resourceControl = new Vue({
    el: "#resourceControl",
    data() {
        return {
            selected: 0,
            key: "",
            placeholder: ["id", "资源名称", "资源描述", "路径", "权限", "父资源","类型"],
            page: {
                pageSize: 8,
                pageNum: 1,
                length: 1,
                totalPage: 0
            },
            data: ''
        };
    },
    methods: {
        init_page: function (totalPage, currentPage) {
            if (totalPage == 0) {
                $("#resControl table tbody").html('');
                $("#resControl table tbody").append("没有查询到相关数据！");
                return;
            }
            $('#pagination8').jqPaginator({
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
                        resourceControl.page.pageNum = num;
                        resourceControl.searchFor(2);
                    }
                }
            });
        },
        calPage: function () {
            resourceControl.page.totalPage = Math.ceil(resourceControl.page.length / resourceControl.page.pageSize);
        },
        searchFor: function (initial) {
            if (initial == 1) {
                this.page.pageNum = 1;
            } else if (initial == 0) {
                this.page.pageNum = 1;
                this.key = '';
                this.selected = 0;
            }
            if (this.selected == 2) {
                this.key = this.roleSearch;
            }
            axios
                .post('/adminLoing/search_permission/' + this.page.pageNum + '/' + this.page.pageSize, {
                    "key": this.key,
                    "choice": this.selected
                })
                .then(function (response) {
                    resourceControl.data = response.data[0];
                    resourceControl.page.length = response.data[1];
                    resourceControl.calPage();
                    resourceControl.init_page(resourceControl.page.totalPage, resourceControl.page.pageNum);
                })
                .catch(function (error) {
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });
        },
        deleteRes: function (index) {
            if (confirm("确定删除id为" +
                resourceControl.data[index].permission_id +
                "的资源吗？")) {
                axios
                    .post('/adminLoing/delete_resource', {
                        "permission_id": resourceControl.data[index].permission_id,
                    })
                    .then(function (response) {
                        if (response.data.status) {
                            $('#successModal .modal-body').text(response.data.msg);
                            $("#successModal").modal();
                            resourceControl.searchFor(2);
                        } else {
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
        alterRes: function (index) {
            $("#alterResModal").modal();
            alterResModal.name=resourceControl.data[index].name;
            alterResModal.description=resourceControl.data[index].description;
            alterResModal.url=resourceControl.data[index].url;
            alterResModal.perms=resourceControl.data[index].perms;
            alterResModal.parent_id=resourceControl.data[index].parent_id;
            alterResModal.type=resourceControl.data[index].type;
            alterResModal.permission_id=resourceControl.data[index].permission_id;
        },

    }
});
//系统日志
var logs = new Vue({
    el: '#logVue',
    data: {
        selected: 0,
        key: "",
        placeholder: ["用户ID", "操作描述", "method", "IP地址", "操作时间", "日志ID"],
        page: {
            //页内条目数
            pageSize: 8,
            //当前页
            pageNum: 1,
            //记录总数
            length: 1,
            //总页数
            totalPage: 0
        },
        data: ''
    },
    methods: {
        init_page: function (totalPage, currentPage) {
            $("#log table tbody").html('');
            if (totalPage == 0) {
                $("#log table tbody").append("没有查询到相关数据！");
                return;
            }
            for (var i = 0; i < logs.data.length; i++) {
                var item = logs.data[i];
                var str = item.method;
                var method = str;
                if (str != null) {
                    method = str.split('.')[5];
                }
                var insert = '<tr>' +
                    '<td  class="task_check_tb_td">' +
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
                        logs.page.pageNum = num;
                        logs.searchFor(2);
                    }
                }
            });
        },
        calPage: function () {
            logs.page.totalPage = Math.ceil(logs.page.length / logs.page.pageSize);
        },
        searchFor: function (initial) {
            if (initial == 1) {
                this.page.pageNum = 1;
            } else if (initial == 0) {
                this.page.pageNum = 1;
                this.key = '';
                this.selected = 0;
            }
            axios
                .post('/adminLoing/searchLog/' + this.page.pageNum + '/' + this.page.pageSize, {
                    "key": this.key,
                    "choice": this.selected
                })
                .then(function (response) {
                    logs.data = response.data[0];
                    logs.page.length = response.data[1];
                    logs.calPage();
                    logs.init_page(logs.page.totalPage, logs.page.pageNum);
                })
                .catch(function (error) { // 请求失败处理
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });
        }
    }
});
//消息通知
var notices = new Vue({
    el: '#notice',
    data: {
        data1: '',
        temp1: [],
        data2: '',
        temp2: []
    },
    methods: {
        showNotice: function () {
            axios
                .post('/adminLoing/overtime_unaccept')
                .then(function (response) {
                    notices.data1 = response.data;
                    if (notices.data1.length == 0) {
                        $("#notice1 table").hide();
                        $("#notice1").append("没有超时待处理项目");
                    } else if (notices.data1.length > 6) {
                        setInterval(function () {
                            var body = $("#notice1 table tbody");
                            var liHeight = body.find("tr:last").height() + 10;
                            body.animate({ marginTop: liHeight + "px" }, 1000, function () {
                                body.find("tr:last").prependTo(body);
                                body.css({ marginTop: '10px' });
                            });
                        }, 2000);
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
                    if (notices.data2.length == 0) {
                        $("#notice2 table").hide();
                        $("#notice2").append("没有超时未完成项目");
                    } else if (notices.data2.length > 6) {
                        setInterval(function () {
                            var body = $("#notice2 table tbody");
                            var liHeight = body.find("tr:last").height() + 10;
                            body.animate({ marginTop: liHeight + "px" }, 1000, function () {
                                body.find("tr:last").prependTo(body);
                                body.css({ marginTop: '10px' });
                            });
                        }, 2000);
                    }
                })
                .catch(function (error) { // 请求失败处理
                    $('#failModal .modal-body').text(error);
                    $("#failModal").modal();
                });
        }
    }
});
// XSS 过滤
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
// console.log(filterXSS("<img src='/' onerror='alert(11)'/>"));

/* 一些触发事件 */
$("#personal").load("info.html"); 
$(document).on('click', '#modalBtn', function () {
    var index = $("input[name='worker']:checked").val();
    $("#itemModal").modal('hide');
    axios
        .post('/adminLoing/leaderEdit', {
            "itemID": items.data[items.chooseIndex].item_id,
            "userID": itemModal.workers[index].User_id
        })
        .then(function (response) {
            if (response.data.status) {
                items.searchFor(2);
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
        type: 'post',
        data: '',
        contentType: 'application/json',
        dataType: 'json',
        url: '/user/logout',
        success: function (data) {
            if (data == 1) {
                $(window).attr("location", '/');
            } else {
                alert("退出登录失败！");
            }
        },
        error: function () {
            $('#failModal .modal-body').text("连接超时，请重试！");
            $("#failModal").modal();
        }
    });
});
$("#questions_check").click(function () {
    $("#info").slideToggle("slow");
    $("#author").hide();
});
$("#authority").click(function () {
    $("#author").slideToggle("slow");
    $("#info").hide();
});