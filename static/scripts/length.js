(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('length', length);

	function length() {

		function getLengths() {
			return [
				{
					"name": "190",
					"value":"190"
				},
				{
					"name": "200",
					"value":"200"
				}
			];
		}

		return {
			getLengths: getLengths
		}
	}
})();