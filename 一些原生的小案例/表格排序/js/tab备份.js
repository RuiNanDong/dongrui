~function () {
    //1、get elements
    var oTab = document.getElementById("tab");
    var tHead = oTab.tHead;
    var tBody = oTab.tBodies[0];
    var oThs = tHead.getElementsByTagName("th");
    var oRows = tBody.rows;
    var tabChecks = document.getElementsByName("tabCheck");

    //2、bind data
    var data = utils.formatJSON(jsonStr);
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var curData = data[i];
        var oTr = document.createElement("tr");
        oTr.innerHTML += "<td><input type='checkbox' name='tabCheck'/></td>";
        for (var key in curData) {
            oTr.innerHTML += "<td>" + curData[key] + "</td>";
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);

    //3、change color
    changeBg();
    function changeBg() {
        for (var i = 0; i < oRows.length; i++) {
            var oRow = oRows[i];
            oRow.className = oRow.zhuFeng = i % 2 !== 0 ? "even" : "";
        }
    }

    //4、mouse over change color
    for (var i = 0; i < oRows.length; i++) {
        oRows[i].onmouseover = function () {
            this.className = "hover";
        }
        oRows[i].onmouseout = function () {
            this.className = this.zhuFeng;
        }
    }

    //5、table sort
    for (var i = 0; i < oThs.length; i++) {
        var oTh = oThs[i];
        if (oTh.className.indexOf("cursor") >= 0) {
            oTh.onclick = (function (i) {
                return function () {
                    //1)将存储所有的行的类数组转换为数组
                    var oRowsAry = utils.listToArray(oRows);

                    //2)数组调用sort方法进行排序:获取数组中每一行当前列中的内容,判断是否为数字，是数字的话我们用"-"进行排序，不是数组用localeCompare进行排序
                    oRowsAry.sort(function (a, b) {
                        var aIn = a.cells[i].innerHTML;
                        var bIn = b.cells[i].innerHTML;
                        var aInNum = parseFloat(aIn);
                        var bInNum = parseFloat(bIn);
                        if (!isNaN(aInNum) && !isNaN(bInNum)) {
                            return aInNum - bInNum;
                        } else {
                            return aIn.localeCompare(bIn);
                        }
                    });

                    //3)每一次排完序后，给当前列加一个自定义属性记录当前排序的方式(asc是升序,desc是降序) 第一次点击的时候还没有自定义属性，this.sortType的值是undefined，我们执行else，让自定义属性的值为asc;第二次点击的时候，this.sortType="asc"，我们执行if，让this.sortType=="desc"，并且把数组倒过来排列;第三次点击的时候，this.sortType="desc"，我们执行else，让他变成"asc"....
                    if (this.sortType === "asc") {
                        oRowsAry.reverse();
                        this.sortType = "desc";
                    } else {
                        this.sortType = "asc";
                    }

                    //4)把排好序的数组中的每一项依次的重新添加到我们的tBody中，这样在页面上就看到了我们的最新效果
                    var frg = document.createDocumentFragment();
                    for (var j = 0; j < oRowsAry.length; j++) {
                        frg.appendChild(oRowsAry[j]);
                    }
                    tBody.appendChild(frg);

                    //5)排完序后，按照最新的顺序重新的设置隔行变色
                    changeBg();
                }
            })(i);
        }
    }

    //6、select all
    for (var i = 0; i < tabChecks.length; i++) {
        tabChecks[i].index = i;
        tabChecks[i].onclick = function () {
            if (this.index === 0) {
                //第一个复选框点击：让除第一个以外复选框的选中状态和我们的第一个的选中状态保持一致
                for (var j = 1; j < tabChecks.length; j++) {
                    tabChecks[j].checked = this.checked;
                }
            } else {
                //非第一个复选框点击：判断当前除了第一个复选框以外的是否都选中，都选中的话，我们让第一个也跟着选中，只要有一个没有选中，我就让第一个不选中
                var flag = true;//假设除第一个以外的都选中了
                //循环除第一个以外的所有的复选框
                for (var j = 1; j < tabChecks.length; j++) {
                    //只要有一个没有选中，说明我们假设的是错误的，我们让flag=false
                    if (tabChecks[j].checked === false) {
                        flag = false;
                        break;
                    }
                }
                tabChecks[0].checked = flag;
            }
        }
    }
}();

//思考：把它改成单例模式?
















































