/**
 * Created by Administrator on 2015/8/4 0004.
 */


/**
 * js对象分为三类：
 *  用户创建的对象 ，  {}
 *  构造函数对象 Fucntion.prototype
 *  原型对象    Object.prototype
 *
 * 以上三类都有一个 __proto__属性，他指向该对象的原型
 *
 *
 *
 * js 没有类的概念，对象由对象实例化，
 *  基于类的语言中，类就像一个模具；对象由这个模具浇注产生，
 *  而基于原型的语言中，原型像一件艺术品，我们通过一台100%机器复制出很多份
 *
 *  使用原型与构造函数的不同
 *     1.构造函数内定义的属性继承方式与原型不同，子对象需要显式调用父对象才能继承构造函数内定义的属性；
 *     2.构造函数内定义的任何属性，包括函数在内都会被充分创建，同一个构造函数产生的两个对象不共享实例；
 *     3.构造函数内定义的函数，有运行时的闭包开销，因为构造函数内的局部变量对其中定义的函数来说也是可见的。
 *
 *  注： 除非必须用构造函数闭包，否则尽量用原型定义成员函数，因为这样可以减少开支
 *       尽量在构造函数定义一般成员，尤其是对象或者数组，因为用原型定义的成员是多个实例共享的
 *
 */

function Foo() {
    var innerVar = 'hello';
    this.prop1 = 'BYVoid';
    this.func1 = function(){//有闭包开销
        innerVar = '';
    };
}
Foo.prototype.prop2 = 'Carbo';//多个对象属性共享
Foo.prototype.func2 = function () {
    console.log(this.prop2);
}
var foo1 = new Foo();
var foo2 = new Foo();

console.log(foo1.func1 == foo2.func1); //  false
console.log(foo1.func2 == foo2.func2); //  true 属性共享



Object.prototype.name = 'My Object';
Foo.prototype.name = 'Bar';
var obj = new Object();
    obj.name = "FSF";
var foo = new Foo();
console.log(obj.name); //  My Object
console.log(obj.__proto__.name); //  My Object
console.log(foo.name); //  Bar
console.log(foo.__proto__.name); //  Bar
console.log(foo.__proto__.__proto__.name); //  My Object