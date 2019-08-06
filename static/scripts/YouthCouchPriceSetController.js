(function() {

	'use strict';



	angular
		.module('spStockAdminApp')
		.controller('YouthCouchPriceSetController', YouthCouchPriceSetController, ['$http', '$scope']);

		function YouthCouchPriceSetController(youth_couch, width, length, sapot_noar_polynoa_width, $http, $scope) {

			var vm = this;


			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.youthCouchPriceSetForm = {};

			vm.onSubmit = onSubmit;

            vm.youthCouchPriceSetForm.success = false;

            vm.youthCouchPriceSetForm.failure = false;

			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.youthCouchPriceSetFormFields = [
				{
					key: 'youth_couch',
					type: 'select',
					templateOptions: {
						label: 'דגם',
						// Call our province service to get a list
						// of provinces and territories
						options: youth_couch.getYouthCouches(),
						required: true
					}
				},
				{
					key: 'width',
					type: 'select',
					expressionProperties: {
                        'templateOptions.options': function(viewValue, modelValue, scope) {
                        var res =  width.getWidths()
                        if (typeof scope.model.youth_couch === 'undefined')
                            res =  width.getWidths()
                        else if (scope.model.youth_couch.includes('polykal'))
                            res = width.getWidths().filter(x => parseInt(x['value']) <= 90)
                        else if (scope.model.youth_couch.includes('half'))
                            res = width.getWidths().filter(x => parseInt(x['value']) == 120)
                        else if (scope.model.youth_couch.includes('polynoa'))
                            res = sapot_noar_polynoa_width.getSapotNoarPolynoaWidths()
                        return res
                     }
                },
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
					expressionProperties: {
                        'templateOptions.options': function(viewValue, modelValue, scope) {
                        var res =  length.getLengths()
                        if (typeof scope.model.youth_couch === 'undefined' || scope.model.youth_couch === null)
                            res = length.getLengths()
                        else if (scope.model.youth_couch.includes('polykal'))
                            res = length.getLengths()
                        else if (scope.model.youth_couch.includes('half'))
                            res = length.getLengths().filter(x => parseInt(x['value']) == 200)
                        else if (scope.model.youth_couch.includes('polynoa'))
                            res = lemgth.getLengths()
                        return res
                        }
                    },
					templateOptions: {
						label: 'אורך',
						// Call our province service to get a list
						// of provinces and territories
						options: length.getLengths(),
						required: true
					}
				},
				{
				    key: 'is_with_mechanism',
				    type: 'checkbox',
				    templateOptions: {
				        label: 'עם מנגנון הרמת ראש'
				    },
				    ngModelElAttrs: {
                        "ng-init": "model.is_with_mechanism=false"
                    },
                    hideExpression: function(viewValue, modelValue, scope) {
                        var res =  true
                        if (typeof scope.model.youth_couch === 'undefined' || scope.model.youth_couch === null)
                            res = true
                        else if (scope.model.youth_couch.includes('polykal'))
                            res = false
                        else if (scope.model.youth_couch.includes('half'))
                            res = false
                        else if (scope.model.youth_couch.includes('polynoa'))
                            res = true
                        return res
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
	            var data = JSON.stringify({'price': vm.youthCouchPriceSetForm.price})

	            var config = {
	                headers : {
	                		'Content-Type': 'application/json;charset=utf-8;'
	                },
	                params : {
	            			'width': vm.youthCouchPriceSetForm.width,
	            			'length': vm.youthCouchPriceSetForm.length,
	            			'is_with_mechanism': vm.youthCouchPriceSetForm.is_with_mechanism
	                }
	            }


	            $http.post('/api/youth_couch/' + vm.youthCouchPriceSetForm.youth_couch, data, config)
	            .success(function (data, status, headers, config) {
	                $scope.PostDataResponse = data;
                    vm.youthCouchPriceSetForm.success = true;
                    vm.youthCouchPriceSetForm.failure = false;

	            })
	            .error(function (data, status, header, config) {
	                $scope.ResponseDetails = "Data: " + data +
	                    "<hr />status: " + status +
	                    "<hr />headers: " + header +
	                    "<hr />config: " + config;
                    vm.youthCouchPriceSetForm.failure = true;
                    vm.youthCouchPriceSetForm.success = false;

	            });
        	};


		}

})();