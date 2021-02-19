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


	$(function () {
		const $dropdown = $('.dropdown');

		if ($dropdown.exists()) {
			$dropdown.hover(
				function () {
					const $this = $(this);
					$this.addClass('show');
					$this.find('[data-toggle="dropdown"]').attr('aria-expanded', true);
					$this.find('.dropdown-menu').addClass('show');
				}
			)
		}
	});

}, window.jQuery, window.Zepto));
