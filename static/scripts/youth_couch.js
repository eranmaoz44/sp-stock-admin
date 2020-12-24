(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('youth_couch', youth_couch);

	function youth_couch() {

		function getYouthCouches() {
			return [
				{
					"name": "הדס/ירדן",
					"value":"polyron_sapot_noar_polykal_one",
					"group":"פוליקל"
				},
				{
					"name": "גלים",
					"value":"polyron_sapot_noar_polykal_two",
					"group":"פוליקל"
				},
				{
					"name": "שלדג",
					"value":"polyron_sapot_noar_half_efroni_shaldag_agmit",
					"group":"פולירון וחצי"
				},
				{
					"name": "חוחית",
					"value":"polyron_sapot_noar_half_huhit_tzufit",
					"group":"פולירון וחצי"
				},
				{
					"name": "דיה",
					"value":"polyron_sapot_noar_half_dia",
					"group":"פולירון וחצי"
				},
				{
				    "name": "דרור",
				    "value": "polyron_sapot_noar_polynoa_dror",
				    "group": "פולינוע"
				},
				{
				    "name": "סנונית / זמיר",
				    "value": "polyron_sapot_noar_spolyron",
				    "group": "ספולירון"
				}
            ];
		}

		return {
			getYouthCouches: getYouthCouches
		}
	}
})();