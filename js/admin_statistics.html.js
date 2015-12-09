/**
 * Created by bruce on 2015-12-08.
 */

var requeststatisticsURL = "../php/admin_getstatistics.php";
var requestcurrusersURL = "../php/admin_getcurnumusers.php";
var requestdetailreportURL = "../php/admin_getdetailreport.php";

function onload_proc() {
    id("menu").innerHTML = menu_items();

    getstatistics();
}

function getstatistics() {
    showloading(true);
    ajax_datatrans(requeststatisticsURL, "", getstatistics_callback);
}

function getstatistics_callback(responseText) {
    showloading(false);
    var resp_val = JSON.parse(responseText);

    if (resp_val.result == "ok") {
        var tag_val = "<tr>";
        tag_val += "<td>" + resp_val.total + "</td>";
        tag_val += "<td>" + resp_val.passes + "</td>";
        tag_val += "<td>" + resp_val.failed + "</td>";
        tag_val += "<td>" + resp_val.highest_score + "</td>";
        tag_val += "<td>" + resp_val.lowest_score + "</td>";
        tag_val += "<td>" + resp_val.average + "</td>";
        tag_val += "</tr>";
    }

    id("statistics_val").innerHTML = tag_val;
    getcurrentusers();
}

function getcurrentusers() {
    showloading(true);
    ajax_datatrans(requestcurrusersURL, "", getcurrentusers_callback);
}

function getcurrentusers_callback(responseText) {
    showloading(false);
    var resp_val = JSON.parse(responseText);

    if (resp_val.result == "ok") {
        id("curusernum").textContent = resp_val.curusers.usercount;
        id("updatecurusers").textContent = "(Updated : " + resp_val.curusers.checkedtime + ")";
    }

    getdetailreport();
}

function getdetailreport() {
    showloading(true);
    ajax_datatrans(requestdetailreportURL, "", getdetailreport_callback);
}

function getdetailreport_callback(responseText) {
    showloading(false);
    var resp_val = JSON.parse(responseText);

    if (resp_val.result == "ok") {
        var tag_val = "";
        for (var i = 0; i < resp_val.reports.length; i++) {
            tag_val += "<tr>";
            tag_val += "<td>" + resp_val.reports[i].date + "</td>";
            tag_val += "<td>" + resp_val.reports[i].pass + "</td>";
            tag_val += "<td>" + resp_val.reports[i].fail + "</td>";
            tag_val += "<td>" + resp_val.reports[i].highest + "</td>";
            tag_val += "<td>" + resp_val.reports[i].lowest + "</td>";
            tag_val += "<td>" + resp_val.reports[i].average + "</td>";
            tag_val += "<tr>";
        }

        id("detailreport_val").innerHTML = tag_val;
    }
}