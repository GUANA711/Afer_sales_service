$(function () {
    $(document).ready(function(){
        var userStr = window.sessionStorage.getItem("User"); //User_role??
        var userData = JSON.parse(userStr);

        var perArray = [];
        var roleArray = [];

        for(var i = 0;i < userData.permissionList.length;i++){
            roleArray.push(userData.permissionList[i].roleCode)
        }
        $('[user\\:hasroles]').each(function(){
           var role = $(this).attr("user:hasRole");
           if (-1 == $.inArray(role,roleArray)){
               $(this).remove();
           }

        });


    });
});