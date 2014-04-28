define(['filters/filters'], function (filters) {
	'use strict';
	
	filters.filter('dateLocal', function ($filter, $timezone) {
		
		return function (date, format) {
			var datelocal = date ? moment(date + '-0300').tz($timezone.read()).format('YYYY-MM-DDTHH:mm:ss') : date;
			return $filter('date')(datelocal, format);
		};

	});
});