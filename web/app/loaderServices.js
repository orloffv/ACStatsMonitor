'use strict';

/* Services */

angular.module('loaderServices', ['ngResource'])
    .factory('servers', ['$resource', 'configuration',
        function($resource, configuration) {
            return $resource(configuration.api.host + 'api/servers', {
            }, {
                query: {method: 'GET', isArray: true}
            });
        }])
    .factory('getCurrentServer', ['$resource', 'configuration', 'servers', '$q',
        function($resource, configuration, servers) {
            return function(callback) {
                var serverId = null;
                servers.query({},
                    function(data) {
                        serverId = _.first(data).id;
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
