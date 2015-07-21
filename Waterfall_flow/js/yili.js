/**
 * Created by Administrator on 2015/7/14 0014.
 */
(function($){
    $(function(){
        $(".backUp").on("click",function(){
            $(window).scrollTop(0);
        });




        function test(num){
            var data = {
                img:"images/pic_2.jpg",
                title:"夏季纯色户外遮阳小礼帽",
                price:1000,
                sale:2555
            };
            var list = [];
            for(var i = 0;i <num;i++){
                list.push(data);
            }
           return {list:list};
        }
        var wbWidth= document.documentElement.clientWidth;
            wbWidth = wbWidth > 640 ? (wbWidth - 640)/2 + 12:12;
        var container = $(".cp"),
            windowHeight =  $(window).height();
        function ajax(page){
            var data = test(page);
            container.append( template('templete', data));
        }
        var wbHight = document.documentElement.clientHeight;
        var titleHight = 351 + 31;
        var colum = Math.ceil((wbHight - titleHight) / 240);
        ajax(colum);
        $(window).on("scroll",function(){
            var
                scroll = $(window).scrollTop(),
                containerHeight = $(document).height(),     // 容器高度 + 容器top至文档top的距离
                distance = windowHeight + scroll            // 视口高度 + 滚动距离
            if(containerHeight <= distance){
                setTimeout(function(){
                    ajax(2);
                },1000);
                //ajax();
            }
           scroll<=0 && $(".backUp").css("display")==="block" ? $(".backUp").css("display","none") :
           scroll >0 && $(".backUp").css("display")==="none" ? $(".backUp").css({"bottom":"5px","right":wbWidth+"px","display":"block"}) : false;
        });
    })









}(jQuery));