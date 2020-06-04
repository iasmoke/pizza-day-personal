<?php
error_reporting(error_reporting() & ~E_NOTICE);
ini_set('memory_limit', '-1');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type");

require_once('connect_db.php');


$_POST = json_decode(file_get_contents('php://input'), true);

$user_id = $_POST['user_id'];
$target_name = $_POST['target_name'];
$update_target = $_POST['settings'];

foreach ($update_target as $row) {
    foreach ($row as $key => $row_1) {
        if ((($row_1 === "") || ($row_1 === null))) {
            $res['error'] = "Enter all target parameters";
            echo (json_encode($res));
            exit;
        } else {
            $res['error'] = "Target updated successfully";
            $row['target_name'] = $target_name;
            $row['user_id'] = $user_id;
            $sql = "UPDATE targets SET value_name=?, start_value=?, stop_value=?, step_value=?, type=?, parameter_description=? WHERE user_id=? AND target_name=? AND parameter_name=?";
            if ($stmt = $db_connect->prepare($sql)) {
                $stmt->bind_param(
                    'sdddssiss',
                    $row['value_name'],
                    $row['start_value'],
                    $row['stop_value'],
                    $row['step_value'],
                    $row['type'],
                    $row['parameter_description'],
                    $row['user_id'],
                    $row['target_name'],
                    $row['parameter_name']
                );
                $stmt->execute();
            }
        }
    }
}





echo (json_encode($res));




$db_connect->close();
