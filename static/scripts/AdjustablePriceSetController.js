(function() {

	'use strict';



	angular
		.module('spStockAdminApp')
		.controller('AdjustablePriceSetController', AdjustablePriceSetController, ['$http', '$scope']);

		function AdjustablePriceSetController(adjustable, width, length, $http, $scope) {

			var vm = this;


			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.adjustablePriceSetForm = {};

			vm.onSubmit = onSubmit;

            vm.adjustablePriceSetForm.success = false;

            vm.adjustablePriceSetForm.failure = false;

			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.adjustablePriceSetFormFields = [
				{
					key: 'adjustable',
					type: 'select',
					templateOptions: {
						label: 'סוג סט',
						// Call our province service to get a list
						// of provinces and territories
						options: adjustable.getAdjustables(),
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
	            var data = JSON.stringify({'price': vm.adjustablePriceSetForm.price})
	        
	            var config = {
	                headers : {
	                		'Content-Type': 'application/json;charset=utf-8;'
	                },
	                params : {
	            			'width': vm.adjustablePriceSetForm.width,
	            			'length': vm.adjustablePriceSetForm.length
	                }
	            }


	            $http.post('/api/adjustable/' + vm.adjustablePriceSetForm.adjustable, data, config)
	            .success(function (data, status, headers, config) {
	                $scope.PostDataResponse = data;
                    vm.adjustablePriceSetForm.success = true;
                    vm.adjustablePriceSetForm.failure = false;

	            })
	            .error(function (data, status, header, config) {
	                $scope.ResponseDetails = "Data: " + data +
	                    "<hr />status: " + status +
	                    "<hr />headers: " + header +
	                    "<hr />config: " + config;
                    vm.adjustablePriceSetForm.failure = true;
                    vm.adjustablePriceSetForm.success = false;

	            });
        	};


		}

})();