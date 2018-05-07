(function() {

	'use strict';



	angular
		.module('formlyApp')
		.controller('AdminController', AdminController, ['$scope']);

		function AdminController($scope) {

			var vm = this;

            vm.fields = {};

            var adminMode = localStorage['adminMode'] || 'false';

            vm.fields.adminMode = (adminMode === 'true');

            vm.fields.toggleText = vm.fields.adminMode ? 'Edit mode' : 'Read only';

            vm.toggleAdmin = function($scope) {
                vm.fields.adminMode = !vm.fields.adminMode;

                localStorage['adminMode'] = vm.fields.adminMode.toString();

                vm.fields.toggleText = vm.fields.adminMode ? 'Edit mode' : 'Read only';

                location.reload()
            };

		}

})();