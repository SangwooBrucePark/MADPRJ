<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-06
 * Time: 오후 1:36
 */

$req_val = json_decode(base64_decode($_POST["p"]), true);
$resp_val = array("result" => "no", "reason" => "invaild login information");


if ($req_val["email"] == "admin") {
    if ($req_val["password"] == "pa55word") {
        session_start();
        $_SESSION["email"] = urldecode($req_val["email"]);

        $resp_val["result"] = "ok";
        $resp_val["reason"] = "";

        echo json_encode($resp_val);
    } else {
        $resp_val["reason"] = "Wrong password";

        echo json_encode($resp_val);
    }
} else {
    $resp_val["reason"] = "Wrong E-mail";

    echo json_encode($resp_val);
}





