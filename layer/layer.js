/**
 * Created by Administrator on 2015/6/8 0008.
 *信息弹框用法说明：
 *
 *注意：不同的项目要改变layer.htm 的路径
 *      使用时必须先引用jQuery
 *
 *
 * 举例说明：
 * $(".dd").layer({
 *          drag:true,      //是否可托转
 *          mastLayer：true,//设置蒙版
 *          addEvent:"click",//增加事件，可以不加
            title:"gerg",//设置弹框标题，可以不加
            content:div, //设置弹框内容，必选,尽量用div包装，并且设置width，否则ie7默认为200px
            confirms:[ //设置确认取消按钮，可以不加
                {"bnt":"确认","fun":function(){//显示第一个按钮，bnt为按钮的名称，fun为点击按钮执行的函数
                        alert("确认");
                }},
                {"bnt":"取消","fun":function(){
                    alert("取消");
                }}],
            callback:function (obj) {//弹框成功的回调函数，可以不加
                //alert("弹出成功！！！" +obj);
            }
        });
 *
 * $.extend(target,prop1,propN) //用一个或多个其他对象来扩展一个对象，返回这个被扩展的对象。这是简化继承的主要工具。
 参数:
 target (Object): 要扩展的对象
 prop1 (Object): 要与第一个对象合并的对象
 propN (Object): (可选) 更多要与第一个对象合并的对象


 *
 */
(function($){

    var clientHeight = document.documentElement.clientHeight //==> 可见区域的高
    var clientWidth = document.documentElement.clientWidth;
    var back = null;
/********************************************************************************************************************************************************************/
    //关闭遮盖层
    function closeMastLayer(){
        var obj = back || $("#mastLayer:last");
        $(obj).remove();
        return obj;
    }

    //设置屏蔽罩
    function mastLayer(){
        closeMastLayer();
        if (window.console && window.console.log)console.log(" --------------添加遮罩层------------");
        var bWidth = document.documentElement.scrollWidth;
        var bHeight = document.documentElement.scrollHeight;
        var styleStr="style='position:absolute;top:0px;left:0px;z-index:19891014;background-color: rgb(0, 0, 0);width:"+bWidth+"px;height:"+bHeight+"px;" +
            "filter:alpha(opacity=50);opacity:0.5;'";
        back = $("<div id='mastLayer' "+styleStr+"></div>");
        $("body").append(back);
        return back;
    }
/********************************************************************************************************************************************************************/

    function closeAlert(obj){//关闭layer
        $("div[name='layerTmp']:last").remove();
        if(obj.mastLayer){
            closeMastLayer();
        }
    }

    function resetStyle(obj){//设置内容，根据内容重设样式
        if(obj.title)$(".layer-title:last").text(obj.title);
        var cont = obj.content;
        if(obj.content)$(".layer-content:last").append(cont);
        var width = $(".layer-content:last div:first").css("width") || $(".layer-content:last table:first").css("width") ||
                    $(".layer-content:last p:first").css("width") || $(".layer-content:last").css("width");
        if(navigator.userAgent.match(/MSIE \d+/)+"" === "MSIE 7"){
            width = width === "1897px" ? "200px" : width;//200px 没有设置宽度
            $("#layer:last").css("width",width);
        }
        $("#layer:last").css({"left":(parseFloat(clientWidth-width.replace(/px/,""))/2)+"px","visibility":"visible"});
    }

    function addBnt (obj){//添加按钮
        if(obj.confirms){
            $.each(obj.confirms,function(i,v){
                var css = i%2==0 ? "bnt1":"bnt2"
                $(".layer-btn").append("<a class="+css+">"+ v.bnt+"</a>");
                $(".layer-btn a:eq("+i+")").on("click",function(){
                    closeAlert(obj);
                    if($.isFunction(v.fun))v.fun();
                });
            });
        }
    }

    function layer(obj){
        $.get('./layer.html', function(layerDiv) {
            if(window.console && window.console.log)console.log(obj.content);
            closeAlert(obj);
            if(obj.mastLayer){ mastLayer(); }//添加遮盖层
            $("body").append(layerDiv);
            resetStyle(obj);    //设置内容和样式
            addBnt (obj);       //添加点击按钮
            if(obj.drag){drag();}//拖拽弹出框
            if($.isFunction(obj.callback)){obj.callback($("#layer").attr("id"))};//回调函数
            $("#closeLayer").on("click",function(){//给关闭按钮添加点击事件
                closeAlert(obj);
            });
        });
    }

    $.fn.layer = function(obj) {
        if(!obj){alert("请添加属性对象！");return;}
        if(obj.addEvent){
            $(this).on(obj.addEvent,function(){
                layer(obj);
            });
        }else{
            layer(obj)
        };
    }

    if(window.console && window.console.log)console.log("--------------------loading alert/layer.js-----------------------");
}(jQuery|| {}))
