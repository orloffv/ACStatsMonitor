'use strict';

/* Controllers */

var monitorControllers = angular.module('monitorControllers', []);

monitorControllers
    .controller('DashboardCtrl', ['$scope',
        function($scope) {
            $scope.filter = {date: 'today'};
        }]
    )
    .controller('UsersCtrl', ['$scope', 'users',
        function($scope, users) {
            $scope.filter = {}, $scope.users = [];
            $scope.status = 'loading';
            users.query($scope.filter,
                function(data) {
                    $scope.status = 'loaded';
                    $scope.users = data;
                },
                function(error) {
                    $scope.status = 'error';
                }
            );
        }]
    )
    .controller('CompanyUsersCtrl', ['$scope', 'companyUsers',
        function($scope, companyUsers) {
            $scope.filter = {}, $scope.users = [];
            $scope.status = 'loading';
            companyUsers.query($scope.filter,
                function(data) {
                    $scope.status = 'loaded';
                    $scope.users = data;
                },
                function(error) {
                    $scope.status = 'error';
                }
            );
        }]
    )
    .controller('CompaniesCtrl', ['$scope', 'companies',
        function($scope, companies) {
            $scope.filter = {}, $scope.companies = [];
            $scope.status = 'loading';
            companies.query(_.extend($scope.filter, {companyId: 123}),
                function(data) {
                    $scope.status = 'loaded';
                    $scope.companies = data;
                },
                function(error) {
                    $scope.status = 'error';
                }
            );
        }]
    )
    .controller('NavBarCtrl', ['$scope', '$location',
        function($scope, $location) {
            $scope.routeIs = function(routeName) {
                return $location.path() === routeName;
            };
        }]
    )
;
