define(['services/services'], function (services) {
	'use strict';
	
	services.provider('$pager', function () {
		
		this.$get = function ($notify, $error, $filter) {
			
			function Pager(resource, array) {
				this.resource = resource;
				this.array = array;
				
				this.maxSize = 5;
				this.currentPage = 1;
				this.currentLimit = 10;
				this.filter = {};
				this.sorting = [];
				
				this.results = null;
				this.totalResults = null;
				this.numPages = null;
				
				this.apply = function (filter) {
					this.filter = filter;
					this._goTo(1, false);
				};
				
				this.execute = function (filter) {
					this.filter = filter;
					this._goTo(1, true);
				};
				
				this.reload = function () {
					this._goTo(this.currentPage, false);
				};
				
				this.goTo = function (page) {
					this._goTo(page, true);
				};
				
				this._goTo = function (page, flag) {
					if (array) {
						var filtering = $filter('filter')(array, this.filter);
						var ordened = this.sorting.length > 0 ? $filter('orderBy')(filtering, this.sorting) : filtering;
				        
						this.results = ordened.slice((page - 1) * this.currentLimit, page * this.currentLimit);
						this.totalResults = filtering.length;
						this.numPages = Math.ceil(this.totalResults  / this.currentLimit);
						this.currentPage = page;
						
						this.startResult = this.currentPage ? (this.currentPage - 1) * this.currentLimit + 1 : 0;
						this.endResult = this.currentPage ? Math.min(this.totalResults, this.currentPage * this.currentLimit) : 0;
						return;
					}

					var actualFilter = {};
					angular.extend(actualFilter, this.filter, {page: page, limit: this.currentLimit}, {sorting: this.sorting});
					
					var self = this;
					this.resource.query(actualFilter, function (data, headers) {
						self.results = data;
						self.totalResults = parseInt(headers('x-spa-meta-total-count'), 10);
						self.numPages =  parseInt(headers('x-spa-meta-total-pages'), 10);
						self.currentLimit = parseInt(headers('x-spa-meta-current-limit'), 10);
						self.currentPage = parseInt(headers('x-spa-meta-current-page'), 10);
						
						self.startResult = self.currentPage ? (self.currentPage - 1) * self.currentLimit + 1 : 0;
						self.endResult = self.currentPage ? Math.min(self.totalResults, self.currentPage * self.currentLimit) : 0;

						
						if (flag && self.totalResults === 0) {
							$notify.info(I18n.t('spa.datascroller.nomatches'));
						}

					}, $error.notify());
				};
			}
			
			return {
				$resource: function (resource) {
					return new Pager(resource);
				},
				
				$array: function (array) {
					return new Pager(null, array);
				}
			};
		};
	});
});