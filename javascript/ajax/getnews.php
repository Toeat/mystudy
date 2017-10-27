<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);

$news = array(
	array('title'=>'习近平主持中共中央党外人士座谈会','date'=>'2017-10-16'),
	array('title'=>'在华外国人谈中国速度:这只可能在中国发生','date'=>'2017-10-16'),
	array('title'=>'3名台湾游客在三峡景区遇难 国台办通报','date'=>'2017-10-16'),
	array('title'=>'[景区滚石坠落致3名游客死亡 湖北:彻查事故原因 涉事景区停业]','date'=>'2017-10-16'),
	array('title'=>'朴槿惠:因为一个人背叛 我的名誉和生活全毁','date'=>'2017-10-16'),
	array('title'=>'[朴槿惠律师集体辞职 朴:今后按法官意思审 本周或被开除党籍]','date'=>'2017-10-16'),
	array('title'=>'蒙古国大降温 当地民众为啥组团来华扫货','date'=>'2017-10-16'),
	array('title'=>'台风卡努登陆广东 浙粤琼狂风暴雨持续至今夜','date'=>'2017-10-16'),
	
);

echo json_encode($news);
?>