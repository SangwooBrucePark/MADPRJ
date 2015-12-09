<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-07
 * Time: 오후 11:53
 */

$req_val = json_decode(base64_decode($_POST["p"]), true);

if ($req_val["qid"] == "q-0001") {
    $resp_val = array("result" => "ok", "reason" => "");
    echo json_encode($resp_val);
}