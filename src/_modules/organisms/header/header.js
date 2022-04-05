'use strict';

import $ from 'jquery';
import enquire from 'enquire.js';
import '../../../../node_modules/sticky-kit/dist/sticky-kit.js';
import { bp } from '../../../_scripts/_helper';

export default class Header {
	constructor() {

		$('.js-resizer').on('click', function(e) {
			e.preventDefault();
			var dataSize = $(this).data('size');

			$('.js-resizer').removeClass('is-active');

			if (dataSize === 'normal') {
				$(this).addClass('is-active');
				$('.main').removeClass('is-big is-bigger');
			} else if (dataSize === 'big') {
				$(this).addClass('is-active');
				$('.main').removeClass('is-bigger').addClass('is-big');
			} else if (dataSize === 'bigger') {
				$(this).addClass('is-active');
				$('.main').removeClass('is-big').addClass('is-bigger');
			}
			window.emitter.emit('fontSizeChange');
		});

		enquire
			.register("screen and (min-width:" + bp.minDesktop +"px)", {
				match : function() { // on desktop
					$('.nav').stick_in_parent();
				},
				unmatch: function() {
					$('.nav').trigger('sticky_kit:detach');
				}
			});
	}
}