'use strict';

export default class Filters {
	constructor() {
		$('.filter-btn-mobile').on('click', function(e) {
			e.preventDefault();

			$('.filters__wrapper').slideToggle();
		});
	}
}
