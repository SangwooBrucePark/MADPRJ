<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-08
 * Time: 오전 1:25
 */
/*
<th>total</th>
            <th>passes</th>
            <tr>failed</tr>
            <th>highest_score</th>
            <th>lowest_score</th>
            <th>average</th>*/

$resp_val = array("result" => "ok", "reason" => "",
    "total" => "55654",
    "passes" => "45546",
    "failed" => "15165",
    "highest_score" => "565",
    "lowest_score" => "51",
    "average" => "55.54"
);

echo json_encode($resp_val);