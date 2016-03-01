var start = function() {

	var homeButton = $('.home__button');

	homeButton.click(function() {
		$(this).parent().addClass('home--hidden');
	});


    // SLIDER
    var container  = $('.section--work');
	var post       = $('.work__post');
    var postNum    = post.length;
	var next       = $('.work__next');
	var prev       = $('.work__prev');

    var postCount = container.width() / parseInt(post.css("width"));

    post.css({transform: 'translate3d(0,0,0)'});

    // Gets a pixel value of how much the elements should translate
    var step =  container.width() / postCount;


    // On NEXT button click
    next.click(function() {
        // Recalculates postCount in case page has resized
        var postCount = container.width() / parseInt(post.css("width"));
        var step =  container.width() / postCount;

        // Get integer for current value of transform property
        // Takes [4] of the transform array which is the X value
        var current_pull = parseInt(post.css('transform').split(',')[4]);

        if(current_pull == (postNum * step - step * postCount) * -1) {
            console.log("I'm stopping here thanks");
        } else {

            // Variable for a new value
            // which is the sum of where it
            // is now plus the step variable
            var new_pull = current_pull - step;

            // Applies the new variable and rounds
            post.css({transform: 'translate3d(' + new_pull + 'px, 0, 0'});
        }
    });


    // On PREVIOUS button click
    prev.click(function() {
        // Recalculates postCount and step in case page has resized
        var postCount = container.width() / parseInt(post.css("width"));
        var step =  container.width() / postCount;

        // Get integer for current value of transform property
        // Takes [4] of the transform array which is the X value
        var current_pull = parseInt(post.css('transform').split(',')[4]);

        // Checks if the transform is currently at 0
        // to tell if the slider has moved yet
        if(current_pull == 0) {

            // DO NOTHING

        } else {

            // Variable for a new value
            // which is the sum of where it
            // is now plus the step variable
            var new_pull = current_pull + step;

            // Applies the new variable and rounds
            post.css({transform: 'translate3d(' + Math.round(new_pull) + 'px, 0, 0'});
        }
    });


}