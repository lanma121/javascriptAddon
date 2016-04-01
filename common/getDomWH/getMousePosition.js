/**
 * Created by Administrator on 2015/5/29 0029.
 *
 * 获取相对于本对象obj的鼠标事件位置
 */
(function($){
    $.fn.fTriggerEveByDomPosition = function(width, height, coords, callback){
        var cursor = $(this).css("cursor");
        //var bIsImg = this[0].nodeName==="IMG";
        $(this).on("click mousemove",function(e){
            var
                nRatioWidth = $(this).width() / width,
                nRatioHeight = $(this).height() / height,
                l = e.offsetX,
                t = e.offsetY;
            $(this).css("cursor",cursor);
            for(var i in coords){
                var coord = coords[i],
                    coordr = coord.r * nRatioWidth,
                    coordl = coord.l * nRatioWidth,
                    coordt = coord.t * nRatioHeight,
                    coordb = coord.b * nRatioHeight;
                if(l>=coordl && l<=coordr && t>=coordt && t<=coordb){
                    var R = (coordr  - coordl)/2,
                        x = coordr - R - l,
                        y = (coordb + coordt)/2 - t;
                    if( x*x + y*y <= R*R){
                        e.type==="mousemove" ? $(this).css("cursor","pointer"): callback();
                    }
                    return false;
                }
            }

        });
    }
}(jQuery));
