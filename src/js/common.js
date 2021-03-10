(function (factory, jQuery, Zepto) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object' && typeof Meteor === 'undefined') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery || Zepto);
	}
}(function ($) {
	'use strict';

	$.fn.exists = function () {
		return this.length !== 0;
	};

	var $carouselNavy;
	var counterSectionRcsarTop;
	var windowHeight;
	var show = true;

	var startVideo = function() {
		if ($carouselNavy.exists()) {
			var $carouselItem = $carouselNavy.find('.carousel-item.active');
			var $videoCarousel = $carouselItem.find('.video-carousel');
			var videoPromise = $videoCarousel[0].play();

			if (videoPromise !== undefined) {
				videoPromise.then( e => {
					console.log(e);
				}).catch( e => {
					console.log(e);
				})
			}

			$videoCarousel[0].onended = function () {
				$carouselNavy.carousel('next');
			};

			$carouselNavy.on('slid.bs.carousel', function (e) {
				if ($videoCarousel.exists()) {
					$videoCarousel[0].pause();
				}

				$videoCarousel = $(e.relatedTarget).find('.video-carousel');

				if ($videoCarousel.exists()) {
					$videoCarousel[0].play();
				}
			})
		}
	};

	$(function () {
		var $slickLogos = $('.slick-logos');
		var $carouselReviews = $('#carouselReviews');
		var $counterSectionRcsar = $('.counter-section-rcsar');
		$carouselNavy = $('#carouselNavy');

		if ($counterSectionRcsar.exists()) {
			counterSectionRcsarTop = $counterSectionRcsar[0].offsetTop;
			windowHeight = window.innerHeight;
			show = true;
		}

		setTimeout(function () {
			startVideo();
		}, 7000);

		if ($carouselReviews.exists()) {
			$carouselReviews.slick({
				fade: true,
				infinite: true,
				cssEase: 'linear',
				speed: 500
			});
		}

		if ($slickLogos.exists()) {
			$slickLogos.slick({
				arrows: false,
				slidesToShow: 5,
				autoplay: true
			});
		}
	});

	$(window).on('scroll', function () {
		if (show && (counterSectionRcsarTop < $(window).scrollTop() + windowHeight)) {
			var $dataCounter = $('[data-counter]');
			if ($dataCounter.exists()) {
				$dataCounter.each(function () {
					var $this = $(this);
					$this.prop('counter', 0).animate({
						counter: $this.attr('data-counter')
					}, {
						duration: 1000,
						easing: 'swing',
						step: function (now) {
							$this.text(this.counter.toFixed(0) + '%')
						}
					})
				});
			}
			show = false;
		}
	});

}, window.jQuery, window.Zepto));
