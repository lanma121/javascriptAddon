/**
 * Created by Administrator on 2015/7/1 0001.
 */

/**
 * 事件模型：
 *     DOM0事件模型:
 *         写法1：document.getElementById("test").onclick = function(e){};
 *          基于DOM0的事件，对于同一个dom节点而言，只能注册一个，后边注册的同种事件会覆盖之前注册的
 *          事件触发时，this指该事件在哪个dom对象上触发
 *          解除事件：document.getElementById("test").onclick = null
 *         写法2：<div id="test" class="test" onclick="exec();" ></div>
 *          与写法1的区别就是，这样注册的事件，相当于动态调用函数(有点eval的意思)，因此不会传入event对象，同时，函数内的this指向的是window，不再是触发事件的dom对象，可以通过传递this过去<div id="test" class="test" onclick="exec(this);" ></div>
 *     DOM2事件模型
 *         DOM2支持同一dom元素注册多个同种事件。
 *         DOM2新增了捕获和冒泡的概念。
 *         DOM2事件通过addEventListener和removeEventListener管理，IE8及其以下版本浏览器，搞出了对应的attachEvent和detachEvent
 *         写法：
 *               document.getElementById("test").addEventListener("click", function(event){}, false);
 *                  click:事件名称；
 *                  function：事件回调；
 *                  false:捕获（Netscape）/冒泡（IE），true代表捕获事件（从上到下），false代表冒泡事件（从下到上）；捕获事件要比冒泡事件先触发(W3C)
 *                        真正触发事件的dom元素，是捕获事件的终点，是冒泡事件的起点
 *                        event.stopPropagation()阻止事件捕获
 *               document.getElementById("test").attachEvent("onclick", function(){})//没有遵循W3C，所以默认只为冒泡
 *                         window.event.cacenlBubble=false来阻止事件冒泡
 *
 *               var stopEvent = function(event){ e = event || window.event; if(e.stopPropagation){ e.stopPropagation(); }else { e.cancelBubble = true; } };
 *        解除事件语法：btn.removeEventListener("事件名称", "事件回调", "捕获/冒泡");
 *
 *
 * 事件委托:
 *     事件委托就是事件目标自身不处理事件，而是把处理任务委托给其父元素或者祖先元素，甚至根元素（document）。
 *
 *
 */


/*
 * addEventListener:监听Dom元素的事件
 *
 *  target：监听对象
 *  type：监听函数类型，如click,mouseover
 *  func：监听函数
 */
function addEventHandler(target,type,func){
    if(target.addEventListener){
        //监听IE9，谷歌和火狐
        target.addEventListener(type, func, false);
    }else if(target.attachEvent){
        target.attachEvent("on" + type, func);
    }else{
        target["on" + type] = func;
    }
}
/*
 * removeEventHandler:移除Dom元素的事件
 *
 *  target：监听对象
 *  type：监听函数类型，如click,mouseover
 *  func：监听函数
 */
function removeEventHandler(target, type, func) {
    if (target.removeEventListener){
        //监听IE9，谷歌和火狐
        target.removeEventListener(type, func, false);
    } else if (target.detachEvent){
        target.detachEvent("on" + type, func);
    }else {
        delete target["on" + type];
    }
}

function stopEvent(event){
    var e = event || window.event;
    if(e.stopPropagation){
        e.stopPropagation();
    }else if(e.cancelBubble){
        e.cancelBubble = true;
    }
}
