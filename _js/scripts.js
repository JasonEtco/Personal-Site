var start = function() {
    // Random home background

        // // Determine random number
        // var backNum = (Math.floor((Math.random() * 3) + 1));
        
        // $('#headerphoto_'+ backNum).ready(function() {
        //     $('.section--home__background').css('background-image', 'url("/assets/img/headerphoto_'+ backNum +'.jpg")');
        //     $('.section--home__background').fadeIn(1000);
        // });
        
        var images = ['/assets/img/headerphoto_1.jpg', '/assets/img/headerphoto_2.jpg', '/assets/img/headerphoto_3.jpg'];
        
        var url = images[Math.floor(Math.random() * images.length)];
        var img = new Image();
        img.onload = function(){
            $('.section--home__background').css('background-image', 'url(' + url + ')');
            $('.section--home__background').addClass('animated');
        };
        img.src = url;


    
    // Smooth Scrolling Anchors

        $('nav a[href^="#"], .arrow--down a[href^="#"]').on('click',function (e) {
            e.preventDefault();
    
            var target = this.hash;
            var $target = $(target);
    
            $('.arrow--down i').removeClass('animating');
            $('html, body').stop().animate({
       
             'scrollTop': $target.offset().top
            }, 900, 'swing', function () {
                $('.arrow--down i').addClass('animating');
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
};