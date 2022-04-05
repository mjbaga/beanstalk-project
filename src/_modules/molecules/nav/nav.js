'use strict';

import $ from 'jquery';
import 'jquery-hoverintent';
import enquire from 'enquire.js';
import { debounce, detectIE, timing, bp } from '../../../_scripts/_helper';

export default class Nav {
	constructor() {

		var stopAll = function(e) {
	    	// console.log(e.target)
	        var $nav = $(e.target).parents('.nav-container'),
	            stop = false;

	        if(!$nav.length) {

	        	stop = true;

		    } else {
                // https://stackoverflow.com/questions/6271237/detecting-when-user-scrolls-to-bottom-of-div-with-jquery
                if($nav.scrollTop() + $nav.innerHeight() >= $nav[0].scrollHeight) {
                    stop = true;
                    // Scroll back up a little bit so the user can grab it to scroll to the top
                    $nav[0].scrollTop = $nav[0].scrollHeight - $nav.innerHeight() - 1;
                }
	        }

	        if(stop) {
	        	e.stopPropagation();
	        	e.preventDefault();
	        }
	    }

		var closeAllMobileMenu = function() {
			$('.js-mobile-menu, .js-notification, .js-toggle-search, .js-toggle-submenu').removeClass('is-active');
			$('.nav-container, .notification-bar').slideUp();
			makeBodyNotFixed();
		}

		var makeBodyFixed = function() {
			$('.nav').on('touchmove', stopAll);
		}

		var makeBodyNotFixed = function() {
			$('.header:after').fadeOut(timing.quick);
			$('.nav').off('touchmove', stopAll);
		}

		var allMenuSlideUp = function() {
			$('.lvl1 li').each(function(){
				var $this = $(this),
					$submenu = $this.children('.js-toggle-submenu');

				if ($this.children('ul').length > 0) {
					$submenu.removeClass('is-active');
					if($submenu.children('i').hasClass('icon-minus-sign')) {
						$submenu.children('i').removeClass('icon-minus-sign').addClass('icon-plus-sign');
					}
					$this.children('ul').slideUp();
				}
			});
		}

		var toggleChild = '<button type="button" class="js-toggle-submenu"><span class="vh">Toggle Submenu</span><i class="icon-plus-sign"></i></button>';

		$('.lvl1 li').each(function(){
			var $this = $(this);
			if ($this.children('ul').length > 0) {
				$this.addClass('is-parent');
				$this.children('.nav__item').after(toggleChild);
			}
		})

		var header = $('.header');
        var lvl1Menu = $('.header .lvl1 > li');

		enquire
			.register("screen and (max-width:" + (bp.minDesktop - 1) +"px)", {
				match : function() { // on mobile and tablet

					$('.js-mobile-menu').off('click').on('click', function(e){
						e.preventDefault();

						var $this = $(this),
							nav = $this.closest('.nav'),
							lvl1 = nav.find('.nav-container'),
							maxHeight = 0;

						if (!$this.hasClass('is-active')) {
							closeAllMobileMenu();
						}

						$this.toggleClass('is-active');
						$('.nav-container').slideToggle();

						if($('.filters__wrapper').is(':visible')) {
							$('.filter-btn-mobile').trigger('click');
						}

						maxHeight = $(window).outerHeight() - $('.header').outerHeight();

						if($this.hasClass('is-active')) {
							lvl1.css({'max-height': maxHeight});

							if ($('.lvl1 > li').hasClass('is-current')) {
								var ulHeight = $('.lvl1 > li.is-current > ul').outerHeight(),
									currentLi = $('.lvl1 > li.is-current');
								// currentLi.addClass('is-active');
								// currentLi.children('ul').show();
								currentLi.children('.js-child').addClass('is-active');
								currentLi.children('.has-child').addClass('is-open');
							}
							makeBodyFixed();
						} else {
							lvl1.css({'max-height': 'auto'});
							$('.lvl1').find('ul').slideUp(timing.quick);
							makeBodyNotFixed();
						}
					});

					$('.js-notification').off('click').on('click', function(e){
						e.preventDefault();

						if (!$(this).hasClass('is-active')) {
							closeAllMobileMenu();
						}

						$(this).toggleClass('is-active');
						$('.notification-bar').slideToggle();
					});

					$('.js-toggle-submenu').off('click').on('click', function(e){
						e.preventDefault();

						var $this = $(this);

						if(!$this.hasClass('is-active')) {
							allMenuSlideUp();
						}

						$this.toggleClass('is-active');
						$this.children('i').toggleClass('icon-plus-sign icon-minus-sign');

						$this.parent().find('ul').slideToggle();
					});
				}
			})
			.register("screen and (min-width:" + bp.minDesktop +"px)", {
				match : function() { // on desktop
					$('.js-mobile-menu, .js-toggle-search, .js-toggle-submenu').off('click');

					$('.js-notification').off('click').on('click', function(e){
						e.preventDefault();

						$(this).toggleClass('is-active');
						$('.notification-bar').slideToggle();
					});

					var menuSlideDown;

                    lvl1Menu.hoverIntent({
                        over: function() {
                            var thisLi = $(this);
                            var navitem = thisLi.children('.nav__item');
                            var leftpos = (navitem.width() / 2) - 3;

                            navitem.addClass('is-active');

                            $('head').append('<style id="lvl2before" type="text/css">.lvl2:before { left: ' + leftpos + 'px } .lvl1 > li:last-child .lvl2:before { left: auto; right: ' + (leftpos * 2) + 'px }</style>');

                            thisLi.find('.lvl2').slideDown(300);
                        },
                        out: function() {
                            $(this).children('.nav__item').removeClass('is-active');
                            $(this).find('.lvl2').slideUp(300);
                            $('#lvl2before').remove();
                        }
                    });
				}
			});

		$('.js-close-notification').off('click').on('click', function(e){
			e.preventDefault();

			$('.js-notification').removeClass('is-active');
			$('.notification-bar').slideUp();
		});
	}
}
