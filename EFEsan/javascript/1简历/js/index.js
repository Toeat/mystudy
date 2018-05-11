(function(){
	var oHobbybtn = document.getElementsByClassName('hobby-btn')[0],
		oHobbytxt = document.getElementsByClassName('hobby-txt')[0],
		myDate = new Date(),
		sHour = myDate.getHours(),
		oH1 = document.getElementsByTagName('h1')[0];
		
	oHobbybtn.onclick = function(){
		oHobbytxt.innerHTML = '其实我也不知道什么样的爱好是特殊，看网络小说算么';
	}
	
	if(sHour > 7 && sHour <= 12){
		oH1.innerHTML = '简历' + '   早上好';
	}else if(sHour > 12 && sHour <= 14){
		oH1.innerHTML = '简历' + '   中午好';
	}else if(sHour > 14 && sHour <= 18){
		oH1.innerHTML = '简历' + '   下午好';
	}else if(sHour > 19 && sHour <= 23){
		oH1.innerHTML = '简历' + '   晚上好';
	}else{
		oH1.innerHTML = '简历' + '   快睡觉';
	}

})();
