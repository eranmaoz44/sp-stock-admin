(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('sapot_noar_spolyron_width', sapot_noar_spolyron_width);

	function sapot_noar_spolyron_width() {

		function getSapotNoarSpolyronWidths() {
			return [
				{
					"name": "125",
					"value":"125"
				},
				{
					"name": "135",
					"value":"135"
				}
			];
		}

		return {
			getSapotNoarSpolyronWidths: getSapotNoarSpolyronWidths
		}
	}
})();