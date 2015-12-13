/**
 * Created by bruce on 2015-12-05.
 */

var requestModifyURL = "../libs/ctrl.php?action=modifyuserinfo";
var requestPasswordURL = "../libs/ctrl.php?action=modifypassword";

function onload_proc() {
    if (!isLogin()) {
        location.href = "home.html";
    }

    menubar_items(true, false, true, true, true, false, false);
    setGraphicalElements();
    initUserInfo();
}

function onresize_proc() {
    setGraphicalElements();
}

function setGraphicalElements() {
    if (window.innerHeight * 2 < window.innerWidth) {
        id("background_screen_img").style.cssText += "width: " + window.innerWidth + "px;";
        id("background_screen_img").style.cssText += "height: auto;";
    } else {
        id("background_screen_img").style.cssText += "width: auto;";
        id("background_screen_img").style.cssText += "height: " + window.innerHeight + "px;";
    }
}

function initUserInfo() {
    id("fname").innerHTML = "";
    id("lname").innerHTML = "";
    id("phonenumber").innerHTML = "";

    id("fname_chk").disabled = false;
    id("lname_chk").disabled = false;
    id("phonenumber_chk").disabled = false;

    id("email").textContent = getCookie("email");
    id("fname").textContent = getCookie("fname");
    id("lname").textContent = getCookie("lname");
    id("phonenumber").textContent = getCookie("phonenumber");
}

function setchangetarget(target) {
    id(target).innerHTML = "<input type=\"text\" name=\"" + target + "\" id=\"" + target + "_text\" value=\"" + id(target).textContent + "\" />";
    id(target + "_chk").disabled = true;
}

var updateddata = {"fname":"", "lname":"", "phonenumber":""};
function modifyuserinfo() {
    doloadingscreen(true);

    if (id("fname_chk").checked == true) {
        updateddata.fname = id("fname_text").value;
    } else {
        updateddata.fname = getCookie("fname");
    }

    if (id("lname_chk").checked == true) {
        updateddata.lname = id("lname_text").value;
    } else {
        updateddata.lname = getCookie("lname");
    }

    if (id("phonenumber_chk").checked == true) {
        updateddata.phonenumber = id("phonenumber_text").value;
    } else {
        updateddata.phonenumber = getCookie("phonenumber");
    }

    ajax_datatrans(requestModifyURL, "p=" + b64(JSON.stringify(updateddata)), modifyuserinfo_callback);
}

function modifyuserinfo_callback(responseText) {
    doloadingscreen(false);

    var retval = JSON.parse(responseText);
    if (retval.result == "ok") {
        setCookie("fname", updateddata.fname);
        setCookie("lname", updateddata.lname);
        setCookie("phonenumber", updateddata.phonenumber);
        messagebox("Your information is successfully modified.", 500, 100, "messagebox_ok");
    } else {
        messagebox(retval.reason, 300, 100, "hidemessagebox");
    }
}

function messagebox_ok() {
    hidemessagebox();
    location.href = "myinfo.html";
}

function showpasswordchange() {
    id("passwordchange_block").style.cssText += "visibility: visible;";
    id("passwordchange_block").style.cssText += "animation-name: anipopup;";
    id("passwordchange_block").style.cssText += "animation-duration: 1s;";
    id("newpassword").value = "";
    id("curpassword").value = "";
    id("conpassword").value = "";
    id("newpassword").style.cssText += "box-shadow: 0px 0px 30px #000000;";
    id("newpassword").style.cssText += "background-color: #ffffff;";
    id("conpassword").style.cssText += "box-shadow: 0px 0px 30px #000000;";
    id("conpassword").style.cssText += "background-color: #ffffff;";

    id("curpassword").focus();
}

function passwordchange_cancel() {
    id("passwordchange_block").style.cssText += "visibility: hidden;";
    id("passwordchange_block").style.removeProperty("animation-name");
    id("passwordchange_block").style.removeProperty("animation-duration");
}

function checknewpassword() {
    if (id("newpassword").value == id("conpassword").value) {
        id("newpassword").style.cssText += "box-shadow: 0px 0px 30px #00ff00;";
        id("newpassword").style.cssText += "background-color: #90ff90;";
        id("conpassword").style.cssText += "box-shadow: 0px 0px 30px #00ff00;";
        id("conpassword").style.cssText += "background-color: #90ff90;";
    } else {
        id("newpassword").style.cssText += "box-shadow: 0px 0px 30px #ff0000;";
        id("newpassword").style.cssText += "background-color: #ff9090;";
        id("conpassword").style.cssText += "box-shadow: 0px 0px 30px #ff0000;";
        id("conpassword").style.cssText += "background-color: #ff9090;";
    }
}

function passwordchange_submit() {
    if (id("newpassword").value == "" || id("conpassword").value == "" || id("curpassword").value == "") {
        messagebox("You must put passwords into every field.", 500, 150, "hidemessagebox");
        return;
    }

    if (id("newpassword").value != id("conpassword").value) {
        messagebox("New password is not correct.", 400, 150, "hidemessagebox");
        return;
    }

    if (id("curpassword").value == id("newpassword").value) {
        messagebox("Current and New passwords must be different.", 550, 150, "hidemessagebox");
        return;
    }

    /*
     old_password
     new_password
     */

    var passwords = {"old_password":id("curpassword").value , "new_password":id("newpassword").value};
    doloadingscreen(true);
    ajax_datatrans(requestPasswordURL, "p=" + b64(JSON.stringify(passwords)), passwordchange_submit_callback);
}

function passwordchange_submit_callback(responseText) {
    doloadingscreen(true);
    var retval = JSON.parse(responseText);
    if (retval.result == "ok") {
        messagebox("The password is successfully changed", 500, 150, "passwordchange_success_ok");
    } else {
        messagebox(retval.reason, 300, 200, "hidemessagebox");
        doloadingscreen(false);
    }
}

function passwordchange_success_ok() {
    hidemessagebox();
    doloadingscreen(false);
    id("passwordchange_block").style.cssText += "visibility: hidden;";
}