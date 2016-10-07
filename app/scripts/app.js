'use strict';

/**
 * @ngdoc overview
 * @name petStoreApp
 * @description
 * # petStoreApp
 *
 * Main module of the application.
 */
angular
	.module('petStoreApp', [
		'ngAnimate',
		'ngAria',
		'ngCookies',
		'ngMessages',
		'ngResource',
		'ngSanitize',
		'ngTouch',
		'ngComponentRouter',
		'growlNotifications',
		'config'
	])
	
	.config(['$locationProvider',function($locationProvider) {
		// $locationProvider.html5Mode(true);
	}])

	.value('$routerRootComponent', 'app');
