/*
* 首页的js
* */

//字符串变为数组
function getArray(string, type) {
    var arr = string.slice(4).split(type);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
    }
    return arr;
}

window.onload = function (ev) {
//    头部的点击导航的悬浮效果处理
    var oheaderNav = document.getElementsByClassName('header_nav')[0];
    oheaderNav.onclick = function (e) {
        var ev = event || e;
        if (ev.target.className == 'list') {
            var olists = ev.target.parentNode.children;
            for (var i = 0; i < olists.length; i++) {
                olists[i].className = 'list';
            }
            ev.target.className = 'list active';
            oheaderNav = '';
        }
    }

//官媒的 事件委托处理
    var ofixedOfficial = document.getElementsByClassName('fixed_official_hidden')[0];
    ofixedOfficial.onmousemove = function (e) {
        var ev = event || e;
        //所有的二维码隐藏
        if (ev.target.className == 'medie_icon') {
            var id = ev.target.id
            var oCodeObj = ev.target.parentNode.previousElementSibling;
            ev.target.parentNode.parentNode.style.overflow = 'visible ';
            oCodeObj.className = 'fixed_official_code';
            oCodeObj.style.display = 'none';
            switch (id) {
                case 'yixin':
                    oCodeObj.className = 'code_position_yixin fixed_official_code';
                    break;
                case 'weixin':
                    oCodeObj.className = 'code_position_weixin fixed_official_code';
                    break;
                case 'weibo':
                    oCodeObj.className = 'code_position_weibo fixed_official_code';
                    break;
                case 'tenxun':
                    oCodeObj.className = 'code_position_tenxun fixed_official_code';
                    break;
                case 'baidu':
                    oCodeObj.className = 'code_position_baidu fixed_official_code';
                    break;
                default:
                    break;
            }
            oCodeObj.style.display = 'block';
            //    离开的时候隐藏二维码
            ev.target.parentNode.onmouseleave = function (ev1) {
                oCodeObj.style.display = 'none';
                ev.target.parentNode.parentNode.style.overflow = 'hidden ';
            }
        } else if (ev.target.className == 'official_icon') {
            //    点击官媒的时候 向右滑动隐藏
            ev.target.onclick = function (e2) {
                var ev2 = event || e2;
                bMove(ev2.target.parentNode, {"right": -444}, function () {
                    ev2.target.parentNode.parentNode.style.display = 'none';
                });
            }
        }

    }
//    当点击默认的官媒的时候 滑出
    var orightMedia = document.getElementsByClassName('main_right_media')[0];
    orightMedia.onclick = function (e) {
        var ev = event || e;
        var ofixedOfficial = document.getElementsByClassName('fixed_official')[0];
        ofixedOfficial.style.display = 'block';
        bMove(ofixedOfficial.children[1], {"right": 0});
    }
//    新闻列表弹窗左的滑动出现
    var orightNews = document.getElementsByClassName('main_right_news')[0];
    orightNews.onclick = function (e) {
        var ev = event || e;
        var overhiddenNews = document.getElementsByClassName('fixed_overhidden_news')[0];
        overhiddenNews.parentNode.style.display = 'block';
        bMove(overhiddenNews, {"right": 0}, function () {
            orightNews = '';
        });
    }
    //    新闻列表弹窗右的滑动隐藏
    var onewsBottom = document.getElementsByClassName('news_bottom')[0];
    onewsBottom.onclick = function (e) {
        var ev = event || e;
        bMove(ev.target.parentNode, {"right": -317}, function () {
            ev.target.parentNode.parentNode.style.display = 'none';
            onewsBottom = '';
        });
    }
//    背景的渐变
    var oul = document.getElementsByClassName('main_con_ul')[0];
    var onavBall = document.getElementsByClassName('ball');
    var olis = oul.getElementsByTagName('li');
    //淡进与淡出功能的实现
    var index = 0;
    var setInter;

    setInter = setInterval(autoPlay, 6000);

    function autoPlay() {
        index++;
        index = (index >= olis.length) ? 0 : index;
        switchImg(index);
    }

    //
    function switchImg(index) {
        for (var i = 0; i < olis.length; i++) {
            bMove(olis[i], {
                "opacity": 0,
            });
            bMove(onavBall[i], {
                "opacity": 50
            });
        }
        bMove(olis[index], {
            "opacity": 100,
        });
        bMove(onavBall[index], {
            "opacity": 100
        });
    }

//    左侧导航的事件
    //点击事件
    for (var i = 0; i < onavBall.length; i++) {
        onavBall[i].onclick = (function (n) {
            return function () {
                clearInterval(setInter);
                switchImg(n);
                index = n;
                setInter = setInterval(autoPlay, 6000);
            }
        })(i);
    }
//    上一页 下一页翻页
    document.getElementsByClassName('main_right_switch')[0].onclick = function (ev) {
        var ev = event || ev;
        clearInterval(setInter);
        if (ev.target.className === 'switch_last') {
            index--;
            index = (index < 0) ? olis.length - 1 : index;
            switchImg(index);
        } else if (ev.target.className === 'switch_next') {
            index++;
            index = (index >= olis.length) ? 0 : index;
            switchImg(index);
        }
        setInter = setInterval(autoPlay, 6000);
    }
//
//    事件委托处理hover在页面里的操作
    var oconter = document.getElementsByClassName('top_weixin')[0];
    oconter.onmouseover = function (e) {
        var ev = event || e;
        var className = ev.target.className;
        if (className == 'refresh' || className == 'wei_logo') {
            var ochildren = ev.target.parentNode.children;
            for (var i = 0; i < ochildren.length; i++) {
                ochildren[i].style.backgroundColor = '#262626';
            }
            ev.target.style.backgroundColor = '#0f413e';
        } else if (className == 'weixinCode') {
            ev.target.style.opacity = 1;
        }
    }
//    首页的hover
    var indexOne = document.getElementsByClassName('index_1')[0];
    indexOne.onmouseover = function (e) {
        var ev = event || e;
        if (ev.target.className == 'now_btn') {
            var cr = r1 = getArray(getStyle(ev.target, 'color'), ',')[0] * 1;
            var cg = g1 = getArray(getStyle(ev.target, 'color'), ',')[1] * 1;
            var cb = b1 = getArray(getStyle(ev.target, 'color'), ',')[2] * 1;
            var br = r2 = getArray(getStyle(ev.target, 'backgroundColor'), ',')[0] * 1;
            var bg = g2 = getArray(getStyle(ev.target, 'backgroundColor'), ',')[1] * 1;
            var bb = b2 = getArray(getStyle(ev.target, 'backgroundColor'), ',')[2] * 1;
            var timer = setInterval(function () {
                if (cr < 27) {
                    cr++;
                }
                if (cg > 33) {
                    cg--;
                }
                if (cb > 29) {
                    cb--;
                }
                if (br < 255) {
                    br++;
                }
                if (bg < 246) {
                    bg++;
                }
                if (bb < 71) {
                    bb++;
                }
                ev.target.style.color = 'rgb(' + cr + ',' + cg + ',' + cb + ')';
                ev.target.style.backgroundColor = 'rgb(' + br + ',' + bg + ',' + bb + ')';
                if (cr == 27 && cg == 33 && cb == 29 && br == 255 && bg == 246 && bb == 71) {
                    clearInterval(timer);
                    ev.target.onmouseout = function (ev1) {
                        ev1.target.style.color = 'rgb(1,254,236)';
                        ev1.target.style.backgroundColor = 'rgb(28,33,37)';
                    }
                }
            }, 10);
        } else if (ev.target.className == 'video') {
            bMove(ev.target, {
                "opacity": 100,
            });
        }
    }
    // 第二页面的文案切换
    var flag2 = true, oindex2;
    var timer1 = setInterval(function () {
        console.log(1);
        var oswitch = document.getElementsByClassName('switch');
        for (var i = 0; i < 2; i++) {
            bMove(oswitch[i], {
                "opacity": 0,
            });
        }
        oindex2 = flag2 == true ? oswitch[0] : oswitch[1];
        bMove(oindex2, {"opacity": 100,}, function () {
            flag2 = !flag2;
        });
    }, 3000);

//    第四页面的文案切换
    // 第二页面的文案切换
    var flag4 = true, oindex4;
    var timer1 = setInterval(function () {
        var oswitch = document.getElementsByClassName('index4_switch');
        for (var i = 0; i < 2; i++) {
            bMove(oswitch[i], {
                "opacity": 0,
            });
        }
        oindex4 = flag4 == true ? oswitch[0] : oswitch[1];
        bMove(oindex4, {"opacity": 100,}, function () {
            flag4 = !flag4;
        });
    }, 3000);

//点击关闭 off
    var off = document.getElementsByClassName('off')[0];
    off.onclick = function (e) {
        var ev = event || e;
        ev.target.parentNode.parentNode.style.display = 'none';
        off = '';
    }
    //点击播放按钮开始
    var oplayVedio1 = document.getElementsByClassName('play_vedio_1')[0];
    var oplayVedio2 = document.getElementsByClassName('play_vedio_2')[0];
    var oplayVedio3 = document.getElementsByClassName('index_3_play')[0];
    var oplayVedio4 = document.getElementsByClassName('play_vedio_4')[0];
    var oplayVedio5 = document.getElementsByClassName('play_vedio_5')[0];
    var ovedioWindow = document.getElementById('video');
    oplayVedio1.onclick = function (e) {
        var ev = event || e;
        ovedioWindow.style.display = 'block';
    }
    oplayVedio2.onclick = function (e) {
        var ev = event || e;
        ovedioWindow.style.display = 'block';
    }
    oplayVedio3.onclick = function (e) {
        var ev = event || e;
        ovedioWindow.style.display = 'block';
    }
    oplayVedio4.onclick = function (e) {
        var ev = event || e;
        ovedioWindow.style.display = 'block';
    }
    oplayVedio5.onclick = function (e) {
        var ev = event || e;
        ovedioWindow.style.display = 'block';
    }
//    开始
    var onowBtn = document.getElementById('now_btn2');
    onowBtn.onmouseover = function (ev) {
        overBtn(onowBtn);
    }
    var onowBtn3 = document.getElementById('now_btn3');
    onowBtn3.onmouseover = function (ev) {
        overBtn(onowBtn3);
    }
    var onowBtn5 = document.getElementById('now_btn5');
    onowBtn5.onmouseover = function (ev) {
        overBtn(onowBtn5);
    }
    function overBtn(obj) {
        var cr = r1 = getArray(getStyle(obj, 'color'), ',')[0] * 1;
        var cg = g1 = getArray(getStyle(obj, 'color'), ',')[1] * 1;
        var cb = b1 = getArray(getStyle(obj, 'color'), ',')[2] * 1;
        var br = r2 = getArray(getStyle(obj, 'backgroundColor'), ',')[0] * 1;
        var bg = g2 = getArray(getStyle(obj, 'backgroundColor'), ',')[1] * 1;
        var bb = b2 = getArray(getStyle(obj, 'backgroundColor'), ',')[2] * 1;
        var timer1 = setInterval(function () {
            if (cr < 27) {
                cr++;
            }
            if (cg > 33) {
                cg--;
            }
            if (cb > 29) {
                cb--;
            }
            if (br < 255) {
                br++;
            }
            if (bg < 246) {
                bg++;
            }
            if (bb < 71) {
                bb++;
            }
            obj.style.color = 'rgb(' + cr + ',' + cg + ',' + cb + ')';
            obj.style.backgroundColor = 'rgb(' + br + ',' + bg + ',' + bb + ')';
            if (cr == 27 && cg == 33 && cb == 29 && br == 255 && bg == 246 && bb == 71) {
                clearInterval(timer1);
                onowBtn.onmouseout = function (ev1) {
                    ev1.target.style.color = 'rgb(1,254,236)';
                    ev1.target.style.backgroundColor = 'rgb(28,33,37)';
                }
            }
        }, 10);
    }

}
