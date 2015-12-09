/**
 * Created by bruce on 2015-12-06.
 */

var requestusersURL = "../php/admin_getallusers.php";

function onload_proc() {
    id("menu").innerHTML = menu_items();
    getusers();
}

function getusers() {
    showloading(true);
    ajax_datatrans(requestusersURL, "", getusers_callback);
}

function getusers_callback(responseText) {
    showloading(false);
    var retval = JSON.parse(responseText);

    if (retval.result != "ok") {
        alert(retval.reason);
        return;
    }

    var tag_string = "";
    for (var i = 0; i < retval.users.length; i++) {
        tag_string += "<tr>";
        tag_string += "<td>" + retval.users[i].email + "</td>";
        tag_string += "<td>" + retval.users[i].fname + "</td>";
        tag_string += "<td>" + retval.users[i].lname + "</td>";
        tag_string += "<td>" + retval.users[i].phonenumber + "</td>";
        tag_string += "<td>" + retval.users[i].role + "</td>";
        tag_string += "</tr>";
    }

    id("users").innerHTML = tag_string;
}