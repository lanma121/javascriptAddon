/**
 * Created by Administrator on 2015/7/15 0015.
 */

/***
 *
 *  cookie 是存储于访问者的计算机中的变量。
 *          每当同一台计算机通过浏览器请求某个页面时，就会发送这个 cookie。你可以使用 JavaScript 来创建和取回 cookie 的值。
 *
 *
 *
 */
function setCookie(c_name,value,expiredays){

    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}


function getCookie(c_name) {
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1){
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

function delCookie(name)//删除cookie

{

    document.cookie = name+"=;expires="+(new Date(0)).toGMTString();

}