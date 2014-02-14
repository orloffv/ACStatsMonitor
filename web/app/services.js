'use strict';

/* Services */

angular.module('restServices', ['ngResource'])
    .factory('CountAll', ['$resource',
        function($resource){
            return $resource('http://127.0.0.1:port/api/servers/52faf353f3e40400009989e1/statistic/all/by_date', {
                port: ':3000'
            }, {
                query: {method: 'GET', params: {from: '', to: ''}, isArray: true}
            });
        }])
    .factory('ThreeGrouped', ['$resource',
        function($resource){
            return $resource('http://127.0.0.1:port/api/servers/52faf353f3e40400009989e1/statistic/all/by_date/grouped', {
                port: ':3000'
            }, {
                query: {method: 'GET', params: {from: '', to: ''}, isArray: true}
            });
        }])
;
