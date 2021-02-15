(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('sapot_noar_half_width', sapot_noar_half_width);

	function sapot_noar_half_width() {

		function getSapotNoarHalfWidths() {
			return [

				{
					"name": "120",
					"value":"120"
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