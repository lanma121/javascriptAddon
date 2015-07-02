/**
 * Created by Administrator on 2015/6/30 0030.
 */

/**
 * //
 *  $('#dragDiv').dragDrop({//$('#dragDiv') 拖拽对象
 *      fixarea:{left:0,right:500,top:0,bottom:500},//限定拖拽区域范围
 *      focuEle:$("#xxx"),                          //点击哪个元素开始拖动,可为空。不为空时，需要为被拖动元素的子元素。
 *      dragDirection:'all',                        //拖动方向：['all','vertical','horizontal'],默认为all 四面八方可以拖动
 *      callback:function( x, y),                   //拖动时触发的回调。
 *
 *  });
 *
 */


(function($) {
    // 元素拖拽插件
    //被移动元素，需要设置定位样式，否则拖拽效果将无效。moveEle.css({'position':'absolute','left':'0','top':'0'});
    $.fn.dragDrop = function(options){
        //默认配置
        var defaults = {
            focuEle:null,            //点击哪个元素开始拖动,可为空。不为空时，需要为被拖动元素的子元素。
            callback:null,           //拖动时触发的回调。
            dragDirection:'all',    //拖动方向：['all','vertical','horizontal']
            fixarea:null            //限制在哪个区域拖动,以数组形式提供{left:minX,right:maxX,top:minY,bottom:maxY}
        };

        var opts = $.extend({},defaults,options);
        return this.each(function(){
            var mousedownLocation = {};
            var moveEle = $(this);//移动的元素
            var focuEle = opts.focuEle ? $(opts.focuEle,moveEle) : moveEle ;//点击哪个元素，以触发移动。该元素需要是被移动元素的子元素（比如标题等）
            if(!focuEle || focuEle.length<=0){
                alert('focuEle is not found! the element must be a child of '+this.id);
                return false;
            }

            function mousemoveEve(e){
                //被移动元素的新位置，实际上鼠标当前位置与原位置之差
                //实际上，被移动元素的新位置，也可以直接是鼠标位置，这也能体现拖拽，但是元素的位置就不会精确。
                var moveX = e.pageX - mousedownLocation.X;
                var moveY = e.pageY - mousedownLocation.Y;
                //是否限定在某个区域中移动.
                //fixarea格式: [x轴最小值,x轴最大值,y轴最小值,y轴最大值]
                if(opts.fixarea){
                    if(opts.fixarea.left !== undefined &&　moveX < opts.fixarea.left){
                        moveX = opts.fixarea.left;
                    }
                    if(opts.fixarea.right!== undefined &&　moveX > opts.fixarea.right){
                        moveX=opts.fixarea.right;
                    }
                    if(opts.fixarea.top!== undefined &&　moveY < opts.fixarea.top){
                        moveY=opts.fixarea.top;
                    }
                    if(opts.fixarea.bottom!== undefined &&　moveY > opts.fixarea.bottom) {
                        moveY=opts.fixarea.bottom;
                    }
                }
                //移动方向：可以是不限定、垂直、水平。
                opts.dragDirection=='all' ? moveEle.css({'left':moveX,'top':moveY}) : opts.dragDirection=='vertical' ?
                    moveEle.css('top',moveY) : opts.dragDirection=='horizontal' ? moveEle.css('left',moveX) : false;
                if(opts.callback){//如果有回调
                    opts.callback.call(opts.callback,moveX,moveY);//将dragParams作为参数传递
                }
            }

            function mouseupEve(e){
                console.log("remove ---------------"+ e.type);
                moveEle.css({'cursor':'default'});
                if(moveEle.get(0).releaseCapture){
                    moveEle.get(0).releaseCapture();
                }
                focuEle.off('mouseleave',mouseupEve);
                $(document).off({"mousemove":mousemoveEve,'mouseup':mouseupEve});
            }

            function mousedownEve(e){
                $(document).on({"mousemove":mousemoveEve,'mouseup':mouseupEve});
                focuEle.on('mouseleave',mouseupEve);
                focuEle.css('cursor','move'); //改变鼠标形状
                //捕获事件。（该用法，还有个好处，就是防止移动太快导致鼠标跑出被移动元素之外）
                if(moveEle.get(0).setCapture) {
                    moveEle.get(0).setCapture();
                }
                mousedownLocation.X = e.pageX - moveEle.position().left;
                mousedownLocation.Y = e.pageY - moveEle.position().top;
            }


            focuEle.on('mousedown',mousedownEve);
        });
    };

}(jQuery));

$(function(){
//限定区域，有回调函数。
    $('#dragDiv').dragDrop({fixarea:{left:0,right:$('#dragContainer').width()-50,top:0,bottom:$('#dragContainer').height()-50}});
//默认设置
    $('#dragDiv1').dragDrop({dragDirection:"horizontal",callback:function(XX,YY){console.log(XX)}});
});
