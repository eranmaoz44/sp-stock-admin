(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('bed_head', bed_head);

	function bed_head() {

		function getBedHeads() {
			return [
				{
					"name": "ראש מיטה פולירון",
					"value":"polyron_bed_head"
				}
            ];
		}

		return {
			getBedHeads: getBedHeads
		}
	}
})();