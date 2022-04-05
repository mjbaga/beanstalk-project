'use strict';

import $ from 'jquery';
import 'slick-carousel';
import enquire from 'enquire.js';
import 'jquery-match-height';
import doT from 'dot';
import { bp } from '../../../_scripts/_helper';

export default class CarouselCard {
	constructor() {

		let $category = $('.category__item'),
			$categoryLink = $category.find('a'),
			$categorySelect = $('.select-categories');

		let styleImgCard = function(){

			$('.img-cards').slick({ 
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				mobileFirst: true,
				accessibility: false,
				responsive: [
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 1023,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					}
				]
			}).on('init', function(event, slick){ 
				// to hide the dots when there is only 1
				console.log("slick: ", slick);
				if (slick.$dots[0].children.length == 1) { 
					$(slick.$dots[0]).hide();
				}
			}).on('setPosition', function(event, slick){
				if (slick.$dots[0].children.length == 1) {
					$(slick.$dots[0]).hide();
				}
			});
			
			$('.img-card .text').matchHeight();
		}

		window.emitter.on('fontSizeChange', function() {
			$('.img-card .text').css('height','auto').matchHeight._update();			
		});
		
		styleImgCard();

		if ($('.carousel-card__cards').length > 0) {
			
			let $listingContainer = $('.carousel-card__cards'),
				$list = $('.img-cards', $listingContainer),
				apiURL = $listingContainer.data('api') || '/api/highlights'
	
			let listItemTemplate = doT.template($('#dotHighlights').html());
			
			// rendering the list into the template
			let renderListItems = function(data, appendContent) {
				// console.log('renderListItems', data);
				let append = appendContent || false;
	
				let _renderedHTML = listItemTemplate(data);
				
				if (append) {
					$list.append(_renderedHTML);
					styleImgCard();
				} else {
					var height = $list.outerHeight();
					$list.css('min-height',height);
					$list.fadeOut();
					
					$('.img-cards.slick-initialized').slick('unslick');
					$list.empty();
					
					setTimeout(function(){ //this timeout is to ensure the list already faded out before changing the content
						$list.html(_renderedHTML).fadeIn();
						styleImgCard();
					}, 350);
				}
			};
	
			let filterHighlights = function(persona, url) {
				// console.log('filterHighlights', persona);
				if (!url) {
					url = apiURL;
				}

				$.ajax({
					url: url,
					method: 'get',
					data: {
						"persona": persona 
					},
					dataType: 'json',
					cache: true
				})
				.done(function(data) {
					renderListItems(data);
				});
			}
	
			$categoryLink.on('click', function(e) {
				e.preventDefault();
	
				var $this = $(this),
					parent = $this.parent(),
					persona = $this.data('value');
	
				// $categorySelect.val(persona).niceSelect('update');
	
				if (!parent.hasClass('is-active')) {
					
					//!!IMPORTANT!! ADD BELOW BEFORE PASSING TO BE
					// filterHighlights(persona);
					//!!IMPORTANT!! ADD ABOVE BEFORE PASSING TO BE


					//!!IMPORTANT!! REMOVE BELOW BEFORE PASSING TO BE
					if (persona == 'pre-service-students') {
						filterHighlights(persona, '/api/highlights-pre-service-students');
					} else if (persona == 'educarers') {
						filterHighlights(persona, '/api/highlights-educarers');
					} else if (persona == 'pre-school-teachers') {
						filterHighlights(persona, '/api/highlights-pre-school-teachers');
					} else if (persona == 'centre-leaders') {
						filterHighlights(persona, '/api/highlights-centre-leaders');
					} else if (persona == 'parents') {
						filterHighlights(persona, '/api/highlights-parents');
					}
					//!!IMPORTANT!! REMOVE ABOVE BEFORE PASSING TO BE

					parent.addClass('is-active');
					parent.siblings().removeClass('is-active');
				}
			})
	
			$categorySelect.on('change', function(){
				console.log('change');
	
				var $this = $(this),
					persona = $this.val();
	
				filterHighlights(persona);
				$categoryLink.find('[data-value="' + persona + '"]').addClass('is-active');
				$categoryLink.find('[data-value="' + persona + '"]').siblings().removeClass('is-active');
			})
		}

		enquire
			.register("screen and (min-width:" + bp.minDesktop +"px)", {
				match : function() { // on desktop

					$category.on('mouseover focusin', function() {
						$(this).addClass('is-open');							
					}).on('mouseleave focusout', function() {						
						$(this).removeClass('is-open');
					});

				}
			});
	}
}
