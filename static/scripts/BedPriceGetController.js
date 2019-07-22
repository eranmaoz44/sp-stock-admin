(function() {

	'use strict';



	angular
		.module('spStockAdminApp')
		.controller('BedPriceGetController', BedPriceGetController, ['$http', '$scope']);

		function BedPriceGetController(bed, width, length, bed_head_height, $http, $scope) {

			var vm = this;


			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.BedPriceGetForm = {};

			vm.onSubmit = onSubmit;

			vm.options = {
      			formState: {
        			awesomeIsForced: true
      			}
    		};

			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.BedPriceGetFormFields = [
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
				key: 'awesome',
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
					  "ng-init": "model.awesome=true"
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
				  return !(scope.model.bed.startsWith('polyron_shoam') || scope.model.bed.startsWith('polyron_turkiz')) || !scope.model.awesome
				},
        templateOptions: {
          label: 'גובה ראש מיטה',
          options: bed_head_height.getBedHeadHeights()
        }
      }


			];

			function onSubmit() {
	           // use $.param jQuery function to serialize data from JSON

				if (vm.BedPriceGetForm.bed.startsWith('polyron_shoam') || vm.BedPriceGetForm.bed.startsWith('polyron_turkiz')){
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
	            			'width': vm.BedPriceGetForm.width,
	            			'length': vm.BedPriceGetForm.length
	                }
	            }

	            $http.get('/api/bed/' + vm.BedPriceGetForm.bed, config)
	            .success(function (data, status, headers, config) {
	                vm.BedPriceGetForm.price = data;
	            })
	            .error(function (data, status, header, config) {
	                $scope.ResponseDetails = "Data: " + data +
	                    "<hr />status: " + status +
	                    "<hr />headers: " + header +
	                    "<hr />config: " + config;
	            });
        	};

			function onSubmitBedsWithHeads() {
	           // use $.param jQuery function to serialize data from JSON


				  var width_range;

				if (vm.BedPriceGetForm.width <= 100)
				{
					width_range = '0-100'
				} else if (vm.BedPriceGetForm.width <= 160){
					width_range = '101-160'
				}
				else
				{
					width_range = '161-200'
				}

				  var config = {
					  headers: {
						  'Content-Type': 'application/json;charset=utf-8;'
					  },
					  params: {
						  'width_range': width_range
					  }
				  }

				var bed_head_price;

				var head_type = vm.BedPriceGetForm.bed.split('_')[0] + '_bed_head'



				if (vm.BedPriceGetForm.awesome) {

					$http.get('/api/bed_head/' + head_type, config)
						.success(function (data, status, headers, config) {
							var bed_height_height_multiplier = parseFloat(vm.BedPriceGetForm.bed_head_height)

							bed_head_price = Math.round(data * bed_height_height_multiplier)
						})
						.error(function (data, status, header, config) {
							$scope.ResponseDetails = "Data: " + data +
								"<hr />status: " + status +
								"<hr />headers: " + header +
								"<hr />config: " + config;
						});
				} else {
					bed_head_price = 0
				}
	            var config = {
	                headers : {
	                		'Content-Type': 'application/json;charset=utf-8;'
	                },
	                params : {
	            			'width': vm.BedPriceGetForm.width,
	            			'length': vm.BedPriceGetForm.length
	                }
	            }
			

				console.log('head price = ' + bed_head_price);
	            if ( vm.BedPriceGetForm.bed == "polyron_shoam_sapir" && bed_head_price == 0){
			console.log('shoam selected with no head, automatically ading Kappa');
			bed_head_price = 300;
	            }

	            $http.get('/api/bed/' + vm.BedPriceGetForm.bed, config)
	            .success(function (data, status, headers, config) {
		console.log("trying to calculate bed price, only the bed's price before adding head is " + data);
	                vm.BedPriceGetForm.price = Math.round((parseInt(data) + bed_head_price)) + ' ש"ח כולל מע"מ';
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