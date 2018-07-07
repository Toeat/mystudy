function fnBrokenline(data,onOff,nMax,color){
	var canvas = document.getElementById('Brokenline');
	//重置canvas
	if(onOff){
		canvas.height = canvas.height;
	}  
		
	
	if(canvas.getContext){
		var ctx = canvas.getContext('2d');
		var len = data.length;
		var oldxy = [0,325];
						
		//绘制横轴纵轴
		ctx.beginPath(0,0);
		ctx.strokeStyle="#000";
		ctx.moveTo(0,25);
		ctx.lineWidth = 4;
		ctx.lineTo(0,325);
		ctx.closePath();
		ctx.stroke();
		
		ctx.beginPath(0,0);
		ctx.lineWidth = 2;
		ctx.moveTo(0,325);
		ctx.lineTo(500,325);
		ctx.closePath();
		ctx.stroke();
				
		//绘制折线
		ctx.beginPath(0,0);

		ctx.strokeStyle = color;
		
		for(var y = 0; y < len; y++){
			ctx.moveTo(oldxy[0],oldxy[1]);
			oldxy[0] = 40 + (40*y);
			oldxy[1] = 325-(data[y]/(nMax/280));
			ctx.lineTo(oldxy[0],oldxy[1]);
			ctx.arc(oldxy[0],oldxy[1],2,0,Math.PI*2 ,false);
		}
		ctx.closePath();
		ctx.stroke();		
	}		
}

