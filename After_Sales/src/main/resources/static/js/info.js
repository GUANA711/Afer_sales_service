// alert(1);
var User_name;
var Tel;
var Email;
$(document).ready(function () {
    $.ajax({
        type: 'GET',
        data: '',
        contentType: 'application/json',
        dataType: 'json',
        url: '/worker/worker_selectBy_Session_UserId',
        success: function (data) {
            User_name = data.User_name;
            Tel = data.Tel;
            Email = data.Email;
            $("#userId").val(data.User_id);
            $("#username").val(User_name);
            $("#tel").val(Tel);
            $("#email").val(Email);
        },
        error: function () {
            $('#failModal .modal-body').text("连接超时，请重试！");
            $("#failModal").modal();
        }
    });
});
//自定义规则
jQuery.validator.addMethod("isPhone", function (value, element) {
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
            digits: true,
            isPhone: true
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
            digits: "只能输入数字",
            minlength: "长度不能小于7",
            maxlength: "长度不能大于15",
            isPhone: "格式错误"
        },
        email: {
            required: "请输入电子邮件",
            email: "电子邮件格式错误"
        }
    }
});
$("#edit_bt").click(function () {
    var readonly = $("#username").attr("readonly") === 'readonly' ? false : true;
    $("#username").attr("readonly", readonly);
    $("#tel").attr("readonly", readonly);
    $("#email").attr("readonly", readonly);
    $("#username").val(User_name);
    $("#tel").val(Tel);
    $("#email").val(Email);
    $(this).text($(this).text() === '编辑' ? '取消' : '编辑');
});
$("#save_bt").click(function () {
    var user_name = $("#username").val();
    var tel = $("#tel").val();
    var email = $("#email").val();
    var info = {
        "User_name":user_name,
        "Tel": tel,
        "Email": email
    };
    $("#form_userinfo").validate();
    if ($('#form_userinfo').valid()) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(info),
            contentType: 'application/json',
            dataType: 'json',
            url: '/worker/worker_updateBy_Session_UserId',
            success: function (data) {
                if (data.code == 0) {
                    $("#successModal").modal();
                    $('#successModal .modal-body').text("修改成功！");
                    User_name = user_name;
                    Tel = tel;
                    Email = email;
                } else {
                    $('#failModal .modal-body').text(data.status);
                    $("#failModal").modal();
                }
                $("#username").attr("readonly", true).val(User_name);
                $("#tel").attr("readonly", true).val(Tel);
                $("#email").attr("readonly", true).val(Email);
                $('#edit_bt').text('编辑');
            },
            error: function (textStatus) {
                $("#failModal").modal();
                $('#failModal .modal-body').text(textStatus);
            }
        });
    }
});
