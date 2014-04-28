/* jshint camelcase: false */
define({
	
	loading: 'Loading…',
	modalEsc: 'Use ESC to cancel',
	
	validation: {
		type: {
			email: 'value should be a valid email',
			number: 'value should be a valid number',
			currency: 'value should be a valid currency',
			digits: 'value should be digits',
			date: 'value should be a valid date ({{pattern}})',
			phone: 'value should be a valid phone number',
			cpf: 'value should be a valid CPF',
			cnpj: 'value should be a valid CNPJ',
			cep: 'value should be a valid CEP'
		},
		
		defaultMessage: 'value seems to be invalid',
		required: 'value is required',
		regexp: 'value seems to be invalid',
		min: 'value should be greater than or equal to {{min}}',
		max: 'value should be lower than or equal to {{max}}',
		range: 'value should be between {{min}} and {{max}}',
		minlength: 'value is too short. It should have {{minlength}} characters or more',
		maxlength: 'value is too long. It should have {{maxlength}} characters or less',
		rangelength: 'value length is invalid. It should be between {{minlength}} and {{maxlength}} characters long',
		mincheck: 'you must select at least {{mincheck}} choices',
		maxcheck: 'you must select {{maxcheck}} choices or less',
		rangecheck: 'you must select between {{mincheck}} and {{maxcheck}} choices',
		equalto: 'value should be the same',
		minwords: 'value should have {{minwords}} words at least',
		maxwords: 'value should have {{maxwords}} words maximum',
		rangewords: 'value should have between {{minwords}} and {{maxwords}} words',
		greaterthan: 'value should be greater than {{greaterthan}}',
		lessthan: 'value should be less than {{lessthan}}',
		beforedate: 'date should be before {{beforedate}}',
		afterdate: 'date should be after {{afterdate}}'
	},
	
	select2: {
		formatNoMatches: 'No matches found',
		formatLoadMore: 'Loading more results...',
		formatSearching: 'Searching...',

		formatInputTooShort: {
			one: 'Please enter {{count}} more character',
			other:  'Please enter {{count}} more characters'
		},

		formatInputTooLong: {
			one: 'Please delete {{count}} character',
			other:  'Please delete {{count}} characters'
		},

		formatSelectionTooBig: {
			one: 'You can only select {{count}}  item',
			other:  'You can only select {{count}}  items'
		}
	},
	
	maxlength: {
		statusText: 'character left',
		alertText: 'You have typed too many characters.'
	},
	
	datascroller: {
		info: {
			one: 'Showing {{startRecord}} to {{endRecord}} de {{count}} entry',
			other: 'Showing {{startRecord}} to {{endRecord}} de {{count}} entries'
		},
		
		nomatches: 'No records were found',
		serverfirst: 'Go to first page',
		serverprevious: 'Go to previous page',
		servernext: 'Go to next page',
		serverlast: 'Go to last page',
		gotopage: 'Go to page {{page}}'
	},
	
	header: {
		logout: 'Logout'
	},
	
	subheader: {
		quickaccess: 'Quick Access',
		attendance: 'Start attendance parallel'
	},
	
	sidebar: {
		toggle: 'Hide menu automatically'
	},
	
	boxcustomer: {
		hideinfo: 'Hide alerts',
		showinfo: 'Display alerts'
	},
	
	exception: {
		info: 'Info',
		success: 'Success',
		warning: 'Warning',
		error: 'Error',
		
		validation: 'Correct any validation errors and try again',
		title: 'Unexpected error, please try again',
		pageNotFound: 'Page not found',
		
		page: {
			header: 'An error has occurred!',
			subheader: 'An error occurred during the operation.',
			back: 'Back',
			backToHome: 'Back to Home',
			support: 'Contact Support'
		},
		
		code: {
			'401': 'Unauthorized access',
			'403': 'Access Forbidden',
			'404': 'Resource not found',
			'405': 'Method not allowed',
			'407': 'Proxy authentication required',
			'408': 'Response time exceeded',
			'422': 'Correct any validation errors and try again',
			'500': 'Unexpected error, please try again'
		}
	},
	
	date: {
		formats: {
			'fullDate': 'EEEE, MMMM d, y',
			'longDate': 'MMMM d, y',
			'medium': 'MM/dd/yyyy HH:mm:ss',
			'mediumDate': 'MM/dd/yyyy',
			'mediumTime': 'HH:mm:ss',
			'short': 'MM/dd/yy HH:mm',
			'shortDate': 'MM/dd/yy',
			'shortTime': 'HH:mm'
		},

		today: 'Today',
		day_names: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		abbr_day_names: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		month_names: [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		abbr_month_names: [null, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
		meridian: ['AM', 'PM']
	},
	
	number: {
		currency_sym: '$',
		decimal_sep: '.',
		group_sep: ','
	}
});