/*
 * utils.js(v1.0)
 * desc：common methods of storage
 * create by Team on 2015/07/08
 */
var utils = {
    /*
     * listToArray：converts an array of classes into an array
     * @parameter：
     *   likeAry：An array of classes that need to be converted
     * @return：conversion completed array
     * by Team on 2015-07-08 11:33:00
     */
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[i] = likeAry[i];
            }
        }
        return ary;
    },
    /*
     * formatJSON：Converts the string of the JSON format to the JSON format
     * @parameter：
     *    jsonStr：JSON string
     * @return：JSON Object
     */
    formatJSON: function (jsonStr) {
        var jsonObj = null;
        try {
            jsonObj = JSON.parse(jsonStr);
        } catch (e) {
            jsonObj = eval("(" + jsonStr + ")");
        }
        return jsonObj;
    },
    /*
     * getWin：Gets the related property values for the entire page
     * @parameter：
     *    attr：property
     * @return：property-->value
     */
    getWin: function (attr) {
        return document.documentElement[attr] || document.body[attr];
    },
    /*
     * getCss：获取元素经过浏览器计算过的样式(不管写没写，不管写在哪，只要是渲染出来的都可以获取)
     * @parameter：
     *    curEle：当前要获取样式的这个元素
     *    attr：当前这个元素要获取样式的属性名称
     * @return：获取到的属性的值
     */
    getCss: function (curEle, attr) {
        var value = null, reg = /^(?:margin|padding|border|float|display|position|background|backgroundColor)$/;
        value = window.getComputedStyle ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
        value = reg.test(attr) ? value : parseFloat(value);
        return value;
    },
    /*
     * offset：获取当前元素距离body的(左/上)偏移量(不管它的父级参站物是谁)
     *        获取的是距离当前页面最左上角(我们的第一屏幕左上角)的偏移量
     * @parameter：
     *    curEle：当前要获取偏移量的这个元素
     * @return：
     *    Object-->包含了我们的左和上偏移量
     */
    offset: function (curEle) {
        var par = curEle.offsetParent, l = curEle.offsetLeft, t = curEle.offsetTop, reg = /MSIE 8\.0/;
        while (par) {
            l += par.offsetLeft;
            t += par.offsetTop;
            if (!reg.test(navigator.userAgent)) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            par = par.offsetParent;
        }
        return {left: l, top: t};
    }
};