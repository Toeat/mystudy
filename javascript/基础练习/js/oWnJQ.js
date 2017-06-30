//javaScript Document

/*选择函数*/
function $(a){
	if(typeof a === 'function'){
		return window.onload = a;
	}else if(typeof a === 'string'){
		return document.getElementById(a);
	}else if(typeof a === 'object'){
		return a;	
	}
}

/*样式获取函数*/
function getStyle(obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

/*运动函数*/
function doMove(obj, attr, dir, target, endFn){
	
	dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;
	
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		var speed = parseInt(getStyle(obj, attr)) + dir;
		
		if(speed > target && dir > 0 || speed < target && dir < 0){
			speed = target;
		}
		
		obj.style[attr] = speed + 'px';
		
		if(speed == target){
			clearInterval(obj.timer);
			
		/*	
			 if(endFn){
				endFn();
			};
		*/
		
		endFn && endFn();
			
		}
		
	},30);
	
}

/*透明度变化函数*/
function opacity(obj, dir, target, endFn){
					
	clearInterval(obj.opacity);
	
	obj.opacity = setInterval(function(){
						
		var alpha = parseInt(parseFloat(getStyle(obj,'opacity'))*100);
						
		alpha < target ? alpha += dir : alpha += -dir;
						
		obj.style.opacity = alpha/100; 
		obj.style.filter = 'alpha(opacity='+ alpha +')'; 
						
		if(alpha === target){
			clearInterval(obj.opacity);
			endFn && endFn();
		}
	},100)	
}

/*抖动函数*/
function shake(obj, attr, endFn){
	var pos = parseInt( getStyle(obj,attr))
	var arr = [];
	var num = 0;
	
	for(var i = 20; i > 0; i-=2){
		arr.push(i, -i);
	}
	arr.push(0);
	
	if(obj.onOff){
		return;
	}
	
	obj.onOff = true;
	
	clearInterval( obj.shake );
	obj.shake = setInterval(function(){
		obj.style[attr] = pos + arr[num] +'px';
		num++;
		if(num === arr.length){
			clearInterval(obj.shake);
			obj.onOff = false;
			endFn && endFn();
		}
	},50);
}

/*倒计时函数*/
function iTime(obj, time, endFn){
	clearInterval(obj.iTime);
	obj.iTime = setInterval(function(){
		var iNow = new Date();
		var iNew = new Date(time);
		var str = '';
		t = Math.floor((iNew - iNow)/1000);
						
		var iDate = change(Math.floor(t/86400));
		var iHour = change(Math.floor(t%86400/3600));
		var iMin = change(Math.floor(t%86400%3600/60));
		var iSec = change(t%60);
						
		if(t >= 0){
			str = '剩余'+iDate+'天'+iHour+'小时'+iMin+'分'+iSec+'秒';
			obj.value = str;
		}else{
			clearInterval(obj.iTime);
			endFn&&endFn();
		}
						
	},1000);
					
	function change(n){
		return n < 10 ? n = '0' + n : n = '' + n;
 	}
}
