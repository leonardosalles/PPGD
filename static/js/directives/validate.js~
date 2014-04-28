define(['directives/directives'], function (directives) {
	'use strict';

	function Validate(name, key, callback) {

		this.validate = function ($filter) {

			return {
				require: '?ngModel',

				link: function (scope, elm, attrs, ctrl) {
					if (!ctrl) { return; }

					var validateFn = function (valueToValidate) {
						var expression = callback(scope, elm, attrs, ctrl, valueToValidate, $filter);
						if (!expression) {
							elm.removeAttr('data-ppgd-validate-' + key);
						} else {
							elm.attr('data-ppgd-validate-' + key, expression);
						}

						ctrl.$setValidity(key, !expression);
						return valueToValidate;
					};
			      
					ctrl.$formatters.push(validateFn);
					ctrl.$parsers.push(validateFn);
			      
					scope.$watch(attrs[name], function () {
						validateFn(ctrl.$modelValue);
					});
			      
					attrs.$observe(name + 'Message', function () {
						validateFn(ctrl.$modelValue);
					});
					
					if (attrs.ppgdValidateWatch) {
						var watch = scope.$eval(attrs.ppgdValidateWatch);
						if (angular.isString(watch)) {
							scope.$watch(watch, function () {
								validateFn(ctrl.$modelValue);
							});
			          
						} else {
							validateFn(ctrl.$modelValue);
						}
					}
				}
			};
		};
	}

	function isEmpty(value) {
		if (angular.isArray(value)) { return value.length === 0; }
		return isUndefined(value) || value === '' || value === null || value !== value;
	}

	function isUndefined(value) {
		return typeof value === 'undefined';
	}
	
	function getWordsLength(val) {
		val = val.replace(/(^\s*)|(\s*$)/gi, '');
		val = val.replace(/[ ]{2,}/gi, ' ');
		val = val.replace(/\n /, '\n');
		return val.split(' ').length;
	}

	function getDatePattern(attrs) {
		if (attrs.ppgdInputDatetime) {
			return I18n.lookup('spa.date').formats.medium;
			
		} else if (attrs.ppgdInputTime) {
			return I18n.lookup('spa.date').formats.mediumTime;
			
		} else if (attrs.ppgdInputMonth) {
			return 'MM/yyyy';
			
		} else if (attrs.ppgdInputYear) {
			return 'yyyy';
		}
		return I18n.lookup('spa.date').formats.mediumDate;
	}


	directives.directive('ppgdValidate', function () {

		return {
			restrict: 'A',
			require: 'ngModel',

			link: function (scope, elm, attrs, ctrl) {
				var validateFn, watch, validators = {}, validateExpr = scope.$eval(attrs.ppgdValidate);
				if (!validateExpr) { return; }

				if (angular.isString(validateExpr)) {
					validateExpr = { validator: validateExpr };
				}

				angular.forEach(validateExpr, function (exprssn, key) {

					validateFn = function (valueToValidate) {
						var expression = scope.$eval(exprssn, { '$value' : valueToValidate });
						if (angular.isFunction(expression.then)) {
							/* expression is a promise */
							expression.then(function () {
								elm.removeAttr('data-ppgd-validate-' + key);
								ctrl.$setValidity(key, true);
							}, function (expression) {
								elm.attr('data-ppgd-validate-' + key, expression);
								ctrl.$setValidity(key, false);
							});
							return valueToValidate;


						} else if (!expression) {
							elm.removeAttr('data-ppgd-validate-' + key);
							ctrl.$setValidity(key, true);
							return valueToValidate;
						}

						elm.attr('data-ppgd-validate-' + key, expression);
						ctrl.$setValidity(key, false);
						return valueToValidate;
					};


					validators[key] = validateFn;
					ctrl.$formatters.push(validateFn);
					ctrl.$parsers.push(validateFn);
				});

				/* Support for ui-validate-watch */
				if (attrs.ppgdValidateWatch) {
					watch = scope.$eval(attrs.ppgdValidateWatch);
					if (angular.isString(watch)) {
						scope.$watch(watch, function () {
							angular.forEach(validators, function (validatorFn) {
								validatorFn(ctrl.$modelValue);
							});
						});

					} else {

						angular.forEach(watch, function (expression, key) {

							if (angular.isString(expression)) {
								scope.$watch(expression, function () {
									validators[key](ctrl.$modelValue);
								});

							} else {
								angular.forEach(expression, function (expression2) {
									scope.$watch(expression2, function () {
										validators[key](ctrl.$modelValue);
									});
								});
							}
						});
					}
				}
			}
		};
	});

	
	/*	*/
	directives.directive('ppgdRegexp', new Validate('ppgdRegexp', 'regexp', function (scope, element, attrs, ctrl, value) {
		var regexp = scope.$eval(attrs.ppgdRegexp);
		return !regexp || isEmpty(value) || new RegExp(regexp, '').test(value) ? '' : attrs.ppgdRegexpMessage || I18n.t('spa.validation.regexp');
	}).validate);

	
	directives.directive('ppgdMinwords', new Validate('ppgdMinlength', 'minwords', function (scope, element, attrs, ctrl, value) {
		var minwords = scope.$eval(attrs.ppgdMinwords);
		return !value || getWordsLength(value) >= minwords ? '' :  attrs.ppgdMinwordsMessage || I18n.t('spa.validation.minwords', {minwords: minwords});
	}).validate);
	
	
	directives.directive('ppgdMaxwords', new Validate('ppgdMaxwords', 'maxwords', function (scope, element, attrs, ctrl, value) {
		var maxwords = scope.$eval(attrs.ppgdMaxwords);
		return !value || getWordsLength(value) <= maxwords ? '' : attrs.ppgdMaxwordsMessage || I18n.t('spa.validation.maxwords', {maxwords: maxwords});
	}).validate);
	

	directives.directive('ppgdRangewords', new Validate('ppgdRangelength', 'rangewords', function (scope, element, attrs, ctrl, value) {
		var rangewords = scope.$eval(attrs.ppgdRangewords);
		if (angular.isArray(rangewords) === false) { return ''; }
		return !value || (getWordsLength(value) >= rangewords[0] && getWordsLength(value) <= rangewords[1]) ? '' : attrs.ppgdRangewordsMessage || I18n.t('spa.validation.rangewords', {minwords: rangewords[0], maxwords: rangewords[1]});
	}).validate);

	
	directives.directive('ppgdRequired', new Validate('ppgdRequired', 'required', function (scope, element, attrs, ctrl, value) {
		var required = scope.$eval(attrs.ppgdRequired);
		return required && (isEmpty(value) || value === false) ? attrs.ppgdRequiredMessage || I18n.t('spa.validation.required') : '';
	}).validate);


	directives.directive('ppgdEqualto', new Validate('ppgdEqualto', 'equalto', function (scope, element, attrs, ctrl, value) {
		var equals = scope.$eval(attrs.ppgdEqualto);
		return equals === value ? '' : attrs.ppgdEqualtoMessage || I18n.t('spa.validation.equalto');
	}).validate);

	
	directives.directive('ppgdMinlength', new Validate('ppgdMinlength', 'minlength', function (scope, element, attrs, ctrl, value) {
		var minlength = scope.$eval(attrs.ppgdMinlength);
		return !value || value.length >= minlength ? '' :  attrs.ppgdMinlengthMessage || I18n.t('spa.validation.minlength', {minlength: minlength});
	}).validate);
	
	
	directives.directive('ppgdMaxlength', new Validate('ppgdMaxlength', 'maxlength', function (scope, element, attrs, ctrl, value) {
		var maxlength = scope.$eval(attrs.ppgdMaxlength);
		return !value || value.length <= maxlength ? '' : attrs.ppgdMaxlengthMessage || I18n.t('spa.validation.maxlength', {maxlength: maxlength});
	}).validate);
	
	
	directives.directive('ppgdRangelength', new Validate('ppgdRangelength', 'rangelength', function (scope, element, attrs, ctrl, value) {
		var rangelength = scope.$eval(attrs.ppgdRangelength);
		if (angular.isArray(rangelength) === false) { return ''; }
		return !value || (value.length >= rangelength[0] && value.length <= rangelength[1]) ? '' : attrs.ppgdRangelengthMessage || I18n.t('spa.validation.rangelength', {minlength: rangelength[0], maxlength: rangelength[1]});
	}).validate);
 
	
	directives.directive('ppgdMincheck', new Validate('ppgdMincheck', 'mincheck', function (scope, element, attrs, ctrl, value) {
		var mincheck = scope.$eval(attrs.ppgdMincheck);
		return !value || value.length >= mincheck ? '' :  attrs.ppgdMincheckMessage || I18n.t('spa.validation.mincheck', {mincheck: mincheck});
	}).validate);
	
	
	directives.directive('ppgdMaxcheck', new Validate('ppgdMaxcheck', 'maxcheck', function (scope, element, attrs, ctrl, value) {
		var maxcheck = scope.$eval(attrs.ppgdMaxcheck);
		return !value || value.length <= maxcheck ? '' : attrs.ppgdMaxcheckMessage || I18n.t('spa.validation.maxcheck', {maxcheck: maxcheck});
	}).validate);
	
	
	directives.directive('ppgdRangecheck', new Validate('ppgdRangecheck', 'rangecheck', function (scope, element, attrs, ctrl, value) {
		var rangecheck = scope.$eval(attrs.ppgdRangecheck);
		if (angular.isArray(rangecheck) === false) { return ''; }
		return !value || (value.length >= rangecheck[0] && value.length <= rangecheck[1]) ? '' : attrs.ppgdRangecheckMessage || I18n.t('spa.validation.rangecheck', {mincheck: rangecheck[0], maxcheck: rangecheck[1]});
	}).validate);
  
	
	directives.directive('ppgdMin', new Validate('ppgdMin', 'min', function (scope, element, attrs, ctrl, value) {
		var min = scope.$eval(attrs.ppgdMin);
		return !value || (Number(value) >= Number(min)) ? '' :  attrs.ppgdMinMessage || I18n.t('spa.validation.min', {min: min});
	}).validate);
	
	
	directives.directive('ppgdMax', new Validate('ppgdMax', 'max', function (scope, element, attrs, ctrl, value) {
		var max = scope.$eval(attrs.ppgdMax);
		return !value || (Number(value) <=  Number(max)) ? '' : attrs.ppgdMaxMessage || I18n.t('spa.validation.max', {max: max});
	}).validate);
	
	
	directives.directive('ppgdRange', new Validate('ppgdRange', 'range', function (scope, element, attrs, ctrl, value) {
		var range = scope.$eval(attrs.ppgdRange);
		if (angular.isArray(range) === false) { return ''; }
		return !value || (Number(value) >=  Number(range[0]) && Number(value) <=  Number(range[1])) ? '' : attrs.ppgdRangeMessage || I18n.t('spa.validation.range', {min: range[0], max: range[1]});
	}).validate);
 
	
	
	directives.directive('ppgdGreaterthan', new Validate('ppgdGreaterthan', 'greaterthan', function (scope, element, attrs, ctrl, value) {
		var greaterthan = scope.$eval(attrs.ppgdGreaterthan);
		return !greaterthan || (value && Number(value) > Number(greaterthan)) ? '' :  attrs.ppgdGreaterthanMessage || I18n.t('spa.validation.greaterthan', {greaterthan: greaterthan});
	}).validate);
	
	
	directives.directive('ppgdLessthan', new Validate('ppgdLessthan', 'lessthan', function (scope, element, attrs, ctrl, value) {
		var lessthan = scope.$eval(attrs.ppgdLessthan);
		return !lessthan || (value && Number(value) <  Number(lessthan)) ? '' : attrs.ppgdLessthanMessage || I18n.t('spa.validation.lessthan', {lessthan: lessthan});
	}).validate);
	
	
	directives.directive('ppgdAfterdate', new Validate('ppgdAfterdate', 'afterdate', function (scope, element, attrs, ctrl, value, $filter) {
		var afterdate = scope.$eval(attrs.ppgdAfterdate);
		return !afterdate || (value && Date.parse(value) > Date.parse(afterdate)) ? '' :  attrs.ppgdAfterdateMessage || I18n.t('spa.validation.afterdate', {afterdate: $filter('date')(afterdate, getDatePattern(attrs))});
	}).validate);
	
	
	directives.directive('ppgdBeforedate', new Validate('ppgdBeforedate', 'beforedate', function (scope, element, attrs, ctrl, value, $filter) {
		var beforedate = scope.$eval(attrs.ppgdBeforedate);
		return !beforedate || (value && Date.parse(value) <  Date.parse(beforedate)) ? '' : attrs.ppgdBeforedateMessage || I18n.t('spa.validation.beforedate', {beforedate: $filter('date')(beforedate, getDatePattern(attrs))});
	}).validate);
	
});
