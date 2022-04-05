// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
// import 'jquery-nice-select';
import 'jquery-match-height';
import objectFitImages from 'object-fit-images';
import doT from 'dot';
import moment from 'moment';
import Emitter from 'tiny-emitter';

window.doT = doT;
window.moment = moment;

import Link from '../_modules/atoms/button/button';
import Header from '../_modules/organisms/header/header';
import Nav from '../_modules/molecules/nav/nav';
import Carousel from '../_modules/organisms/carousel/carousel'
import CarouselCard from '../_modules/organisms/carousel-card/carousel-card'
import StorySection from '../_modules/organisms/story-section/story-section'
import MediaSection from '../_modules/organisms/media-section/media-section'
import StoryCards from '../_modules/organisms/story-cards/story-cards'
import Filters from '../_modules/molecules/filters/filters'
import FbFeed from '../_modules/molecules/fb-feed/fb-feed'
import ImgCard from '../_modules/molecules/img-card/img-card'
import Backtotop from '../_modules/atoms/backtotop/backtotop'
import Rte from '../_modules/molecules/rte/rte'
import SocialMenu from '../_modules/molecules/social-menu/social-menu';

$(() => {
	window.emitter = new Emitter();
	new Link();
	new Header();
	new Nav();
	new Carousel();
	new CarouselCard();
	new StorySection();
	new MediaSection();
	new StoryCards();
	new Filters();
	new FbFeed();
	new ImgCard();
	new Backtotop();
	new Rte();
	new SocialMenu();

	objectFitImages();

	$.fn.matchHeight._maintainScroll = true;
	$('.matchHeight').matchHeight();

	// $('select').niceSelect();

	var $root = $('html, body');

	$('.js-backtotop, a[href="#top"]').on('click',function(e) {
		e.preventDefault();
		$root.animate({
			scrollTop: 0
		});
	});

});
