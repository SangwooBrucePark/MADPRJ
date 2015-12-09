/**
 * Created by bruce on 2015-12-06.
 */

var requestcategoryURL = "../php/admin_getcategories.php";
var requestquestionsURL = "../php/admin_getquestions.php";
var requestquestionURL = "../php/admin_getquestion.php";

var requestmodifyquestionURL = "../php/admin_modifyquestion.php";
var requestaddquestionURL = "../php/admin_addquestion.php";
var requestdiablequestionURL = "../php/admin_disablequestion.php";

function onload_proc() {
    id("menu").innerHTML = menu_items();

    getcategories();
}

function getcategories() {
    showloading(true);
    ajax_datatrans(requestcategoryURL, "", getcategories_callback);
}

function getcategories_callback(responseText) {
    showloading(false);
    var resp_val = JSON.parse(responseText);

    if (resp_val.result != "ok") {
        alert(resp_val.reason);
        return;
    }

    var tag_string = "";
    for (var i = 0; i < resp_val.categories.length; i++) {
        tag_string += "<option value=\"" + resp_val.categories[i].cid + "\">" + resp_val.categories[i].category_name + "</option>";
    }

    id("category_list").innerHTML = tag_string;
}

function getquestions() {
    showloading(true);
    var req_val = btoa(JSON.stringify({"cid":id("category_list").value}));
    ajax_datatrans(requestquestionsURL, "p=" + req_val, getquestions_callback);
}

function getquestions_callback(responseText) {
    showloading(false);
    var retval = JSON.parse(responseText);

    if (retval.result != "ok") {
        alert(retval.reason);
        return;
    }

    var tag_string = "";
    for (var i = 0; i < retval.categories.length; i++) {
        tag_string += "<tr>";
        tag_string += "<td>" + retval.categories[i].qid + "</td>";
        if (retval.categories[i].question.length > 60) {
            tag_string += "<td>" + retval.categories[i].question.substring(0, 60) + "...</td>";
        } else {
            tag_string += retval.categories[i].question;
        }
        tag_string += "<td><button type=\"button\" onclick=\"modifyquestion(\'" + retval.categories[i].qid + "\')\">Modify</button></td>";
        tag_string += "<td><button type=\"button\" onclick=\"disablequestion(\'" + retval.categories[i].qid + "\')\">Disable</button></td>";
        tag_string += "</tr>";
    }

    id("questions").innerHTML = tag_string;
}

var modified_qid = "";
function modifyquestion(qid) {
    showloading(true);
    modified_qid = qid;

    var req_val = btoa(JSON.stringify({"qid":id("category_list").value}));
    ajax_datatrans(requestquestionURL, "p=" + req_val, modifyquestion_callback);
}

function modifyquestion_callback(responseText) {
    showloading(false);
    var resp_val = JSON.parse(responseText);

    if (resp_val.result != "ok") {
        alert(resp_val.reason);
        return;
    }

    id("qid").value = modified_qid;
    id("question").value = resp_val.question;
    id("option1").value = resp_val.option1;
    id("option2").value = resp_val.option2;
    id("option3").value = resp_val.option3;
    id("option4").value = resp_val.option4;

    showmodifywindow(true);
}

function showmodifywindow(enable) {
    if (enable) {
        id("modify_window").style.cssText += "visibility: visible;";
    } else {
        id("modify_window").style.cssText += "visibility: hidden;";
    }
}

function cancelmodifywindow() {
    showmodifywindow(false);
}

function disablequestion(qid) {
    var req_val = btoa(JSON.stringify({"qid":qid}));
    ajax_datatrans(requestdiablequestionURL, "p=" + req_val, disablequestion_callback);
}

function disablequestion_callback(responseText) {
    var resp_val = JSON.parse(responseText);
    alert(resp_val.result);
    showmodifywindow(false);
}

var modifiedquestion = {};
function submitmodify() {
    showloading(true);
    modifiedquestion["qid"] = id("qid").value;
    modifiedquestion["question"] = id("question").value;
    modifiedquestion["option1"] = id("option1").value;
    modifiedquestion["option2"] = id("option2").value;
    modifiedquestion["option3"] = id("option3").value;
    modifiedquestion["option4"] = id("option4").value;

    var req_val = btoa(JSON.stringify(modifiedquestion));
    ajax_datatrans(requestmodifyquestionURL, "p=" + req_val, submitmodify_callback);
}

function submitmodify_callback(responseText) {
    showloading(false);
    var resp_val = JSON.parse(responseText);
    alert(resp_val.result);
    showmodifywindow(false);
}

function showaddwindow(enable) {
    showloading(true);
    if (enable) {
        id("add_window").style.cssText += "visibility: visible;";
        ajax_datatrans(requestcategoryURL, "", getcategoriesforadd_callback);
    } else {
        id("add_window").style.cssText += "visibility: hidden;";
    }
}

function canceladdwindow() {
    showaddwindow(false);
}

function getcategoriesforadd_callback(responseText) {
    showloading(false);
    var resp_val = JSON.parse(responseText);

    if (resp_val.result != "ok") {
        alert(resp_val.reason);
        return;
    }

    var tag_string = "";
    for (var i = 0; i < resp_val.categories.length; i++) {
        tag_string += "<option value=\"" + resp_val.categories[i].cid + "\">" + resp_val.categories[i].category_name + "</option>";
    }

    id("add_category_list").innerHTML = tag_string;
}

var newquestion = {};
function submitadd() {
    showloading(true);
    newquestion["cid"] = id("add_category_list").value;
    newquestion["question"] = id("add_question").value;
    newquestion["option1"] = id("add_option1").value;
    newquestion["option2"] = id("add_option2").value;
    newquestion["option3"] = id("add_option3").value;
    newquestion["option4"] = id("add_option4").value;

    var req_val = btoa(JSON.stringify(newquestion));
    ajax_datatrans(requestaddquestionURL, "p=" + req_val, submitadd_callback);
}

function submitadd_callback(responseText) {
    showloading(false);
    var resp_val = JSON.parse(responseText);
    alert(resp_val.result);
    showaddwindow(false);
}