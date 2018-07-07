(function(){
	var oSeletone = document.getElementById('region-select-one');
	var oSelettwo = document.getElementById('region-select-two');
	var oRegion = document.getElementById('region-radio-wrapper');
	var oProduct = document.getElementById('product-radio-wrapper');
	var oSeve = document.getElementById('seve');
	var oCont = document.getElementById('table-wrapper');
	var Colorarr = ['#609','#666FF','#00C','#93C','#669','#606','#90F','#336','#06C'];	
	var Colorindex = 0;
	var nOver = true;
	var nPrevnum = 0;
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
	
	//创建一个input
	function fnCreinput(val){
		var oEle = document.createElement('input');
		oEle.style.width = '40px';
		oEle.type = 'text';
		oEle.value = val;
		return oEle;
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
			target = e.target || e.srcElement;
		
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
			
			fnEvent(oCont,'mouseover',fnMouseover);
			
		}
		
		var aInputo = oRegion.getElementsByTagName('input'),
			aInputt = oProduct.getElementsByTagName('input'),
			aSetone = fnSeletdate(aInputo),
			aSettwo = fnSeletdate(aInputt),
			ar = fnSetdate();
		
		fnaddtoEle(ar,aSetone.length,aSettwo.length);
		fnAllline(false);
	}
	
	//判断两个a中是否包含b
    function contains(a,b){
        return a.contains ? a != b && a.contains(b) :!!(a.compareDocumentPosition(b) & 16);
    }
    
    //获取事件
    function getRelated(e){
        var related;
        var type=e.type.toLowerCase();//这里获取事件名字
        if(type=='mouseover'){
            related=e.relatedTarget||e.fromElement;
        }else if(type='mouseout'){
            related=e.relatedTarget||e.toElement;
        }
        return related; 
    }
    
    //阻止事件冒泡
    function stopPropagation(e){    
	    if(e.stopPropagation) { //W3C阻止冒泡方法  
	        e.stopPropagation();  
	    } else {  
	        e.cancelBubble = true; //IE阻止冒泡方法  
	    }  
	}  

	
	//元素移入
	function fnMouseover(ev){
		var e = ev || window.event;　　　　
		var target = e.target || e.srcElement;
		var arr = [];
		var nMax = fnReturNmax();
		var related = getRelated(e);
		
		if(target.nodeName === 'TD' && target != related && !contains(target,related)){
			var len  = target.parentNode.children.length;
			var Nodes = target.parentNode.children;
			
			for(var i = 0; i < len; i++){
				if(!isNaN(Nodes[i].innerHTML)){
					arr.push(parseInt(Nodes[i].innerHTML));
				}
			}			
			
			fnColumnar(arr);
			fnBrokenline(arr,true,nMax,0);
			
			if(!isNaN(target.innerHTML)){
				target.innerHTML += '<i>编辑<i>';
			}
			
		}
		
	}
	
	//元素移出
	function fnMouseout(ev){
		var e = ev || window.event;　　　　
		var target = e.target || e.srcElement;
		var related = getRelated(e);
		
		if(target.nodeName === 'TD' && target != related && !contains(target,related)){
			if(target.children.length < 2){
				target.removeChild(target.children[0]);
			}
		}
	}
	
	fnEvent(oCont,'mouseout',fnMouseout);
	
	function fntdClick(ev){
		var e = ev || window.event;　　　　
		var target = e.target || e.srcElement;
		var related = getRelated(e);
		
		if(target.nodeName === 'TD'){
			if(target.children){
				target.removeChild(target.children[0]);
			}
			
			var aTd = target.parentNode.parentNode.getElementsByTagName('td');			
			for(var z = 0; z < aTd.length; z++){
				if(aTd[z].children.length >= 1){
					for(var j = 0; j < aTd[z].children.length; j++){
						aTd[z].removeChild(aTd[z].children[j]);
					}
					
					aTd[z].innerHTML = nPrevnum;
				}
			}
			
			var val = parseInt(target.innerHTML);
			target.innerHTML = '';
			var oTxt = document.createElement('input');
			var oConfirm = document.createElement('input');
			var oCancel = document.createElement('input');
			nPrevnum = val;
			
			oTxt.style.width = '50px';
			oTxt.type = 'text';
			oTxt.value = val;
			oConfirm.type = 'submit';
			oConfirm.value = '确定';
			oCancel.type = 'reset';
			oCancel.value = '取消';
			
			target.appendChild(oTxt);
			target.appendChild(oConfirm);
			target.appendChild(oCancel);
			
			target.children[0].onkeyup = function(ev){
				var ev = ev || window.event;
				if(ev.keyCode === 13){
					var num = parseInt(target.children[0].value);
					if(isNaN(num)){
						alert('请输入数字');
					}else{
						for(var i = 0; i < target.children.length; i++){
							target.removeChild(target.children[i]);
						}
						target.innerHTML = num;
					}
				}else if(ev.keyCode === 27){
					for(var i = 0; i < target.children.length; i++){
						target.removeChild(target.children[i]);
					}
					
					target.innerHTML = val;
				}
			}
			
			target.children[1].onclick = function(){
				var num = parseInt(target.children[0].value);
				if(isNaN(num)){
					alert('请输入数字');
				}else{
					for(var i = 0; i < target.children.length; i++){
						target.removeChild(target.children[i]);
					}
					target.innerHTML = num;
				}
			}
			
			target.children[2].onclick = function(){
				for(var i = 0; i < target.children.length; i++){
					target.removeChild(target.children[i]);
				}
				
				target.innerHTML = val;
			}
			
			stopPropagation(e);
		}
	}
	
	fnEvent(oCont,'click',fntdClick);
	
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
	
	//筛选指定数组
	function fnSetdate(){
		var ar = [],
			aInputo = oRegion.getElementsByTagName('input'),
			aInputt = oProduct.getElementsByTagName('input'),
			aSetone = fnSeletdate(aInputo),
			aSettwo = fnSeletdate(aInputt);
		
		ar = fnAddarr(aSetone,sourceData);
		ar = fnAddarr(aSettwo,ar);
		return ar;
	}
	
	//显示选中所有线
	function fnAllline(tf){
		var asSeletdata = fnAlladd();
		var nMax = fnReturNmax();
		for(var x = 0; x < asSeletdata.length; x++){
			for(var z = 0; z < asSeletdata.length; z++){
				fnBrokenline(asSeletdata[x],tf,nMax,Colorarr[x]);				
			}				
		}		
	}
	
	//返回表格中所有数字的最大数
	function fnReturNmax(){
		if(oCont.children[0]){
			var tab = oCont.children[0];
			var nMax = 0;
			for(var i = 1; i < tab.rows.length; i++){
				for(var x = 0; x < tab.rows[i].cells.length; x++){
					if(!isNaN(tab.rows[i].cells[x].innerHTML)){
						if(nMax < parseInt(tab.rows[i].cells[x].innerHTML)){
							nMax = parseInt(tab.rows[i].cells[x].innerHTML);
						};
					}
				}			
			}			
			return nMax;
		}
	}
	
	//选择表格中的所有数字添加到一个数组
	function fnAlladd(){
		if(oCont.children[0]){
			var tab = oCont.children[0];
			var arr = [];
			var ar = [];
			for(var i = 1; i < tab.rows.length; i++){
				ar = [];
				for(var x = 0; x < tab.rows[i].cells.length; x++){
					if(!isNaN(tab.rows[i].cells[x].innerHTML)){
						ar.push(parseInt(tab.rows[i].cells[x].innerHTML));
						
					}
				}
				
				arr.push(ar);
			}			
			return arr;
		}
	}
	var tabledata = null
	
	//保存选中数据
	oSeve.onclick = function(){
		var aInputo = oRegion.getElementsByTagName('input'),
			aInputt = oProduct.getElementsByTagName('input'),
			tabledata = fnSetdate();
	    var str = JSON.stringify(tabledata);
	    localStorage.tabledata = str;   
	    localStorage.lenr = fnSeletdate(aInputo);
		localStorage.lenp = fnSeletdate(aInputt);
	}
	
	if(localStorage.tabledata){
		var data = localStorage.tabledata;
		var lenr = localStorage.lenr.split(',');
		var lenp = localStorage.lenp.split(',');
		
		tabledata = JSON.parse(data);	

		fnaddtoEle(tabledata,lenr.length,lenp.length);
		fnEvent(oCont,'mouseover',fnMouseover);
		fnAllline(false);
		oCont.onmouseleave = function(){
			fnAllline(false);
		};
	}else{
		//鼠标离开表格
		oCont.onmouseleave = function(){
			fnAllline(true);
			fnAllline(false);
		};
	}
	
	//使只有一个单元格处于编辑状态
	document.onclick = function(){
		var aTd = oCont.getElementsByTagName('td');			
		for(var z = 0; z < aTd.length; z++){
			if(aTd[z].children.length >= 1){
				for(var j = 0; j < aTd[z].children.length; j++){
					aTd[z].removeChild(aTd[z].children[j]);
				}
				
				aTd[z].innerHTML = nPrevnum;
			}
		}
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
	
})();
