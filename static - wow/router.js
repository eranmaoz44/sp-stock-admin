;(function(window) {

	'use strict';

	var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/mattresses');

    $stateProvider          
        .state('mattresses', {
            url: '/mattresses',
            templateUrl: 'mattresses.html'
        })

});

})(window);