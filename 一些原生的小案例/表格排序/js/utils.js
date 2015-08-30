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
    }
};