/**
 * Created by bruce on 2015-11-26.
 */
function login() {
    var uid = document.getElementById("uid");
    var password = document.getElementById("password");

    var uid_and_password = "{\"uid\":\"" + uid.value + "\",\"password\":\"" + password.value + "\"}";
    alert(uid_and_password);
}

function login_callback(e) {
    alert(e);
}

function onpageload() {
    var div_background = document.getElementById("background");
    div_background.style.width = window.outerWidth + "px";
    div_background.style.height = window.outerHeight + "px";

    var div_bottom_bar = document.getElementById("bottom_bar");
    div_bottom_bar.style.top = window.innerHeight - 60 + "px";

    var div_blockscreen = document.getElementById("blockscreen");
    div_blockscreen.style.width = window.outerWidth + "px";
    div_blockscreen.style.height = window.outerHeight + "px";
}

function showlogin() {
    var div_blockscreen = document.getElementById("blockscreen");
    div_blockscreen.style.visibility = "visible";

    var div_loginbox = document.getElementById("loginbox");
    div_loginbox.style.visibility = "visible";
}

function hideloginbox() {
    var div_blockscreen = document.getElementById("blockscreen");
    div_blockscreen.style.visibility = "hidden";

    var div_loginbox = document.getElementById("loginbox");
    div_loginbox.style.visibility = "hidden";
}

