(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('bed_head_height', bed_head_height);

	function bed_head_height() {

		function getBedHeadHeights() {
			return [
				{
					"name": "ראש בגובה 100 סנטימטר (110 סנטימטר מהרצפה)",
					"value":"1"
				},
                {
					"name": "ראש בגובה 110 סנטימטר (120 סנטימטר מהרצפה)",
					"value":"1.1"
				},
                {
					"name": "ראש בגובה 120 סנטימטר (130 סנטימטר מהרצפה)",
					"value":"1.2"

				}
            ];
		}

		return {
			getBedHeadHeights: getBedHeadHeights
		}
	}
})();