/**
 * Created by bruce on 2015-12-06.
 */
function menu_items() {
    var tag_items = "";

    tag_items += "<div style=\"text-align: center;\">- Menu -</div>";
    tag_items += "<a href=\"admin_users.html\">Show All Users</a>";
    tag_items += "<hr />";
    tag_items += "<a href=\"admin_category.html\">Categories</a><br />";
    tag_items += "<hr />";
    tag_items += "<a href=\"admin_question.html\">Questions</a><br />";
    tag_items += "<hr />";
    tag_items += "<a href=\"admin_statistics.html\">Statistics</a><br />";
    tag_items += "<hr />";
    tag_items += "<a href=\"../php/admin_letmeout.php\">Logout</a><br />";

    return tag_items;
}

function showloading(enable) {
    var loading = document.getElementsByClassName("loading")[0];
    if (enable) {
        loading.style.cssText += "visibility: visible";
    } else {
        loading.style.cssText += "visibility: hidden";
    }
}