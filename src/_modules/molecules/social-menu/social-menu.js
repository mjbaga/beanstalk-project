'use strict';

import $ from 'jquery';
import enquire from 'enquire.js';
import 'jquery-hoverintent';

export default class SocialMenu {
	constructor() {

		// var $widget = $('.global-share-widget'),
		// 	$sharerPlatforms = $('.sharer-platforms', $widget);

		// var setupMobileFunc = function(){

		// 	$('.sharer-label', $widget).on('touchend click', function(e){
		// 		e.preventDefault();

		// 		if($sharerPlatforms.css('display') === 'none') {
		// 			$sharerPlatforms.stop().slideDown();
		// 		} else {
		// 			$sharerPlatforms.stop().slideUp();
		// 		}
		// 	});
		// };

		// var resetMobileFunc = function(){
		// 	$('.sharer-label', $widget).off();
		// 		$sharerPlatforms.css({
		// 			'display': ''
		// 		});
		// };

		// //when it's mobile and tablet
		enquire.register("screen and (max-width: 1023px)", {

		    match : function() {
		        // setupMobileFunc();
		    },
		    unmatch : function() {
		        // resetMobileFunc();
		    }
		});


		enquire.register("screen and (min-width: 1024px)", {

		    match : function() {
				var height = 0;
				var $share = $('.sharer'),
					shareItem = $share.children('.visit');

				$('.sharer-platforms a').each(function(){
					height += $(this).outerHeight();
				})

				$('.global-share-widget .sharer').off('mouseenter').on('mouseenter', function(){
					$(this).find('.sharer-platforms').css('height', height);
				}).off('mouseleave').on('mouseleave', function(){
					$(this).find('.sharer-platforms').css('height', 0);
				})

				$share.hoverIntent({
                    over: function() {
                        shareItem.addClass('show-visit');
                    },
                    out: function() {
                        shareItem.removeClass('show-visit');
                    },
                    timeout: 100
                });

		    },
		    unmatch : function() {
				$('.global-share-widget .sharer').off('mouseenter mouseleave');
				$('.sharer-platforms').css('height', 'auto');
		    }
		});
	}
}
