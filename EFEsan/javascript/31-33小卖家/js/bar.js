//生成柱状图
function fnColumnar(data){
	var oSvg = document.getElementById('Bargraph');
	var arr = [];
	var nMax = 0;
	var vertical = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	var transverse = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	var oText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	
	//重置Svg
	oSvg.innerHTML = '';
	
	//生成横轴纵轴
	vertical.setAttribute('d', 'M50 25 V325 Z');
	vertical.setAttribute('stroke', 'black');
	transverse.setAttribute('d', 'M40 325 H940 Z');
	transverse.setAttribute('stroke', 'black');
	oSvg.appendChild(vertical);
	oSvg.appendChild(transverse);
	
	//取得数据最大值
	for(var z = 0; z < data.length; z++){
		if(data[z] > nMax){
			nMax = data[z];
		}
	}
	
	//生成虚线
	for(var i = 0; i < 3; i++){
		var oGrayline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		oGrayline.setAttribute('d', 'M51 '+(25+(100*i))+' H940 Z');
		oGrayline.setAttribute('stroke', '#ccc');
		oSvg.appendChild(oGrayline);
	}
	
	//绘制柱状图
	for(var y = 0; y < data.length; y++){
		var oScalet = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		var oTextt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		var oColumnar = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		
		oScalet.setAttribute('d', 'M'+(110+(70*y))+' 325 V335 Z');
		oScalet.setAttribute('stroke', 'black');
		if(data[y] > 300){
			oColumnar.setAttribute('d', 'M'+(90+(70*y))+' 324 V'+(325-(data[y]/(nMax/275)))+' H'+(130+(70*y))+' V324 Z');
		}else{
			oColumnar.setAttribute('d', 'M'+(90+(70*y))+' 324 V'+(325 - data[y])+' H'+(130+(70*y))+' V324 Z');
		}
		oColumnar.setAttribute('fill', '#3F8EF9');
		oTextt.setAttribute('x', 100+(y*70)+'');
		oTextt.setAttribute('y', '348');
		oTextt.style.fontSize = '12px';
		oTextt.innerHTML = (y+1)+'月';
		
		oSvg.appendChild(oScalet);
		oSvg.appendChild(oTextt);
		oSvg.appendChild(oColumnar);	
	}
}

fnColumnar([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);




















































