/**
 * Created by bruce on 2015-12-02.
 */
function onload_proc() {
    setGraphicalElements();
    menubar_items(false, false, true, false, false, false, false);
}

function onresize_proc() {
    setGraphicalElements();
}

function setGraphicalElements() {
    if (window.innerWidth > 1000) {
        if (window.innerHeight * 1.7 < window.innerWidth) {
            id("background_screen").style.cssText += "background-size: " + window.innerWidth + "px auto;";
        } else {
            id("background_screen").style.cssText += "background-size: auto " + window.innerHeight + "px;";
        }
    }
}

function matchnewpassword() {
    if (id("newpassword").value == id("cpassword").value) {
        id("newpassword").style.cssText += "box-shadow: 0px 0px 20px #00ff00;";
        id("newpassword").style.cssText += "background-color: #00ff00;";
        id("cpassword").style.cssText += "box-shadow: 0px 0px 20px #00ff00;";
        id("cpassword").style.cssText += "background-color: #00ff00;";
    } else {
        id("newpassword").style.cssText += "box-shadow: 0px 0px 20px #ff0000;";
        id("newpassword").style.cssText += "background-color: #ff0000;";
        id("cpassword").style.cssText += "box-shadow: 0px 0px 20px #ff0000;";
        id("cpassword").style.cssText += "background-color: #ff0000;";
    }
}

function setfieldclear() {
    id("newpassword").style.removeProperty("box-shadow");
    id("cpassword").style.removeProperty("box-shadow");
}

var login_info = {"email":"", "password":""};

function submitsignup() {
    if (id("newpassword").value != id("cpassword").value) {
        messagebox("Invalid passwords!!!", 300, 100, "hidemessagebox");
        return;
    }

    doloadingscreen(true);

    login_info.email = id("email").value;
    login_info.password = id("newpassword").value;

    var p = json_serialize("signininfo");
    var url = id("signininfo").action;
    ajax_datatrans(url, "p=" + btoa(p), submitsignup_callback);
}

function submitsignup_callback(responseText) {
    doloadingscreen(false);

    var retval = JSON.parse(responseText);
    if (retval.result == "ok") {
        messagebox("Signup is successful!!<br />Login will be automatically committed.", 500, 200, "login");
    } else {
        messagebox("Signin is failed." + result.reason, 500, 200, "hidemessagebox");
    }
}

function login() {
    hidemessagebox();
    doloadingscreen(true);
    ajax_datatrans("../php/letmein.php", "p=" + btoa(JSON.stringify(login_info)), login_callback);
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

        location.href = "home.html";
    } else {
        messagebox(login_result.reason, 350, 150, "hidemessagebox");
    }
}