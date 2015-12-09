<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-03
 * Time: 오후 9:22
 */

$ret_val = array("result" => "no", "reason" => "invalid access");
session_start();
if (!isset($_SESSION["email"])) {
    echo json_encode($ret_val);
    return;
}

$p = json_decode(base64_decode($_POST["p"]), true);

$ret_val = array("result" => "ok", "reason" => "");

echo json_encode($ret_val);