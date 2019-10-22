/* 
               | Capital Hill Barbershop by Gold Block Chain
               | License: Don't take it
              _|_
             |   |
           __|___|__
  ________\         /_______
 /         \       /
|         ___      _     _        
|        / _ \___ | | __| |       
|       / /_\/ _ \| |/ _` |       
|      / /_\| (_) | | (_| |       
|      \____/\___/|_|\__,_|       
|    ___ _            _      
|   / __| | ___   ___| | __  
|  /__\/| |/ _ \ / __| |/ /  
| / \/  | | (_) | (__|   <   
| \_____|_|\___/ \___|_|\_\  
|    ___ _           _       
|   / __| |__   __ _(_)_ __  
|  / /  | '_ \ / _` | | '_ \ 
| / /___| | | | (_| | | | | |
| \____/|_| |_|\__,_|_|_| |_|
|
| */

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Touch mode.
			if (skel.vars.mobile)
				$body.addClass('is-touch');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly();

		// Header.
		// If the header is using "alt" styling and #banner is present, use scrollwatch
		// to revert it back to normal styling once the user scrolls past the banner.
			if ($header.hasClass('alt')
			&&	$banner.length > 0) {

				$window.on('load', function() {

					$banner.scrollwatch({
						delay:		0,
						range:		0.98,
						anchor:		'top',
						on:			function() { $header.addClass('alt reveal'); },
						off:		function() { $header.removeClass('alt'); }
					});

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							$banner.scrollwatchSuspend();
						else
							$banner.scrollwatchResume();

					});

				});

			}

		// Dropdowns.
			$('#nav > ul').dropotron({
				alignment: 'right',
				hideDelay: 400
			});

		// Off-Canvas Navigation.

			// Title Bar.
			// 	$(
			// 		'<div id="titleBar">' +
			// 			'<a href="#navPanel" class="toggle"></a>' +
			// 			'<span class="title">' + $('#logo').html() + '</span>' +
			// 		'</div>'
			// 	)
			// 		.appendTo($body);

			// // Navigation Panel.
			// 	$(
			// 		'<div id="navPanel">' +
			// 			'<nav>' +
			// 				$('#nav').navList() +
			// 			'</nav>' +
			// 		'</div>'
			// 	)
					// .appendTo($body)
					// .panel({
					// 	delay: 500,
					// 	hideOnClick: true,
					// 	hideOnSwipe: true,
					// 	resetScroll: true,
					// 	resetForms: true,
					// 	side: 'left',
					// 	target: $body,
					// 	visibleClass: 'navPanel-visible'
					// });

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navPanel')
						.css('transition', 'none');

	});

})(jQuery);