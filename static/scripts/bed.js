(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('bed', bed);

	function bed() {

		function getBeds() {
			return [
				{
					"name": "ענבר(ארגז נסתר)",
					"value":"polyron_shoam_sapir_inbar"
				},
				{
					"name": 'שוהם(ארגז)  /  ספיר(ארגז + הכנה למנגנון)-מחושבת כבר תוספת 300 ש"ח עבור מיטות אלה שנבחרות ללא ראש, עבור הקלאפה!',
					"value":"polyron_shoam_sapir"
				},
				{
					"name": "טורקיז(מסגרת + והכנה למנגנון)  /  ברקת(ללא מסגרת)",
					"value":"polyron_turkiz_bareket"
				},
				{
					"name": "בסיס פולירון עץ",
					"value":"polyron_base"
				},
                {
                    "name": "בסיס פולירון גל / בסיס עץ יפני",
                    "value":"polyron_gal"
                },
                {
					"name": "LENY / SILIA / SHERIL",
					"value":"sleep_depot_windows"
				},
                {
					"name": "FLY",
					"value":"sleep_depot_regular_base"
				},
				{
					"name": "SPIDER / TERRY / CONNY",
					"value":"sleep_depot_regular_base_conical_legs"
				},
				{
				    "name": "CAROL / WENDY ",
					"value":"sleep_depot_new"
				},
				{
				    "name": "EMILY / KETTY",
					"value":"sleep_depot_new_framed"
				}
            ];
		}

		return {
			getBeds: getBeds
		}
	}
})();