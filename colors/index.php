<?php

//$colors = [0=>'Red', 1=>'Blue', 2=>'Green', 3=>'Black'];
$colors = ['Red', 'Blue', 'Green', 'Black'];
header('Content-type:application/json');
echo json_encode($colors);
//die('error cannot find colors!");

// get new color...
//$colorName = $_POST['colorName'];
//$colors .push($colorName);

?>

