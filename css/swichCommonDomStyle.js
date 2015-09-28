/**
 * Created by Administrator on 2015/5/20 0020.
 *
 * 兄弟节点元素样式切换和显示隐藏相应的dom
 */


define([],function(){
    if (window.console && window.console.log)console.log("------------loading common_js/swichCommonDomStyle.js---------------------");
    function swichCssAndShowHide( obj,className ){
        $(obj).addClass(className).siblings().removeClass(className);
        $("#"+$(obj).attr("linked")).show().siblings().hide();
        if (window.console && window.console.log)console.log("------------excuted swichCssAndShowHide---------------");
    }
    return swichCssAndShowHide;
});