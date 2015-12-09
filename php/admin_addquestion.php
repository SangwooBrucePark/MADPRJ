<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-08
 * Time: 오전 12:12
 */

$req_val = json_decode(base64_decode($_POST["p"]), true);

if ($req_val["cid"] == "c-0001" &&
    $req_val["question"] == "addquestion" &&
    $req_val["option1"] == "option1" &&
    $req_val["option2"] == "option2" &&
    $req_val["option3"] == "option3" &&
    $req_val["option4"] == "option4") {

    $resp_val = array("result" => "ok", "reason" => "");
    echo json_encode($resp_val);
}