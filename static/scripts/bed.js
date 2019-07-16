(function(){

	'use strict';

	angular
		.module('formlyApp')
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
                    "name": "בסיס פולירון גל",
                    "value":"polyron_gal"
                },
                {
					"name": "מיטת סליפ דיפוט  /  ווינדוס",
					"value":"sleep_depot_windows"
				}
            ];
		}

		return {
			getBeds: getBeds
		}
	}
})();