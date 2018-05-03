jQuery(function ($) {
    'use strict';
    (function () {
		// Select all links with hashes
		$('a[href*=#]:not([href=#])').on('click', function(){
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
		        || location.hostname == this.hostname) {
		        var target = $(this.hash);
		        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		           if (target.length) {
		             $('html,body').animate({
		                 scrollTop: target.offset().top - 20 //scroll position fix
		            }, 737);
		            return false;
		        }
		    }
		});
		// Youtube Popup $('.yt').grtyoutube();
		//Active styling & close navbar when link is clicked
		$('.navbar-nav>li>a,nav a').on('click', function(){
			$(this).addClass("active");
			$('.navbar-collapse').collapse('hide');
		});
    }());
}); // JQuery end