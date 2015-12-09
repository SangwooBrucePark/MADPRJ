<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-08
 * Time: 오전 1:41
 */

$resp_val = array("result" => "ok", "reason" => "",
    "curusers" => array(
        "usercount" => "10",
        "checkedtime" => "2015-12-01 08:24:34"
    )
);

echo json_encode($resp_val);