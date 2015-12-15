/**
 * Created by bruce on 2015-12-01.
 */

var requestnumofcategoriesURL = "../libs/ctrl.php?action=getnumofcategories";
var requestnumofmembersURL = "../libs/ctrl.php?action=getnumofmembers";
var requestnumofquestionsURL = "../libs/ctrl.php?action=getnumofquestions";

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
        messagebox(login_result.reason, 400, 150, "loginerror_callback");
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
}

function login_cancel() {
    id("login_window").style.cssText = "visibility: hidden;";
}

function showloginwindow(enable) {
    if (enable) {
        id("login_window").style.cssText = "visibility: visible;";
        id("login_window").style.cssText += "animation-name: anipopup;";
        id("login_window").style.cssText += "animation-duration: 1s;";
        id("login_email").focus();
    } else {
        id("login_window").style.cssText = "visibility: hidden;";
        id("login_window").style.removeProperty("animation-name");
        id("login_window").style.removeProperty("animation-duration");
    }
}

function showstartbutton(enable) {
    if (enable) {
        id("starttest").style.cssText += "visibility: visible;";
        id("starttest").style.cssText += "animation-name: anipopup;";
        id("starttest").style.cssText += "animation-duration: 2s;";
        id("starttest").focus();
    } else {
        id("starttest").style.cssText += "visibility: hidden;";
        id("starttest").style.removeProperty("animation-name");
        id("starttest").style.removeProperty("animation-duration");
    }
}

function showmonitorloading(enable) {
    if (enable) {
        //id("monitor_loading").style.cssText = "visibility: visible;";
    } else {
        id("monitor_loading").style.cssText = "visibility: hidden;";
    }
}

var monitorvalue = {"categories":"", "members":"", "questions":""};
function updatemonitor() {
    showmonitorloading(true);
    ajax_datatrans(requestnumofcategoriesURL, "", updatenumofcategories_callback);

}

function updatenumofmembers_callback(responseText) {
    showmonitorloading(false);
    var retval = JSON.parse(responseText);

    if (retval.result == "ok") {
        monitorvalue.members = retval.members;
        showupdatemonitorvalue();
        //id("nummembers_val").innerHTML = retval.members;
    } else {
        alert(retval.reason);
    }
}

function updatenumofcategories_callback(responseText) {
    var retval = JSON.parse(responseText);

    if (retval.result == "ok") {
        monitorvalue.categories = retval.categories;
        //id("numcategories_val").innerHTML = retval.categories;
        ajax_datatrans(requestnumofquestionsURL, "", updatenumofquestions_callback);
    } else {
        alert(retval.reason);
    }
}

function updatenumofquestions_callback(responseText) {
    var retval = JSON.parse(responseText);

    if (retval.result == "ok") {
        monitorvalue.questions = retval.questions;
        //id("numquestions_val").innerHTML = retval.questions;
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

function showupdatemonitorvalue() {
    id("numcategories_text_block").style.cssText += "visibility: visible;";
    id("numcategories_text_block").style.cssText += "animation-name: monanipopup;";
    id("numcategories_text_block").style.cssText += "animation-duration: 2s;";
    id("numcategories_val").innerHTML = monitorvalue.categories;
    id("numquestions_text_block").style.cssText += "visibility: visible;";
    id("numquestions_text_block").style.cssText += "animation-name: monanipopup;";
    id("numquestions_text_block").style.cssText += "animation-duration: 2s;";
    id("numquestions_val").innerHTML = monitorvalue.questions;
    id("nummembers_text_block").style.cssText += "visibility: visible;";
    id("nummembers_text_block").style.cssText += "animation-name: monanipopup;";
    id("nummembers_text_block").style.cssText += "animation-duration: 2s;";
    id("nummembers_val").innerHTML = monitorvalue.members;
}
