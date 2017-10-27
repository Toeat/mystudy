function ajax(method, url, data, success){
	var x = null;

	//兼容方法1
	if(window.XMLHttpRequest) {
		x = new XMLHttpRequest();
	}else{
		x = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	if(method == 'get' && data){
		url += '?' + data;
	}

	x.open(method, url, true);
	
	if(method == 'get'){
		x.send();
	}else{
		x.setRequestHeader('content-type','application/x-www-form-urlencoded');
		x.send(data);
	}

	x.onreadystatechange = function(){
		if(x.readyState == 4) {
			if(x.status == 200) {
				success && success(x.responseText);
			}else{
				alert(x.status);
			}
		}
	}
}