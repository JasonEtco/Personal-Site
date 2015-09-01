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


    
    // Nav logo Appear after first section
    $(window).scroll(function() {
        var height = $(window).height();
        if ($(window).scrollTop() >= height / 2) {
          $('.nav__logo, .arrow--up').addClass('animated');
        } else {
          $('.nav__logo, .arrow--up').removeClass('animated');
        }
    });
    
    
    $('.arrow--up').click(function() {
      $('html,body').animate({ scrollTop: 0 }, 'slow', function () {
                          // swag out
                        });
    });
    
    
    // Toggle mobile nav
    $('.nav__mobile-button').on('click', function() {
        $('.header-wrapper, .overlay').addClass('js__header-wrapper--open');
    
        $('.overlay, .nav__link').on('click', function() {
            $('.header-wrapper, .overlay').removeClass('js__header-wrapper--open');
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
        } if(st < (windowHeight*0.4)) {
            $('.site-header').addClass('top-nav');
        } if($(window).scrollTop() + $(window).height() == $(document).height()) {
           $('.site-header').removeClass('is-hidden').addClass('is-visible');
       }
        
        lastScrollTop = st;
    }

    // Initialize Isotope
    var $container = $('.content-wrapper');
    // init
    $container.isotope({
        // options
        itemSelector: '.project',
        layoutMode: 'fitRows'
    });

    $(document).ready(function() {
        $container.delay(2000).isotope({ filter: '*' });
    });

    // filter items on button click
    $('#filters, #filters--dropdown').on( 'click', '.button', function() {
        var filterValue = $(this).attr('data-filter');
    $container.isotope({ filter: filterValue });
    });
};