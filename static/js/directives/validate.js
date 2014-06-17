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
							elm.removeAttr('data-jet-validate-' + key);
						} else {
							elm.attr('data-jet-validate-' + key, expression);
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

					if (attrs.jetValidateWatch) {
						var watch = scope.$eval(attrs.jetValidateWatch);
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
		if (attrs.jetInputDatetime) {
			return I18n.lookup('spa.date').formats.medium;

		} else if (attrs.jetInputTime) {
			return I18n.lookup('spa.date').formats.mediumTime;

		} else if (attrs.jetInputMonth) {
			return 'MM/yyyy';

		} else if (attrs.jetInputYear) {
			return 'yyyy';
		}
		return I18n.lookup('spa.date').formats.mediumDate;
	}


	directives.directive('jetValidate', function () {

		return {
			restrict: 'A',
			require: 'ngModel',

			link: function (scope, elm, attrs, ctrl) {
				var validateFn, watch, validators = {}, validateExpr = scope.$eval(attrs.jetValidate);
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
								elm.removeAttr('data-jet-validate-' + key);
								ctrl.$setValidity(key, true);
							}, function (expression) {
								elm.attr('data-jet-validate-' + key, expression);
								ctrl.$setValidity(key, false);
							});
							return valueToValidate;


						} else if (!expression) {
							elm.removeAttr('data-jet-validate-' + key);
							ctrl.$setValidity(key, true);
							return valueToValidate;
						}

						elm.attr('data-jet-validate-' + key, expression);
						ctrl.$setValidity(key, false);
						return valueToValidate;
					};


					validators[key] = validateFn;
					ctrl.$formatters.push(validateFn);
					ctrl.$parsers.push(validateFn);
				});

				/* Support for ui-validate-watch */
				if (attrs.jetValidateWatch) {
					watch = scope.$eval(attrs.jetValidateWatch);
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
	directives.directive('jetRegexp', new Validate('jetRegexp', 'regexp', function (scope, element, attrs, ctrl, value) {
		var regexp = scope.$eval(attrs.jetRegexp);
		return !regexp || isEmpty(value) || new RegExp(regexp, '').test(value) ? '' : attrs.jetRegexpMessage || I18n.t('spa.validation.regexp');
	}).validate);


	directives.directive('jetMinwords', new Validate('jetMinwords', 'minwords', function (scope, element, attrs, ctrl, value) {
		var minwords = scope.$eval(attrs.jetMinwords);
		return !value || getWordsLength(value) >= minwords ? '' :  attrs.jetMinwordsMessage || I18n.t('spa.validation.minwords', {minwords: minwords});
	}).validate);


	directives.directive('jetMaxwords', new Validate('jetMaxwords', 'maxwords', function (scope, element, attrs, ctrl, value) {
		var maxwords = scope.$eval(attrs.jetMaxwords);
		return !value || getWordsLength(value) <= maxwords ? '' : attrs.jetMaxwordsMessage || I18n.t('spa.validation.maxwords', {maxwords: maxwords});
	}).validate);


	directives.directive('jetRangewords', new Validate('jetRangelength', 'rangewords', function (scope, element, attrs, ctrl, value) {
		var rangewords = scope.$eval(attrs.jetRangewords);
		if (angular.isArray(rangewords) === false) { return ''; }
		return !value || (getWordsLength(value) >= rangewords[0] && getWordsLength(value) <= rangewords[1]) ? '' : attrs.jetRangewordsMessage || I18n.t('spa.validation.rangewords', {minwords: rangewords[0], maxwords: rangewords[1]});
	}).validate);


	directives.directive('jetRequired', new Validate('jetRequired', 'required', function (scope, element, attrs, ctrl, value) {
		var required = scope.$eval(attrs.jetRequired);
		return required && (isEmpty(value) || value === false) ? attrs.jetRequiredMessage || I18n.t('spa.validation.required') : '';
	}).validate);


	directives.directive('jetEqualto', new Validate('jetEqualto', 'equalto', function (scope, element, attrs, ctrl, value) {
		var equals = scope.$eval(attrs.jetEqualto);
		return equals === value ? '' : attrs.jetEqualtoMessage || I18n.t('spa.validation.equalto');
	}).validate);


	directives.directive('jetMinlength', new Validate('jetMinlength', 'minlength', function (scope, element, attrs, ctrl, value) {
		var minlength = scope.$eval(attrs.jetMinlength);
		return !value || value.length >= minlength ? '' :  attrs.jetMinlengthMessage || I18n.t('spa.validation.minlength', {minlength: minlength});
	}).validate);


	directives.directive('jetMaxlength', new Validate('jetMaxlength', 'maxlength', function (scope, element, attrs, ctrl, value) {
		var maxlength = scope.$eval(attrs.jetMaxlength);
		return !value || value.length <= maxlength ? '' : attrs.jetMaxlengthMessage || I18n.t('spa.validation.maxlength', {maxlength: maxlength});
	}).validate);


	directives.directive('jetRangelength', new Validate('jetRangelength', 'rangelength', function (scope, element, attrs, ctrl, value) {
		var rangelength = scope.$eval(attrs.jetRangelength);
		if (angular.isArray(rangelength) === false) { return ''; }
		return !value || (value.length >= rangelength[0] && value.length <= rangelength[1]) ? '' : attrs.jetRangelengthMessage || I18n.t('spa.validation.rangelength', {minlength: rangelength[0], maxlength: rangelength[1]});
	}).validate);


	directives.directive('jetMincheck', new Validate('jetMincheck', 'mincheck', function (scope, element, attrs, ctrl, value) {
		var mincheck = scope.$eval(attrs.jetMincheck);
		return !value || value.length >= mincheck ? '' :  attrs.jetMincheckMessage || I18n.t('spa.validation.mincheck', {mincheck: mincheck});
	}).validate);


	directives.directive('jetMaxcheck', new Validate('jetMaxcheck', 'maxcheck', function (scope, element, attrs, ctrl, value) {
		var maxcheck = scope.$eval(attrs.jetMaxcheck);
		return !value || value.length <= maxcheck ? '' : attrs.jetMaxcheckMessage || I18n.t('spa.validation.maxcheck', {maxcheck: maxcheck});
	}).validate);


	directives.directive('jetRangecheck', new Validate('jetRangecheck', 'rangecheck', function (scope, element, attrs, ctrl, value) {
		var rangecheck = scope.$eval(attrs.jetRangecheck);
		if (angular.isArray(rangecheck) === false) { return ''; }
		return !value || (value.length >= rangecheck[0] && value.length <= rangecheck[1]) ? '' : attrs.jetRangecheckMessage || I18n.t('spa.validation.rangecheck', {mincheck: rangecheck[0], maxcheck: rangecheck[1]});
	}).validate);


	directives.directive('jetMin', new Validate('jetMin', 'min', function (scope, element, attrs, ctrl, value) {
		var min = scope.$eval(attrs.jetMin);
		return !value || (Number(value) >= Number(min)) ? '' :  attrs.jetMinMessage || I18n.t('spa.validation.min', {min: min});
	}).validate);


	directives.directive('jetMax', new Validate('jetMax', 'max', function (scope, element, attrs, ctrl, value) {
		var max = scope.$eval(attrs.jetMax);
		return !value || (Number(value) <=  Number(max)) ? '' : attrs.jetMaxMessage || I18n.t('spa.validation.max', {max: max});
	}).validate);


	directives.directive('jetRange', new Validate('jetRange', 'range', function (scope, element, attrs, ctrl, value) {
		var range = scope.$eval(attrs.jetRange);
		if (angular.isArray(range) === false) { return ''; }
		return !value || (Number(value) >=  Number(range[0]) && Number(value) <=  Number(range[1])) ? '' : attrs.jetRangeMessage || I18n.t('spa.validation.range', {min: range[0], max: range[1]});
	}).validate);



	directives.directive('jetGreaterthan', new Validate('jetGreaterthan', 'greaterthan', function (scope, element, attrs, ctrl, value) {
		var greaterthan = scope.$eval(attrs.jetGreaterthan);
		return !greaterthan || (value && Number(value) > Number(greaterthan)) ? '' :  attrs.jetGreaterthanMessage || I18n.t('spa.validation.greaterthan', {greaterthan: greaterthan});
	}).validate);


	directives.directive('jetLessthan', new Validate('jetLessthan', 'lessthan', function (scope, element, attrs, ctrl, value) {
		var lessthan = scope.$eval(attrs.jetLessthan);
		return !lessthan || (value && Number(value) <  Number(lessthan)) ? '' : attrs.jetLessthanMessage || I18n.t('spa.validation.lessthan', {lessthan: lessthan});
	}).validate);


	directives.directive('jetAfterdate', new Validate('jetAfterdate', 'afterdate', function (scope, element, attrs, ctrl, value, $filter) {
		var afterdate = scope.$eval(attrs.jetAfterdate);
		return !afterdate || (value && Date.parse(value) > Date.parse(afterdate)) ? '' :  attrs.jetAfterdateMessage || I18n.t('spa.validation.afterdate', {afterdate: $filter('date')(afterdate, getDatePattern(attrs))});
	}).validate);


	directives.directive('jetBeforedate', new Validate('jetBeforedate', 'beforedate', function (scope, element, attrs, ctrl, value, $filter) {
		var beforedate = scope.$eval(attrs.jetBeforedate);
		return !beforedate || (value && Date.parse(value) <  Date.parse(beforedate)) ? '' : attrs.jetBeforedateMessage || I18n.t('spa.validation.beforedate', {beforedate: $filter('date')(beforedate, getDatePattern(attrs))});
	}).validate);

});
