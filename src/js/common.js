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

	var counterSectionRcsarTop;
	var windowHeight;
	var show = false;

	$(function () {
		var $carouselNavy = $('#carouselNavy');
		var $counterSectionRcsar = $('.counter-section-rcsar');

		if ($counterSectionRcsar.exists()) {
			counterSectionRcsarTop = $counterSectionRcsar.offset().top;
			windowHeight = window.innerHeight;
			show = true;
		}

		if ($carouselNavy.exists()) {
			var $carouselItem = $carouselNavy.find('.carousel-item.active');
			var $videoCarousel = $carouselItem.find('.video-carousel');

			$videoCarousel[0].play();

			$videoCarousel[0].onended = function(){
				$carouselNavy.carousel('next');
			};

			$carouselNavy.on('slid.bs.carousel', function(e){
				if ($videoCarousel.exists()) {
					$videoCarousel[0].pause();
				}

				$videoCarousel = $(e.relatedTarget).find('.video-carousel');

				if ($videoCarousel.exists()) {
					$videoCarousel[0].play();
				}
			})
		}
	});

	$(window).on('scroll', function(){
		if(show && (counterSectionRcsarTop < $(window).scrollTop() + windowHeight)){
			var $dataCounter = $('[data-counter]');
			if ($dataCounter.exists()) {
				$dataCounter.each(function(){
					var $this = $(this);
					$this.prop('counter', 0).animate({
						counter: $this.attr('data-counter')
					}, {
						duration: 1000,
						easing: 'swing',
						step: function(now) {
							$this.text(this.counter.toFixed(0) + '%')
						}
					})
				});
			}
			show = false;
		}
	});

}, window.jQuery, window.Zepto));
