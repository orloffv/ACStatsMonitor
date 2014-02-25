'use strict';

/* App Module */

var monitorApp = angular.module('monitorApp', [
    'ngRoute',
    'monitorControllers',
    'MonitorFormatters',
    'restServices',
    'loaderServices'
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
            when('/events/:eventHash/users', {
                templateUrl: 'templates/users.html',
                controller: 'EventUsersCtrl'
            }).
            when('/hits', {
                templateUrl: 'templates/hits.html',
                controller: 'HitsCtrl'
            }).
            when('/servers', {
                templateUrl: 'templates/servers.html',
                controller: 'ServersCtrl'
            }).
            when('/set_server/:serverId', {
                controller: 'SetServerCtrl',
                template: ''
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);

var loaderApp = angular.module('loaderApp', ['loaderServices', 'loaderControllers']);

    angular.module('loaderControllers', [])
        .controller('NavBarCtrl', ['$scope', '$location',
            function($scope, $location) {
                $scope.routeIs = function(routeName) {
                    return $location.path() === routeName;
                };
            }]
        );

angular.element(document).ready(function() {
    angular.bootstrap(document.getElementById('loader'), ['loaderApp']);
});

var globalServerId = null;
loaderApp.run(function($rootScope, getCurrentServer) {
    getCurrentServer(function(serverId) {
        globalServerId = serverId;
        $rootScope.getServerId = function() {
            return globalServerId;
        };
        angular.bootstrap(document, ['monitorApp']);
    });
});

monitorApp.run(function($rootScope){
    $rootScope.getServerId = function() {
        return globalServerId;
    };
});
