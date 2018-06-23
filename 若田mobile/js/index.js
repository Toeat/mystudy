var mySwiper1 = new Swiper('.swiper1', {
//	effect : 'fade',
	autoplay : 4000,
	speed:800,
	autoplay:{
		disableOnInteraction: false,
	},
	on: {
		
  	},
});

var mySwiper2 = new Swiper('.swiper2', {
	autoplay:false,
});

var mySwiper3 = new Swiper('.swiper3', {
	loop : true,
	slidesPerView :2,
	spaceBetween : 6,
	autoplay:false,
});