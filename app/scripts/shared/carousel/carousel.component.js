'use strict';

angular.module('petStoreApp')
	.component('customCarousel', {
		templateUrl: 'scripts/shared/carousel/carousel.html',
    	controller: CustomCarouselController,
    	bindings: {
    		images : "<"
    	}
	});

	function CustomCarouselController(){
		console.log(this.images);

		var _currentDeg = 0,
			magicNumber = 72;

		this.$onInit = function(){
			//Beta only. WIP - this component current is still under development. It only support 5 images.
			if(!this.images || (this.images && this.images.length!=5) ){
				console.error("Sorry. This component is still under development. It only support 5 images.");
			}else{
				_rotate.call(this, _currentDeg);	
			}
			
		}
		
		this.nextImage = function(){
			_currentDeg = _currentDeg - magicNumber;
			_rotate.call(this, _currentDeg);
		}

		this.previousImage = function(){
			_currentDeg = _currentDeg + magicNumber;
			_rotate.call(this, _currentDeg);
		}

		//Helper functions
		function _rotate(deg){
			this.carouselStyle = { "transform" : "translateZ(-145px) rotateY("+deg+"deg)" };	
		}
	}