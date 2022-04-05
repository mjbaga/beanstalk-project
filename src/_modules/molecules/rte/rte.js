'use strict';

import enquire from 'enquire.js';
import { bp } from '../../../_scripts/_helper';

export default class Rte {

	constructor() {

		var $iframes = $('.rte iframe');
		 
		$iframes.each(function () {
		  	$( this ).data( "ratio", this.height / this.width )
			    .removeAttr( "width" )
			    .removeAttr( "height" );
		});
		 
		enquire
			.register("screen and (max-width:" + (bp.maxMobile) +"px)", {
					match: () => {
						this.iframeResize($iframes, 1);
					}
				})
			.register("screen and (min-width:" + (bp.maxMobile + 1) +"px)", {
					match: () => {
						this.iframeResize($iframes, 0.75);
					}
				});

	}

	iframeResize(iframes, multiplier) {
		$( window ).resize( function () {
			iframes.each( function() {
				var width = $( this ).parent().width() * multiplier;

				$(this).width( width )
					.height( width * $( this ).data( "ratio" ));

				$(this).wrap('<div class="video-container"></div>')
			});
		}).resize();
	}
}
