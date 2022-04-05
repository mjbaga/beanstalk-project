'use strict';

import $ from 'jquery';
// import 'fancybox';
import 'slick-carousel';

export default class MediaSection {
	constructor() {
		$('.media-section .feed-match').matchHeight({
			target: $('.other-media.feed-match')
		});
		
		$('.event-carousel .carousel-match').matchHeight();

		if ($('.video-youtube').length > 0) {
			var $youtube = $('.video-youtube');
			
			function getId(url) {
				var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
				var match = url.match(regExp);
			
				if (match && match[2].length == 11) {
					return match[2];
				} else {
					return 'error';
				}
			}
			
			$youtube.each(function(){
				var $this = $(this),
					youtubeLink = $this.data('url') || null;
	
				if (youtubeLink) {
					var myId = getId(youtubeLink),
						youtubeEmbed = '//www.youtube.com/embed/' + myId + '?autoplay=1',
						imgLink = 'http://img.youtube.com/vi/' + myId + '/0.jpg';
					
					$this.css('background-image', 'url(' + imgLink + ')');
					
					$this.attr('href', youtubeEmbed);
				}
			})
			
		}

		// $('.video__clicker').fancybox({
		// 	padding: 0
		// });

		var $eventCarousel = $('.event-carousel');
		var slickOptions = {
            infinite: true,
            slidesToShow: 1,
            centerMode: false,
            slidesToScroll: 1,
            dots: true,
            mobileFirst: true,
            slidesToShow: 1,
            accessibility: false
        };

       $eventCarousel.slick(slickOptions);

        window.emitter.on('fontSizeChange', function() {
        	$('.img-card .text').css('height','auto').matchHeight._update();
        	$eventCarousel.slick('unslick');
        	$eventCarousel.slick(slickOptions);	
        });
	}
}
