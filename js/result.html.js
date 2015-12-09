/**
 * Created by bruce on 2015-12-04.
 */

var requestgetresultURL = "../php/getresult.php";
var selected_category_name = "";

function onload_proc() {
    if (!isLogin()) {
        location.href = "home.html";
    }

    selected_category_name = getCookie("category_name");
    menubar_items(true, true, true, true, true, false, false);
    setGraphicalElements();
    getresult();
}

function onresize_proc() {
    setGraphicalElements();
}

function getresult() {
    doloadingscreen(true);
    ajax_datatrans(requestgetresultURL, "", getresult_callback);
}

function getresult_callback(responseText) {
    doloadingscreen(false);

    var retval = JSON.parse(responseText);
    if (retval.result == "ok") {
        id("yourmarks").textContent = retval.score + "/" + retval.numofq;
        if (retval.ispass == "pass") {
            id("comment").innerHTML = "Take you certificate by clicking the link below.<br /><a class=\"certificatelink\" href=\"#\" onclick=\"showcertificate()\">Click</a>";
            id("presentedby").textContent = getCookie("fname") + " " + getCookie("lname");
            id("for").textContent = retval.category_name;
            id("issuedate").textContent = retval.issuedate;
        } else {
            id("comment").innerHTML = "Well doen. But you need more practice<br />to get a certificate.";
        }
    } else {
        messagebox("error : " + retval.reason, 300, 200, "messagebox_close");
    }
}

function messagebox_close() {
    hidemessagebox();
}

function setGraphicalElements() {
    if (window.innerHeight * 2 < window.innerWidth) {
        id("background_screen_img").style.cssText += "width: " + window.innerWidth + "px;";
        id("background_screen_img").style.cssText += "height: auto;";
    } else {
        id("background_screen_img").style.cssText += "width: auto;";
        id("background_screen_img").style.cssText += "height: " + window.innerHeight + "px;";
    }

    var report_field_height = id("report_field").offsetWidth / 1.6;
    id("report_field").style.cssText += "height: " + report_field_height + "px;";

    var report_field_width = id("report_field").offsetWidth;
    var title_font_size = report_field_width / 10;
    var yourmarks_font_size = report_field_width / 5;
    var comment_font_size = report_field_width / 23;
    id("title").style.cssText += "font-size: " + title_font_size + "px;";
    id("yourmarks").style.cssText += "font-size: " + yourmarks_font_size + "px;";
    id("comment").style.cssText += "font-size: " + comment_font_size + "px;";
}

function closecertificate() {
    id("certificate_block").style.cssText += "visibility: hidden;";
}

function showcertificate() {
    id("certificate_block").style.cssText += "visibility: visible;";
}