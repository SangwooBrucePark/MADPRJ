<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-06
 * Time: 오후 11:32
 */

/*result
reason
question
option1
option2
option3
option4
*/

$resp_val = array("result" => "ok", "reason" => "",
        "question" => "jawejf;aowiej;aowin\n\n\negj;aewrhngujehrg384ho398i4j93ejfwiuenjv;wnrviuwrnefwi34erjghw38p4tuw3i4ufgtw3io4hjgfpw38utwg3p4hgf",
        "option1" => "a;oweifj;aowiefj;aowiefj;aowief",
        "option2" => "fawiejfa;owiefj;aoiwefj;aowiejf;aoiwejfa;iowef",
        "option3" => "asdfasdffawiejfa;owiefj;aoiwefj;aowiejf;aoiwejfa;iowef",
        "option4" => "fawfthrtyiejfa;asdfasdfowiefj;aoiwefj;aowiejf;aoiwejfa;iowef"
);

echo json_encode($resp_val);
