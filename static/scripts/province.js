(function(){

	'use strict';

	angular
		.module('formlyApp')
		.factory('province', province);

	function province() {

		function getProvinces() {
			return [
				{
					"name": "קלאסיק לטקס",
					"value":"classic_latex"
				},
				{
					"name": "פריים לטקס",
					"value":"prime_latex"
				},
				{
					"name": "רויאלטי HR",
					"value":"royalty_hr"
				},
								{
					"name": "רויאלטי HR לקשרי",
					"value":"royalty_hr_luxury"
				},
				{
					"name": "רויאלטי דופלקס לטקס",
					"value":"royalty_duflex_latex"
				},
				{
					"name": "סופרים דאבל ויסקו",
					"value":"supreme_double_visco"
				},
				{
					"name": "סופרים דאבל ויסקו בד פסי ויסקו",
					"value":"supreme_double_visco_visco_fabric"
				}
			];
		}

		return {
			getProvinces: getProvinces
		}
	}
})();