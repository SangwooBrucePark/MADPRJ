<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-04
 * Time: 오후 8:08
 */

$ret_val = array("result" => "no", "reason" => "invalid access");
session_start();
if (!isset($_SESSION["email"])) {
    echo json_encode($ret_val);
    return;
}

$retval = array(
    "result" => "ok",
    "reason" => "",
    "ispass" => "pass",
    "category_name" => "Mainframe",
    "score" => "9",
    "numofq" => "10",
    "issuedate" => "The Friday of December 4th, 2015"
    );

echo json_encode($retval);