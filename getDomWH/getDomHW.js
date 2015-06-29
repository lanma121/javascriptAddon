/**
 * Created by Administrator on 2015/6/10 0010.
 */
function getDomHW(){
    return {
        bodyClientWH:{ width:document.body.clientWidth,height:document.body.clientHeight},//body对象的宽高，除去与document和body的margin差//兼容chrome,firfox,IE,360，opera
        domInnerWH: { width:window.innerWidth,height:window.innerHeight}, //document 可见区域的宽高，与document.documentElement.clientWidth不同的是，包含滚动条//兼容chrome,firfox,ie9,360,opera
        domClientWH:{ width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}, //document可见区域的宽高（不包含滚动条）即BODY对象宽度加上Margin宽,//兼容chrome,firfox,IE,360,opera
        bodyScrollWH:{ width:document.body.scrollWidth,height:document.body.scrollHeight}, //IE,firfox body中各元素的宽高的和，与domScrollWH不同的是不加margin,;opera，chrome,360.7,safari 网页（document）正文宽高(不包含滚动条，包含margin) ;注意：必须等到加载完成才能调用此方法
		domScrollWH:{ width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}, //firfox,IE，网页正文全文的宽高(不包含滚动条，包含margin);opera，chrome,360.7,safari 有滚动条与bodyScrollWH等同，无滚动条body的宽高加margin 注意：必须等到加载完成才能调用此方法
		screenWH:{ width:window.screen.width,height:window.screen.height}, // 屏幕分辨率，//兼容所有
        browserWH: { width:window.screen.availWidth,height:window.screen.availHeight},//整个浏览器的高宽,//兼容chrome,firfox,ie，360,opera
        scrollWH: { left:document.body.scrollWidth - document.documentElement.clientWidt,top:document.body.clientHeigh - document.documentElement.clientHeight}//网页被卷去的长度
    }
}