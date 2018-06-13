(function(){

	'use strict';

	angular
		.module('formlyApp')
		.factory('bed', bed);

	function bed() {

		function getBeds() {
			return [
				{
					"name": "שוהם(ארגז)  /  ספיר(ארגז + הכנה למנגנון)  /  ענבר(ארגז נסתר)",
					"value":"polyron_shoam_sapir_inbar"
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