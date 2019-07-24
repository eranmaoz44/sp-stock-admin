(function() {

	'use strict';



	angular
		.module('spStockAdminApp')
		.controller('BedHeadPriceSetController', BedHeadPriceSetController, ['$http', '$scope']);

		function BedHeadPriceSetController(bed_head, width_range, $http, $scope) {

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
					key: 'bed_head',
					type: 'select',
					templateOptions: {
						label: 'דגם',
						// Call our province service to get a list
						// of provinces and territories
						options: bed_head.getBedHeads(),
						required: true
					}
				},
				{
					key: 'width_range',
					type: 'select',
					templateOptions: {
						label: 'טווח רוחבים',
						// Call our province service to get a list
						// of provinces and territories
						options: width_range.getWidthRanges(),
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
		          				// call the validateDriversLicense functi on
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
	            			'width_range': vm.rental.width_range,
	                }
	            }


	            $http.post('/api/bed_head/' + vm.rental.bed_head, data, config)
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