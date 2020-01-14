(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('accessory', accessory);

	function accessory() {

		function getAccessories() {
			return [
				{
					"name": "כרית לטקס",
					"value":"pillow_latex"
				},
				{
					"name": "כרית ויסקו מולד",
					"value":"pillow_visco_mold"
				},
				{
				    "name": "כרית לטקס פולירון",
				    "value" : "pillow_polyron_latex"
				},
				{
					"name": "כרית פולירון פוזישן",
					"value":"pillow_position"
				},
								{
					"name": "מגן מזרן רגיל",
					"value":"protector_default"
				},
				{
					"name": "מגן מזרן פולירון עד רוחב 90",
					"value":"protector_polyron_90"
				},
								{
					"name": "מגן מזרן פולירון עד רוחב 140",
					"value":"protector_polyron_140"
				},
								{
					"name": "מגן מזרן פולירון עד רוחב 180",
					"value":"protector_polyron_180"
				}
			];
		}

		return {
			getAccessories: getAccessories
		}
	}
})();