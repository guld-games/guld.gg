jQuery(function ($) {
    'use strict';
    (function () {
		// jQuery one page scroll
		$("a").on('click', function(e) {
		  if (this.hash !== "") {
		     e.preventDefault();
		     var h = this.hash;
		     $('html, body').animate({
		       scrollTop: $(h).offset().top
		     }, 737, function(){
		       window.location.hash = h;
		     });
		   }
		});
		// Active styling & close navbar when link is clicked
		$('.navbar-nav>li>a,nav a').on('click', function(){
			$(this).addClass("active");
			$('.navbar-collapse').collapse('hide');
		});
		// Open all external links in new window
		$('a').filter(function () {return this.hostname != window.location.hostname;}).attr('target', '_blank');			
    }());
}); // JQuery end