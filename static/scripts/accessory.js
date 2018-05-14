(function(){

	'use strict';

	angular
		.module('formlyApp')
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
					"name": "כרית פוזישן",
					"value":"pillow_position"
				},
								{
					"name": "מגן מזרן רגיל",
					"value":"protector_default"
				},
				{
					"name": "מגן מזרן פולירון",
					"value":"protector_polyron"
				}
			];
		}

		return {
			getAccessories: getAccessories
		}
	}
})();