/**
 * Created by Administrator on 2015/7/15 0015.
 */


/**
 *
 * interface Storage{
 *      readonly attribute unsigned long length;//属性，存储的数据长度
 *      DOMString? key(in unsigned long index);//按照顺序读取存储的值
 *      getter DOMString getItem(in DOMString key);//读取字符串，JSON
 *      setter creator void setItem(in DOMString key,in DOMString value);//存储字符串，JSON
 *      deleter void removeItem(in DOMString key);//删除一个key/value对。
 *      void clear();//删除所有键值对
 *
 * }
 *
 * 大小 5M
 * 安全方面：
 *  localStorage属于域内安全，localStorage 是基于域的，任何在该域内的所有页面都可以访问localStorage数据，但是各浏览器之间的数据是各自独立的，即在Firefox中存储的数据在chrome中山无法访问的
 *Storage 事件监听
 *  interface StorageEve: Event{
 *      readonly attribute DOMString key; //存储中的键名
 *      readonly attribute DOMString? oldValue;//数据更新前的键值
 *      readonly attribute DOMString? newValue;//数据更新后的键值，如果数据为新添加的，则oldValue属性值为null。
 *                                                               如果数据通过removeItem被删除，则newValue属性值为null.
 *                                                               如果Storage调用的是clear方法，则事件中的key、oldValue、newValue属性值都为null.
 *      readonly attribute DOMString url;      //url 属性记录Storage 事件发生时的源地址
 *      readonly attribute Storage? storageArea;//指向事件监听对应的Storage对象
 *      void initStorageEvent(
 *                  in DOMString typeArg,
 *                  in boolean canBubbleArg,
 *                  in boolean canCelableArg,
 *                  in DOMString keyArg,
 *                  in DOMString oldValueArg,
 *                  in DOMString newValueArg,
 *                  in DOMString urlArg,
 *                  in Storage storageAreaArg,
 *      );
 *  }
 *
 *  Storage 事件可以使用W3C 标准的注册事件方法addEventListener 进行注册监听，例如：
 *
 *      function showStorageEvent(e){
 *          console.log(e);
 *      }
 *      window.addEventListener("storage",showStorageEvent,true);
 *  对于事件变量e，是一个StorageEvent对象，提供了一些实用的属性，可以很好的观察键值对的变化:
 *      Property Type  Description
 *      key    String  The named key that was added, removed, or moddified
 *      oldValue Any   The previous value(now overwritten), or null if a new item was added
 *      newValue Any   The new value, or null if an item was added
 *      url/uri String The page that called the method that triggered this change
 *
 */


    if(window.localStorage){
        localStorage.setItem("name","xxxxxxxxxx");
        var name = localStorage.getItem("name");
        console.log(name);
        var name2 = localStorage.key(1);
        console.log(name2);
        var lenght = localStorage.length;
        console.log(lenght);
        localStorage.removeItem("name");
        console.log(localStorage.getItem("name"));
        var userData = {
            name:"DFDD",
            account:"dddd",
            level:1,
            disabled :true
        }

        localStorage.setItem("json",JSON.stringify(userData));
        var json = JSON.parse(localStorage.getItem("json"));
        console.log(json);
        localstorage.clear();
        console.log(JSON.parse(localStorage.getItem("json")));



        if(window.addEventListener){
            window.addEventListener("storage",handle_storage,false);
        }else if(window.attachEvent){
            window.attachEvent("onstorage",handle_storage);
        }
        function handle_storage(e){
            if(!e){e=window.event;}
            //showStorage();
        }


    }