(function(){
	var mySwiper1 = new Swiper('.swiper1', {
	//	effect : 'fade',
		autoplay : 4000,
		speed:800,
		autoplay:{
			disableOnInteraction: false,
		},
	});
	
	var slideLength = $('.swiper2 .swiper-slide').length;
	
	var mySwiper2 = new Swiper('.swiper2', {
		loop : true,
		autoplay:false,
		loopedSlides:slideLength,
	});
	
	var mySwiper3 = new Swiper('.swiper3', {
		loop : true,
		slidesPerView :2,
		spaceBetween : 6,
		autoplay:false,
		slideToClickedSlide: true,
		loopedSlides:slideLength,
	});
	
	
	var mySwiper4 = new Swiper('.swiper4', {
		speed:1000,
		autoplay: {
		    delay: 3000,
		    disableOnInteraction: false,
	    },
	    on: {
	   		slideChangeTransitionStart: function(){
			    $('.caselist .list-txt li').removeClass('show');
				$('.caselist .list-txt li').eq(this.activeIndex).addClass('show');
			},
	  	},
	});
	
	var mySwiper5 = new Swiper('.swiper5', {
		speed:800,
		spaceBetween : 6,
		autoplay:{
			delay: 3000,
			disableOnInteraction: false,
		},
		on:{
	   		slideChangeTransitionStart: function(){
			    $('.teacher .paging li').removeClass('active');
				$('.teacher .paging li').eq(this.activeIndex).addClass('active');
			},
	  	},
	});
	
	var mySwiper6 = new Swiper('.swiper6', {
		spaceBetween : 10,
		autoplay : false,	
	});
	
	var mySwiper7 = new Swiper('.swiper7', {
		autoplay : false,
		spaceBetween : 12,
		on:{
	   		slideChangeTransitionStart: function(){
			    $('.news .menu  li').removeClass('active');
				$('.news .menu  li').eq(this.activeIndex).addClass('active');
			},
	  	},
	});
	
	mySwiper2.controller.control = mySwiper3;
    mySwiper3.controller.control = mySwiper2;
	
	
	$('.base .btnl').on('touchend',function(){
		mySwiper2.slidePrev();
	});
	
	$('.base .btnr').on('touchend',function(){
		mySwiper2.slideNext();
	});
	
	$('.caselist .btn-l').on('touchend',function(){
		mySwiper4.slidePrev();
	});
	
	$('.caselist .btn-r').on('touchend',function(){
		mySwiper4.slideNext();
	});
	
	$('.certificate .btn-l').on('touchend',function(){
		mySwiper6.slidePrev();
	});
	
	$('.certificate .btn-r').on('touchend',function(){
		mySwiper6.slideNext();
	});
	
	$('.product .list li').on('touchend',function(){
		$('.product .list li').removeClass('active');
		$('.product .list-cont li').fadeOut();
		$('.product .list li').eq($(this).index()).addClass('active');
		$('.product .list-cont li').eq($(this).index()).fadeIn();
	});
	
	$('.future .menu li').on('touchend',function(){
		$('.future .menu li').removeClass('active');
		$('.future .cont li').fadeOut();
		$('.future .menu li').eq($(this).index()).addClass('active');
		$('.future .cont li').eq($(this).index()).fadeIn();
	});
	
	$('.stage .menu li').on('touchend',function(){
		$('.stage .cont li').fadeOut();
		$('.stage .cont li').eq($(this).index()).fadeIn();
	});
	
	$('.teacher .paging li').on('touchend',function(){
		mySwiper5.slideTo($(this).index(), 1000, false);
		$('.teacher .paging li').removeClass('active');
		$('.teacher .paging li').eq($(this).index()).addClass('active');
	});
	
	$('.news .menu  li').on('touchend',function(){
		mySwiper7.slideTo($(this).index(), 1000, false);
		$('.news .menu  li').removeClass('active');
		$('.news .menu  li').eq($(this).index()).addClass('active');
	});
	
	$('.copyright .back-top').on('touchend',function(){
		$('html,body').animate({scrollTop: 0},'slow');
	});
})();


