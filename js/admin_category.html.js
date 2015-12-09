/**
 * Created by bruce on 2015-12-06.
 */

var requestcategoryURL = "../php/admin_getcategories.php";
var requestmodifycategoryURL = "../php/admin_modifycategory.php";
var requestdisablecategoryURL = "../php/admin_disablecategory.php";
var requestaddcategoryURL = "../php/admin_addcategory.php";

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
    var retval = JSON.parse(responseText);

    if (retval.result != "ok") {
        alert(retval.reason);
        return;
    }

    var tag_string = "";
    for (var i = 0; i < retval.categories.length; i++) {
        tag_string += "<tr>";
        tag_string += "<td>" + retval.categories[i].cid + "</td>";
        tag_string += "<td id=\"name_" + retval.categories[i].cid + "\">";
        tag_string += retval.categories[i].category_name + "</td>";
        tag_string += "<td id=\"desc_" + retval.categories[i].cid + "\">";
        tag_string += retval.categories[i].description + "</td>";
        /*
        if (retval.categories[i].category_name.length > 20) {
            tag_string += retval.categories[i].category_name.substring(0, 20) + "...</td>";
        } else {
            tag_string += retval.categories[i].category_name + "</td>";
        }
        tag_string += "<td id=\"desc_" + retval.categories[i].cid + "\">";
        if (retval.categories[i].description.length > 30) {
            tag_string += retval.categories[i].description.substring(0, 30) + "...</td>";
        } else {
            tag_string += retval.categories[i].description + "</td>";
        }*/
        tag_string += "<td><button type=\"button\" onclick=\"modifycategory(\'" + retval.categories[i].cid + "\')\">Modify</button></td>";
        tag_string += "<td><button type=\"button\" onclick=\"disablecategory(\'" + retval.categories[i].cid + "\')\">Disable</button></td>";
        tag_string += "</tr>";
    }

    id("categories").innerHTML = tag_string;
}

function showmodifywindow(enable) {
    if (enable) {
        id("modify_window").style.cssText += "visibility: visible;";
    } else {
        id("modify_window").style.cssText += "visibility: hidden;";
    }
}

var updatedcategory = {"cid":"", "category_name":"","description":""};
function modifycategory(cid) {
    id("modify_cid").textContent = cid;
    id("modify_new_category_name").value = id("name_" + cid).textContent;
    id("modify_new_description").value = id("desc_" + cid).textContent;

    updatedcategory.cid = cid;

    showmodifywindow(true);
}

function disablecategory(cid) {
    var req_val = btoa(JSON.stringify({"cid":cid}));
    ajax_datatrans(requestdisablecategoryURL, req_val, moddisablecategory_callback);
}

function moddisablecategory_callback(responseText) {
    var resp_val = JSON.parse(responseText);
    if (resp_val.result == "ok") {
        alert("OK");
        showmodifywindow(false);
        location.href = "admin_category.html";
    } else {
        alert(resp_val.reason);
    }
}

function submitmodify() {
    updatedcategory.category_name = id("modify_new_category_name").value;
    updatedcategory.description = id("modify_new_description").value;

    var req_val = btoa(JSON.stringify(updatedcategory));

    ajax_datatrans(requestmodifycategoryURL, "p=" + req_val, moddisablecategory_callback);
}

function cancelmodifywindow() {
    showmodifywindow(false);
}

function submitadd() {
    var req_val = {"category_name":"", "description":""};
    req_val.category_name = id("add_new_category_name").value;
    req_val.description = id("add_new_description").value;

    var req_val = btoa(JSON.stringify(updatedcategory));

    ajax_datatrans(requestaddcategoryURL, "p=" + req_val, moddisablecategory_callback);
}

function canceladdwindow() {
    showaddwindow(false);
}

function showaddwindow(enable) {
    if (enable) {
        id("add_window").style.cssText += "visibility: visible;";
    } else {
        id("add_window").style.cssText += "visibility: hidden;";
    }
}