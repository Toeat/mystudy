(function(){
	var oSeletone = document.getElementById('region-select-one');
	var oSelettwo = document.getElementById('region-select-two');
	var oRegion = document.getElementById('region-radio-wrapper');
	var oProduct = document.getElementById('product-radio-wrapper');
	var oCont = document.getElementById('table-wrapper');
	
	//选择input的value添加到数组
	function fnSeletdate(arr){
		var oDate = [];					
		for(var i = 0,len = arr.length-1; i < len; i++){
			if(arr[i].checked){
				oDate.push(arr[i].value);
			}
		}					
		return oDate;
	}
	
	//添加元素
	function fnaddtoEle(data,lenr,lenp){
		oCont.innerHTML = '';
		var oTable = document.createElement('table'),
			oTit = document.createElement('tr'),
			ar = ['商品','地区'];
			arr = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],					
			oThr = document.createElement('th'),
			oThp = document.createElement('th'),
			onOffp = true,
			onOffr = true,
			onOfft = true;
			
		oThr.innerHTML = ar[1];
		oThp.innerHTML = ar[0];
			
		if(lenr === 1 && lenp > 1){
			oTit.appendChild(oThr);
			oTit.appendChild(oThp);
		}else if(lenp === 1 && lenr > 1 || lenr >= 1 && lenp >= 1){
			oTit.appendChild(oThp);
			oTit.appendChild(oThr);
		}
		
		for(var i = 0; i < arr.length; i++){
			var oTh = document.createElement('th');
			oTh.innerHTML = arr[i];
			oTit.appendChild(oTh);
		}
		oTable.appendChild(oTit);
		
		for(var j = 0; j < data.length; j++){
			var oTr = document.createElement('tr');
			
			console.log(lenr);
			for(x in data[j]){
				
				if(x === 'product'){
					var oTd = document.createElement('td');	
					if(lenr === 1 && lenp > 1 && onOffp){									
						oTd.innerHTML = data[j].region;
						oTd.rowSpan = lenp + '';
						onOffp = false;
						oTr.appendChild(oTd);
						
					}else if(lenp === 1 && lenr > 1 && onOffr){
						oTd.innerHTML = data[j].product;
						oTd.rowSpan = lenr + '';
						onOffr = false;
						oTr.appendChild(oTd);
						
					}else if(lenr >= 2 && lenp >= 2 && j%lenr === 0){
						oTd.innerHTML = data[j].product;
						oTd.rowSpan = lenr + '';
						oTr.appendChild(oTd);
					}else if(lenr === 1 && lenp === 1){
						oTd.innerHTML = data[j][x];
						oTr.appendChild(oTd);
					}
													
					
				}else if(x === 'region'){
					var oTd = document.createElement('td');
					
					if(lenr === 1 && lenp > 1){
						oTd.innerHTML = data[j].product;									
					}else if(lenp === 1 && lenr > 1 || lenr >= 1 && lenp >= 1){
						oTd.innerHTML = data[j].region;										
					}
					
					oTr.appendChild(oTd);
				}else if(x === 'sale'){
					for(var y = 0; y < data[j][x].length; y++){
						var oTd = document.createElement('td');
						oTd.innerHTML = data[j][x][y];
						oTr.appendChild(oTd);
					}
				}
											
			}
			
			oTable.appendChild(oTr);
		}
		
		oTable.border = '1';
		oCont.appendChild(oTable);
	}
	
	//事件绑定
	function fnEvent(ele,eve,fn){
		if(window.attachEvent) {
			ele.attachEvent('on'+ eve, fn);
		} else if(window.addEventListener) {
			ele.addEventListener(eve, fn, false);
		}
	}
	
	//元素点击
	function fnClick(ev){
		var e = ev || window.event;　　　　
		var target = e.target || e.srcElement;
		
		if(target.nodeName === 'INPUT'){
			var len  = target.parentNode.children.length;
			var Nodes = target.parentNode.children;
			var num = 0;
			if(target.getAttribute('checkbox-type') === 'all'){
				for(var i = 0; i < len; i++){
					if(Nodes[len-1].checked){
						Nodes[i].checked = true;
					}else{
						Nodes[i].checked = false;
						Nodes[0].checked = true;
					}
				}
			}else if(target.getAttribute('checkbox-type') === 'son'){
				for(var y = 0; y < len; y++){
					if(Nodes[y].checked){
						num++;
					}
				}
				
				if(num === 0){
					target.checked = true;
				}
				
				if(num === len-1 && Nodes[len-1].checked === false){
					Nodes[len-1].checked = true;
				}else{
					Nodes[len-1].checked = false;
				}
			}
			
			fnSetdate();
			
		}
	}
	
	//生成元素
	function fnCreate(ele,ar){
		var arr = [];
		var oAll = document.createElement('input');
		for(var i = 0,len = ar.length; i < len; i++){
			var oInput = document.createElement('input');
			oInput.type = 'checkbox';
			oInput.setAttribute('checkbox-type','son');
			ele.appendChild(oInput);
			for(x in ar[i]){
				if(x === 'text'){	
					ele.innerHTML += ar[i][x];
				}else if(x === 'value'){
					oInput.value = ar[i][x];
				}
			}
		}
		
		oAll.type = 'checkbox';
		oAll.setAttribute('checkbox-type','all');
		ele.appendChild(oAll);
		ele.innerHTML += '全选';
		
		fnEvent(ele,'click',fnClick);
	}
	
	//筛选指定数据
	function fnAddarr(arr,data){
		var ar = [];
		for(var i = 0; i < arr.length; i++){
			for(var y = 0; y < data.length; y++){
				for(x in data[y]){
					if(arr[i] === data[y][x]){
						ar.push(data[y]);
					}
				}
			}
		}
		
		return ar;
	}
	
	function fnSetdate(){
		var ar = [],
			aInputo = oRegion.getElementsByTagName('input'),
			aInputt = oProduct.getElementsByTagName('input'),
			aSetone = fnSeletdate(aInputo),
			aSettwo = fnSeletdate(aInputt);
		
		ar = fnAddarr(aSetone,sourceData);
		ar = fnAddarr(aSettwo,ar);
	
		fnaddtoEle(ar,aSetone.length,aSettwo.length);
	}
	
	fnCreate(oRegion, [{
	    value:"华东",
	    text: "华东"
	}, {
	    value:"华北",
	    text: "华北"
	},{
	    value: "华南",
	    text: "华南"
	}]);
	
	fnCreate(oProduct, [{
	    value: "手机",
	    text: "手机"
	}, {
	    value: "笔记本",
	    text: "笔记本"
	}, {
	    value: "智能音箱",
	    text: "智能音箱"
	}]);							
})()