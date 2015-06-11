/**
 * Created by Administrator on 2015/6/8 0008.
 *
 * 使用时必须先引用jQuery
 * 信息弹框
 *注意：不同的项目要改变layer.htm 和 关闭图片 的路径
 *
 * $.layer({
            title:"gerg",//设置弹框标题
            content:div, //设置弹框内容
            confirms:[ //设置确认取消按钮
                {"bnt":"确认","fun":function(){//显示第一个按钮，bnt为按钮的名称，fun为点击按钮执行的函数
                        alert("确认");
                }},
                {"bnt":"取消","fun":function(){
                    alert("取消");
                }}],
            callback:function (obj) {//弹框成功的回调函数
                //alert("弹出成功！！！" +obj);
            }
        });
 *
 */
(function($){

    $.extend({
        layer: function(obj) {
            $.get('./layer.htm', function(layerDiv) {
                console.log(obj.content);
                $("#layerTmp").remove();
                $("body").append(layerDiv);
                if(obj.title)$(".layui-layer-title").text(obj.title);
                if(obj.content)$("#layui-layer-content").append(obj.content);
                if(obj.confirms){
                    $.each(obj.confirms,function(i,v){
                        var css = i%2==0 ? "bnt1":"bnt2"
                        $(".layui-layer-btn").append("<a class="+css+">"+ v.bnt+"</a>");
                        $(".layui-layer-btn a:eq("+i+")").on("click",function(){
                            v.fun();
                        });
                    });
                }
                if(obj.callback){obj.callback($("#layui-layer").attr("id"))};
                $("#closeLayer").on("click",function(){
                    $("#layerTmp").remove();
                });

            });
        }
    });

}(jQuery|| {}))
