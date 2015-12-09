/**
 * Created by bruce on 2015-11-30.
 */

function id(tag_id) {
    return document.getElementById(tag_id);
}

function tag(tag_name) {
    return document.getElementsByTagName(tag_name)[0];
}

function name(attr_name) {
    return document.getElementsByName(attr_name);
}

function itext(tag_id) {
    return document.createRange().selectNodeContents(id(tag_id)).toString();
}

function json_serialize(form_tag_id) {
    var ret_val = "{";
    var frm = id(form_tag_id);
    for (var i = 0; i < frm.length; i++) {
        ret_val += "\"" + frm.elements[i].name + "\":\"" + encodeURIComponent(frm.elements[i].value) + "\"";
        if (i < frm.length - 1) {
            ret_val += ",";
        }
    }
    ret_val += "}";

    return ret_val;
}

function serialize(form_tag_id) {
    var ret_val = "";
    var frm = id(form_tag_id);
    for (var i = 0; i < frm.length; i++) {
        ret_val += frm.elements[i].name + "=" + frm.elements[i].value;
        if (i < frm.length - 1) {
            ret_val += "&";
        }
    }

    return ret_val;
}