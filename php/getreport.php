<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-05
 * Time: 오전 2:37
 */

$ret_val = array("result" => "no", "reason" => "invalid access");
session_start();
if (!isset($_SESSION["email"])) {
    echo json_encode($ret_val);
    return;
}

$ret_val = array("result" => "ok", "reason" => "", "reports" =>
    array(
        array("category_name" => "ASP.NET", "score" => "9", "attent_at" => "2015-12-31 11:11", "ispass" => "Pass"),
        array("category_name" => "Applet", "score" => "10", "attent_at" => "2015-12-31 11:11", "ispass" => "Pass"),
        array("category_name" => "XML", "score" => "2", "attent_at" => "2015-12-31 11:11", "ispass" => "Failed"),
        array("category_name" => "RMI", "score" => "7", "attent_at" => "2015-12-31 11:11", "ispass" => "Pass"),
        array("category_name" => "C++ part 1", "score" => "5", "attent_at" => "2015-12-31 11:11", "ispass" => "Failed"),
        array("category_name" => "Mainframe", "score" => "10", "attent_at" => "2015-12-31 11:11", "ispass" => "Pass"),
        array("category_name" => "C++ Pointers", "score" => "8", "attent_at" => "2015-12-31 11:11", "ispass" => "Pass"),
        array("category_name" => "C", "score" => "8", "attent_at" => "2015-12-31 11:11", "ispass" => "Pass"),
        array("category_name" => "Mainframe", "score" => "7", "attent_at" => "2015-12-31 11:11", "ispass" => "Pass"),
        array("category_name" => "C++ for beginners", "score" => "6", "attent_at" => "2015-12-31 11:11", "ispass" => "Failed"),
        array("category_name" => "DHTML", "score" => "10", "attent_at" => "2015-12-31 11:11", "ispass" => "Pass"),
        array("category_name" => "Data Warehousing", "score" => "7", "attent_at" => "2015-12-31 11:11", "ispass" => "Pass"),
        array("category_name" => "Oops", "score" => "4", "attent_at" => "2015-12-31 11:11", "ispass" => "Failed"),
        array("category_name" => "Mainframe", "score" => "9", "attent_at" => "2015-12-31 11:11", "ispass" => "Pass"),
        array("category_name" => "JDBC", "score" => "8", "attent_at" => "2015-12-31 11:11", "ispass" => "Pass"),
        array("category_name" => "Struts", "score" => "3", "attent_at" => "2015-12-31 11:11", "ispass" => "Failed"),
        array("category_name" => "Cognos 2", "score" => "6", "attent_at" => "2015-12-31 11:11", "ispass" => "Failed")
    )
);

echo json_encode($ret_val);