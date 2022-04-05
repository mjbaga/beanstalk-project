'use strict';

import $ from 'jquery';
import 'slick-carousel';
import enquire from 'enquire.js';
import { bp } from '../../../_scripts/_helper';

export default class StorySection {
	constructor() {
		let $carouselWrapper = $('.story-section'),
			$textCarousel = $('.story-section__stories', $carouselWrapper),
			$imageCarousel = $('.story-section__featured-image', $carouselWrapper);

		enquire
			.register("screen and (max-width:" + (bp.minDesktop - 1) +"px)", {
				match : function() { // on mobile and tablet
					$textCarousel.slick({
						arrows: false,
						asNavFor: '.story-section__featured-image',
						speed: 1500,
						dots: true,
						mobileFirst: true,
						fade: true,
						adaptiveHeight: true,
						accessibility: false
					});

					$imageCarousel.slick({
						arrows: true,
						asNavFor: '.story-section__stories',
						speed: 1500,
						mobileFirst: true,
						fade: true,
						accessibility: false
					});
				}
			})
			.register("screen and (min-width:" + bp.minDesktop +"px)", {
				match : function() { // on desktop
					$textCarousel.slick({
						arrows: false,
						asNavFor: '.story-section__featured-image',
						speed: 1500,
						dots: true,
						customPaging : function(slider, i) {
					        var thumb = $(slider.$slides[i]).data('thumb');
					        return '<a><img src="' + thumb + '"></a>';
					    },
						mobileFirst: true,
						fade: true,
						accessibility: false
					});

					$imageCarousel.slick({
						// arrows: false,
						asNavFor: '.story-section__stories',
						speed: 1500,
						mobileFirst: true,
						fade: true,
						accessibility: false
					});
				}
			});
	}
}
