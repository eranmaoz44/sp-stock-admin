(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('width_adj', width_adj);

	function width_adj() {

		function getWidths() {
			return [
				{
					"name": "120",
					"value":"120"
				},
				{
					"name": "140",
					"value":"140"
				},
				{
					"name": "160",
					"value":"160"
				},
				{
					"name": "180",
					"value":"180"
				},
				{
					"name": "200",
					"value":"200"
				}
			];
		}

		return {
			getWidths: getWidths
		}
	}
})();