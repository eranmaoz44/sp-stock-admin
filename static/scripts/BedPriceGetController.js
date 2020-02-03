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
                key: 'bed_head_height',
                type: 'select',
                expressionProperties: {
                  'templateOptions.placeholder': function(viewValue, modelValue, scope) {
                       if (typeof scope.model.bed === "undefined" || !(scope.model.bed.startsWith('polyron_shoam') || scope.model.bed.startsWith('polyron_turkiz'))){
                            scope.model.bed_head_height = 0
                       }
                  }
                },
                hideExpression: function($viewValue, $modelValue, scope) {
                          return typeof scope.model.bed === "undefined" || !(scope.model.bed.startsWith('polyron_shoam') || scope.model.bed.startsWith('polyron_turkiz'))
                        },
                templateOptions: {
                  label: 'גובה ראש מיטה',
                  options: bed_head_height.getBedHeadHeights(),
                  required: true
                },
                ngModelElAttrs: {
                    "ng-init": "model.bed_head_height=0"
                }
              },
              {
                'key': 'is_jewish_bed',
                'type': 'checkbox',
                'templateOptions': {
                  'label': 'הפרדה יהודית'
                },
                ngModelElAttrs: {
                    'ng-init': 'model.is_jewish_bed=false'
                },
                 hideExpression: function(viewValue, modelValue, scope) {
                        var res =  true
                        if (typeof scope.model.bed === 'undefined' || scope.model.bed === null)
                            res = true
                        else if (scope.model.width === 'undefined' || scope.model.width === null)
                            res = true
                        else if (scope.model.length === 'undefined' || scope.model.length === null)
                            res = true
                        else if (parseInt(scope.model.width) >= 160)
                            res = false
                        else if (scope.model.bed.includes('polyron') && parseInt(scope.model.width) == 140)
                            res = false
                        else
                            scope.model.is_jewish_bed=false
                        return res
                    }
              },
              {
                'key': 'is_buying_mattress',
                'type': 'checkbox',
                'templateOptions': {
                  'label': 'מחיר ברכישת מזרן'
                },
                ngModelElAttrs: {
                    'ng-init': 'model.is_buying_mattress=false'
                },
                hideExpression: function(viewValue, modelValue, scope) {
                    var res =  false
//                    if (typeof scope.model.bed === 'undefined' || scope.model.bed === null)
//                        res = true
//                    else if (scope.model.bed.includes('polyron_base'))
//                        res = false
//                    else if (scope.model.bed.includes('polyron_gal'))
//                        res = false
//                    else if (scope.model.bed.includes('sleep_depot'))
//                        res = false
//                    else
//                        scope.model.is_buying_mattress = false
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
	            			'width': vm.bedPriceGetForm.width,
	            			'length': vm.bedPriceGetForm.length,
	            			'head_height': vm.bedPriceGetForm.bed_head_height,
	            			'is_jewish_bed': vm.bedPriceGetForm.is_jewish_bed,
	            			'is_buying_mattress': vm.bedPriceGetForm.is_buying_mattress
	                }
	            }

	            $http.get('/api/bed/' + vm.bedPriceGetForm.bed, config)
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