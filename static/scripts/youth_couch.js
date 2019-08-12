(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('youth_couch', youth_couch);

	function youth_couch() {

		function getYouthCouches() {
			return [
				{
					"name": "גלים/ירדן/הדס/פולג",
					"value":"polyron_sapot_noar_polykal_one",
					"group":"פוליקל"
				},
				{
					"name": "מורן/צלמון",
					"value":"polyron_sapot_noar_polykal_two",
					"group":"פוליקל"
				},
				{
					"name": "מגלן",
					"value":"polyron_sapot_noar_half_maglan",
					"group":"פולירון וחצי"
				},
				{
					"name": "עפרוני/שלדג/אגמית",
					"value":"polyron_sapot_noar_half_efroni_shaldag_agmit",
					"group":"פולירון וחצי"
				},
				{
					"name": "חוחית/צופית",
					"value":"polyron_sapot_noar_half_huhit_tzufit",
					"group":"פולירון וחצי"
				},
				{
					"name": "דיה",
					"value":"polyron_sapot_noar_half_dia",
					"group":"פולירון וחצי"
				},
				{
				    "name": "אנפה (כולל שלוש כריות)",
				    "value": "polyron_sapot_noar_polynoa_anafa",
				    "group": "פולינוע"
				},
				{
				    "name": "דרור",
				    "value": "polyron_sapot_noar_polynoa_dror",
				    "group": "פולינוע"
				},
				{
				    "name": "סנונית / זמיר / צוקית(עם רגל עץ מבוק)",
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