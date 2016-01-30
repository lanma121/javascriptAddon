/**
 * Created by Administrator on 2015/8/4 0004.
 */
/**
 * 闭包：
 * 闭包，指的是词法表示包括不被计算的变量的函数，也就是说，函数可以使用函数之外定义的变量。
 * 当一个函数返回它内部定义的一个函数时，就产生了一个闭包，闭包不但包括被返回的函数，还包括这个函数的定义环境
 *
 * 闭包的用途：
 *  1.实现嵌套的回调函数
 *  2.隐藏对象的细节 http://javascript.crockford.com/private.html
 *
 */


var sMessage = "hello world";

function sayHelloWorld() {
    console.log(sMessage);
}

sayHelloWorld();
//在上面这段代码中，脚本被载入内存后，并没有为函数 sayHelloWorld() 计算变量 sMessage 的值。
// 该函数捕获 sMessage 的值只是为了以后的使用，也就是说，解释程序知道在调用该函数时要检查 sMessage 的值。
// sMessage 将在函数调用 sayHelloWorld() 时（最后一行）被赋值，显示消息 "hello world"。

var iBaseNum = 10;

function addNum(iNum1, iNum2) {
    function doAdd() {
        return iNum1 + iNum2 + iBaseNum;
    }
    return doAdd();
}
//这里，函数 addNum() 包括函数 doAdd() （闭包）。
// 内部函数是一个闭包，因为它将获取外部函数的参数 iNum1 和 iNum2 以及全局变量 iBaseNum 的值。
// addNum() 的最后一步调用了 doAdd()，把两个参数和全局变量相加，并返回它们的和。
//这里要掌握的重要概念是，doAdd() 函数根本不接受参数，它使用的值是从执行环境中获取的。
//可以看到，闭包是 ECMAScript 中非常强大多用的一部分，可用于执行复杂的计算。
var generateClosure = function() {
    var count = 0;
    var get = function() {
        count ++;
        return count;
    };
    return get;
};

var counter1 = generateClosure();//闭包一：返回闭包一的运行环境
var counter2 = generateClosure();//闭包二：返回闭包二的运行环境
//闭包一、二分别属于不同的运行环境
console.log(counter1()); //  1
console.log(counter2()); //  1
console.log(counter1()); //  2
console.log(counter1()); //  3
console.log(counter2()); //  2