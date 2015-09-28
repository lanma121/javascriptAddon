/**
 * Created by Administrator on 2015/6/9 0009.
 *
 * js 日期格式化
 *
 * @authot ： liuzhentao
 *
 */


Date.prototype.Format = function(format){
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var map = {
        "y": this.getFullYear(),//年
        "M": this.getMonth() + 1, //月份
        "d": this.getDate(), //日
        "h": this.getHours(), //小时
        "m": this.getMinutes(), //分
        "s": this.getSeconds(), //秒
        "q": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds(), //毫秒
        "w": weekday[this.getDay()]//星期
    };

    console.log(format);
    format = format.replace(/([yMdhmsqwS])+/g, function(all, t){
        var v = map[t];
        console.log(t+"-------------------"+v+"---------------"+all+"   "+all.length);
        if(v){
            if(t === 'y'){
                return (v+"").substr(4 - all.length);
            }
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        return all;
    });
    console.log(format);
    return format;
}

////示例：
//document.write( new Date().Format("yyyy-MM-dd hh:mm:ss")+"</br>");
//document.write( new Date().Format("yyyy年MM月dd日hh小时mm分ss秒")+"</br>");
//document.write(new Date().Format("yyyy年MM月dd日")+"</br>");
//document.write(new Date().Format("MM/dd/yyyy")+"</br>");
//document.write(new Date().Format("yyyy MM dd")+"</br>");
//document.write(new Date().Format("yyyy-MM-dd hh:mm:ss q")+"</br>");
//document.write(new Date().Format("yyyy-MM-dd hh:mm:ss w")+"</br>");