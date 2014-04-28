define(['services/services',
        'services/translate-locale_en',
        'services/translate-locale_pt-br'], function (services, localeEn, localePtBr) {
	'use strict';
	
	services.provider('$translate', function ($provide) {
		
		
		this.configure = function () {
			var lookupDate = I18n.lookup('spa.date');
			$.fn.datetimepicker.dates.en = {
					days: [ lookupDate.day_names[0],
					        lookupDate.day_names[1],
					        lookupDate.day_names[2],
					        lookupDate.day_names[3],
					        lookupDate.day_names[4],
					        lookupDate.day_names[5],
					        lookupDate.day_names[6],
					        lookupDate.day_names[0]
					],
			
					daysShort: [ lookupDate.abbr_day_names[0],
					             lookupDate.abbr_day_names[1],
					             lookupDate.abbr_day_names[2],
					             lookupDate.abbr_day_names[3],
					             lookupDate.abbr_day_names[4],
					             lookupDate.abbr_day_names[5],
					             lookupDate.abbr_day_names[6],
					             lookupDate.abbr_day_names[0]
					],
			
					daysMin: [ lookupDate.abbr_day_names[0],
					           lookupDate.abbr_day_names[1],
					           lookupDate.abbr_day_names[2],
					           lookupDate.abbr_day_names[3],
					           lookupDate.abbr_day_names[4],
					           lookupDate.abbr_day_names[5],
					           lookupDate.abbr_day_names[6],
					           lookupDate.abbr_day_names[0]
					],
					
					months: [ lookupDate.abbr_month_names[1],
					          lookupDate.abbr_month_names[2],
					          lookupDate.abbr_month_names[3],
					          lookupDate.abbr_month_names[4],
					          lookupDate.abbr_month_names[5],
					          lookupDate.abbr_month_names[6],
					          lookupDate.abbr_month_names[7],
					          lookupDate.abbr_month_names[8],
					          lookupDate.abbr_month_names[9],
					          lookupDate.abbr_month_names[10],
					          lookupDate.abbr_month_names[11],
					          lookupDate.abbr_month_names[12]
					],
			
					monthsShort: [ lookupDate.abbr_month_names[1],
					               lookupDate.abbr_month_names[2],
					               lookupDate.abbr_month_names[3],
					               lookupDate.abbr_month_names[4],
					               lookupDate.abbr_month_names[5],
					               lookupDate.abbr_month_names[6],
					               lookupDate.abbr_month_names[7],
					               lookupDate.abbr_month_names[8],
					               lookupDate.abbr_month_names[9],
					               lookupDate.abbr_month_names[10],
					               lookupDate.abbr_month_names[11],
					               lookupDate.abbr_month_names[12]
					],
					
					today: lookupDate.today
		    };


			$.extend($.fn.select2.defaults, {
				formatNoMatches: function () { return I18n.t('spa.select2.formatNoMatches'); },
				formatInputTooShort: function (input, min) { var n = min - input.length; return I18n.t('spa.select2.formatInputTooShort', {count: n}); },
				formatInputTooLong: function (input, max) { var n = input.length - max; return I18n.t('spa.select2.formatInputTooLong', {count: n}); },
				formatSelectionTooBig: function (limit) { return I18n.t('spa.select2.formatSelectionTooBig', {count: limit}); },
				formatLoadMore: function () { return I18n.t('spa.select2.formatLoadMore'); },
				formatSearching: function () { return I18n.t('spa.select2.formatSearching'); }
			});

			var PLURAL_CATEGORY = {ZERO: 'zero', ONE: 'one', TWO: 'two', FEW: 'few', MANY: 'many', OTHER: 'other'};
			$provide.value('$locale', {
				'DATETIME_FORMATS': {
					'AMPMS': {
						'0': lookupDate.meridian[0],
						'1': lookupDate.meridian[1]
					},
			    
					'DAY': {
						'0': lookupDate.day_names[0],
						'1': lookupDate.day_names[1],
						'2': lookupDate.day_names[2],
						'3': lookupDate.day_names[3],
						'4': lookupDate.day_names[4],
						'5': lookupDate.day_names[5],
						'6': lookupDate.day_names[6]
					},
			    
					'MONTH': {
						'0': lookupDate.month_names[1],
						'1': lookupDate.month_names[2],
						'2': lookupDate.month_names[3],
						'3': lookupDate.month_names[4],
						'4': lookupDate.month_names[5],
						'5': lookupDate.month_names[6],
						'6': lookupDate.month_names[7],
						'7': lookupDate.month_names[8],
						'8': lookupDate.month_names[9],
						'9': lookupDate.month_names[10],
						'10': lookupDate.month_names[11],
						'11': lookupDate.month_names[12]
					},
			    
					'SHORTDAY': {
						'0': lookupDate.abbr_day_names[0],
						'1': lookupDate.abbr_day_names[1],
						'2': lookupDate.abbr_day_names[2],
						'3': lookupDate.abbr_day_names[3],
						'4': lookupDate.abbr_day_names[4],
						'5': lookupDate.abbr_day_names[5],
						'6': lookupDate.abbr_day_names[6]
					},
			    
					'SHORTMONTH': {
						'0': lookupDate.abbr_month_names[1],
						'1': lookupDate.abbr_month_names[2],
						'2': lookupDate.abbr_month_names[3],
						'3': lookupDate.abbr_month_names[4],
						'4': lookupDate.abbr_month_names[5],
						'5': lookupDate.abbr_month_names[6],
						'6': lookupDate.abbr_month_names[7],
						'7': lookupDate.abbr_month_names[8],
						'8': lookupDate.abbr_month_names[9],
						'9': lookupDate.abbr_month_names[10],
						'10': lookupDate.abbr_month_names[11],
						'11': lookupDate.abbr_month_names[12]
					},
			    
			    
					fullDate:  lookupDate.formats.fullDate,
					longDate: lookupDate.formats.longDate,
					medium: lookupDate.formats.medium,
					mediumDate: lookupDate.formats.mediumDate,
					mediumTime: lookupDate.formats.mediumTime,
					short: lookupDate.formats.short,
					shortDate: lookupDate.formats.shortDate,
					shortTime: lookupDate.formats.shortTime
				},
			  
				'NUMBER_FORMATS': {
					'CURRENCY_SYM': I18n.lookup('spa.number').currency_sym,
					'DECIMAL_SEP': I18n.lookup('spa.number').decimal_sep,
					'GROUP_SEP': I18n.lookup('spa.number').group_sep,
					
					'PATTERNS': {
						'0': {
							'gSize': 3,
							'lgSize': 3,
							'macFrac': 0,
							'maxFrac': 3,
							'minFrac': 0,
							'minInt': 1,
							'negPre': '-',
							'negSuf': '',
							'posPre': '',
							'posSuf': ''
						},
						'1': {
							'gSize': 3,
							'lgSize': 3,
							'macFrac': 0,
							'maxFrac': 2,
							'minFrac': 2,
							'minInt': 1,
							'negPre': '(\u00A4',
							'negSuf': ')',
							'posPre': '\u00A4',
							'posSuf': ''
						}
					}
				},
			  
				'id': I18n.locale.toLowerCase(),
				'pluralCat': function (n) {  if (n === 1) {   return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER; }
			});
		};
		
		
				
		this.translations = function (locale, messages) {
			I18n.translations = I18n.translations || {};
			I18n.translations[locale] = angular.extend(I18n.translations[locale] || {}, messages);
		};
		
		
		var configure = this.configure;
		
		var supported = [ {id: 'pt-BR', flag: 'br', name: 'Português'},
		                  {id: 'en', flag: 'us', name: 'English'}
		                ];
		
				
		this.$get = function () {
			return {
				read: function () {
					return I18n.locale;
				},
				
				use: function (locale) {
					I18n.locale = locale;
					configure();
				},
				
				supported: function () {
					return supported;
				}
			};
		};
	});


	services.config(function ($translateProvider) {
		I18n.defaultLocale = 'pt-BR';
		I18n.fallbacks = true;
		I18n.locale = 'pt-BR';

		$translateProvider.translations('en', {spa: localeEn});
		$translateProvider.translations('pt-BR', {spa: localePtBr});
		$translateProvider.configure();
	});

});