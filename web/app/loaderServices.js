'use strict';

/* Services */

angular.module('loaderServices', ['ngResource', 'LocalStorageModule'])
    .factory('servers', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + 'api/servers', {
            }, {
                query: {method: 'GET', isArray: true}
            });
        }])
    .factory('getCurrentServer', ['$resource', 'configuration', 'servers', 'localStorageService',
        function($resource, configuration, servers, localStorageService) {
            return function(callback) {
                if (localStorageService.get('serverId')) {
                    callback(localStorageService.get('serverId'));

                    return false;
                }

                var serverId = null;
                servers.query({},
                    function(data) {
                        serverId = _.first(data).id;
                        localStorageService.add('serverId', serverId);
                        callback(serverId);
                    },
                    function() {
                        serverId = null
                        callback(serverId);
                    }
                );
            };
        }])
;
