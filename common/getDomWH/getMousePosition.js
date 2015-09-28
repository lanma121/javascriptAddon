/**
 * Created by Administrator on 2015/5/29 0029.
 *
 * 获取相对于本对象obj的鼠标事件位置
 */
define(function(){

    function getMousePosition(e,obj) {
        var offset = $(obj).offset();
        this.X = e.pageX - offset.left;
        this.Y = e.pageY - offset.top;
        if (window.console && window.console.log)console.log("相对于本对象的左上角的位置：" + this.X + "，" + this.Y);
    }
    return getMousePosition;
});
