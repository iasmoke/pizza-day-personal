<?php
error_reporting(error_reporting() & ~E_NOTICE);
ini_set('memory_limit', '-1');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type");

require_once('connect_db.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$form_edit_employee = $_POST['form_edit_employee'];
$date_last_update = $_POST['date_now'];
$id_personal = $_POST['id_personal'];
$first_name = $form_edit_employee['first_name'];
$last_name = $form_edit_employee['last_name'];
$second_name = $form_edit_employee['second_name'];
$number_phone = '+' . $form_edit_employee['number_phone'];
$test_date_1 = $form_edit_employee['test_date_1'];
$test_number_ball_1 = $form_edit_employee['test_number_ball_1'];
$test_number_ball_2 = $form_edit_employee['test_number_ball_2'];
$test_date_2 = $form_edit_employee['test_date_2'];
$internship_date = $form_edit_employee['internship_date'];
$certification_date = $form_edit_employee['certification_date'];
$internship_place = $form_edit_employee['internship_place'];
$employee_description = $form_edit_employee['employee_description'];
$status = $form_edit_employee['status'];
$user_name = $_POST['user_name'];

if ($test_date_1 === 'Invalid date') {
  $test_date_1 = '';
}

if ($test_date_2 === 'Invalid date') {
  $test_date_2 = '';
}
if ($internship_date === 'Invalid date') {
  $internship_date = '';
}
if ($certification_date === 'Invalid date') {
  $certification_date = '';
}




$sql = "UPDATE `db_main` SET date_last_update=?, user_name_last_update=?, first_name=?, last_name=?, second_name=?, test_date_1=? ,test_number_ball_1=?, `test_date_2`=?, test_number_ball_2=?, number_phone=?, certification_date=?, internship_date=?, internship_place=?, `status`=?, employee_description=? WHERE id_personal=?";
if ($stmt = $db_connect->prepare($sql)) {
  $stmt->bind_param(
    "ssssssssssssssss",
    $date_last_update,
    $user_name,
    $first_name,
    $last_name,
    $second_name,
    $test_date_1,
    $test_number_ball_1,
    $test_date_2,
    $test_number_ball_2,
    $number_phone,
    $certification_date,
    $internship_date,
    $internship_place,
    $status,
    $employee_description,
    $id_personal
  );

  $stmt->execute();

  if (count($stmt->error_list) === 0) {
    $res = 'Данные обновлены';
  } else {
    $res = $stmt->error_list;
  }
}

echo (json_encode($res));