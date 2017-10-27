window.onload = function(){
	
	/*接口
	guestbook/index.php
		m : index
		a : oVerifyUserNameMsg red
		username : 注册用户名
		password : 注册密码	
	返回
		{
			code ：返回的信息码 0=错误 1=正确
			message ： 返回的文字信息
		}
	*/	
	
	(function(){
		var oUsername1 =document.getElementById('username1');
		var oPassword1 = document.getElementById('password1');
		var oUsername2 =document.getElementById('username2');
		var oPassword2 = document.getElementById('password2');
		var oVerifyUserNameMsg = document.getElementById('verifyUserNameMsg');
		var oRegBtn = document.getElementById('btnReg');
		var oLoginBtn = document.getElementById('btnLogin');
		var oUser = document.getElementById('user');
		var oLogin = document.getElementById('login');
		var oReg = document.getElementById('reg');
		var oLogout = document.getElementById('logout');
		var oUserinfo = document.getElementById('userinfo');
		var oContent = document.getElementById('content');
		var oPostBtn = document.getElementById('btnPost');
		var oList = document.getElementById('list');
		var oShowMore = document.getElementById('showMore');
		var iPage = 1;
		
		//初始化
		updateUserStatus();
		
		function updateUserStatus(){
			var uid = getCookie('uid');
			var username = getCookie('username');
			
			if(uid){
				oUser.style.display = 'block';
				oUserinfo.innerHTML = username;
				oLogin.style.display = 'none';
				oReg.style.display = 'none';
			}else{
				oUser.style.display = 'none';
				oUserinfo.innerHTML = '';
				oLogin.style.display = 'block';
				oReg.style.display = 'block';
			}
		}
		
		function Ecreate(elem){
			return document.createElement(elem);
		}
		
		function createList(data,insert){
			var oDl = Ecreate('dl');
			var oDt = Ecreate('dt');
			var oStrong = Ecreate('strong');
			var oDd1 = Ecreate('dd');
			var oDd2 = Ecreate('dd');
			var oA1 = Ecreate('a');
			var oA2 = Ecreate('a');
			oStrong.innerHTML = data.username;
			oDd1.innerHTML = data.content;
			oDd2.className = 't';
			oA1.href = '';
			oA1.innerHTML = '顶(<span>' + data.support + '</span>)&nbsp|';
			oA2.href = '';
			oA2.innerHTML = '踩(<span>' + data.oppose + '</span>)';
		
			oDt.appendChild(oStrong);
			oDd2.appendChild(oA1);
			oDd2.appendChild(oA2);
			oDl.appendChild(oDt);
			oDl.appendChild(oDd1);
			oDl.appendChild(oDd2);
		
			if(insert && oList.children[0]){
				oList.insertBefore(oDl, oList.children[0]);
			}else{
				oList.appendChild(oDl);
			}
		}
		
		//用户验证
		oUsername1.onblur = function(){
			ajax('get', 'guestbook/index.php', 'm=index&a=verifyUserName&username=' + this.value,function(data){
				var d = JSON.parse(data);
				
				oVerifyUserNameMsg.innerHTML = d.message;
				
				if(d.code){
					oVerifyUserNameMsg.style.color = 'red';
				}else{
					oVerifyUserNameMsg.style.color = 'green';
				}
			});
		}
		
		//用户注册
		oRegBtn.onclick = function(){
			ajax('get', 'guestbook/index.php', 'm=index&a=reg&username='+ encodeURI(oUsername1.value) +'&password='+oPassword1.value, function(data){
				var d = JSON.parse(data);
				alert(d.message);
			});
		}
		
		//用户登录
		oLoginBtn.onclick = function(){
			ajax('get', 'guestbook/index.php', 'm=index&a=login&username='+ encodeURI(oUsername2.value) +'&password='+oPassword2.value, function(data){
				var d = JSON.parse(data);
				alert(d.message);
				
				if(!d.code){
					updateUserStatus();
				}
			});
		}
		
		//用户状态
		oLogout.onclick = function(){
			ajax('get', 'guestbook/index.php', 'm=index&a=logout', function(data){
				var d = JSON.parse(data);
				alert(d.message);
				if(!d.code){
					updateUserStatus();
				}
			});
			
			return false;
		}
		
		//初始化留言内容
		function showList(){
			ajax('get', 'guestbook/index.php', 'm=index&a=getlist&n=5&page='+iPage, function(data){
				var d = JSON.parse(data);
				var data = d.data;		
				
				if(data){
					for(var i=0; i<data.list.length; i++){
						createList(data.list[i]);
					}
				}else{
					if(iPage == 1){
						oList.innerHTML = '快来抢沙发....';
					}
					
					oShowMore.style.display = 'none';
				}
			});
			
		}
		
		showList();
		
		//用户留言
		oPostBtn.onclick = function(){
			ajax('post', 'guestbook/index.php', 'm=index&a=send&content='+encodeURI(oContent.value), function(data){
				var d = JSON.parse(data);
				alert(d.message);
				
				//添加留言
				if(!d.code){
					createList(d.data, true);
				}
			});
		}
		
		//显示更多
		oShowMore.onclick = function(){
			iPage++;
			showList();
		}
		
	})();
	
}

function getCookie(key){
	var arr1 = document.cookie.split('; ');
	for(var i=0; i<arr1.length; i++){
		var arr2 = arr1[i].split('=');
		if(arr2[0]==key){
			return arr2[1];
		}
	}
	
}
