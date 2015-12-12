<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-01
 * Time: 오전 2:01
 */

/*
$ret_val = array("result" => "no", "reason" => "invalid access");
session_start();
if (!isset($_SESSION["email"])) {
    echo json_encode($ret_val);
    return;
}*/
session_start();
session_destroy();

$ret_val = array("result" => "ok", "reason" => "");
echo json_encode($ret_val);