(function() {

	'use strict';



	angular
		.module('spStockAdminApp')
		.controller('BedPriceGetController', BedPriceGetController, ['$http', '$scope']);

		function BedPriceGetController(bed, width, length, bed_head_height, $http, $scope) {

			var vm = this;


			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.bedPriceGetForm = {};

			vm.onSubmit = onSubmit;

			vm.options = {
      			formState: {
        			awesomeIsForced: true
      			}
    		};

			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.bedPriceGetFormFields = [
				{
					key: 'bed',
					type: 'select',
					templateOptions: {
						label: 'דגם',
						// Call our province service to get a list
						// of provinces and territories
						options: bed.getBeds()
					}
				},
				{
					key: 'width',
					type: 'select',
					templateOptions: {
						label: 'רוחב',
						// Call our province service to get a list
						// of provinces and territories
						options: width.getWidths()		        
					}
				},
				{
					key: 'length',
					type: 'select',
					templateOptions: {
						label: 'אורך',
						// Call our province service to get a list
						// of provinces and territories
						options: length.getLengths()		        
					}
				},
			  {
				key: 'isWithHead',
				type: 'checkbox',
				templateOptions: { label: '' },
				expressionProperties: {
				  'templateOptions.disabled': 'formState.awesomeIsForced',
				  'templateOptions.label': function(viewValue, modelValue, scope) {
					if (scope.formState.awesomeIsForced) {
					  return 'בלי ראש מיטה';
					} else {
					  return 'ווו  עם ראש מיטה';
					}
				  }
				},

				hideExpression: function($viewValue, $modelValue, scope) {
				  return !(scope.model.bed.startsWith('polyron_shoam') || scope.model.bed.startsWith('polyron_turkiz'))

				},
				  ngModelElAttrs: {
					  "ng-init": "model.isWithHead=true"
				  }
			  },
      {
        key: 'bed_head_height',
        type: 'select',
        expressionProperties: {
          'templateOptions.placeholder': function(viewValue, modelValue, scope) {
            if (scope.formState.awesomeIsForced) {
              return 'Too bad... It really is awesome! Wasn\'t that cool?';
            } else {
              return 'Type in here... I dare you';
            }
          },
          'templateOptions.disabled': 'formState.awesomeIsForced'
        },
        hideExpression: function($viewValue, $modelValue, scope) {
				  return !(scope.model.bed.startsWith('polyron_shoam') || scope.model.bed.startsWith('polyron_turkiz')) || !scope.model.isWithHead
				},
        templateOptions: {
          label: 'גובה ראש מיטה',
          options: bed_head_height.getBedHeadHeights()
        }
      }


			];

			function onSubmit() {
	           // use $.param jQuery function to serialize data from JSON

				if (vm.bedPriceGetForm.isWithHead){
					onSubmitBedsWithHeads()
				} else
				{
					onSubmitBedWithoutHeads()
				}
        	};

			function onSubmitBedWithoutHeads() {
	           // use $.param jQuery function to serialize data from JSON

	            var config = {
	                headers : {
	                		'Content-Type': 'application/json;charset=utf-8;'
	                },
	                params : {
	            			'width': vm.bedPriceGetForm.width,
	            			'length': vm.bedPriceGetForm.length
	                }
	            }

	            $http.get('/api/bed/' + vm.bedPriceGetForm.bed, config)
	            .success(function (data, status, headers, config) {
	                vm.bedPriceGetForm.price = data;
	            })
	            .error(function (data, status, header, config) {
	                $scope.ResponseDetails = "Data: " + data +
	                    "<hr />status: " + status +
	                    "<hr />headers: " + header +
	                    "<hr />config: " + config;
	            });
        	};


			function onSubmitBedsWithHeads() {

	            var config = {
	                headers : {
	                		'Content-Type': 'application/json;charset=utf-8;'
	                },
	                params : {
	            			'width': vm.bedPriceGetForm.width,
	            			'length': vm.bedPriceGetForm.length,
	            			'head_height': vm.bedPriceGetForm.bed_head_height
	                }
	            }

	            $http.get('/api/polyron_bed/' + vm.bedPriceGetForm.bed, config)
	            .success(function (data, status, headers, config) {
	                vm.bedPriceGetForm.price = data + ' ש"ח כולל מע"מ';
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