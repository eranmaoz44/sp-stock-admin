(function(){

	'use strict';

	angular
		.module('formlyApp')
		.factory('width', width);

	function width() {

		function getWidths() {
			return [
				{
					"name": "80",
					"value":"80"
				},
				{
					"name": "90",
					"value":"90"
				},
				{
					"name": "120",
					"value":"120"
				},
				{
					"name": "140",
					"value":"140"
				},
				{
					"name": "160",
					"value":"160"
				},
				{
					"name": "180",
					"value":"180"
				}
			];
		}

		return {
			getWidths: getWidths
		}
	}
})();