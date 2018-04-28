(function(){

	'use strict';

	angular
		.module('formlyApp')
		.factory('province', province);

	function province() {

		function getProvinces() {
			return [
				{
					"name": "Classic Latex",
					"value":"classic_latex"
				},
				{
					"name": "Prime Latex",
					"value":"prime_latex"
				},
				{
					"name": "Royalty HR",
					"value":"royalty_hr"
				},
				{
					"name": "Royalty Duflex Latex",
					"value":"royalty_duflex_latex"
				},
				{
					"name": "Supreme Latex & Visco",
					"value":"supreme_latex_visco"
				},
				{
					"name": "Supreme Double Visco",
					"value":"supreme_double_visco"
				},
				{
					"name": "Supreme Double Visco, Visco Stripes Fabric",
					"value":"supreme_double_visco_visco_fabric"
				}
			];
		}

		return {
			getProvinces: getProvinces
		}
	}
})();