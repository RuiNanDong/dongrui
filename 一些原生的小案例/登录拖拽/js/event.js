function bind(curEle, eventType, eventFn) {
    if (document.addEventListener) {
        curEle.addEventListener(eventType, eventFn, false);
        return;
    }
    var tempFn = function (e) {
        eventFn.call(curEle, e);
    };
    tempFn.photo = eventFn;
    !curEle["my" + eventType] ? curEle["my" + eventType] = [] : void 0;
    var ary = curEle["my" + eventType];
    for (var i = 0; i < ary.length; i++) {
        var cur = ary[i];
        if (cur.photo === eventFn) {
            return;
        }
    }
    curEle["my" + eventType].push(tempFn);
    curEle.attachEvent("on" + eventType, tempFn);
}

function unbind(curEle, eventType, eventFn) {
    if (document.removeEventListener) {
        curEle.removeEventListener(eventType, eventFn, false);
        return;
    }
    var ary = curEle["my" + eventType];
    for (var i = 0; i < ary.length; i++) {
        var cur = ary[i];
        if (cur.photo === eventFn) {
            curEle.detachEvent("on" + eventType, cur);
            ary[i] = ary[ary.length - 1];
            ary.length -= 1;
            break;
        }
    }
}


/*
 * curEle：要绑定事件的元素
 * eventType：事件类型
 * eventFn：要绑定的方法
 */
//function bind(curEle, eventType, eventFn) {
//    if (document.addEventListener) {
//        curEle.addEventListener(eventType, eventFn, false);
//        return;
//    }
//
//    if (!curEle["my" + eventType]) {
//        curEle["my" + eventType] = [];
//    }
//    //相当于给我们的eventFn这个方法化了个妆，但是我还要把化妆前的照片贴脸上，这样在删除的时候，我们才可以知道化妆前是谁
//    var tempFn = function () {
//        eventFn.call(curEle);
//    }
//    tempFn.photo = eventFn;
//    //在存储之前我还要判断之前是否存储过了，如果存储过了，我们就不在存了-->解决重复的问题
//    var ary = curEle["my" + eventType];
//    for (var i = 0; i < ary.length; i++) {
//        var cur = ary[i];
//        if (cur.photo === eventFn) {
//            return;
//        }
//    }
//    curEle["my" + eventType].push(tempFn);
//    curEle.attachEvent("on" + eventType, tempFn);
//    //curEle.attachEvent("on" + eventType, eventFn.call(curEle)); 这样写不行，我们应该绑定的是eventFn这个方法，但是这里面相当于把eventFn这个方法执行的返回结果绑定给事件了
//    //curEle.attachEvent("on" + eventType, function(){
//    //    eventFn.call(curEle);
//    //});//这样也不行，虽然绑定的是也方法，但是是匿名的，移除的时候我们不知道该移除谁了
//}
//
//function unbind(curEle, eventType, eventFn) {
//    if (document.removeEventListener) {
//        curEle.removeEventListener(eventType, eventFn, false);
//        return;
//    }
//    var ary = curEle["my" + eventType];
//    for (var i = 0; i < ary.length; i++) {
//        var cur = ary[i];
//        if (cur.photo === eventFn) {
//            curEle.detachEvent("on" + eventType, cur);
//
//            //千万不要忘记移除方法后，在存储的数组中把这个多余的也删除掉
//            ary[i] = ary[ary.length - 1];
//            ary.length -= 1;
//            break;
//        }
//    }快
//}


//事件队列：给一个元素绑定多个事件，根据绑定的顺序，依次的把对应的方法放入一个容器中，这个容器就可以理解为我们的事件队列

//attachEvent和addEventListener区别：
//1、顺序问题：如果使用addEventListener给某个元素绑定多个事件方法，在触发元素事件时候，事件队列中的方法是按照绑定的先后顺序依次的执行的，而attachEvent绑定的方法，在执行的时候顺序是混乱的
//2、重复问题：addEventListener是不能给一个元素的同一个事件类型绑定多个相同的方法的，而attachEvent可以
//3、this问题：用addEventListener给一个元素的事件绑定方法，当rt发这个事件执行对应方法的时候，方法中的this是当前的元素，而用attachEvent绑定的那个方法中的this是window