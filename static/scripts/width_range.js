(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('width_range', width_range);

	function width_range() {

		function getWidthRanges() {
			return [
				{
					"name": "0-100",
					"value":"0-100"
				},
				{
					"name": "101-160",
					"value":"101-160"
				},
				{
					"name": "161-200",
					"value":"161-200"
				}
			];
		}

		return {
			getWidthRanges: getWidthRanges
		}
	}
})();