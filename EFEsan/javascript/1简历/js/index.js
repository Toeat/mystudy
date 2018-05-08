(function(){
	var oHobbybtn = document.getElementsByClassName('hobby-btn')[0],
		oHobbytxt = document.getElementsByClassName('hobby-txt')[0];
		
	oHobbybtn.onclick = function(){
		oHobbytxt.innerHTML = '其实我也不知道什么样的爱好是特殊，看网络小说算么';
	}
})();
