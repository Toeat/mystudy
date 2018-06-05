var num = 0;
function fnBrokenline(data,onOff,adata,color){
	var canvas = document.getElementById('Brokenline');
	//重置canvas
	if(onOff){
		canvas.height = canvas.height
	}  
		
	
	if(canvas.getContext){
		var ctx = canvas.getContext('2d');
		var nMax = 0;
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
		
		//获取数据最大值

		for(var x = 0; x < adata.length; x++){
			for(z in adata[x]){
				if(z === 'sale'){
					for(var j = 0; j < adata[x][z].length; j++){
						if(nMax < adata[x][z][j]){
							nMax = adata[x][z][j];
						}
					}
				}				
			}
			
		}

		
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

