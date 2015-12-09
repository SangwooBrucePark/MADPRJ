<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-05
 * Time: 오후 4:58
 */

$ret_val = array("result" => "no", "reason" => "invalid access");
session_start();
if (!isset($_SESSION["email"])) {
    echo json_encode($ret_val);
    return;
}

$ret_val["result"] = "ok";
$ret_val["reason"] = "";

echo json_encode($ret_val);