(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('sapot_noar_polynoa_width', sapot_noar_polynoa_width);

	function sapot_noar_polynoa_width() {

		function getSapotNoarPolynoaWidths() {
			return [
				{
					"name": "144",
					"value":"144"
				}
			];
		}

		return {
			getSapotNoarPolynoaWidths: getSapotNoarPolynoaWidths
		}
	}
})();