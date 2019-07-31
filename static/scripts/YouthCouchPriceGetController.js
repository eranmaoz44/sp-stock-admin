(function() {

	'use strict';



	angular
		.module('spStockAdminApp')
		.controller('YouthCouchPriceGetController', YouthCouchPriceGetController, ['$http', '$scope']);

		function YouthCouchPriceGetController(youth_couch, width, length, sapot_noar_half_width, sapot_noar_half_length, $http, $scope) {

			var vm = this;


			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.youthCouchPriceGetForm = {};

			vm.onSubmit = onSubmit;


			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.youthCouchPriceGetFormFields = [
				{
					key: 'youth_couch',
					type: 'select',
			        templateOptions: {
						label: 'דגם',
						options: youth_couch.getYouthCouches()
					}
				},
				{
					key: 'width',
					type: 'select',
					expressionProperties: {
                        'templateOptions.options': function(viewValue, modelValue, scope) {
                        var res =  width.getWidths()
                        if (typeof scope.model.youth_couch === 'undefined' || scope.model.youth_couch === null)
                            res =  width.getWidths()
                        else if (scope.model.youth_couch.includes('polykal'))
                            res = width.getWidths().filter(x => parseInt(x['value']) <= 90)
                        else if (scope.model.youth_couch.includes('half'))
                            res = sapot_noar_half_width.getSapotNoarHalfWidths()
                        return res
                     }
                },
					templateOptions: {
						label: 'רוחב',
						options: width.getWidths()
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
                        else if (scope.model.youth_couch.includes('half')){
                            res = sapot_noar_half_length.getSapotNoarHalfLengths()
                            if (scope.model.youth_couch.includes('dia'))
                                res = res.filter(x => parseInt(x['value']) > 180)
                         }
                        return res
                        }
                     },

					templateOptions: {
						label: 'אורך',
						options: length.getLengths()
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
                        return res
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
	            			'width': vm.youthCouchPriceGetForm.width,
	            			'length': vm.youthCouchPriceGetForm.length,
	            			'is_with_mechanism': vm.youthCouchPriceGetForm.is_with_mechanism
	                }
	            }


	            $http.get('/api/youth_couch/' + vm.youthCouchPriceGetForm.youth_couch, config)
	            .success(function (data, status, headers, config) {
	                vm.youthCouchPriceGetForm.price = data + ' ש"ח כולל מע"מ';
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