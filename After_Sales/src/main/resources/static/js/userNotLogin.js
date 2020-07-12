//对面板的数据加载
var paVue = new Vue({
    el:'#pa',
    data:{
        fri:'',
        friBody:'',
        sec:'',
        secBody:'',
        thr:'',
        thrBody:'',
        fou:'',
        fouBody:''
    },
    methods:{
        getData:function () {
            axios
                .get('/faq/selectAllFAQ')
                .then(function (response) {
                    //对标题赋值
                    paVue.fri = response.data[0].faq_question;
                    paVue.sec = response.data[1].faq_question;
                    paVue.thr = response.data[2].faq_question;
                    paVue.fou = response.data[3].faq_question;
                    //对内容赋值
                    paVue.friBody = response.data[0].faq_answer;
                    paVue.secBody = response.data[1].faq_answer;
                    paVue.thrBody = response.data[2].faq_answer;
                    paVue.fouBody = response.data[3].faq_answer;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});
$(document).ready(function(){
    paVue.getData();

    // //css样式设置
    // $("#judge_first").click(function(){
    //     if( $("#panel_first").is(":hidden")){
    //         $("#judge_first").css({
    //             "color":"#fff",
    //             "background":"#2d3666"
    //         });
    //         $("#panel_first").css({
    //             "color":"#fff",
    //             "background":"#2d3666"
    //         });
    //     }else{
    //         $("#judge_first").css({
    //             "color":"lightslategray",
    //             "background":"#fff"
    //         });
    //         $("#panel_first").css({
    //             "color":"lightslategray",
    //             "background":"#fff"
    //         });
    //     }
    //     $("#panel_first").slideToggle("slow");
    // });
    //
    // $("#judge_second").click(function(){
    //     if( $("#panel_second").is(":hidden")){
    //         $("#judge_second").css({
    //             "color":"#fff",
    //             "background":"#2d3666"
    //         });
    //         $("#panel_second").css({
    //             "color":"#fff",
    //             "background":"#2d3666"
    //         });
    //     }else{
    //         $("#judge_second").css({
    //             "color":"lightslategray",
    //             "background":"#fff"
    //         });
    //         $("#panel_second").css({
    //             "color":"lightslategray",
    //             "background":"#fff"
    //         });
    //     }
    //     $("#panel_second").slideToggle("slow");
    //
    // });
    //
    // $("#judge_third").click(function(){
    //     if( $("#panel_third").is(":hidden")){
    //         $("#judge_third").css({
    //             "color":"#fff",
    //             "background":"#2d3666"
    //         });
    //         $("#panel_third").css({
    //             "color":"#fff",
    //             "background":"#2d3666"
    //         });
    //     }else{
    //         $("#judge_third").css({
    //             "color":"lightslategray",
    //             "background":"#fff"
    //         });
    //         $("#panel_third").css({
    //             "color":"lightslategray",
    //             "background":"#fff"
    //         });
    //     }
    //     $("#panel_third").slideToggle("slow");
    // });
    //
    // $("#judge_fourth").click(function(){
    //     if( $("#panel_fourth").is(":hidden")){
    //         $("#judge_fourth").css({
    //             "color":"#fff",
    //             "background":"#2d3666"
    //         });
    //         $("#panel_fourth").css({
    //             "color":"#fff",
    //             "background":"#2d3666"
    //         });
    //     }else{
    //         $("#judge_fourth").css({
    //             "color":"lightslategray",
    //             "background":"#fff"
    //         });
    //         $("#panel_fourth").css({
    //             "color":"lightslategray",
    //             "background":"#fff"
    //         });
    //     }
    //     $("#panel_fourth").slideToggle("slow");
    // });
    //
    // $("#judge_fifth").click(function(){
    //     if( $("#panel_fifth").is(":hidden")){
    //         $("#judge_fifth").css({
    //             "color":"#fff",
    //             "background":"#2d3666"
    //         });
    //         $("#panel_fifth").css({
    //             "color":"#fff",
    //             "background":"#2d3666"
    //         });
    //     }else{
    //         $("#judge_fifth").css({
    //             "color":"lightslategray",
    //             "background":"#fff"
    //         });
    //         $("#panel_fifth").css({
    //             "color":"lightslategray",
    //             "background":"#fff"
    //         });
    //     }
    //     $("#panel_fifth").slideToggle("slow");
    // });

});