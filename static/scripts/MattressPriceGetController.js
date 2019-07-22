(function() {

	'use strict';



	angular
		.module('spStockAdminApp')
		.controller('MattressPriceGetController', MattressPriceGetController, ['$http', '$scope']);

		function MattressPriceGetController(mattress, width, length, $http, $scope) {

			var vm = this;


			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.mattressPriceGetForm = {};

			vm.onSubmit = onSubmit;


			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.mattressPriceGetFormFields = [
				{
					key: 'mattress',
					type: 'select',
					templateOptions: {
						label: 'דגם',
						options: mattress.getMattresses()
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
	            			'width': vm.mattressPriceGetForm.width,
	            			'length': vm.mattressPriceGetForm.length
	                }
	            }


	            $http.get('/api/mattress/' + vm.mattressPriceGetForm.mattress, config)
	            .success(function (data, status, headers, config) {
	                vm.mattressPriceGetForm.price = data + ' ש"ח כולל מע"מ';
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