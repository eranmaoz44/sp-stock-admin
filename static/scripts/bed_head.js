(function(){

	'use strict';

	angular
		.module('formlyApp')
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