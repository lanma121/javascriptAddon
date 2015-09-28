/**
 * Created by Administrator on 2015/9/2 0002.
 */


(function($){
    /**
     * 定义滚动条样式
     *
     * @returns {{}}
     */
    function scrollStyles(){
        var styleType = {};
        styleType.style1 = function(scrollLength,trackLength,scrollTop,scrollLeft){
            var html = '<div id="scrollbar" style="top:'+scrollTop+'px;left:'+scrollLeft+'px;position: fixed;width:'+scrollLength+'px; height: 20px;">'+
                '<div class="scrollbar-button scrollbar-button1"><div class="arrow arrow1"></div></div>'+
                '<div class="scrollbar-track" style="width: '+trackLength+'px;">'+
                '<button class="scrollbar-thumb">|||</button>'+
                '</div>'+
                '<div class="scrollbar-button scrollbar-button2"><div class="arrow arrow2"></div></div>'+
                '</div>';
            return $(html);
        }
        return styleType;
    }
    var styleTypes = scrollStyles();
    function madeScrollBar(scrollbarLength,boxSize,scrolloffset){

        //var scrollbar_track_length = {//滚槽的长度  20表示滚动条两端按钮的长度
        //    h_trackLength:scrollbarLength.h_length - 20 - 20,//横向滚槽
        //    v_trackLength:scrollbarLength.v_length - 20- 20  //垂直滚槽
        //}


    }
    function dragScroll(){

    }
    $.fn.scroll = function(opstions){
               //添加滚动条的对象元素
        return this.each(function(){
            var obj = $(this);
            opstions = $.extend({"box":obj,"type":"vertical"},opstions);
            var type = opstions.type,
                box = opstions.box,
                content = opstions.content;
            var contentSize = { //滚动内容的长宽
                    width:$(content).outerWidth(),
                    heigth:$(content).outerHeight()
                },
                boxSize = { //滚动盒子的长宽
                    width:$(box).outerWidth(),
                    heigth:$(box).outerHeight()
                },
                scrollbarLength = { //横向/垂直滚动条的长度h_length:表示横向滚动条的长度，v_length表示垂直滚动条的长度；
                    h_length:obj.outerWidth(),
                    v_length:obj.outerHeight()
                },
                scrolloffset = {//滚动条离文档左上角的位置，h_left,h_top:表示横向滚动条的左边，上边距离； v_left,v_top:表示垂直滚动条左边、上边的距离。
                    h_left:$(box).offset().left,
                    h_top:$(box).offset().top + boxSize.heigth,
                    v_left:$(box).offset().left + boxSize.width,
                    v_top:$(box).offset().top
                };
            var scrollBar = null,scorllFun = null,fixArea;
            if(type === "horizontal" && boxSize.width < contentSize.width){
                var h_length = scrollbarLength.h_length;
                scrollBar = styleTypes.style1(h_length,h_length - 20 - 20,scrolloffset.h_top,scrolloffset.h_left);//滚动条对象
                scorllFun = function(x){$(box).scrollLeft(x)};
            }else if(type === "vertical"){
                scrollBar = productHtml(h_length,h_length - 20 - 20,scrolloffset.h_top,scrolloffset.h_left);//滚动条对象
                scorllFun = function(x){$(box).scrollTop(x)};
            }else{

            }
            $("body").after(scrollBar);
            var thumbOffset = $("button.scrollbar-thumb",scrollBar).offset();
            var scrollArar = type === "horizontal" ? thumbOffset.left : thumbOffset.top;
            var fixArea = {left:scrollArar,right:(scrollArar + scrollbarLength.h_length -20 -20 -600)}; //滚动范围
            var rationScroll = 1;
            $('#scrollbar .scrollbar-thumb').dragDrop({
                    dragDirection:type,   //拖动方向：['all','vertical','horizontal']
                    fixarea:fixArea, //限制在哪个区域拖动,以数组形式提供{left:minX,right:maxX,top:minY,bottom:maxY}
                    callback:function(result){
                        var x = result.endSet.left - scrollArar;
                        scorllFun(x * rationScroll);
                    }
            });
        })

    }
    //var screnWidth = $(window).width() -10;//屏幕宽度
    //var conttWidth = $(".sc_3 ul").width();  //
    //var contentWidth = $(".sc_3").width();
    //if(conttWidth <=contentWidth){
    //    $(".sc_3 ul").css("border-left-width","1px");
    //    $(".sc_3 li").css("border-width","0px 1px 1px 0px");
    //    return false;
    //}
    //var marginLeft = $(".sc_3 ul").css("margin-left").replace(/px/,"");
    //var scrollWidth = screnWidth - (conttWidth - (contentWidth - 2 * marginLeft)) -5;
    //console.log(scrollWidth);
    //var rationScroll = 1;
    //if(scrollWidth < 100){
    //    rationScroll = 1+(100 - scrollWidth)/(screnWidth-102);//<0
    //    scrollWidth = 100;
    //}
    //console.log(rationScroll);
    //var width = screnWidth - scrollWidth;
    //console.log(screnWidth+"    "+conttWidth+"   "+contentWidth);
    //if($("#dragContainer").attr("id")){$("#dragContainer").remove();}
    //var htmlStr = '<div id="dragContainer" style="width:'+screnWidth+'px;height: 12px;position: fixed;bottom:0px;left:5px;right:5px;z-index: 1000;background:white;">'+
    //    '<div id="dragDiv1" style="width:'+scrollWidth+'px;height:8px;background: #808080;border-radius:5px; position: absolute;top:2px;left: 1px;"></div>';
    //$("body").append(htmlStr);
    ////默认设置
    //$('#dragDiv1').dragDrop({
    //    dragDirection:'horizontal',   //拖动方向：['all','vertical','horizontal']
    //    fixarea:{left:1,right:width},            //限制在哪个区域拖动,以数组形式提供{left:minX,right:maxX,top:minY,bottom:maxY}
    //    callback:function(x,y){
    //        $(".sc_3").scrollLeft(x * rationScroll);
    //    }
    //});

}(jQuery))