(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('sapot_noar_half_width', sapot_noar_half_width);

	function sapot_noar_half_width() {

		function getSapotNoarHalfWidths() {
			return [
				{
					"name": "80",
					"value":"80"
				},
				{
					"name": "100",
					"value":"100"
				},
				{
					"name": "120",
					"value":"120"
				},
				{
					"name": "130",
					"value":"130"
				},
				{
					"name": "140",
					"value":"140"
				}
			];
		}

		return {
			getSapotNoarHalfWidths: getSapotNoarHalfWidths
		}
	}
})();