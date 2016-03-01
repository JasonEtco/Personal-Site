$(document).ready(function() {
    start();
});


$(function(){
  'use strict';
  var $body    = $('html, body');
  var options = {
    prefetch: true,
    cacheLength: 2,
    
    onStart: {
      duration: 650, // Duration of our animation
      render: function ($container) {
        
        // Add your CSS animation reversing class
        $container.addClass('is-exiting');
        
        $body.animate({
          scrollTop: 0
        });
        
        // Restart your animation
        smoothState.restartCSSAnimations();
      }
    },
    
    onReady: {
      duration: 0,
      render: function ($container, $newContent) {
        // Remove your CSS animation reversing class
        $container.removeClass('is-exiting');

        // Inject the new content
        $container.html($newContent);
      }
    },
    
    onAfter: function($container) {
      start();
      form_start();
    }
  },
  smoothState = $('#main').smoothState(options).data('smoothState');
});