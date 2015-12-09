/**
 * Created by bruce on 2015-11-29.
 */
var _xmlhttp = new XMLHttpRequest();

function ajax_datatrans(url, tdata, callback) {
    _xmlhttp.onreadystatechange = function () {
        if (_xmlhttp.readyState == 4 && _xmlhttp.status == 200) {
            // xmlhttp.responseText
            callback(_xmlhttp.responseText);
        }
    };

    _xmlhttp.open("POST", url, true);
    _xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    _xmlhttp.send(tdata);
}
/*
function ajax_datatrans(url, callback) {
    _xmlhttp.onreadystatechange = function () {
        if (_xmlhttp.readyState == 4 && _xmlhttp.status == 200) {
            // xmlhttp.responseText
            callback(_xmlhttp.responseText);
        }
    };

    _xmlhttp.open("POST", url, true);
    _xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    _xmlhttp.send();
}*/