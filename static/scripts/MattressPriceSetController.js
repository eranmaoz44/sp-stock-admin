(function() {

	'use strict';



	angular
		.module('spStockAdminApp')
		.controller('MattressPriceSetController', MattressPriceSetController, ['$http', '$scope']);

		function MattressPriceSetController(mattress, width, length, $http, $scope) {

			var vm = this;


			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.mattressPriceSetForm = {};

			vm.onSubmit = onSubmit;

            vm.mattressPriceSetForm.success = false;

            vm.mattressPriceSetForm.failure = false;

			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.mattressPriceSetFormFields = [
				{
					key: 'mattress',
					type: 'select',
					templateOptions: {
						label: 'דגם',
						// Call our province service to get a list
						// of provinces and territories
						options: mattress.getMattresses(),
						required: true
					}
				},
				{
					key: 'width',
					type: 'select',
					templateOptions: {
						label: 'רוחב',
						// Call our province service to get a list
						// of provinces and territories
						options: width.getWidths(),
						required: true
					}
				},
				{
					key: 'length',
					type: 'select',
					templateOptions: {
						label: 'אורך',
						// Call our province service to get a list
						// of provinces and territories
						options: length.getLengths(),
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
	            var data = JSON.stringify({'price': vm.mattressPriceSetForm.price})
	        
	            var config = {
	                headers : {
	                		'Content-Type': 'application/json;charset=utf-8;'
	                },
	                params : {
	            			'width': vm.mattressPriceSetForm.width,
	            			'length': vm.mattressPriceSetForm.length
	                }
	            }


	            $http.post('/api/mattress/' + vm.mattressPriceSetForm.mattress, data, config)
	            .success(function (data, status, headers, config) {
	                $scope.PostDataResponse = data;
                    vm.mattressPriceSetForm.success = true;
                    vm.mattressPriceSetForm.failure = false;

	            })
	            .error(function (data, status, header, config) {
	                $scope.ResponseDetails = "Data: " + data +
	                    "<hr />status: " + status +
	                    "<hr />headers: " + header +
	                    "<hr />config: " + config;
                    vm.mattressPriceSetForm.failure = true;
                    vm.mattressPriceSetForm.success = false;

	            });
        	};


		}

})();