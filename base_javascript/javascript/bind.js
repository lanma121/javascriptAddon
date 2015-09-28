/**
 * Created by Administrator on 2015/8/4 0004.
 */


var someuser = {
    name: 'byvoid',
    func: function () {
        console.log(this.name);
    }
};

var foo = {
    name: 'foobar'
};

/**
 *
 * someuser.func.bind = function(self) {
      return this.call(self);
    };

   假设上面的函数是somouser.func的bind实现，函数体内this指向的是someuser.func,因为函数也是对象，所以this.call(self)的作用是以self作为this指针调用someuser.func
 * @type {function(this:{name: string})}
 */

func = someuser.func.bind(foo);//相当于 func = function() {return someuser.func.call(foo);}; 所以this对象指向foo,
func(); //  foobar

func2 = func.bind(someuser);//相对于 func2 = function(){return func.call(someuser)}
func2(); //  foobar