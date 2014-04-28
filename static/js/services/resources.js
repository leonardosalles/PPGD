define(['services/services'], function (services) {
	'use strict';

	services.factory('Twitter', function ($resource, $http) {
		return $resource('https://api.twitter.com/1.1/statuses/retweets/21947795900469248.json', {id: '@id'}, {
			'get': {method: 'GET', headers: {
					'Access-Control-Allow-Origin': true
				}}
		});
	});

	services.factory('Cep', function ($resource, $http) {
		return $resource('https://api.twitter.com/1.1/statuses/retweets/21947795900469248.json', {id: '@cep'}, {
			'get': {method: 'GET', isArray: true}
		});
	});
});
