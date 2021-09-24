(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('adjustable', adjustable);

	function adjustable() {

		function getAdjustables() {
			return [
				{
					"name": "סט פוליפלקס + ספיר + מזרני קלאסיק",
					"value":"polyflex_sapir_with_classic"
				},
				{
					"name": "סט פוליפלקס + טורקיז + מזרני קלאסיק ",
					"value":"polyflex_turkiz_with_classic"
				},
				{
					"name": "סט פוליפלקס עם רגליים ללא מיטה + מזרני קלאסיק",
					"value":"polyflex_with_legs_no_bed_with_classic"
				}
            ];
		}

		return {
			getAdjustables: getAdjustables
		}
	}
})();