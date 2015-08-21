/**
 * Created by Administrator on 2015/8/4 0004.
 */
/**
 * 闭包：
 * 当一个函数返回它内部定义的一个函数时，就产生了一个闭包，闭包不但包括被返回的函数，还包括这个函数的定义环境
 *
 * 闭包的用途：
 *  1.实现嵌套的回调函数
 *  2.隐藏对象的细节 http://javascript.crockford.com/private.html
 *
 */



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