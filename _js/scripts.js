var start = function() {
    // Random home background
    var images = ['/assets/img/headerphoto_1.jpg', '/assets/img/headerphoto_2.jpg', '/assets/img/headerphoto_3.jpg'];
    
    var url = images[Math.floor(Math.random() * images.length)];
    var img = new Image();
    img.onload = function(){
        $('.section--home__background').css('background-image', 'url(' + url + ')');
        $('.section--home__background').addClass('animated');
    };
    img.src = url;

    if(document.title === 'Jason Etcovitch') {
        $('nav [data-anchor^="#"]').each(function() {
            var anchor = $(this).attr("data-anchor");
            $(this).attr("href", anchor);
        });
    }
        
    // Smooth Scrolling Anchors
    $('nav a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
   
         'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
        });
    });
    
    
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.site-header').outerHeight();
    var windowHeight = $(window).height();
    
    $(window).scroll(function(event){
        didScroll = true;
    });
    
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 100);
    
    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('.site-header').removeClass('is-visible top-nav').addClass('is-hidden');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('.site-header').removeClass('is-hidden').addClass('is-visible');
            }
        } if(st < (windowHeight*0.3)) {
            $('.site-header').addClass('top-nav');
        } if($(window).scrollTop() + $(window).height() == $(document).height()) {
           $('.site-header').removeClass('is-hidden').addClass('is-visible');
       }
        
        lastScrollTop = st;
    }

    // Nav toggle for mobile
    var navButton = $('.site-header__button');
    var navOverlay = $('.site-header__overlay');
    var navToggleStuff = $('.site-header, .site-header__overlay, .site-header__button');

    navButton.click(function() {
        navToggleStuff.toggleClass('mobile-nav--toggled');
    });

    navOverlay.click(function() {
        navToggleStuff.removeClass('mobile-nav--toggled');
    })

    $('.site-header a').click(function() {
        navToggleStuff.removeClass('mobile-nav--toggled');
    })




    var sliderLength = $('.featured__slider').children().length;
    $('.featured__slide:nth-child(1)').addClass('featured__slide--active');

    var fadeToNext = function() {
        var currentSlide = $('.featured__slide--active');
        if ($('.featured__slide:nth-child(' + sliderLength + ')').hasClass('featured__slide--active')) {
           currentSlide.removeClass('featured__slide--active');
           $('.featured__slide:nth-child(1)').addClass('featured__slide--active');
        } else {
           currentSlide.removeClass('featured__slide--active');
           currentSlide.next().addClass('featured__slide--active');
        }
    }


    var fadeToPrev = function() {
        var currentSlide = $('.featured__slide--active');
        if ($('.featured__slide:nth-child(1)').hasClass('featured__slide--active')) {
           currentSlide.removeClass('featured__slide--active');
           $('.featured__slide:nth-child(' + sliderLength + ')').addClass('featured__slide--active');
        } else {
           currentSlide.removeClass('featured__slide--active');
           currentSlide.prev().addClass('featured__slide--active');
        }
    }

    $('.next').click(fadeToNext);
    $('.prev').click(fadeToPrev);

};