/**
 * Created by bruce on 2015-12-06.
 */

function onload_proc() {
    delCookie("login");
    delCookie("email");
    delCookie("fname");
    delCookie("lname");
    delCookie("phonenumber");

    id("menu").innerHTML = menu_items();
}