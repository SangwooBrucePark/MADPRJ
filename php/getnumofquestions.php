<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-07
 * Time: 오후 10:53
 */

$retval = array(
    "result" => "ok",
    "reason" => "",
    "categories" => rand(1, 100),
    "members" => rand(300, 2000),
    "questions" => rand(1000, 3000)
);

echo json_encode($retval);