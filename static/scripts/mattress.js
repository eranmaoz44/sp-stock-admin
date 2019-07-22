(function(){

	'use strict';

	angular
		.module('spStockAdminApp')
		.factory('mattress', mattress);

	function mattress() {

		function getMattresses() {
			return [
				{
					"name": "פולירון קלאסיק לטקס מערכת MRS/פולירון רויאלטי HR לקשרי",
					"value":"classic_latex"
				},
				{
					"name": "פולירון פריים לטקס מערכת MRS/פולירון רויאלטי דופלקס ויסקו X7",
					"value":"prime_latex"
				},
				{
					"name": "פולירון רויאלטי HR S4000",
					"value":"royalty_hr"
				},
				{
					"name": "פולירון סופרים לטקס + דאבל ויסקו",
					"value":"supreme_double_visco"
				},
				{
					"name": "פולירון סופרים דאבל ויסקו בד משושים",
					"value":"supreme_double_visco_visco_fabric"
				}
			];
		}

		return {
			getMattresses: getMattresses
		}
	}
})();