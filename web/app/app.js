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
            when('/users/:userId', {
                templateUrl: 'templates/user.html',
                controller: 'UserCtrl'
            }).
            when('/companies/:companyId/users', {
                templateUrl: 'templates/users.html',
                controller: 'CompanyUsersCtrl'
            }).
            when('/companies', {
                templateUrl: 'templates/companies.html',
                controller: 'CompaniesCtrl'
            }).
            when('/events', {
                templateUrl: 'templates/events.html',
                controller: 'EventsCtrl'
            }).
            when('/hits', {
                templateUrl: 'templates/hits.html',
                controller: 'HitsCtrl'
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);
