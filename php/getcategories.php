<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-01
 * Time: 오전 2:45
 */

$ret_val = array("result" => "no", "reason" => "invalid access");
session_start();
if (!isset($_SESSION["email"])) {
    echo json_encode($ret_val);
    return;
}

$ret_val = array("result" => "ok", "reason" => "", "categories" =>
    array(
        array("cid" => "c-0001", "category_name" => "ASP.NET"),
        array("cid" => "c-0002", "category_name" => "JDBC"),
        array("cid" => "c-0003", "category_name" => "Applet"),
        array("cid" => "c-0004", "category_name" => "XML"),
        array("cid" => "c-0005", "category_name" => "RMI"),
        array("cid" => "c-0006", "category_name" => "Struts"),
        array("cid" => "c-0007", "category_name" => "Sql server part 2"),
        array("cid" => "c-0008", "category_name" => "Cognos 2"),
        array("cid" => "c-0009", "category_name" => "Data Warehousing"),
        array("cid" => "c-0010", "category_name" => "C++ part 1"),
        array("cid" => "c-0011", "category_name" => "Mainframe"),
        array("cid" => "c-0012", "category_name" => "C"),
        array("cid" => "c-0013", "category_name" => "C++ for beginners"),
        array("cid" => "c-0014", "category_name" => "9 Computer knowledge"),
        array("cid" => "c-0015", "category_name" => "C++ Pointers"),
        array("cid" => "c-0016", "category_name" => "Oops"),
        array("cid" => "c-0018", "category_name" => "This is a test category to check how a long category name influences the shape of the element."),
        array("cid" => "c-0017", "category_name" => "DHTML")
    )
);

echo json_encode($ret_val);