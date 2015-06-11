/**
 * Created by Administrator on 2015/6/8 0008.
 *
 * 使用时必须先引用jQuery
 * 信息弹框
 * title: 信息弹框标题
 * content: 信息内容
 * callback : 回调函数，弹框加载完成后的函数
 *注意：不同的项目要改变layer.htm 和 关闭图片 的路径
 */
(function($){
    $.extend({
        layer: function( title,content,callback ) {
            $.get('./layer.htm', function(layerDiv) {
                console.log(content);
                $("body").append(layerDiv);
                console.log(layerDiv);
                $(".layui-layer-title").text(title);
                $("#layui-layer-content").append(content);
                $("#closeLayer").on("click",function(){
                    $("#layerTmp").remove();
                });
                if(callback){callback()};
            });
        }
    });

}(jQuery|| {}))
