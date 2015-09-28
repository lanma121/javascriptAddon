/**
 * Created by Administrator on 2015/8/4 0004.
 */

/**
 *js的作用域通过函数定义的，在函数中定义的变量，只在函数内部可见；在函数中引用一个变量时，js会搜素当前函数的作用域，如果没有找到搜索上一层的作用域，直到全局作用域
 * 函数作用域的嵌套关系是定义时决定的，js的作用域是静态作用域，
 */
var ifx = "global";
function ok(){
    console.log(ifx);//undefined 在函数内部找到了ifx,但是还没被定义
    ifx = "fuction";
    if(true){
        var ifx = "if var"
    }
    console.log(ifx);//if var 找函数内部的ifx
}
ok();
console.log(ifx);//global 全局

function f1(){
    console.log(ifx);
}
f1(); //global
function f2(){
    var scope = 'f2';
    f1();
}
f2(); // global