/**
 * Created by Administrator on 2015/5/19 0019.
 *Navigator 对象包含有关浏览器的信息。
   Note注意： 没有应用于 navigator 对象的公开标准，不过所有浏览器都支持该对象。
   Navigator 对象属性
     属性 	            说明
     appCodeName 	返回浏览器的代码名
     appName 	    返回浏览器的名称
     appVersion 	返回浏览器的平台和版本信息
     cookieEnabled 	返回指明浏览器中是否启用 cookie 的布尔值
     platform 	    返回运行浏览器的操作系统平台
     userAgent 	    返回由客户机发送服务器的user-agent 头部的值
     Navigator      对象方法
     方法 	              描述
     javaEnabled() 	    指定是否在浏览器中启用Java
     taintEnabled() 	规定浏览器是否启用数据污点(data tainting)

 *
 *
 *Mozilla/Version [Language] (Platform; Encryption [; OS-or-CPU description])
         Language - 表示应用程序用的是哪个语言
         Platform - 表示应用程序是在什么操作系统和/或平台中运行
         Encryption - 表示应用程序包含了什么安全加密类型。其中的值可能是U(128位加密)、I(40位加密)、N(没加密)
        OS-or-CPU description - 放操作系统或CPU的可选信息。

 * navigator.appVersion 属性可返回浏览器的平台和版本信息。该属性是一个只读的字符串 所有主要浏览器都支持 appVersion 属性
 *   火狐38.0.1：5.0 (Windows)
 *   chrom      5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.65 Safari/537.36
 *   ie8:       4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729)
 *   360 7.1:   5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36
 *   Safari     5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2
 *   opera      5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36 OPR/29.0.1795.60
 * navigator.userAgent 属性是一个只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值。.所有主要浏览器都支持 userAgent 属性
 *   火狐38.0.1：Mozilla/5.0 (Windows NT 6.1; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0
 *   chrom 43:  Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.65 Safari/537.36
 *   ie8:       Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729)
 *   360 7.1    Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36
 *   Safari     Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2
 *   opera      Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36 OPR/29.0.1795.60
 *   /斜杠前面是产品名称，斜杠后面是产品版本号。
 *
 *   Trident：原先 IE7 的 user-agent 字串不包括 Trident 版本。这样可以区分 IE7 与 IE8 运行的兼容模式。
 *   Gecko： 是 Firefox 的呈现引擎
 *   Konqueror 是款在 KDE Linux 桌面环境中的浏览器，基于 KHTML 开源呈现引擎
 *       Mozilla/5.0 (compatible; Konqueror/3.5; SunOS) KHTML/3.5.0 (like Gecko)
 *   WebKit：Safari呈现引擎叫 WebKit。它是 Linux 中的 web 浏览器 Konqueror 呈现引擎 KHTML 的一个分支
 *   Google Chrome 浏览器以 WebKit 作为呈现引擎，JavaScript 引擎却用了另一种，很可能 WebKit 版本和 Safari 版本总会保持同步。
 *   Opera：
 *       在 Opera 8.0 前，它的 user-agent 字串格式如下：Opera/Version (OS-or-CPU; Encryption) [Language]
 *       Opera 9 user-agent 字串有两种修改的方式
 *           Mozilla/5.0 (Windows NT 5.1; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.50
 *           Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 9.50
 *       现在：Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36 OPR/29.0.1795.60
 *    总结：IE 想要将自己识别为 Netscape 4，Konqueror 和 WebKit 想要识别为 Firefox，Chrome 想要识别为 Safari。这样使得除 Opera 外所有浏览器的 user-agent 嗅探区别很小
 *   参考文档：http://www.cnblogs.com/georgewing/archive/2010/01/18/1650960.html
 */
console.log("loading identifyBrowser.js ----------------");
//define(function(){

    var browser={
        versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                ie:u.indexOf("MSIE") > -1 ? u.match(/MSIE \d+/) :"",//ie11不包含MSIE
                trident: u.indexOf('Trident') > -1, //IE内核--->ie8及以上版本
                presto: u.indexOf('Presto') > -1,  //opera内核
                Firefox:u.indexOf('Firefox') > -1, //火狐浏览器
                Chrome:u.indexOf('Chrome') > -1,   //Chrome浏览器
                Opera:u.indexOf('OPR') > -1,       //Opera浏览器
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko:  u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                iPod: u.indexOf('iPad') > -1, //是否iPod
                BlackBerry: u.indexOf('BlackBerry') > -1,//是否BlackBerry
                WindowsPhope: u.indexOf('IEMobile') > -1,//是否WindowsPhope
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        }(),
        language:(navigator.browserLanguage || navigator.language).toLowerCase()
    }
//    return browser;
//});