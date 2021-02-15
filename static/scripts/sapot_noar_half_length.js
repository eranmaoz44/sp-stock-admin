(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('sapot_noar_half_length', sapot_noar_half_length);

	function sapot_noar_half_length() {

		function getSapotNoarHalfLengths() {
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
			getSapotNoarHalfLengths: getSapotNoarHalfLengths
		}
	}
})();