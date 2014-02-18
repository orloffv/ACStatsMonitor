'use strict';

/* Services */

angular.module('restServices', ['ngResource'])
    .factory('usersCompaniesByDate', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + ':\:port/api/servers/:serverId/statistic/users_companies/count_by_date', {
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
            return $resource(configuration.api.host + ':\:port/api/servers/:serverId/statistic/hit/slowest_by_date', {
                port: configuration.api.port,
                serverId: '52faf353f3e40400009989e1'
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 10}, isArray: true}
            });
        }])
    .factory('eventPopularByDate', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + ':\:port/api/servers/:serverId/statistic/event/popular_by_date', {
                port: configuration.api.port,
                serverId: '52faf353f3e40400009989e1'
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 10}, isArray: true}
            });
        }])
    .factory('usersCompaniesActiveInAllByDate', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + ':\:port/api/servers/:serverId/statistic/users_companies/count_active_in_all_by_date', {
                port: configuration.api.port,
                serverId: '52faf353f3e40400009989e1'
            }, {
                query: {method: 'GET', params: {from: '', to: ''}, isArray: true}
            });
        }])
    .factory('sessionTimingByPartDate', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + ':\:port/api/servers/:serverId/statistic/session/timing/group_by_part_date', {
                port: configuration.api.port,
                serverId: '52faf353f3e40400009989e1'
            }, {
                query: {method: 'GET', params: {from: '', to: '', parts: 10}, isArray: true}
            });
        }])
    .factory('usersGroupByHitsDate', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + ':\:port/api/servers/:serverId/statistic/users/group_by_hits_date', {
                port: configuration.api.port,
                serverId: '52faf353f3e40400009989e1'
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 10}, isArray: true}
            });
        }])
    .factory('users', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + ':\:port/api/servers/:serverId/users', {
                port: configuration.api.port,
                serverId: '52faf353f3e40400009989e1'
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 50, order: 'lastHitAt'}, isArray: true}
            });
        }])
    .factory('companies', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + ':\:port/api/servers/:serverId/companies', {
                port: configuration.api.port,
                serverId: '52faf353f3e40400009989e1'
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 50, order: 'lastHitAt'}, isArray: true}
            });
        }])
    .factory('companyUsers', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + ':\:port/api/servers/:serverId/companies/:companyId/users', {
                port: configuration.api.port,
                serverId: '52faf353f3e40400009989e1',
                companyId: null
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 50, order: 'lastHitAt'}, isArray: true}
            });
        }])
;
