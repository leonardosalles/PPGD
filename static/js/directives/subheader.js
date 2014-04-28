define(['directives/directives', 'text!views/core/subheader.html'], function (directives, template) {
	'use strict';

	directives.directive('spaSubheader', function ($window, $location, $timeout, $filter) {
		
		var buildTemplate = function (items, ul) {
			if (!ul) {
				ul = ['<ul class="dropdown-menu">', '</ul>'];
			}
			
			angular.forEach(items, function (item, index) {
				if (item.divider) {
					return ul.splice(index + 1, 0, '<li class="divider"></li>');
				}
		        
				var li = '<li' + (item.submenu && item.submenu.length ? ' class="dropdown-submenu"' : '') + '>' + '<a href="' + (item.href || '') + '"' + (item.target ? '" target="' + item.target + '"' : '') + '>' + (item.text || '') + '</a>';
				if (item.submenu && item.submenu.length) {
					li += buildTemplate(item.submenu).join('\n');
				}
		        
				li += '</li>';
				ul.splice(index + 1, 0, li);
			});
		    
			return ul;
		};
		
		
		    
		return {
			restrict: 'A',
			replace: true,
			template: template,
			scope: true,

			link: function (scope, element, attrs) {
				element.scrollspy2({
					container: document,
					 
					min: function () {
						return $('#header').height();
					},
					 
					onEnter: function () {
						$('body').css('padding-top', element.height());
						element.addClass('affix');
					},
		             
					onLeave: function () {
						$('body').css('padding-top', '');
						element.removeClass('affix');
					}
				});
				 
				 
				scope.$watchCollection(attrs.spaSubheader, function () {
					element.find('.navbar-inner > ul > li.dropdown').remove();

					var item = scope.$eval(attrs.spaSubheader);
					if (!item || !item.submenu || item.submenu.length === 0) {
						return;
					}

					element.find('.navbar-inner > ul').append('<li class="dropdown"></li>');
					 
					var link = angular.element('<a href class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="100" data-close-others="false">' +  (item.text ? item.text : '') + '<b class="caret"></b></a>');
					var dropdown = angular.element(buildTemplate(item.submenu).join(''));

					element.find('.navbar-inner > ul > li.dropdown').append(link).append(dropdown);
					link.dropdownHover();
				});
				 
				 
				var buttonDefault = element.find('.btn-navbar.hidden-phone');
				buttonDefault.click(function () {
					if ($('body').hasClass('sidebar-close')) {
						$('body').removeClass('sidebar-close').addClass('sidebar-open');
					} else {
						$('body').removeClass('sidebar-open').addClass('sidebar-close');
					}
				});
				 
				 
				var buttonPhone = element.find('.btn-navbar.visible-phone');
				buttonPhone.click(function () {
					if ($('body').hasClass('sidebar-open-responsive')) {
						$('body').removeClass('sidebar-open-responsive').addClass('sidebar-close-responsive');
						 
					} else {
						$('body').removeClass('sidebar-close-responsive').addClass('sidebar-open-responsive');
						$timeout(function () {
							$(document).bind('click', handlerResponsive);
						}, 100);
					}
				});
				 
				 
				var handlerResponsive = function (event) {
					if (($(event.target).is('a') && $(event.target).attr('href'))  ||  $(event.target).parents().index($('#sidebar')) === -1) {
						$('body').removeClass('sidebar-open-responsive').addClass('sidebar-close-responsive');
						$(document).unbind('click', handlerResponsive);
					}
				};
				 
			},
			 
			controller: function ($scope) {
				$scope.attendance = function () {
					var next = window.open('#/');
					next.sessionStorage.clear();
				};
				 
				$scope.select2 = {
					minimumInputLength: 1,
					placeholder: I18n.t('spa.subheader.quickaccess'),
								
					data: function () {
						var data = [];
						$('#sidebar').find('a[href]').each(function () {
							var parent = $(this).closest('ul').parent().find('> a');
							data.push({id: $(this).attr('href'), text: $(this).html(), parent: parent.html()});
						});

						data = $filter('orderBy')(data, 'text');
						return {results: data};
					},
							
					formatResult:  function format(result, container, query, escapeMarkup) {
						if (!result.id) { return result.text; }
						
						var markup = [];
						Select2.util.markMatch(result.text, query.term, markup, escapeMarkup);
						return markup.join('') + (result.parent ? '<small class="muted" style="margin-left: 10px;">' + result.parent + '</small>' : '');
					},

					formatSelection:  function format(result, container) {
						if (!result || !result.id) { return; }
						
						$timeout(function () {
							container.parents('form').find('>input').select2('val', '');
							var href = result.id;
							href = href.substring(0, 1) === '#' ? href.substring(1, href.length) : href;

							$scope.$apply(function () {
								$location.path(href);
							});
						}, 200);
						
						return result.text;
					}
				};
			}
		};
	});
	
});