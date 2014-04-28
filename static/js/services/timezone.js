define(['services/services'], function (services) {
	'use strict';
	
	services.provider('$timezone', function () {
			
		
		var defaultTimezone = 'America/Sao_Paulo';
		var timezone = null;
		
		this.$get = function () {
			return {
					
				read: function () {
					return timezone || defaultTimezone;
				},
				
				getDefaultTimezone: function () {
					return defaultTimezone;
				},
				
				use: function (value) {
					var zones = moment.tz.getZoneSets();
					for (var i = 0; i < zones.length; i++) {
						if (zones[i].displayName === value) {
							timezone = value;
							break;
						}
					}
				},
				
				supported: function () {
					return moment.tz.getZoneSets();
				}
			};
		};
	});
	
});