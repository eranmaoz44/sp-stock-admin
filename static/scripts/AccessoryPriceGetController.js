(function() {

	'use strict';



	angular
		.module('formlyApp')
		.controller('AccessoryPriceGetController', AccessoryPriceGetController, ['$http', '$scope']);

		function AccessoryPriceGetController(accessory, $http, $scope) {

			var vm = this;


			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.rental = {};

			vm.onSubmit = onSubmit;


			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.rentalFields = [
				{
					key: 'name',
					type: 'select',
					templateOptions: {
						label: 'סוג',
						// Call our province service to get a list
						// of provinces and territories
						options: accessory.getAccessories()
					}
				}

			];

			function onSubmit() {
	           // use $.param jQuery function to serialize data from JSON 
	        
	            var config = {
	                headers : {
	                		'Content-Type': 'application/json;charset=utf-8;'
	                },
	                params : {
	                }
	            }


	            $http.get('/api/accessory/' + vm.rental.name, config)
	            .success(function (data, status, headers, config) {
	                vm.rental.price = data;
	            })
	            .error(function (data, status, header, config) {
	                $scope.ResponseDetails = "Data: " + data +
	                    "<hr />status: " + status +
	                    "<hr />headers: " + header +
	                    "<hr />config: " + config;
	            });
        	};
     

		}

})();