/**
 * Created by Administrator on 2015/6/16 0016.
 *
 * clipboardData 对象 只支持IE
    1.clearData(sDataFormat) 删除剪贴板中指定格式的数据。
    2.getData(sDataFormat) 从剪贴板获取指定格式的数据。
    3.setData(sDataFormat, sData) 给剪贴板赋予指定格式的数据。返回 true 表示操作成功。
 */
//只支持IE
function copyinfo(obj) {
    var testCode = obj.value;
    window.clipboardData.setData('Text', testCode);
    alert("邀请链接已经复制到粘贴板，你可以使用Ctrl+V 转发给亲朋好友了！  ");
    alert(window.clipboardData.getData('Text'));
}

