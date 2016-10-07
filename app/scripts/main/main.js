'use strict';

/**
 * @ngdoc function
 * @name petStoreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the petStoreApp
 */
angular.module('petStoreApp')
	.component('app', {
		templateUrl: 'scripts/main/main.html',
		controller: MainCtrl,
	    $routeConfig: [
	      {path: '/', name: 'Pets', component: 'pets', useAsDefault: true},
	      {path: '/petdetail/:id', name: 'PetDetail', component: 'petDetail' },
	      {path: '/createPet', name: 'CreatePet', component: 'createPet' }
	    ]
	})

	function MainCtrl(){	
		
	}
