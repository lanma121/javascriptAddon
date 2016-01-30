/**
 * Created by Administrator on 2015/6/30 0030.
 */

/**
 * //元素拖拽插件
 *
 *
 *  $('#dragDiv').dragDrop({//$('#dragDiv') 拖拽对象
 *      type:1,                                     //默认为1，表示拖拽的效果，1表示正常拖拽；2表示拖拽阴影层；3表示交换位置
 *      fixarea:{left:0,right:500,top:0,bottom:500},//限定拖拽区域范围
 *      focuEle:$("#xxx"),                          //点击哪个元素开始拖动,可为空。不为空时，需要为被拖动元素的子元素。
 *      dragDirection:'all',                        //拖动方向：['all','vertical','horizontal'],默认为all 四面八方可以拖动
 *      mouseMove:function( moveEle, locationData), //拖动时触发的回调。
 *      mouseDown:function(moveEle, locationData);  //鼠标按下时触发的回调函数
 *      mouseUp:function(moveEle, locationData);    //鼠标抬起时触发的回调函数
 *  });
 *  注意：所有的坐标都相对文档左上角进行偏移；
 *参考：http://www.cnblogs.com/ljchow/archive/2010/04/27/1721695.html
 *
 */


(function($) {
    function productHtml(moveEle){
        var
            left = moveEle.position().left || moveEle.offset().left ,
            top =  moveEle.position().top || moveEle.offset().top ,
            width = moveEle.outerWidth() - 6,
            height = moveEle.outerHeight() - 6;
        var styleStr="style='position:fixed;top:"+top+"px;left:"+left+"px;width:"+width+"px;height:"+height+"px;" +
            "cursor:move;z-index:19891016;background-color:#fff;background: rgba(255, 255, 255,.3);" +
            "border:3px solid;border-color:#000000;border-color:rgba(0, 0, 0,.5);filter:alpha(opacity=50);'";
        var replaceEle = $("<div "+styleStr+"></div>");
        $("body").append(replaceEle);
        return replaceEle;
    }
    /**
     * 有父元素包含
     * 父对象必须设置宽度
     * 每个元素的样式一样，不能有position
     *
     */
    function type3( moveEle, locationData, options ){
        var
            parent = moveEle.parent(),
            num = parent.children().length ,
            width = moveEle.outerWidth() + parseFloat(moveEle.css("marginLeft").replace("px","")) + parseFloat(moveEle.css("marginRight").replace("px","")) ,
            rowNum = Math.floor( parent.width() / width ) ,
            height = moveEle.outerHeight() + parseFloat(moveEle.css("marginTop").replace("px","")) + parseFloat(moveEle.css("marginBottom").replace("px","")) ,
            sl = locationData.startSet.left ,
            el = locationData.endSet.left ,
            st = locationData.startSet.top ,
            et = locationData.endSet.top ,
            ml = el - sl ,
            mt = et - st ,
            columnM = parseInt( ml / width )  ,		                //横向移动的数量(完全覆盖下一个)，>0,向右移，<0,向左移
            rowsM = parseInt( mt / height) ,			            //纵向移动的行数,>0向下移，<0向上移
            index = parseInt( moveEle.attr("data-index")) ;
            function mouseUp3(){
                moveEle.css("position","");
                var column = Math.round( ml / width ) ,		        //横向移动的数量，>0,向右移，<0,向左移
                    rows = Math.round( mt / height) ,			    //纵向移动的行数,>0向下移，<0向上移
                    totalNum = rows * rowNum + column + index ,
                    finalNum = totalNum >= num ? num - 1 : totalNum < 0 ? 0 :totalNum ,
                    indexDom = parent.children().eq(finalNum);
                console.log(index+"**********"+finalNum);
                finalNum > index ? indexDom.after(moveEle.clone()) : indexDom.before(moveEle.clone());
                moveEle.remove();
                parent.children().eq(finalNum).dragDrop(options);
                locationData.type3 = {index:index,final:finalNum}
            }
            function moveUp3(){
                var ul = sl + width * columnM;
                var ut = st + height * columnM;
                moveEle.offset({left:ul,top:st});
                moveEle.attr("data-index",columnM + index);
            }
            function mouseMove3(){
                if( columnM === 0 ) return;
                console.log(columnM+"  "+rowsM+"  "+index);
                var indexDom = moveEle.siblings("[data-index='"+ ( columnM + index ) +"']") ,
                    columnL = columnM < 0 ? columnM + 1 : columnM -1 ,
                    ll = sl + width * columnL ,
                    tt = st + height * columnL ;
                indexDom.offset( {left:ll,top: locationData.startSet.top} );
                indexDom.attr("data-index",(index + columnL));
                //moveEle.attr("data-index",(columnM + index));
            }
            return { mouseUp3:mouseUp3,mouseMove3:mouseMove3,moveUp3:moveUp3 }

    }
    $.fn.dragDrop = function(options){
        //默认配置
        var defaults = {
            type:1,
            focuEle:null,            //点击哪个元素开始拖动,可为空。不为空时，需要为被拖动元素的子元素。
            dragDirection:'all',    //拖动方向：['all','vertical','horizontal']
            fixarea:null            //限制在哪个区域拖动,以数组形式提供{left:minX,right:maxX,top:minY,bottom:maxY}
        };

        var opts = $.extend({},defaults,options);
        return this.each(function(){
            var locationData = {
                pageDown:{left:0,top:0},    //以文档左上角为原点,鼠标按下位置
                pageMove:{left:0,top:0},    //以文档左上角为原点,鼠标拖动偏移量
                startSet:{left:0,top:0},    //以文档左上角为原点,拖动元素起始的位置(鼠标按下时，拖动元素距离文档左上角的位置  )
                endSet:{left:0,top:0}       //以文档左上角为原点,拖动元素拖动后的位置
            };
            var moveEle = $(this);//移动的元素
            var replaceEle = null;//替换移动的元素
            var focuEle = opts.focuEle ? $(opts.focuEle,moveEle) : moveEle ;//点击哪个元素，以触发移动。该元素需要是被移动元素的子元素（比如标题等）
            if(!focuEle || focuEle.length<=0){
                alert('focuEle is not found! the element must be a child of '+this.id);
                return false;
            }
            focuEle.css('cursor','move'); //改变鼠标形状
            //是否限定在某个区域中移动.
            //fixarea格式: [x轴最小值,x轴最大值,y轴最小值,y轴最大值]
            function getfixArea(){
                var moveX = locationData.pageMove.left - locationData.pageDown.left + locationData.startSet.left;
                var moveY = locationData.pageMove.top - locationData.pageDown.top + locationData.startSet.top;
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
                locationData.endSet = {left:moveX,top:moveY};
            }
            //实施移动
            function location(){
                var obj = opts.type===2 && replaceEle ? replaceEle : moveEle;
                //移动方向：可以是不限定、垂直、水平。
                opts.dragDirection=='all' ? obj.offset({left:locationData.endSet.left,top:locationData.endSet.top}) : opts.dragDirection=='vertical' ?
                    obj.offset({top:locationData.endSet.top}) : opts.dragDirection=='horizontal' ? obj.offset({left:locationData.endSet.left}) : false;

            }

            //鼠标移动方法
            function mousemoveEve(e){
                e.preventDefault();
                locationData.pageMove = {left:e.pageX,top: e.pageY};
                getfixArea();
                location();
                if( opts.type === 3 ){
                    type3(moveEle, locationData, options).mouseMove3();
                }
                if(opts.mouseMove){//如果有回调
                    opts.mouseMove.call(opts.mouseMove,moveEle,locationData);//将dragParams作为参数传递
                }
            }
            //鼠标抬起方法
            function mouseupEve(e){
                var closeDrag = function(){
                    $(document).off({"mousemove":mousemoveEve,'mouseup':mouseupEve});
                    if(opts.type === 2 && replaceEle){
                        replaceEle.remove();
                        replaceEle = null;
                        location();
                    }
                    if(opts.type === 3){
                        type3( moveEle, locationData, options).moveUp3();
                    }
                    if(opts.mouseUp){//如果有回调
                        opts.mouseUp.call(opts.mouseUp,moveEle,locationData);//将dragParams作为参数传递
                    }
                }
                try {
                    closeDrag();
                } catch(a) {
                    if(window.console&&console.error){
                        console.error("错误信息："+a);
                    }
                    closeDrag();
                }
            }
            //鼠标按下方法：
            function mousedownEve(e){
                e.preventDefault();
                $(document).on({"mousemove":mousemoveEve,'mouseup':mouseupEve});
                locationData.pageDown = {left:e.pageX,top: e.pageY};
                locationData.pageMove = {left:e.pageX,top: e.pageY};
                locationData.startSet = moveEle.offset();
                locationData.endSet = moveEle.offset();
                if(opts.type === 2){
                   replaceEle = productHtml(moveEle);
                }
                if(opts.mouseDown){//如果有回调
                    opts.mouseDown.call(opts.mouseDown,moveEle,locationData);//将dragParams作为参数传递
                }
            }
            focuEle.on('mousedown',mousedownEve);
        });
    };

}(jQuery));


