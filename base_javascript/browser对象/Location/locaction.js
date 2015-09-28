/**
 * Created by Administrator on 2015/8/26 0026.
 */
/**
 *
 *  window.location 对象用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面。
     Window Location
     window.location 对象在编写时可不使用 window 这个前缀。
     一些例子：
     location.hostname 返回 web 主机的域名
     location.pathname 返回当前页面的路径和文件名
     location.port 返回 web 主机的端口 （80 或 443）
     location.protocol 返回所使用的 web 协议（http:// 或 https://）
    location.href 属性返回当前页面的 URL。
 *
 *
 *
 */

console.log("pathname: "+location.pathname);
console.log("hostname: "+location.hostname);
console.log("port: "+location.port);
console.log("protocol: "+location.protocol);
console.log("href: "+location.href);


