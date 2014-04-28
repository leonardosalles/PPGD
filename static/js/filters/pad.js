define(['filters/filters'], function (filters) {
	'use strict';
	
	var strRepeat = function (str, qty) {
		if (qty < 1) {
			return '';
		}
	    
		var result = '';
		while (qty > 0) {
			result += str;
			qty -= 1;
		}
		return result;
	};
	
	var pad = function (str, length, padStr, type) {
		str = str ? String(str) : '';
		length = length ? length : 0;

		var padlen  = 0;

		if (!padStr) {
			padStr = '0';
		} else if (padStr.length > 1) {
			padStr = padStr.charAt(0);
		}

		switch (type) {
		case 'right':
			padlen = length - str.length;
			return str + strRepeat(padStr, padlen);
		case 'both':
			padlen = length - str.length;
			return strRepeat(padStr, Math.ceil(padlen / 2)) + str + strRepeat(padStr, Math.floor(padlen / 2));
		default: // 'left'
			padlen = length - str.length;
			return strRepeat(padStr, padlen) + str;
		}
	};
	
	function lpad(str, length, padStr) {
		return pad(str, length, padStr);
	}

	function rpad(str, length, padStr) {
		return pad(str, length, padStr, 'right');
	}

	function lrpad(str, length, padStr) {
		return pad(str, length, padStr, 'both');
	}
	
	
	filters.filter('lpad', function () { return lpad; });
	filters.filter('rpad', function () { return rpad; });
	filters.filter('lrpad', function () { return lrpad; });
		
});