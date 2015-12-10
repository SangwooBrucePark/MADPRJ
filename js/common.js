/**
 * Created by bruce on 2015-12-03.
 */
function doloadingscreen(enable) {
    if (enable) {
        id("loading").style.cssText += "visibility: visible;";
    } else {
        id("loading").style.cssText += "visibility: hidden;";
    }
}

function logout() {
    doloadingscreen(true);
    ajax_datatrans("../php/letmeout.php", "", logout_callback);
}

function logout_callback(responseText) {
    doloadingscreen(false);

    var logout_result = JSON.parse(responseText);
    if (logout_result.result == "ok") {
        delCookie("login");
        delCookie("email");
        delCookie("fname");
        delCookie("lname");
        delCookie("phonenumber");
        delCookie("PHPSESSID");

        location.href = "home.html";
    } else {
        alert(logout_result.reason)
    }
}

function isLogin() {
    return getCookie("login") == "on";
}

function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
            zero += '0';
    }

    return zero + n;
}

function messagebox(msg, width, height, ok_callback) {
    id("messagebox").style.cssText += "visibility: visible;";
    id("messagebox").style.cssText += "width: " + width + "px;";
    id("messagebox").style.cssText += "height: " + height + "px;";
    id("messagebox").style.cssText += "background: linear-gradient(to top, #d0d0d0, #ffffff);";

    id("blocking").style.cssText += "visibility: visible;";

    id("messagebox").innerHTML = "<table style=\"height: 100%; width: 100%;\"><tr><td style=\"width: 100%; height: 100%; word-break: break-all; font-family: Abel; text-align: center;\">" + msg + "</td></tr><tr><td style=\"text-align: center;\"><button id=\"messagebox_ok_button\" type=\"button\" onclick=\"" + ok_callback + "()\" style=\"width: 100px; font-size: 20px; font-family: Abel;\">OK</button></td></tr></table>";
    id("messagebox_ok_button").focus();
}

function hidemessagebox() {
    id("messagebox").style.cssText = "visibility: hidden;";
    id("blocking").style.cssText = "visibiltity: hidden;";
}

function menubar_items(welcome, myinfo, home, history, logout, signup, login) {
    var menubar_items_html = "<tr>";

    if (welcome) menubar_items_html += "<td>Hi, " + getCookie("fname") + " " + getCookie("lname") + "</td>";
    if (myinfo) menubar_items_html += "<td><a href=\"myinfo.html\">MY INFO</a></td>";
    if (home) menubar_items_html += "<td><a href=\"home.html\">HOME</a></td>";
    if (history) menubar_items_html += "<td><a href=\"history.html\">HISTORY</a></td>";
    if (logout) menubar_items_html += "<td><a href=\"#\" onclick=\"logout()\">LOGOUT</a></td>";
    if (signup) menubar_items_html += "<td><a href=\"signup.html\">SIGNUP</a></td>";
    if (login) menubar_items_html += "<td><a href=\"#\" onclick=\"showloginwindow(true)\">LOGIN</a></td>";

    menubar_items_html += "</tr>";

    id("menubar_items").innerHTML = menubar_items_html;
}

function getClientWidth() {
    var ret;

    if (self.innerHeight) {     // IE 외 모든 브라우저
        ret = self.innerWidth;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict
        ret = document.documentElement.clientWidth;
    } else if (document.body) {     // IE Browser
        ret = document.body.clientWidth;
    }

    return ret;
}

function b64(msg) {
    return btoa(msg);
}