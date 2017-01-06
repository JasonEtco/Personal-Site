var start = function() {

    var nav = document.querySelector('.site-header');
	var homeButton = document.querySelector('.home__button');
    var navWorkButton = document.querySelector('.nav__work-button');

    if(homeButton) {
        homeButton.addEventListener("click", function() {
            this.parentElement.classList.add('home--hidden');
        });

        navWorkButton.addEventListener("click", function() {
            homeButton.parentElement.classList.add('home--hidden');
        });
    }

////////////////////////////////////////////////////////////////////////////////////////

    // SLIDER
    var workContainer  = document.querySelector('.section--work');
	var post           = document.querySelectorAll('.work__post');
	var next           = document.querySelector('.work__next');
	var prev           = document.querySelector('.work__prev');

    function nextSlide() {
        // Recalculates postCount in case page has resized
        var postCount = Math.round(workContainer.getBoundingClientRect().width / post[0].getBoundingClientRect().width);

        // Get integer for current value of transform property
        // Uses RegEx to get the right value
        var current_pull = post[0].style.transform.match(/-?[\d\.]+/g)[1];

        // Checks to see if the slider is at the end
        if(current_pull != (post.length - postCount) * -100) {
            // Variable for a new value
            // which is the sum of where it
            // is now plus the step variable
            var new_pull = current_pull - 100;

            // Applies the new variable and rounds
            [].forEach.call(post, function(e) {
                window.requestAnimationFrame(function(t) {
                    console.info('Got animation frame!', t);
                    e.style.transform = 'translate3d(' + new_pull + '%,0,0)';
                });
            });
        } else {
            // If at the end, go back to the beginning
            [].forEach.call(post, function(e) {
                window.requestAnimationFrame(function() {
                    e.style.transform = 'translate3d(0,0,0)';
                });
            });
        }
    }

    function prevSlide() {
        // Get integer for current value of transform property
        // Uses RegEx to get the right value
        var current_pull = post[0].style.transform.match(/-?[\d\.]+/g)[1];

        // Checks if the transform is currently at 0
        // to tell if the slider has moved yet
        if(current_pull != 0) {
            // Variable for a new value
            // which is the sum of where it
            // is now plus the step variable
            var new_pull = parseInt(current_pull) + 100;

            // Applies the new variable and rounds
            [].forEach.call(post, function(e) {
                window.requestAnimationFrame(function() {
                    e.style.transform = 'translate3d(' + new_pull + '%,0,0)';
                });
            });
        }
    }

    if(workContainer) {
        // Hide arrows if unnecessary
        if(workContainer.getBoundingClientRect().width == post[0].getBoundingClientRect().width * post.length) {
            next.style.display = 'none';
            prev.style.display = 'none';
        }

        var postCount = workContainer.getBoundingClientRect().width / post[0].getBoundingClientRect().width;

        [].forEach.call(post, function(e) {
            window.requestAnimationFrame(function() {
                e.style.transform = 'translate3d(0,0,0)';
            });
        });

        window.onresize = function() {
            // Hide arrows if unnecessary
            if(workContainer.getBoundingClientRect().width == post[0].getBoundingClientRect().width * post.length) {
                next.style.display = 'none';
                prev.style.display = 'none';
            } else {
                next.style.display = 'inline-block';
                prev.style.display = 'inline-block';
            }

            [].forEach.call(post, function(e) {
               window.requestAnimationFrame(function() {
                e.style.transform = 'translate3d(0,0,0)';
               });
            });
        }

        // On NEXT button click
        next.addEventListener("click", function() {
            nextSlide();
        });


        // On PREVIOUS button click
        prev.addEventListener("click", function() {
            prevSlide();
        });
    }
    // END SLIDER

////////////////////////////////////////////////////////////////////////////////////////

    var headerImage = document.querySelector('#post__header-image');

    if(headerImage) {
        imagesLoaded( headerImage, { background: true }, function() {
            headerImage.classList.add('loaded');
        });

        window.onscroll = function() {
            var pageHeight = window.innerHeight;
            var scrollDown = document.querySelector('.post__scroll');

            if(window.pageYOffset > pageHeight / 4) {
                scrollDown.classList.add('post__scroll--hidden');
                nav.classList.add('site-header--has-bg');
            } else {
                scrollDown.classList.remove('post__scroll--hidden');
                nav.classList.remove('site-header--has-bg');
            }
        };
    }

    if(workContainer) {
        [].forEach.call(post, function(e) {
            imagesLoaded( e, { background: true }, function() {
                e.classList.add('loaded');
            });
        });
    }
}