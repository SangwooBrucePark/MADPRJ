/**
 * Created by bruce on 2015-12-04.
 */

var requesthistoryURL = "../php/getreport.php";

function onload_proc() {
    if (!isLogin()) {
        location.href = "home.html";
    }

    menubar_items(true, true, true, false, true, false, false);

    selected_category_name = getCookie("category_name");
    setGraphicalElements();
    gethistory();
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

function gethistory() {
    doloadingscreen(true);
    ajax_datatrans(requesthistoryURL, "", gethistory_callback);
}

function gethistory_callback(responseText) {
    var retval = JSON.parse(responseText);
    if (retval.result == "ok") {
        addlist(retval.reports);
    } else {
        doloadingscreen(false);
        messagebox(retval.reason, 300, 200, "messagebox_ok");
    }
}

function messagebox_ok() {
    hidemessagebox();
}

function addlist(reports) {
    for (var i = 0; i < reports.length; i++) {
        id("history_body").innerHTML += "<tr><td><div>" + reports[i].category_name + "</div></td><td>" + reports[i].score + "</td><td>" + reports[i].attent_at + "</td><td>" + reports[i].ispass + "</td></tr>";
    }

    doloadingscreen(false);
}