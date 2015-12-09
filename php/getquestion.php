<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-01
 * Time: 오전 2:44
 */

$ret_val = array("result" => "no", "reason" => "invalid access");
session_start();
if (!isset($_SESSION["email"])) {
    echo json_encode($ret_val);
    return;
}

$req_val = json_decode(base64_decode($_POST["p"]), true);
$qnum = (int)($req_val["qnum"]);

if ($qnum > 0) {
    if ($qnum % 2 == 0) {
        $ret_val = array(
            "result" => "ok",
            "reason" => "",
            "question" => "Trafic to the Development SharePoint site collection has increased dramatically. Users are complaining about poor performance, especially during peak periods. You need to reduce the number of database requests performed by the SharePoint server. What should you do?",
            "choices" => array(
                "Create a timer job definition.",
                "Enable page output caching.",
                "Increase the session timeout value",
                "Enable bandwidth throtting."),
            "answer" => "2"
        );
    } else {
        $ret_val = array(
            "result" => "ok",
            "reason" => "",
            "question" => "Which of the following automatically detects if windows installer is installed on the target machine?",
            "choices" => array(
                "Assembly",
                "Native image",
                "Bootstrapper application",
                "Globalization"),
            "answer" => "3"
        );
    }

    echo json_encode($ret_val);
}