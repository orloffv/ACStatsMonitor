'use strict';

/* App Module */

var monitorApp = angular.module('monitorApp', [
    'ngRoute',
    'monitorControllers',
    'restServices'
]);

monitorApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/dashboard', {
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardCtrl'
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);
