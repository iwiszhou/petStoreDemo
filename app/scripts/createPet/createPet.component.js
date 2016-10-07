'use strict';

angular.module('petStoreApp')
	.component('createPet', {
		templateUrl: 'scripts/createPet/createPet.html',
    	controller: CreatePetController,
    	bindings: { $router: '<' }
	});

	function CreatePetController(UtilsApi, UtilsService, $interval, MSG, PET_STATUS){
		var _petId,
			interval,
			NOT_FOUND_MSG = MSG.NOT_FOUND_MSG,
			SERVER_DOWN_MSG = MSG.SERVER_DOWN_MSG,
			SUCCESS_ADD_MSG = MSG.SUCCESS_ADD_MSG;
			
		this.$onInit = function(){			
			this.status = PET_STATUS.list || [];

			this.pet = {
				status : this.status[0]
			};
		}

		this.$onDestroy = function(){
			if(interval){
				$interval.cancel(interval);	
			}
		}

		this.back = function(){
			this.$router.navigate(['Pets']);
		}

		this.submitForm = function(){
			_savePet.call(this, this.pet);
		}

		//Helper functions
		function _prepareRequestObj(pet){
			var _photos = [],
				_tags = [];
			
			if(!pet){
				return;
			}

			if(pet.photoUrls && pet.photoUrls.length>0){
				_photos = _strToArrayObj( pet.photoUrls);
			}

			if(pet.tags && pet.tags.length>0){
				_tags = _strToArrayObj( pet.tags, 'name');
			}

			var requestObj = {
				name 	: pet.name,
				status 	: pet.status.value,
				tags 	: _tags,
				photoUrls 	: _photos,
				category 	: { name : pet.categoryName }
			}

			return requestObj;
		}

		
		function _strToArrayObj(str, keyName){
			var retArr = [],
				splitArr;

			if(str && str.length>0){
				
				splitArr = str.split(",");

				for(var i=0; i<splitArr.length; i++){
					if(splitArr[i] && splitArr[i].length>0){
						if(keyName){
							retArr.push({
								// [keyName] : splitArr[i]
								name : splitArr[i]
							});	
						}else{
							retArr.push(splitArr[i]);
						}
						
					}
				}
			}

			return retArr;
		}

		//Add Pet
		function _savePet(pet){
			this.errorMsg="";
			UtilsService.show();

			var requestObj = _prepareRequestObj(pet);
			
			UtilsApi.savePet(requestObj).then(
				_successCB_savePet.bind(this),
				_errorCB_savePet.bind(this)
			);
		}

		function _successCB_savePet(response){
			UtilsService.hide();

			this.countDown = 5;
			
			this.successMsg = SUCCESS_ADD_MSG;

			interval = $interval(function(){
				this.countDown -= 1;
				
				if(this.countDown <= 0){
					$interval.cancel(interval);
					this.$router.navigate(['Pets']);
				}

			}.bind(this),1000);
			
		}

		function _errorCB_savePet(response){
			UtilsService.hide();
			this.errorMsg = SERVER_DOWN_MSG;
		}
	}