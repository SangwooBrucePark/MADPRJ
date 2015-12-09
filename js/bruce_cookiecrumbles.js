/**
 * Created by bruce on 2015-11-30.
 */
function setCookie(cname, cvalue) {
    var exdays = 1;
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

    var expires = 0;//"expires=" + d.toUTCString();
    //document.cookie = encodeURIComponent(cname) + "=" + encodeURIComponent(cvalue) + "; " + expires + "; path=/";
    document.cookie = encodeURIComponent(cname) + "=" + encodeURIComponent(cvalue) + "; null; path=/";
}

function getCookie(cname) {
    var name = encodeURIComponent(cname) + "=";

    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length,c.length));
        }
    }

    return null;
}

function delCookie(cname) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = encodeURIComponent(cname) + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}