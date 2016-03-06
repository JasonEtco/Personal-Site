(function(j,a,s,o,n,e,t){j['GoogleAnalyticsObject']=n;j[n]=j[n]||function(){
  (j[n].q=j[n].q||[]).push(arguments)},j[n].l=1*new Date();e=a.createElement(s),
  t=a.getElementsByTagName(s)[0];e.async=1;e.src=o;t.parentNode.insertBefore(e,t)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-72564268-1', 'auto');
  ga('send', 'pageview');

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

      ga('set', { 'page': document.location.pathname, 'title': document.title });
      ga('send', 'pageview');
    }
  },
  smoothState = $('#main').smoothState(options).data('smoothState');
});