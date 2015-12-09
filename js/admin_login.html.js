/**
 * Created by bruce on 2015-12-06.
 */

var requestLoginURL = "../php/admin_letmein.php";

function login() {
    showloading(true);
    var logininfo = {"email":id("email").value, "password":id("password").value};
    ajax_datatrans(requestLoginURL, "p=" + btoa(JSON.stringify(logininfo)), login_callback);
}

function login_callback(responseText) {
    showloading(false);
    var retval = JSON.parse(responseText);
    if (retval.result == "ok") {
        location.href = "admin_main.html";
    } else {
        alert(retval.reason);
    }
}
