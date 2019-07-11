(function() {

	'use strict';



	angular
		.module('formlyApp')
		.controller('BedHeadPriceGetController', BedHeadPriceGetController, ['$http', '$scope']);

		function BedHeadPriceGetController(bed_head, width_range, bed_head_height, $http, $scope) {

			var vm = this;


			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.rental = {};

			vm.onSubmit = onSubmit;


			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.rentalFields = [
				{
					key: 'bed_head',
					type: 'select',
					templateOptions: {
						label: 'דגם',
						// Call our province service to get a list
						// of provinces and territories
						options: bed_head.getBedHeads()
					}
				},
				{
					key: 'width_range',
					type: 'select',
					templateOptions: {
						label: 'טווח רוחבים',
						// Call our province service to get a list
						// of provinces and territories
						options: width_range.getWidthRanges()
					}
				},
				{
					key: 'bed_head_height',
					type: 'select',
					templateOptions: {
						label: 'גובה ראש מיטה',
						// Call our province service to get a list
						// of provinces and territories
						options: bed_head_height.getBedHeadHeights()
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
	            			'width_range': vm.rental.width_range
	                }
	            }


	            $http.get('/api/bed_head/' + vm.rental.bed_head, config)
	            .success(function (data, status, headers, config) {
                    var bed_height_height_multiplier = parseFloat(vm.rental.bed_head_height)

	                vm.rental.price = Math.round(data * bed_height_height_multiplier) + ' ש"ח כולל מע"מ';
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