/**
 * Created by Administrator on 2015/6/10 0010.
 */
function getDomHW(e){
    return {
        bodyClientWH:{ width:document.body.clientWidth,height:document.body.clientHeight},//body对象的宽高，除去与document和body的margin差//兼容chrome,firfox,IE,360，opera
        domInnerWH: { width:window.innerWidth,height:window.innerHeight}, //document 可见区域的宽高，与document.documentElement.clientWidth不同的是，包含滚动条//兼容chrome,firfox,ie9,360,opera
        domClientWH:{ width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}, //document可见区域的宽高（不包含滚动条）即BODY对象宽度加上Margin宽,//兼容chrome,firfox,IE,360,opera
        bodyScrollWH:{ width:document.body.scrollWidth,height:document.body.scrollHeight}, //IE,firfox body中各元素的宽高的和，与domScrollWH不同的是不加margin,;opera，chrome,360.7,safari 网页（document）正文宽高(不包含滚动条，包含margin) ;注意：必须等到加载完成才能调用此方法
		domScrollWH:{ width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}, //firfox,IE，网页正文全文的宽高(不包含滚动条，包含margin);opera，chrome,360.7,safari 有滚动条与bodyScrollWH等同，无滚动条body的宽高加margin 注意：必须等到加载完成才能调用此方法
		screenWH:{ width:window.screen.width,height:window.screen.height}, // 屏幕分辨率，//兼容所有
        browserWH: { width:window.screen.availWidth,height:window.screen.availHeight},//整个浏览器的高宽,//兼容chrome,firfox,ie，360,opera
        scrollWH: { left:document.body.scrollWidth - document.documentElement.clientWidth,top:document.body.clientHeight - document.documentElement.clientHeight},//网页被卷去的长度
        JQsrollWH :{left: $(document).scrollLeft(),top: $(document).scrollTop()},//返回或设置匹配元素的滚动条的位置(网页被卷去的高度),chrome,safari,oprea 给body，document，window都一样，ie和firfox 给body加没效果，document和window一样
        JQoffsetWH :{left: $("p").offset().left,top: $("p").offset().top},//返回或设置匹配元素相对于文档的偏移（位置）
        visableWH :{width:$(window).width(),height:$(window).height()},//可见区域宽高（不包含滚动条）
        pageWH:{width:$(document).width(),height:$(document).height()},//网页正文宽高(不包含滚动条，包含margin)
        screenLT:{left:e.screenX,top:e.screenY},//chrome,firfox,IE7+,Safari,opera  鼠标相对于屏幕左上角的位置
        offsetLT:{left:e.offsetX,top:e.offsetY},//chrome,IE7+,Safari,opera 鼠标相对于触发本元素事件左上角的位置
        clientLT:{left:e.clientX,top:e.clientY},//chrome,firfox,IE7+,Safari,opera  鼠标相对于可视区域document（文档）左上角的位置,
        pageLT:{left:e.pageX,top:e.pageY}//chrome,firfox,IE8+,Safari,opera  鼠标相对于document（文档）左上角的位置（包含滚动条）,ie7不包含body与document的margin(空隙)

    }
}