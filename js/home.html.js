/**
 * Created by bruce on 2015-12-01.
 */

var requestnumofcategoriesURL = "../php/getnumofcategories.php";
var requestnumofmembersURL = "../php/getnumofmembers.php";
var requestnumofquestionsURL = "../php/getnumofquestions.php";

function onload_proc() {
    setUserNameOnPage();
    setGraphicalElements();
    updatemonitor();
}

function onresize_proc() {
    setGraphicalElements();
}

function setGraphicalElements() {
    if (window.innerHeight * 1.7 < window.innerWidth) {
        id("background_screen").style.cssText += "background-size: " + window.innerWidth + "px auto;";
    } else {
        id("background_screen").style.cssText += "background-size: auto " + window.innerHeight + "px;";
    }
}

function login() {
    ajax_datatrans(id("form_auth_info").action, "p=" + b64(json_serialize("form_auth_info")), login_callback);
    doloadingscreen(true);
}

function login_callback(responseText) {
    doloadingscreen(false);

    var login_result = JSON.parse(responseText);

    if (login_result.result == "ok") {
        setCookie("login", "on");
        setCookie("email", login_result.email);
        setCookie("fname", login_result.fname);
        setCookie("lname", login_result.lname);
        setCookie("phonenumber", login_result.phonenumber);

        setUserNameOnPage();
        showloginwindow(false);
        showstartbutton(true);
    } else {
        messagebox(login_result.reason, 300, 100, "loginerror_callback");
    }
}

function loginerror_callback() {
    hidemessagebox();
    id("login_email").focus();
}

function setUserNameOnPage() {
    if (isLogin()) {
        menubar_items(true, true, false, true, true, false, false);
    } else {
        menubar_items(false, false, false, false, false, true, true);
    }

    showstartbutton(isLogin());
}

function login_cancel() {
    id("login_window").style.cssText = "visibility: hidden;";
}

function showloginwindow(enable) {
    if (enable) {
        id("login_window").style.cssText = "visibility: visible;";
    } else {
        id("login_window").style.cssText = "visibility: hidden;";
    }
}

function showstartbutton(enable) {
    if (enable) {
        id("starttest").style.cssText += "visibility: visible;";
    } else {
        id("starttest").style.cssText += "visibility: hidden;";
    }
}

function showmonitorloading(enable) {
    if (enable) {
        id("monitor_loading").style.cssText = "visibility: visible;";
    } else {
        id("monitor_loading").style.cssText = "visibility: hidden;";
    }
}

function updatemonitor() {
    showmonitorloading(true);
    ajax_datatrans(requestnumofcategoriesURL, "", updatenumofcategories_callback);

}

function updatenumofmembers_callback(responseText) {
    showmonitorloading(false);
    var retval = JSON.parse(responseText);

    if (retval.result == "ok") {
        id("nummembers_val").innerHTML = retval.members;
    } else {
        alert(retval.reason);
    }
}

function updatenumofcategories_callback(responseText) {
    var retval = JSON.parse(responseText);

    if (retval.result == "ok") {
        id("numcategories_val").innerHTML = retval.categories;
        ajax_datatrans(requestnumofquestionsURL, "", updatenumofquestions_callback);
    } else {
        alert(retval.reason);
    }
}

function updatenumofquestions_callback(responseText) {
    var retval = JSON.parse(responseText);

    if (retval.result == "ok") {
        id("numquestions_val").innerHTML = retval.questions;
        ajax_datatrans(requestnumofmembersURL, "", updatenumofmembers_callback);
    } else {
        alert(retval.reason);
    }
}

function passwordkeydown(event) {
    if(event.keyCode == 13) {
        login();
    }
}

