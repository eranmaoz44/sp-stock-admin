(function() {

	'use strict';



	angular
		.module('spStockAdminApp')
		.controller('BedPriceSetController', BedPriceSetController, ['$http', '$scope']);

		function BedPriceSetController(bed, width, length, $http, $scope) {

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
					key: 'bed',
					type: 'select',
					templateOptions: {
						label: 'דגם',
						// Call our province service to get a list
						// of provinces and territories
						options: bed.getBeds(),
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
				},
                  {
                    "key": "is_buying_mattress",
                    "type": "checkbox",
                    "templateOptions": {
                      "label": "מחיר ברכישת מזרן"
                    },
				    ngModelElAttrs: {
                        "ng-init": "model.is_buying_mattress=false"
                    },
                    hideExpression: function(viewValue, modelValue, scope) {
                        var res =  true
                        if (typeof scope.model.bed === 'undefined' || scope.model.bed === null)
                            res = true
                        else if (scope.model.bed.includes('polyron_base'))
                            res = false
                        else if (scope.model.bed.includes('polyron_gal'))
                            res = false
                        else if (scope.model.bed.includes('sleep_depot'))
                            res = false
                        else
                            scope.model.is_buying_mattress = false
                        return res
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
	            			'width': vm.rental.width,
	            			'length': vm.rental.length,
	            			'is_buying_mattress': vm.rental.is_buying_mattress

	                }
	            }


	            $http.post('/api/bed/' + vm.rental.bed, data, config)
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