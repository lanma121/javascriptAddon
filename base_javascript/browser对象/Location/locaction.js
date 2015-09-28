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


console.log("设置或获取对象指定的文件名或路径"+window.location.pathname)
//设置或获取整个 URL 为字符串。
console.log("设置或获取整个 URL 为字符串"+window.location.href);
//设置或获取与 URL 关联的端口号码。
console.log("设置或获取与 URL 关联的端口号码。"+window.location.port)
//设置或获取 URL 的协议部分。
console.log("设置或获取 URL 的协议部分"+window.location.protocol)
//设置或获取 href 属性中在井号“#”后面的分段。window.location.href=
console.log("设置或获取 href 属性中在井号“#”后面的分段"+window.location.hash)
//设置或获取 location 或 URL 的 hostname 和 port 号码。
console.log("设置或获取 location 或 URL 的 hostname 和 port 号码"+window.location.host)
//设置或获取 href 属性中跟在问号后面的部分。
console.log("置或获取 href 属性中跟在问号后面的部分"+window.location.search)