var loginBtn = document.getElementById("loginBtn");
var loginLayer = document.getElementById("loginLayer");
var login = document.getElementById("login");
var loginClose = document.getElementById("loginClose");
var loginTop = document.getElementById("loginTop");

utils.setGroupCss(login, {
    left: (utils.getWin("clientWidth") - utils.getCss(login, "width")) / 2,
    top: (utils.getWin("clientHeight") - utils.getCss(login, "height")) / 2
});

//显示登陆
loginBtn.onclick = function (e) {
    e = e || window.event;
    loginLayer.style.display = "block";
    login.style.display = "block";
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
};

//关闭登陆
loginClose.onclick = function (e) {
    e = e || window.event;
    loginLayer.style.display = "none";
    login.style.display = "none";
};

//拖拽

loginTop.onmousedown = down;

function down(e) {
    e = e || window.event;
    login.mL = utils.getCss(login, "left");
    login.mT = utils.getCss(login, "top");
    login.mX = e.clientX;
    login.mY = e.clientY;

    //当拖拽太快的时候，鼠标焦点丢失
    //如果支持setCapture我们把当前拖拽的元素和鼠标绑在一起(setCapture)，如果不支持的话，我们把事件绑定给我们的document即可
    if (this.setCapture) {
        this.setCapture();
        this.onmousemove = move;
        this.onmouseup = up;
    } else {
        //目前move和up中的this不是loginTop了，而是document了，所以我们需要解决
        //document.onmousemove = move;
        //document.onmouseup = up;

        var that = this;
        document.onmousemove = function (e) {
            move.call(that, e);
        };
        document.onmouseup = function (e) {
            up.call(that, e);
        };
    }
}

function move(e) {
    e = e || window.event;
    var curL = login.mL + (e.clientX - login.mX);
    var curT = login.mT + (e.clientY - login.mY);

    //设置边界
    var tarL = 0, tarT = 0;
    var tarR = utils.getWin("clientWidth") - login.offsetWidth;
    var tarB = utils.getWin("clientHeight") - login.offsetHeight;

    if (curL <= tarL) {
        utils.setCss(login, "left", tarL);
    } else if (curL >= tarR) {
        utils.setCss(login, "left", tarR);
    } else {
        utils.setCss(login, "left", curL);
    }

    if (curT <= tarT) {
        utils.setCss(login, "top", tarT);
    } else if (curT >= tarB) {
        utils.setCss(login, "top", tarB);
    } else {
        utils.setCss(login, "top", curT);
    }
}

function up(e) {
    e = e || window.event;
    if (this.releaseCapture) {
        this.releaseCapture();
        this.onmousemove = null;
        this.onmouseup = null;
    } else {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}











