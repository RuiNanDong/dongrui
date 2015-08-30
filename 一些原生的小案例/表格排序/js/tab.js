var tabRender = (function () {
    var oTab = document.getElementById("tab");
    var tHead = oTab.tHead;
    var tBody = oTab.tBodies[0];
    var oThs = tHead.getElementsByTagName("th");
    var oRows = tBody.rows;
    var tabChecks = document.getElementsByName("tabCheck");

    return {
        appendData: function (data) {
            data = data || [];
            var frg = document.createDocumentFragment();
            for (var i = 0; i < data.length; i++) {
                frg.appendChild(data[i]);
            }
            tBody.appendChild(frg);
        },
        bindData: function (data) {
            data = data || [];
            var ary = [];
            for (var i = 0; i < data.length; i++) {
                var curData = data[i];
                var oTr = document.createElement("tr");
                oTr.innerHTML += "<td><input type='checkbox' name='tabCheck'/></td>";
                for (var key in curData) {
                    oTr.innerHTML += "<td>" + curData[key] + "</td>";
                }
                ary.push(oTr);
            }
            this.appendData(ary);
        },
        change: function (isEv) {
            isEv = isEv || false;//是否需要绑定鼠标划过事件
            for (var i = 0; i < oRows.length; i++) {
                var oRow = oRows[i];
                oRow.className = oRow.zhuFeng = i % 2 !== 0 ? "even" : "";
                if (isEv) {
                    oRow.onmouseover = function () {
                        this.className = "hover";
                    }
                    oRow.onmouseout = function () {
                        this.className = this.zhuFeng;
                    }
                }
            }
        },
        sortEvent: function () {
            var that = this;
            for (var i = 0; i < oThs.length; i++) {
                if (oThs[i].className.indexOf("cursor") >= 0) {
                    oThs[i].onclick = (function (i) {
                        return function () {
                            var oRowsAry = utils.listToArray(oRows);
                            oRowsAry.sort(function (a, b) {
                                var aIn = a.cells[i].innerHTML;
                                var bIn = b.cells[i].innerHTML;
                                var aInNum = parseFloat(aIn);
                                var bInNum = parseFloat(bIn)
                                if (!isNaN(aInNum) && !isNaN(bInNum)) {
                                    return aInNum - bInNum;
                                } else {
                                    return aIn.localeCompare(bIn);
                                }
                            });
                            this.sortType === "asc" ? (oRowsAry.reverse(), this.sortType = "desc") : this.sortType = "asc";
                            that.appendData(oRowsAry);
                            that.change();
                        }
                    })(i);
                }
            }
        },
        selectAll: function () {
            for (var i = 0; i < tabChecks.length; i++) {
                tabChecks[i].index = i;
                tabChecks[i].onclick = function () {
                    if (this.index === 0) {
                        for (var j = 1; j < tabChecks.length; j++) {
                            tabChecks[j].checked = this.checked;
                        }
                        return;
                    }
                    var flag = true;
                    for (var j = 1; j < tabChecks.length; j++) {
                        if (tabChecks[j].checked === false) {
                            flag = false;
                            break;
                        }
                    }
                    tabChecks[0].checked = flag;
                }
            }
        },
        init: function (options) {
            var data = utils.formatJSON(options.data);
            this.bindData(data);
            this.change(true);
            this.sortEvent();
            this.selectAll();
        }
    };
})();

tabRender.init({
    data: jsonStr
});














































