<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-03
 * Time: 오후 5:23
 */

$ret_val = array("result" => "no", "reason" => "invalid access");
session_start();
if (!isset($_SESSION["email"])) {
    echo json_encode($ret_val);
    return;
}

$ret_val = array("result" => "ok", "reason" => "", "numofq" => "3");

echo json_encode($ret_val);