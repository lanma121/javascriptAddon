/**
 * Created by Administrator on 2015/6/8 0008.
 *信息弹框用法说明：
 *
 *注意：不同的项目要改变layer.htm 的路径
 *      使用时必须先引用jQuery
 *
 * 举例说明：
 * $(".dd").layer({
 *          addEvent:"click",//增加事件，可以不加
            title:"gerg",//设置弹框标题，可以不加
            content:div, //设置弹框内容，必选
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
    {
            console.log(obj.content);
            $("div[name='layerTmp']:last").remove();
            $("body").append(layerDiv);
            if(obj.title)$(".layer-title:last").text(obj.title);
            if(obj.content)$(".layer-content:last").append(obj.content);
            var clientWidth = document.documentElement.clientWidth;
            var width = $(".layer-content div:first").css("width").replace(/px/,"");
            $("#layer:last").css({"width":width+"px","left":((clientWidth-width)/2)+"px","visibility":"visible"});
            if(obj.confirms){
                $.each(obj.confirms,function(i,v){
                    var css = i%2==0 ? "bnt1":"bnt2"
                    $(".layer-btn").append("<a class="+css+">"+ v.bnt+"</a>");
                    $(".layer-btn a:eq("+i+")").on("click",function(){
                        $("div[name='layerTmp']:last").remove();
                        if($.isFunction(v.fun))v.fun();
                    });
                });
            }
            if($.isFunction(obj.callback)){obj.callback($("#layer").attr("id"))};
            $("#closeLayer").on("click",function(){
                $("div[name='layerTmp']:last").remove();
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

    console.log("--------------------loading alert/layer.js-----------------------");
}(jQuery|| {}))
