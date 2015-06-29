/**
 * Created by Administrator on 2015/6/29 0029.
 *log,info,error,debug
 *  可以接受多个参数，将它们的结果连接起来输出
 * 占位符：
 *      支持字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）,%c CSS格式字符串
 *      console.log("%d年%d月%d日",2011,3,26);
 　　   console.log('%d %s balloons', 11, "red");
         console.log('%cThis text is styled!',
         'color: #86CC00; background-color: blue; font-size: 20px; padding: 3px;')。//输出的内容将显示为蓝底绿字
 *
 * 注意：
 *  只有在打开IE开发者工具后才能使用console，默认访问IE的console对象会出错。FF和Chrome没有问题。
 *
 * 扩展：
     timeline()，timelineEnd()，timeStamp()
        console.timeline和console.timelineEnd这两个方法用于定义一个新的时间线，可以在Timeline面板查看。这两个方法只有Chrome开发者工具支持。
        console.timeStamp方法用在上面两个方法的中间，用于为时间线添加一个时间戳。时间戳的名字就是timeStamp方法的参数
     console对象的所有方法，都可以被覆盖。因此，可以按照自己的需要，定义console.log方法。
     ["log", "info", "warn", "error"].forEach(function(method) {
        console[method] = console[method].bind(
            console,
            new Date().toISOString()
        );
    });
    console.log("出错了！");
 // 2014-05-18T09:00.000Z 出错了！
 * chrome 开发者工具菜单栏说明
     Elements：用来调试网页的HTML源码和CSS代码。
     Resources：查看网页加载的各种资源文件（比如代码文件、字体文件、css文件等），以及在硬盘上创建的各种内容（比如本地缓存、Cookie、Local Storage等）。
     Network：查看网页的HTTP通信情况。
     Sources：调试JavaScript代码。
     Timeline：查看各种网页行为随时间变化的情况。
     Profiles：查看网页的性能情况，比如CPU和内存消耗。
     Audits：提供网页优化的建议。
     Console：用来运行JavaScript命令。


 参考链接：http://javascript.ruanyifeng.com/tool/console.html#toc0
 */
(function(){

    function eachMsg(msg){
        for(var i ;i<msg.length;i++){

        }
    }

    function error(msg){//error方法输出信息时，在最前面加一个红色的叉，表示出错，同时会显示错误发生的堆栈
        if(window.console.error){
            console.error(msg);
        }
    }
    function debug(msg){
        if(window.console.debug){
            console.debug(msg);
        }
    }
    function warn(msg){
        if(window.console.warn){
            console.warn(msg);
        }
    }
    function info(msg){
        if(window.console.info){
            console.info(msg);
        }
    }

    function group(msg){//分组信息
        if(window.console.group){
            console.group(msg);
        }
    }

    function groupCollapsed(msg){//console.groupCollapsed方法与console.group方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。
        if(window.console.group){
            console.groupCollapsed(msg);
        }
    }

    function groupEnd(){//分组结束
        if(window.console.groupEnd){
            console.groupEnd();
        }
    }

    function dir(msg){//用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示,比log方法更易读，信息也更丰富,对于输出DOM对象非常有用，因为会显示DOM对象的所有属性
        if(window.console.dir){
            console.dir(msg);
        }
    }

    function dirxml(){//用来显示网页的某个节点（node）所包含的html/xml代码
        if(window.console.dirxml){
            console.dirxml(document.getElementById("div"))
        }
    }

    function trace(){//用来追踪函数的调用轨迹,当前执行的代码在堆栈中的调用路径；ie10+
        if(window.console.trace){
            console.trace();
        }
    }

    function time(msg){//与timeEnd搭配显示代码的运行时间。msg计时器名称 需与timeEnd相同
        if(window.console.time){
            console.time(msg);
        }
    }

    function timeEnd(msg){//与time搭配显示代码的运行时间。msg需与time相同
        if(window.console.timeEnd){
            console.timeEnd(msg);
        }
    }

    function profile(msg){//与time搭配显示代码的运行时间。msg需与time相同
        if(window.console.profile){
            console.profile(msg);
        }
    }

    function profileEnd(){//与time搭配显示代码的运行时间。msg需与time相同
        if(window.console.profileEnd){
            console.profileEnd();
        }
    }

    function  assert(expression,msg){//类似于单元测试中的断言，接受两个参数，第一个参数是表达式，第二个参数是字符串,当 expression 表达式为 false 的时候，输出后面的信息
        if(window.console.assert){
            console.assert(expression,msg);
        }
    }

    function count(msg){//用于统计当前代码被执行过多少次,msg为辅助信息
        if(window.console.count){
            console.count(msg);
        }
    }

    function table(msg){//用表格的形式显示复合类型的数据，必须拥有主键 ，数组的主键为数字键，对象和json的主键为属性
        if(window.console.table){
            console.table(msg);
        }
    }

    function clear(){
        if(window.console.clear){
            console.clear();
        }
    }
   var logs =
       {log: function ( msg ){
            if(window.console){
                if(window.console.log && msg){
                    console.log(msg);
                    return;
                }
                return {
                    error:error,
                    warn:warn,
                    debug:debug,
                    info:info,
                    assert:assert,
                    clear:clear,
                    count:count,
                    dir:dir,
                    dirxml:dirxml,
                    table:table,
                    trace:trace,
                    group:group,
                    groupCollapsed:groupCollapsed,
                    groupEnd:groupEnd,
                    time:time,
                    timeEnd:timeEnd,
                    profile:profile,
                    profileEnd:profileEnd
                }
            }
        }};
    if(!$){var $ = {};window.$ = logs;return;}
    $.extend(logs);

}())