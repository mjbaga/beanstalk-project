'use strict';

import $ from 'jquery';
import 'jquery-match-height';
import doT from 'dot';
import enquire from 'enquire.js';
import { bp } from '../../../_scripts/_helper';

export default class StoryCards {
	constructor() {
		let _self = this;

		// let $listingContainer = $('.listing-area'),
		// 	dotTemplate = $listingContainer.data('template') || 'dotStories',
		// 	apiURL = $listingContainer.data('api') || '/api/stories',
		// 	$btnLoad = $('.js-loadmore'),
		// 	$filterBtn = $('.filter-btn-go');

		// let listItemTemplate = doT.template($('#' + dotTemplate).html());

		if ($('.listing-area').length > 0) {

			let $listingContainer = $('.listing-area'),
				dotTemplate = $listingContainer.data('template') || 'dotStories',
				apiURL = $listingContainer.data('api') || '/api/stories',
				$btnLoad = $('.js-loadmore'),
				$filterBtn = $('.filter-btn-go');

			let listItemTemplate = doT.template($('#' + dotTemplate).html());

			// rendering the list into the template
			// let renderListItems = function(data, appendContent) {
			// 	let append = appendContent || false;

			// 	let _renderedHTML = listItemTemplate(data);

			// 	if (append) {
			// 		$(_renderedHTML).appendTo($listingContainer).hide().fadeIn(1000);
			// 	} else {
			// 		$listingContainer.fadeOut()
			// 		$listingContainer.empty();
			// 		$listingContainer.html(_renderedHTML).fadeIn();
			// 	}

			// 	enquire
			// 		.register("screen and (max-width:" + (bp.minDesktop - 1) +"px)", {
			// 			match : function() {
			// 					$('.filters__wrapper').slideUp();
			// 				}
			// 			});

			// 	setTimeout(function(){
			// 		$('.img-card .text', $listingContainer).matchHeight();
			// 		$('.img-card', $listingContainer).matchHeight();
			// 	}, 100)
			// };

			// let filterItems = function(values, appendContent) {
			// 	$.ajax({
			// 		url: apiURL,
			// 		method: 'get',
			// 		data: values,
			// 		dataType: 'json',
			// 		cache: true
			// 	})
			// 	.done(function(data) {
			// 		renderListItems(data, appendContent);
			// 	});
			// }

			// let loadItems = function(append) {
			// 	var values = {};

			// 	$('select.select-filter').each(function(){
			// 		var label = $(this).attr('name');
			// 		values[label] = $(this).val();
			// 	});

			// 	var data = JSON.stringify(values);

			// 	filterItems(data, append);
			// }

			// $btnLoad.on('click', function(e) {
			// 	e.preventDefault();
			// 	loadItems(true);
			// });

			// $filterBtn.on('click', function(e) {
			// 	loadItems(false);
			// });

			$btnLoad.on('click', function(e) {
				e.preventDefault();
				_self.loadItems(true);
			});

			$filterBtn.on('click', function(e) {
				_self.loadItems(false);
			});
		}

		if ($('.stories')[0]) {
			var search = document.location.search;

			if (search[0]) {
				// query string exists
				var x = _self.qs('persona'),
					x = x.replace(/\+/g, " "),
					$select = $('.filter-personas');

				setTimeout(function(){
					_self.loadItems(false);
					// $select.val(x).niceSelect('update');
				}, 300)

				// _self.loadItems(true);

				console.log(x);
			} else {
			    // no query string exists
			    console.log('no query');
			}
		}
	}

	renderListItems(data, appendContent) {
		let _self = this,
			$listingContainer = $('.listing-area'),
			dotTemplate = $listingContainer.data('template') || 'dotStories',
			listItemTemplate = doT.template($('#' + dotTemplate).html()),
			append = appendContent || false,
			_renderedHTML = listItemTemplate(data);


		if (append) {
			$(_renderedHTML).appendTo($listingContainer).hide().fadeIn(1000);
		} else {
			$listingContainer.fadeOut()
			$listingContainer.empty();
			$listingContainer.html(_renderedHTML).fadeIn();
		}

		enquire
			.register("screen and (max-width:" + (bp.minDesktop - 1) +"px)", {
				match : function() {
						$('.filters__wrapper').slideUp();
					}
				});

		setTimeout(function(){
			$('.img-card .text', $listingContainer).matchHeight();
			$('.img-card', $listingContainer).matchHeight();
		}, 100)
	};

	filterItems(values, appendContent) {
		let _self = this,
			$listingContainer = $('.listing-area'),
			apiURL = $listingContainer.data('api') || '/api/stories';

		$.ajax({
			url: apiURL,
			method: 'get',
			data: values,
			dataType: 'json',
			cache: true
		})
		.done(function(data) {
			_self.renderListItems(data, appendContent);
		});
	}

	loadItems(append) {
		let _self = this;
		var values = {};

		$('select.select-filter').each(function(){
			var label = $(this).attr('name');
			values[label] = $(this).val();
		});

		var data = JSON.stringify(values);

		_self.filterItems(data, append);
	}

	qs(persona) {
		let _self = this,
			query = window.location.search.substring(1),
			parms = query.split('&');

		for (var i=0; i<parms.length; i++) {
			var pos = parms[i].indexOf('=');
			if (pos > 0  && persona == parms[i].substring(0,pos)) {
				return parms[i].substring(pos+1);
			}
		}
		return "";
	}
}
