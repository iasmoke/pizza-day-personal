<?php
error_reporting(error_reporting() & ~E_NOTICE);
ini_set('memory_limit', '-1');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type");

require_once('connect_db.php');


$_POST = json_decode(file_get_contents('php://input'), true);


$user_id = $_POST['user_id'];
$parameter_name = $_POST['parameter_name'];



$sql = "SELECT * FROM trading_logics_settings WHERE user_id=? AND parameter_name=?";
if ($stmt = $db_connect->prepare($sql)) {
  $stmt->bind_param("ii", $user_id, $parameter_name);
  $stmt->execute();
  $stmt->bind_result(
    $user_id,
    $parameter_name,
    $value_name,
    $value,
    $description,
    $type
  );
  while ($stmt->fetch()) {
    $res[] = array(
      'user_id' => $user_id,
      'parameter_name' => $parameter_name,
      'value_name' => $value_name,
      'value' => (float) $value,
      'description' => $description,
      'type' => $type
    );
  }
}


echo(json_encode($res));

$db_connect->close();
