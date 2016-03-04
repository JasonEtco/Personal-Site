var start = function() {

	var homeButton = document.querySelector('.home__button');

    if(homeButton) {
        homeButton.addEventListener("click", function() {
            this.parentElement.classList.add('home--hidden');
        });
    }

////////////////////////////////////////////////////////////////////////////////////////

    // SLIDER
    var container  = $('.section--work');
	var post       = $('.work__post');
    var postNum    = post.length;
	var next       = $('.work__next');
	var prev       = $('.work__prev');

    var postCount = container.width() / parseInt(post.css("width"));

    post.css({transform: 'translate3d(0,0,0)'});

    window.onresize = function() {
        post.css({transform: 'translate3d(0,0,0)'});
    }

    // On NEXT button click
    next.click(function() {
        // Recalculates postCount in case page has resized
        var postCount = Math.round(container.width() / parseInt(post.css("width")));

        // Get integer for current value of transform property
        // Uses RegEx to get the right value
        var current_pull = post[0].style.transform.match(/-?[\d\.]+/g)[1];

        // Checks to see if the slider is at the end
        if(current_pull == -100 * (postNum - postCount)) {
            // AT END
        } else {
            // Variable for a new value
            // which is the sum of where it
            // is now plus the step variable
            var new_pull = current_pull - 100;

            // Applies the new variable and rounds
            post.css({transform: 'translate3d(' + new_pull + '%, 0, 0)'});
        }
    });


    // On PREVIOUS button click
    prev.click(function() {
        // Get integer for current value of transform property
        // Uses RegEx to get the right value
        var current_pull = post[0].style.transform.match(/-?[\d\.]+/g)[1];

        // Checks if the transform is currently at 0
        // to tell if the slider has moved yet
        if(current_pull == 0) {
            // AT BEGINNING
        } else {

            // Variable for a new value
            // which is the sum of where it
            // is now plus the step variable
            var new_pull = parseInt(current_pull) + 100;

            // Applies the new variable and rounds
            post.css({transform: 'translate3d(' + new_pull + '%, 0, 0)'});
        }
    });
    // END SLIDER

////////////////////////////////////////////////////////////////////////////////////////

    var headerImage = document.querySelector('#post__header-image');

    if(headerImage) {
        imagesLoaded( headerImage, { background: true }, function() {
            headerImage.classList.add('loaded');
        });
    }



    window.onscroll = function() {
        var pageHeight = window.innerHeight;
        var scrollDown = document.querySelector('.post__scroll');

        if(window.pageYOffset > pageHeight - 40) {
            scrollDown.classList.add('post__scroll--hidden');
        } else {
            scrollDown.classList.remove('post__scroll--hidden');
        }
    };

}