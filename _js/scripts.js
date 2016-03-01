var start = function() {

	var homeButton = $('.home__button');

	homeButton.click(function() {
		$(this).parent().addClass('home--hidden');
	});

	// $(".section--work").owlCarousel({
	// 	items: 5,
	// 	itemsDesktop: [1280,4],
	// 	itemsDesktopSmall: [979,3],
	// 	itemsTablet: [768,2],
	// 	itemsMobile: [479,1],

	// 	navigation: true,
	// 	pagination: false
	// });

	var post       = $('.post');
	var container  = $('.section--work');
	var next       = $('.next');
	var prev       = $('.prev');
    var postCount = 3

    post.css("width", "" + 100 / postCount + "%");
    post.css({transform: 'translate3d(0,0,0)'});

    var step =  container.width() / postCount;

    next.click(function() {
        var current_pull = parseInt(post.css('transform').split(',')[4]);

        console.log(container.width() - step);

        if(current_pull == 0 - Math.round(container.width() - step)) {
            // DO NOTHING
        } else {
            var new_pull = current_pull - step;
            post.css({transform: 'translate3d(' + Math.round(new_pull) + 'px, 0, 0'});
        }
    });

    prev.click(function() {    
        var current_pull = parseInt(post.css('transform').split(',')[4]);

        if(current_pull == 0) {
            // DO NOTHING
        } else {
            var new_pull = current_pull + step;
            post.css({transform: 'translate3d(' + Math.round(new_pull) + 'px, 0, 0'});
        }
    });


}