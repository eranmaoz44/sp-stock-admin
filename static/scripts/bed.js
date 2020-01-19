﻿(function(){

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
					"name": "מיטת סליפ דיפוט  /  ווינדוס",
					"value":"sleep_depot_windows"
				},
                {
					"name": "בסיס עץ סליפ דיפו",
					"value":"sleep_depot_regular_base"
				},
				{
				    "name": "מיטת סליפ דיפו חדשה עם רגליים קוניות בחזית (ראש לבחירה)",
					"value":"sleep_depot_new"
				}
            ];
		}

		return {
			getBeds: getBeds
		}
	}
})();