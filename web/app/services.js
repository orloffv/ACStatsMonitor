'use strict';

/* Services */

angular.module('restServices', ['ngResource'])
    .factory('usersCompaniesByDate', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/statistic/users_companies/count_by_date', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: ''}, isArray: true}
            });
        }])
    .factory('groupedByPartDate', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/statistic/all/group_by_part_date', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: '', parts: 7}, isArray: true}
            });
        }])
    .factory('hitSlowestByDate', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/statistic/hit/slowest_by_date', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 10}, isArray: true}
            });
        }])
    .factory('eventPopularByDate', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/statistic/event/popular_by_date', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 10}, isArray: true}
            });
        }])
    .factory('usersCompaniesActiveInAllByDate', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/statistic/users_companies/count_active_in_all_by_date', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: ''}, isArray: true}
            });
        }])
    .factory('sessionTimingByPartDate', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/statistic/session/timing/group_by_part_date', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: '', parts: 10}, isArray: true}
            });
        }])
    .factory('usersGroupByHitsDate', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/statistic/users/group_by_hits_date', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 10}, isArray: true}
            });
        }])
    .factory('users', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/users', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 50, order: 'lastHitAt'}, isArray: true}
            });
        }])
    .factory('companies', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/companies', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 50, order: 'lastHitAt'}, isArray: true}
            });
        }])
    .factory('companyUsers', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/companies/:companyId/users', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 50, order: 'lastHitAt'}, isArray: true}
            });
        }])
    .factory('userEvents', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/users/:userId/events/grouped', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 50, order: 'lastHitAt'}, isArray: true}
            });
        }])
    .factory('userHits', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/users/:userId/hits/grouped', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 50, order: 'lastHitAt'}, isArray: true}
            });
        }])
    .factory('events', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/events/grouped', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 50, order: 'lastAt'}, isArray: true}
            });
        }])
    .factory('hits', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/hits/grouped', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', params: {from: '', to: '', limit: 50, order: 'lastAt'}, isArray: true}
            });
        }])
    .factory('user', ['$resource', 'configuration', '$rootScope',
        function($resource, configuration, $rootScope) {
            return $resource(configuration.api.host + 'api/servers/:serverId/users/:userId', {
                serverId: $rootScope.getServerId()
            }, {
                query: {method: 'GET', isArray: true}
            });
        }])
;
