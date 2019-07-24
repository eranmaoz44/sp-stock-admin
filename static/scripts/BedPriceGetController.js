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
	            			'head_height': vm.bedPriceGetForm.bed_head_height
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