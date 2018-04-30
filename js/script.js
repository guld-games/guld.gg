jQuery(function ($) {
    'use strict';
    (function () {
		// Select all links with hashes
		$('a[href*="#"]')
		  // Ignore links that don't actually link to anything
		  .not('[href="#"]')
		  .not('[href="#0"]')
		  .on('click', function(ev){
		    // On-page links
		    if (
		      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
		      && 
		      location.hostname == this.hostname
		    ) {
		      // Determine element to scroll to
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		      // Does a scroll target exist?
		      if (target.length) {
		        // Only prevent default if animation is actually gonna happen
		        ev.preventDefault();
		        // Scroll Animation
		        $('html, body').animate({
		          scrollTop: target.offset().top - 20 //scroll position fix
		        }, 737, function() {
		          // Callback after animation
		          // Focus pocus!
		          var $target = $(target);
		          $target.focus();
		          if ($target.is(':focus')) { // Check if the target was focused
		            return false;
		          } else {
		            $target.attr('tabindex','-1'); // Adding tabindex for non focusable elements
		            $target.focus(); // Reset focus
		          };
		        });
		      }
		    }
		  });
		  // Youtube Popup  
		  $('.yt').grtyoutube();
		  //Close Navbar when link is clicked
		  $('.navbar-nav>li>a,nav a').on('click', function(){
		  	$('.navbar-collapse').collapse('hide');
		  });
    }());
}); // JQuery end