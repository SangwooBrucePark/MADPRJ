/**
 * Created by bruce on 2015-12-01.
 */

var getcategory_url = "../php/getcategories.php";
var preparequestions_url = "../php/preparequestions.php";

var categories_json = [];
var categories_map = {};

function onload_proc() {
    if (!isLogin()) {
        alert("Please login first.");
        location.href = "home.html";
    }

    delCookie("cid");
    delCookie("category_name");
    delCookie("numofq");

    getCategories();
    setGraphicalElements();
}

function onresize_proc() {
    setGraphicalElements();
}

function setGraphicalElements() {
    if (window.outerHeight > 800) {
        var top = ((window.innerHeight - 200 - 600) / 3) + 200;
        id("selection_body").style.cssText = "top: " + top + "px;";
    }

    id("blocking").style.cssText += "width: " + getClientWidth() + "px;";
    id("loading").style.cssText += "width: " + getClientWidth() + "px;";
    id("head").style.cssText += "width: " + getClientWidth() + "px;";
}

function getCategories() {
    ajax_datatrans(getcategory_url, "", getCategories_callback);
    doloadingscreen(true);
}

function getCategories_callback(responseText) {
    var retval = JSON.parse(responseText);

    if (retval.result == "ok") {
        categories_json = retval.categories;
        addlist();
    } else {
        alert(retval.reason)
    }

    doloadingscreen(false);
}

var selected_cid = "";
var selected_category_name = "";
function categoryselected(cid) {
    if (selected_cid != "") {
        return;
    }

    selected_cid = cid;
    selected_category_name = id(cid).textContent;
    id("chosen_category").innerHTML = "<div class=\"selected_category_item\" onclick=\"categorydeselected(\'" + cid + "\')\">" + id(cid).textContent + "<img class=\"category_item_minus\" src=\"../images/img-0006.png\" /></div>";
    id(cid).style.cssText = "visibility: hidden;";

    showstartbutton(true);
}

function categorydeselected(cid) {
    selected_cid = "";
    id(cid).style.cssText = "visibility: visible;";
    id("chosen_category").innerHTML = "";

    showstartbutton(false);
}

function addlist() {
    for (var i = 0; i < categories_json.length; i++) {
        id("category_list").innerHTML += "<div id=\"" + categories_json[i].cid + "\" class=\"category_item\" onclick=\"categoryselected(\'" + categories_json[i].cid + "\')\">" + categories_json[i].category_name +
            "<img class=\"category_item_plus\" src=\"../images/img-0005.png\" /></div>";

        categories_map[categories_json[i].cid] = id(categories_json[i].cid);
    }
}

function preparequestions() {
    if (selected_cid != "") {
        var p = b64(JSON.stringify({"cid":selected_cid}));
        doloadingscreen(true);
        ajax_datatrans(preparequestions_url, "p=" + p, preparequestions_callback);
    }
}

function preparequestions_callback(responseText) {
    doloadingscreen(false);

    var retval = JSON.parse(responseText);
    if (retval.result == "ok") {
        setCookie("cid", selected_cid);
        setCookie("category_name", selected_category_name);
        setCookie("numofq", retval.numofq);
        location.href = "questions.html";
    } else {
        alert(retval.reason);
    }
}

function showstartbutton(enable) {
    if (enable) {
        id("teststart").style.cssText += "visibility: visible;";
        id("teststart").style.cssText += "animation-name: anipopup;";
        id("teststart").style.cssText += "animation-duration: 1s;";
    } else {
        id("teststart").style.cssText += "animation-name: anipopdown;";
        id("teststart").style.cssText += "animation-duration: 1s;";
        setTimeout(showstartbutton_delay, 800);
    }
}

function showstartbutton_delay() {
    id("teststart").style.cssText += "visibility: hidden;";
}