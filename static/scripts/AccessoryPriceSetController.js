/**
 * Created by Eran on 14/05/2018.
 */
(function() {

	'use strict';



	angular
		.module('formlyApp')
		.controller('AccessoryPriceSetController', AccessoryPriceSetController, ['$http', '$scope']);

		function AccessoryPriceSetController(accessory, $http, $scope) {

			var vm = this;


			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.rental = {};

			vm.onSubmit = onSubmit;

            vm.rental.success = false;

            vm.rental.failure = false;

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
						options: accessory.getAccessories(),
						required: true
					}
				},
				{
					key: 'price',
					type: 'input',
					templateOptions: {
						type: 'text',
						label: 'מחיר',
						placeholder: 'הכנס מחיר',
						required: true
					},
					validators: {
						// Custom validator to check whether the driver's license
						// number that the user enters is valid or not
		          		price: function($viewValue, $modelValue, scope) {
		          			var value = $modelValue || $viewValue;
		          			if(value) {
		          				// call the validateDriversLicense function
		          				// which either returns true or false
		          				// depending on whether the entry is valid
		          				return validatePrice(value)
		          			}
		          		}
		          	}
				}

			];

			function validatePrice(value) {
				return /\d+$/.test(value);
			}

			function onSubmit() {
	           // use $.param jQuery function to serialize data from JSON 
	            var data = JSON.stringify({'price': vm.rental.price})
	        
	            var config = {
	                headers : {
	                		'Content-Type': 'application/json;charset=utf-8;'
	                },
	                params : {
	                }
	            }


	            $http.post('/api/accessory/' + vm.rental.name, data, config)
	            .success(function (data, status, headers, config) {
	                $scope.PostDataResponse = data;
                    vm.rental.success = true;
                    vm.rental.failure = false;

	            })
	            .error(function (data, status, header, config) {
	                $scope.ResponseDetails = "Data: " + data +
	                    "<hr />status: " + status +
	                    "<hr />headers: " + header +
	                    "<hr />config: " + config;
                    vm.rental.failure = true;
                    vm.rental.success = false;

	            });
        	};


		}

})();