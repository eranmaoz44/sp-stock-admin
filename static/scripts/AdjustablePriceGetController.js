(function() {

	'use strict';



	angular
		.module('spStockAdminApp')
		.controller('AdjustablePriceGetController', AdjustablePriceGetController, ['$http', '$scope']);

		function AdjustablePriceGetController(adjustable, width, length, $http, $scope) {

			var vm = this;


			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.adjustablePriceGetForm = {};

			vm.onSubmit = onSubmit;


			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.adjustablePriceGetFormFields = [
				{
					key: 'adjustable',
					type: 'select',
					templateOptions: {
						label: 'דגם',
						options: adjustable.getAdjustables()
					}
				},
				{
					key: 'width',
					type: 'select',
					templateOptions: {
						label: 'רוחב',
						options: width.getWidths()
					}
				},
				{
					key: 'length',
					type: 'select',
					templateOptions: {
						label: 'אורך',
						options: length.getLengths()		        
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
	            			'width': vm.adjustablePriceGetForm.width,
	            			'length': vm.adjustablePriceGetForm.length
	                }
	            }


	            $http.get('/api/adjustable/' + vm.adjustablePriceGetForm.adjustable, config)
	            .success(function (data, status, headers, config) {
	                vm.adjustablePriceGetForm.price = data + ' ש"ח כולל מע"מ';
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