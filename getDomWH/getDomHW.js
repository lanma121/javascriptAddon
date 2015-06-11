/**
 * Created by Administrator on 2015/6/10 0010.
 */
function getDomHW(){
    return {
        bodyContent:{ width:document.body.clientWidth,height:document.body.clientHeight},//body对象的宽高，除去与document和body的margin差//兼容chrome,firfox,IE,360，opera
        domVisibleIncludeScroll: { width:window.innerWidth,height:window.innerHeight}, //document 可见区域的宽高，与document.documentElement.clientWidth不同的是，包含滚动条//兼容chrome,firfox,ie9,360,opera
        domVisibleExcludeScroll:{ width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}, //document可见区域的宽高（不包含滚动条）即BODY对象宽度加上Margin宽,//兼容chrome,firfox,IE,360,opera
        domExcludeScroll:{ width:document.body.scrollWidth,height:document.body.scrollHeight}, //网页正文全文的宽高(不包含滚动条) //chrome,360,opera还要加上与document的Margin高宽，firfox,IE不加；
        screen:{ width:window.screen.width,height:window.screen.height}, // 屏幕分辨率，//兼容所有
        browser: { width:window.screen.availWidth,height:window.screen.availHeight},//整个浏览器的高宽,//兼容chrome,firfox,ie，360,opera
        scroll: { left:document.body.scrollWidth - document.documentElement.clientWidt,top:document.body.clientHeigh - document.documentElement.clientHeight}//网页被卷去的长度
    }
}