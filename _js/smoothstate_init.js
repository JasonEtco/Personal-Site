// SmoothState
;(function ($) {
    'use strict';
    var $body    = $('html, body'),
        content  = $('#main').smoothState({
            prefetch: true,
            pageCacheSize: 4,
            onStart: {
                duration: 600,
                render: function (url, $container) {
                    content.toggleAnimationClass('is-exiting');
                    $body.animate({
                        scrollTop: 0
                    });
                }
            },

            callback: function(url, $container, $content) {
                // Call start function to use JS after smoothstate
                start();
                form_start();
            },
        }).data('smoothState');
})(jQuery);

$(document).ready(function() {
    start();
    form_start(); 
});