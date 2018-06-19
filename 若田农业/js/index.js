(function(){
	var onOff = true;
	var onOff1 = true;
	var onOff2 = true;
	
	$('.slick1').slick({
		autoplay:true,
		arrows:false,
		fade:true,
		autoplaySpeed:3000,
		speed: 600,
		cssEase: 'linear',
		pauseOnHover:true,
	//	draggable:false,
	});
	
	$('.slick2').slick({
	//	autoplay:true,
		arrows:false,
		fade:true,
		autoplaySpeed:3000,
		speed: 600,
		cssEase: 'linear',
	//	pauseOnHover:true,
		asNavFor: '.slick3',
	//	draggable:false,
	});
	
	$('.slick3').slick({
	  	slidesToShow: 3,
	  	arrows:false,
	  	slidesToScroll:1,
	  	asNavFor: '.slick2',
	  	focusOnSelect: true,
	});
	
	$('.base .btn-l').on('click',function(){
		$('.slick3').slick('slickPrev');
	});
	
	$('.base .btn-r').on('click',function(){
		$('.slick3').slick('slickNext');
	});
	
	$('.caselist .slide div').each(function(){
		if($(this).is('.active')){
			$(this).css('z-index',$('.caselist .slide div').length);
		}else{
			$(this).css('z-index',$('.caselist .slide div').length-$(this).index());
		}
	});
	
	$('.advantage .list-menu li').on('click',function(){
		$('.advantage .list-box .box').fadeOut();
		$('.advantage .list-box .box').eq($(this).index()).fadeIn();
	})
	
	$('.caselist .btn-l').on('click',function(){
		if(onOff){
			onOff = false;
			
			var prev = $('.caselist .slide .active').index() - 1;
			if(prev >= $('.caselist .slide div').length){
				prev = 0;
			}
			
			$('.caselist .slide div').each(function(){
				if(!$(this).is('.caselist .active')){
					var z = parseInt($(this).css('z-index'));
					$(this).css('z-index',z-1);
				}
			})
					
			$('.caselist .slide .active').animate({
				'width':'360px',
				'height':'304px',
				'left':'0',
				'top':'64px',	
			},300);
			
			$('.caselist .slide div').eq(prev).animate({
				'width':'810px',
				'height':'486px',
				'left':'380px',
				'top':'0',	
			},300,function(){
				$('.caselist .slide div').eq(prev).animate({'left':'208px'},300);
				$('.caselist .slide .active').css('left','0');
				$('.caselist .slide .active').css('z-index',$('.caselist .slide div').length-1);
				$('.caselist .slide .active').removeClass('active');
				$(this).addClass('active');
				$(this).css('z-index',$('.caselist .slide div').length);
				$('.caselist .text li').hide();
				$('.caselist .text li').eq($(this).index()).show(300);
				onOff = true;
			});
		}
	});
	
	$('.caselist .btn-r').on('click',function(){
		if(onOff){
			onOff = false;	
			var prev = $('.caselist .slide .active').index() + 1;
			if(prev >= $('.caselist .slide div').length){
				prev = 0;
			}
			
			$('.caselist .slide div').each(function(){
				if(!$(this).is('.active')){
					var z = parseInt($(this).css('z-index'));
					$(this).css('z-index',z+1)
				}
			})
					
			$('.caselist .slide .active').animate({
				'width':'360px',
				'height':'304px',
				'left':'810px',
				'top':'64px',	
			},300);
			
			$('.caselist .slide div').eq(prev).animate({
				'width':'810px',
				'height':'486px',
				'left':'208px',
				'top':'0',	
			},300,function(){
				$('.caselist .slide .active').css('left','0');
				$('.caselist .slide .active').css('z-index','1');
				$('.caselist .slide .active').removeClass('active');
				$(this).addClass('active');
				$('.caselist .text li').hide();
				$('.caselist .text li').eq($(this).index()).show(300);
				onOff = true;
			});
		}
	});
	
	function slidewidth(){
		var w = 0;
		$('.certificate .slide .box').each(function(){
			w += $(this).width();
			w += parseInt($(this).css('marginRight'));
		})
		
		return w;
	}
	
	$('.certificate .slide').width(slidewidth());
	
	$('.exhibition .list li').on('click',function(){
		$('.exhibition .list li').removeClass('active');
		$('.exhibition .list li').each(function(){
			$(this).children('img').attr('src','images/exhibition-list'+ $(this).index() +'.png');
			$('.exhibition .cont li').eq($(this).index()).hide();
		});
		$(this).addClass('active');
		$(this).children('img').attr('src','images/exhibition-listhide'+ $(this).index() +'.png');
		$('.exhibition .cont li').eq($(this).index()).show(1000);
	});
	
	$('.project .cont li').on('mouseover',function(){
		$('.project .cont li').removeClass('active');
		$(this).addClass('active');
	});
	
	$('.teacher .click-box li').on('click',function(){
		$('.teacher .click-box li').removeClass('active');
		$('.teacher .show-box li').fadeOut();
		$(this).addClass('active');
		$('.teacher .show-box li').eq($(this).index()).fadeIn();
	});
	
	$('.certificate .btn-l').on('click',function(){
		var l = parseInt($('.certificate .slide').css('left'));
		var minLength = $('.certificate .slide .box').length;
		var index = 0;
		if(l >= 0 || minLength <= 3){return};
		$('.certificate .slide .box').each(function(){
			if($(this).is('.active')){
				index = $(this).index();
				$(this).removeClass('active');
			}
		});
		
		if(onOff1){
			onOff1 = false;
			$('.certificate .slide').animate({'left':l+410},function(){
				$('.certificate .slide .box').eq(index-1).addClass('active');
				onOff1 = true;
			});
		}
	});
	
	$('.certificate .btn-r').on('click',function(){		
		var l = parseInt($('.certificate .slide').css('left'));
		var minLength = $('.certificate .slide .box').length;
		var index = 0;
		var maxLeft = $('.certificate .slide').width() - $('.certificate .slide .box').width() * ($('.certificate .slide .box').length/2 + 1);
		if(l <= -maxLeft || minLength <= 3){return};
		$('.certificate .slide .box').each(function(){
			if($(this).is('.active')){
				index = $(this).index();
				$(this).removeClass('active');
			}
		});
		if(onOff2){
			onOff2 = false;
			$('.certificate .slide').animate({'left':l-410},function(){
				$('.certificate .slide .box').eq(index+1).addClass('active');
				onOff2 = true;
			});
		}
		
	});
})();