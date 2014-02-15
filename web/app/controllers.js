'use strict';

/* Controllers */

var monitorControllers = angular.module('monitorControllers', []);

monitorControllers.controller('DashboardCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.filter = {date: 'today'};
    }]);
