<?php
	header('content-type:text/html;charset="utf-8"');
	error_reporting(0);
	
	$arr1 = array('phf','pzj','pyf');
//	$arr2 = array('username'=>'leo','ago'=>30);
	
	echo json_encode($arr1);
?>