'use strict';

angular.module('petStoreApp')
		.service('UtilsApi', ['$resource', '$q', 'UtilsService', 'ENV', UtilsApi]);

		function UtilsApi($resource, $q, UtilsService, ENV) {
			var _apiEndpoint = ENV.apiEndpoint;

			this.getPetsList = function(){
				var deferred = $q.defer();
				
				$resource(
					_apiEndpoint + "/pets",
					{},
					{ 'get' : { method:'GET', isArray:true} }
    			).get(
					{},
					function(response){
						deferred.resolve(response);
					},
					function(error){
						deferred.reject(error);
					}
				);

				return deferred.promise;
			};

			this.getPetById = function(petId){
				var deferred = $q.defer();
				
				//Input petId validation
				if(!petId || petId<0 || isNaN(petId) || !UtilsService.isNumber(petId)){
					console.error("Missing or Invaild input parameter. Please provide petId(number)");
					return;
				}

				$resource(_apiEndpoint + "/pet/"+petId).get(
					{},
					function(response){
						deferred.resolve(response);
					},
					function(error){
						deferred.reject(error);
					}
				);

				return deferred.promise;
			};

			this.savePet = function(pet){
				var deferred = $q.defer(),
					reqeustObj = {};

				//Validate Category
				if(pet.category && pet.category.name && pet.category.name!=""){
					reqeustObj.category = pet.category;
				}

				//Validate Photos
				if(pet.photoUrls && pet.photoUrls.length>0){
					reqeustObj.photoUrls = pet.photoUrls;
				}else{
					console.error("Phont urls are required");
					deferred.reject({ validation: false });
				}

				//Validate Tags
				if(pet.tags && pet.tags.length>0){
					reqeustObj.tags = pet.tags;
				}

				//Validate Status
				if(pet.status){
					reqeustObj.status = pet.status;
				}

				//Validate Name
				reqeustObj.name = pet.name;
				if(!reqeustObj.name){
					console.error("name is required");
					deferred.reject({ validation: false });
				}

				$resource(_apiEndpoint + "/pet").save(
					reqeustObj,
					function(response){
						deferred.resolve(response);
					},
					function(error){
						deferred.reject(error);
					}
				);

				return deferred.promise;
			};

			this.deletePetById = function(petId){
				var deferred = $q.defer();
				
				//Input petId validation
				if(!petId || petId<0 || isNaN(petId) || !UtilsService.isNumber(petId)){
					console.error("Missing or Invaild input parameter. Please provide petId(number)");
					return;
				}

				$resource(_apiEndpoint + "/pet/"+petId).delete(
					{},
					function(response){
						deferred.resolve(response);
					},
					function(error){
						deferred.reject(error);
					}
				);

				return deferred.promise;
			};

		}