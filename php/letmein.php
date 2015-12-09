<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-11-27
 * Time: 오후 7:54
 */

$base64_decoded = base64_decode($_POST["p"]);
$login_user_info = json_decode($base64_decoded, true);

/*
 * result
 * reason
 * fname
 * lname
 * phonenumber
 */
$ret_val = array("result" => "no", "reason" => "invaild login information", "email" => "", "fname" => "", "lname" => "", "phonenumber" => "");

if (urldecode($login_user_info["email"]) == "bruceprk@hotmail.com") {
    if (urldecode($login_user_info["password"] == "pa55word")) {
        $ret_val["result"] = "ok";
        $ret_val["reason"] = "";
        $ret_val["email"] = "bruceprk@hotmail.com";
        $ret_val["fname"] = "Bruce";
        $ret_val["lname"] = "Park";
        $ret_val["phonenumber"] = "4168980790";

        session_start();
        $_SESSION["email"] = urldecode($login_user_info["email"]);
    }
}

echo json_encode($ret_val);
?>