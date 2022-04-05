'use strict';

import $ from 'jquery';
import 'slick-carousel';

export default class Carousel {
	constructor() {
		let _self = this,
			$carouselWrapper = $('.home-banner__carousel'),
			$textCarousel = $('.text-carousel', $carouselWrapper),
			$imageCarousel = $('.image-carousel', $carouselWrapper);

		$textCarousel.slick({
			asNavFor: '.image-carousel',
			speed: 2000,
			dots: true,
			mobileFirst: true,
			fade: true,
			swipe: true,
			accessibility: false,
			// arrows: false,
			// responsive: [
			// 	{
			// 		breakpoint: 767,
			// 		settings: {
			// 			arrows: true
			// 		}
			// 	}
			// ]
		});

		$imageCarousel.slick({
			infinite: true,
			arrows: false,
			speed: 2000,
			pauseOnHover: true,
			fade: true,
			swipe: true,
			accessibility: false,
		});
	}
}
