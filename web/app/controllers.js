'use strict';

/* Controllers */

var monitorControllers = angular.module('monitorControllers', ['LocalStorageModule']);

monitorControllers
    .controller('DashboardCtrl', ['$scope',
        function($scope) {
            $scope.filter = {date: 'today'};
        }]
    )
    .controller('UsersCtrl', ['$scope', 'users', '$routeParams',
        function($scope, users, $routeParams) {
            $scope.filter = {
                date: $routeParams.filter_date ? $routeParams.filter_date : 'today',
                type: $routeParams.filter_type ? $routeParams.filter_type : 'lastHitAt'};
            $scope.users = [];
            $scope.status = 'loading';
            $scope.type = 'users';
            $scope.queryFilter = null;

            var getData = function() {
                if ($scope.queryFilter) {
                    $scope.status = 'loading';
                    users.query(_.extend($scope.queryFilter, {}),
                        function(data) {
                            $scope.status = 'loaded';
                            $scope.users = data;
                        },
                        function(error) {
                            $scope.status = 'error';
                        }
                    );
                }
            };

            $scope.$watch('queryFilter', function() {
                getData();
            });
        }]
    )
    .controller('CompanyUsersCtrl', ['$scope', '$routeParams', 'companyUsers',
        function($scope, $routeParams, companyUsers) {
            $scope.filter = {date: 'today', type: 'lastHitAt'};
            $scope.users = [];
            $scope.status = 'loading';
            $scope.type = 'companyUsers';
            $scope.queryFilter = null;

            var getData = function() {
                if ($scope.queryFilter) {
                    $scope.status = 'loading';
                    companyUsers.query(_.extend($scope.queryFilter, {companyId: $routeParams.companyId}),
                        function(data) {
                            $scope.status = 'loaded';
                            $scope.users = data;
                        },
                        function(error) {
                            $scope.status = 'error';
                        }
                    );
                }
            };

            $scope.$watch('queryFilter', function() {
                getData();
            });
        }]
    )
    .controller('EventUsersCtrl', ['$scope', '$routeParams', 'eventUsers',
        function($scope, $routeParams, eventUsers) {
            $scope.filter = {date: 'today'};
            $scope.users = [];
            $scope.status = 'loading';
            $scope.type = 'eventUsers';
            $scope.eventHash = $routeParams.eventHash;
            $scope.hideTypeFilter = true;
            $scope.queryFilter = null;

            var getData = function() {
                if ($scope.queryFilter) {
                    $scope.status = 'loading';
                    eventUsers.query(_.extend($scope.queryFilter, {eventHash: $routeParams.eventHash}),
                        function(data) {
                            $scope.status = 'loaded';
                            $scope.users = data;
                        },
                        function(error) {
                            $scope.status = 'error';
                        }
                    );
                }
            };

            $scope.$watch('queryFilter', function() {
                getData();
            });
        }]
    )
    .controller('CompaniesCtrl', ['$scope', 'companies', '$routeParams',
        function($scope, companies, $routeParams) {
            $scope.filter = {
                date: $routeParams.filter_date ? $routeParams.filter_date : 'today',
                type: $routeParams.filter_type ? $routeParams.filter_type : 'lastHitAt'
            };
            $scope.companies = [];
            $scope.status = 'loading';
            $scope.queryFilter = null;

            var getData = function() {
                if ($scope.queryFilter) {
                    $scope.status = 'loading';
                    companies.query(_.extend($scope.queryFilter, {order: 'lastHitAt'}),
                        function(data) {
                            $scope.status = 'loaded';
                            $scope.companies = data;
                        },
                        function(error) {
                            $scope.status = 'error';
                        }
                    );
                }
            };

            $scope.$watch('queryFilter', function() {
                getData();
            });
        }]
    )
    .controller('UserCtrl', ['$scope', '$routeParams', 'user', 'userEvents', 'userHits', 'userUseragents',
        function($scope, $routeParams, user, userEvents, userHits, userUseragents) {
            $scope.filter = {}, $scope.user = {}, $scope.hits = [], $scope.events = [], $scope.useragents = [];
            $scope.status = 'loading';

            async.parallel(
                {
                    user: function(callback){
                        user.get(
                            _.extend($scope.filter, {userId: $routeParams.userId}),
                            function(data) {
                                callback(null, data);
                            },
                            function(data) {
                                callback(1, null);
                            }
                        );
                    },
                    events: function(callback){
                        userEvents.query(
                            _.extend($scope.filter, {userId: $routeParams.userId}),
                            function(data) {
                                callback(null, data);
                            },
                            function(data) {
                                callback(1, null);
                            }
                        );
                    },
                    hits: function(callback){
                        userHits.query(
                            _.extend($scope.filter, {userId: $routeParams.userId}),
                            function(data) {
                                callback(null, data);
                            },
                            function(data) {
                                callback(1, null);
                            }
                        );
                    },
                    useragents: function(callback){
                        userUseragents.query(
                            _.extend($scope.filter, {userId: $routeParams.userId}),
                            function(data) {
                                callback(null, data);
                            },
                            function(data) {
                                callback(1, null);
                            }
                        );
                    }
                },
                function(err, data) {
                    if (err) {
                        $scope.status = 'error';
                    } else {
                        $scope.status = 'loaded';
                        $scope.user = data.user;
                        $scope.hits = data.hits;
                        $scope.events = data.events;
                        $scope.useragents = data.useragents;
                    }
                }
            );
        }]
    )
    .controller('EventsCtrl', ['$scope', 'events',
        function($scope, events) {
            $scope.filter = {date: 'today'};
            $scope.events = [];
            $scope.status = 'loading';
            $scope.queryFilter = null;

            var getData = function() {
                if ($scope.queryFilter) {
                    $scope.status = 'loading';
                    events.query(_.extend($scope.queryFilter, {}),
                        function(data) {
                            $scope.status = 'loaded';
                            $scope.events = data;
                        },
                        function(error) {
                            $scope.status = 'error';
                        }
                    );
                }
            };

            $scope.$watch('queryFilter', function() {
                getData();
            });
        }]
    )
    .controller('HitsCtrl', ['$scope', 'hits',
        function($scope, hits) {
            $scope.filter = {date: 'today'};
            $scope.hits = [];
            $scope.status = 'loading';
            $scope.queryFilter = null;

            var getData = function() {
                if ($scope.queryFilter) {
                    $scope.status = 'loading';
                    hits.query(_.extend($scope.queryFilter, {}),
                        function(data) {
                            $scope.status = 'loaded';
                            $scope.hits = data;
                        },
                        function(error) {
                            $scope.status = 'error';
                        }
                    );
                }
            };

            $scope.$watch('queryFilter', function() {
                getData();
            });
        }]
    )
    .controller('ServersCtrl', ['$scope', 'servers', '$rootScope', 'localStorageService',
        function($scope, servers, $rootScope, localStorageService) {
            $scope.setServerId = function(id) {
                localStorageService.add('serverId', id);
                $rootScope.getServerId = function() {
                    return id;
                };

                location.reload(false);
            };

            $scope.filter = {}, $scope.servers = [];
            $scope.status = 'loading';
            servers.query($scope.filter,
                function(data) {
                    $scope.status = 'loaded';
                    $scope.servers = data;
                },
                function(error) {
                    $scope.status = 'error';
                }
            );
        }]
    )
    .controller('SetServerCtrl', ['$scope', '$routeParams', 'localStorageService',
        function($scope, $routeParams, localStorageService) {
            var serverId = $routeParams.serverId;
            localStorageService.add('serverId', serverId);
            window.location = '/';
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

angular.module('MonitorFormatters', []).
    filter('additionalFormatter', function() {
        return function(data) {
            var result = '', items = [];

            _.each(data, function(item) {
                if (item.type) {
                    items.push(item.type);
                } else if (item.folder) {
                    items.push(item.folder);
                } else if (item.i18nkey) {
                    if (strpos(item.i18nkey, 'vacancy') !== null) {
                        items.push('vacancy');
                    } else if (strpos(item.i18nkey, 'person') !== null) {
                        items.push('person');
                    }
                }
            });

            items = _.uniq(items);

            if (_.size(items)) {
                result = '(' + _.string.toSentence(items, ', ', ', ') + ')';
            }

            return result;
        }
    }).
    filter('base64', function() {
        return function(data) {
            return Base64.encode(data);
        }
    }).
    filter('base64Decode', function() {
        return function(data) {
            return Base64.decode(data);
        }
    }).
    filter('truncate', function () {
        return function (text, length, end) {
            if (text !== undefined) {
                if (isNaN(length)) {
                    length = 10;
                }

                if (end === undefined) {
                    end = "...";
                }

                if (text.length <= length || text.length - end.length <= length) {
                    return text;
                } else {
                    return String(text).substring(0, length - end.length) + end;
                }
            }
        }
    }).
    filter('api', function() {
        return function(url) {
            url = url.replace('/api/companies/:id/', '');
            url = url.replace('/companies/:id/', '');

            return url;
        }
    })
;

function strpos (haystack, needle, offset) {
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}
