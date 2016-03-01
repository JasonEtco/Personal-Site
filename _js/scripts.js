var start = function() {

	var homeButton = $('.home__button');

	homeButton.click(function() {
		$(this).parent().addClass('home--hidden');
	});

	$(".section--work").owlCarousel({
		items: 5,
		itemsDesktop: [1280,4],
		itemsDesktopSmall: [979,3],
		itemsTablet: [768,2],
		itemsMobile: [479,1],

		navigation: true,
		pagination: false
	});

}