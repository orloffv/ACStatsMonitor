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
            when('/users', {
                templateUrl: 'templates/users.html',
                controller: 'UsersCtrl'
            }).
            when('/companies/:companyId/users', {
                templateUrl: 'templates/users.html',
                controller: 'CompanyUsersCtrl'
            }).
            when('/companies', {
                templateUrl: 'templates/companies.html',
                controller: 'CompaniesCtrl'
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);
