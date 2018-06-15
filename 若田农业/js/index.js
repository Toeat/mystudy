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
