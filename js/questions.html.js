/**
 * Created by bruce on 2015-12-03.
 */

var selected_category_name = "";
var selected_cid = "";
var numberofquestions = "";
var requestQuestionURL = "../php/getquestion.php";
var answerQuestionURL = "../php/answerquestion.php";

var cur_question_number = 1;
var timelimit = 15; // second

function onload_proc() {
    if (!isLogin()) {
        location.href = "home.html";
    }

    selected_cid = getCookie("cid");
    if (selected_cid == null) {
        messagebox("You did not select a category in the previous step.<br />System moves you back to the category selection page.", 650, 150, "invalidaccess_callback");
        return;
    }

    selected_category_name = getCookie("category_name");
    numberofquestions = getCookie("numofq");

    setGraphicalElements();
    initializeUpdatedInfo();

    timelimit_mil = timelimit * 100;
    messagebox("Are you ready to start?<br/>If you are ready, press OK.", 400, 150, "nextquestion_callback");
}

function invalidaccess_callback() {
    location.href = "category.html";
}

function onresize_proc() {
    setGraphicalElements();
}

function setGraphicalElements() {
    if (window.innerHeight * 1.8 < window.innerWidth) {
        id("background_screen").style.cssText += "background-size: " + window.innerWidth + "px auto;";
    } else {
        id("background_screen").style.cssText += "background-size: auto " + window.innerHeight + "px;";
    }

    id("loading").style.cssText += "width: " + window.innerWidth + "px;";
    id("loading").style.cssText += "height: " + window.innerHeight + "px;";

    id("blocking").style.cssText += "width: " + window.innerWidth + "px;";
    id("blocking").style.cssText += "height: " + window.innerHeight + "px;";
}

function initializeUpdatedInfo() {
    id("category_name").textContent = selected_category_name;
    id("progress").textContent = cur_question_number + "/" + numberofquestions;
    id("progbar").max = timelimit * 100;
    id("progbar").value = timelimit * 100;
    id("timerview").textContent = timelimit + ":00";
    id("foot").textContent = "[ Candidate\'s Name : " + getCookie("fname") + " " + getCookie("lname") + " ]";
}

var timelimit_mil = 0;
function timer() {
    if (timelimit_mil == -1 || movenext) {
        // 시간 종료, 답변 제출
        var user_answer_pkg = {"qnum":cur_question_number, "user_answer":"", "answer_status":"no_answer"};
        for (var i = 0; i < name("user_answer").length; i++) {
            if (name("user_answer")[i].checked) {
                user_answer_pkg.user_answer = name("user_answer")[i].value;
                user_answer_pkg.answer_status = "answered";
            }
        }

        // 답변 제출
        doloadingscreen(true);
        var p = b64(JSON.stringify(user_answer_pkg));
        ajax_datatrans(answerQuestionURL, "p=" + p, answerQuestion_callback);
    } else {
        var sec = parseInt(timelimit_mil / 100);
        var mil = timelimit_mil % 100;

        id("timerview").textContent = leadingZeros(sec, 2) + ":" + leadingZeros(mil, 2);
        //id("progbar").value = timelimit_mil;
        if (timelimit_mil % 10 == 0) {
            id("progbar").value = timelimit_mil;
        }
        timelimit_mil--;

        setTimeout(timer, 10);
    }
}

// 답변 제출 콜백
function answerQuestion_callback(responseText) {
    doloadingscreen(false);
    var retval = JSON.parse(responseText);

    if (retval.result == "ok") {
        // 다음 문제 준비
        if (numberofquestions == cur_question_number) {
            messagebox("Your test is now finished.<br />Let\'s see your result.", 400, 200, "endoftest");
        } else {
            cur_question_number++;
            timelimit_mil = timelimit * 100;
            if (movenext) {
                nextquestion_callback();
            } else {
                messagebox("Are you ready to move next??", 400, 150, "nextquestion_callback");
            }
        }

        movenext = false;
    } else {
        alert(retval.reason);
    }
}

function endoftest() {
    delCookie("cid");
    delCookie("category_name");
    delCookie("numofq");

    location.href = "result.html";
}

function nextquestion_callback() {
    hidemessagebox();
    requestQuestion(cur_question_number);
}

function requestQuestion(qnum) {
    doloadingscreen(true);

    var p = b64(JSON.stringify({"qnum":cur_question_number}));
    ajax_datatrans(requestQuestionURL, "p=" + p, requestQuestion_callback);
}

function requestQuestion_callback(responseText) {
    doloadingscreen(false);

    var retval = JSON.parse(responseText);
    if (retval.result == "ok") {
        id("question").innerHTML = "<span style=\"background-color: #e4e4e4; font-family: Abel; font-size: 33px;\">" + retval.question + "</span>";
        for (var i = 0; i < name("user_answer").length; i++) {
            name("user_answer")[i].value = i;
            name("user_answer")[i].checked = false;
            name("user_answer_label")[i].textContent = " " + retval.choices[i];
        }

        initializeUpdatedInfo();
        setTimeout(timer, 10);
    }
}

var movenext = false;
function movenextquestion() {
    movenext = true;
}

function clicklabelradio(radio_id) {
    id(radio_id).checked = true;
}