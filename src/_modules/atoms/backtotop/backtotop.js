'use strict';

import $ from 'jquery';
import '../../../../node_modules/sticky-kit/dist/sticky-kit.js';
import enquire from 'enquire.js';
import { bp } from '../../../_scripts/_helper';

export default class Backtotop {
	constructor() {
		enquire
			.register("screen and (min-width:" + bp.minDesktop +"px)", {
				match : function() { // on desktop
					$('.backtotop__screen').stick_in_parent();
				},
				unmatch: function() {
					$('.backtotop__screen').trigger('sticky_kit:detach');
				}
			});
	}
}
