'use strict';

/* Services */

angular.module('restServices', ['ngResource'])
    .factory('countByDate', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + ':\:port/api/servers/:serverId/statistic/all/count_by_date', {
                port: configuration.api.port,
                serverId: '52faf353f3e40400009989e1'
            }, {
                query: {method: 'GET', params: {from: '', to: ''}, isArray: true}
            });
        }])
    .factory('groupedByPartDate', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + ':\:port/api/servers/:serverId/statistic/all/group_by_part_date', {
                port: configuration.api.port,
                serverId: '52faf353f3e40400009989e1'
            }, {
                query: {method: 'GET', params: {from: '', to: '', parts: 7}, isArray: true}
            });
        }])
    .factory('hitSlowestByDate', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + ':\:port/api/servers/:serverId/statistic/hits/slowest_by_date', {
                port: configuration.api.port,
                serverId: '52faf353f3e40400009989e1'
            }, {
                query: {method: 'GET', params: {from: '', to: ''}, isArray: true}
            });
        }])
;
