'use strict';

/* Controllers */

var monitorControllers = angular.module('monitorControllers', ['LocalStorageModule']);

monitorControllers
    .controller('DashboardCtrl', ['$scope',
        function($scope) {
            $scope.filter = {date: 'today'};
        }]
    )
    .controller('UsersCtrl', ['$scope', 'users',
        function($scope, users) {
            $scope.filter = {date: 'today', type: 'createdAt'};
            $scope.users = [];
            $scope.status = 'loading';
            $scope.type = 'users';

            var getData = function() {
                var filter = {};
                filter.to = moment().format('DD.MM.YYYY');
                if ($scope.filter.date === 'today') {
                    if ($scope.filter.type === 'createdAt') {
                        filter.from = moment().format('DD.MM.YYYY');
                    } else {
                        filter.lastHitFrom = moment().format('DD.MM.YYYY');
                    }
                } else if ($scope.filter.date === 'week') {
                    if ($scope.filter.type === 'createdAt') {
                        filter.from = moment().subtract('w', 1).format('DD.MM.YYYY');
                    } else {
                        filter.lastHitFrom = moment().subtract('w', 1).format('DD.MM.YYYY');
                    }
                } else if ($scope.filter.date === 'month') {
                    if ($scope.filter.type === 'createdAt') {
                        filter.from = moment().subtract('M', 1).format('DD.MM.YYYY');
                    } else {
                        filter.lastHitFrom = moment().subtract('M', 1).format('DD.MM.YYYY');
                    }
                }

                users.query(filter,
                    function(data) {
                        $scope.status = 'loaded';
                        $scope.users = data;
                    },
                    function(error) {
                        $scope.status = 'error';
                    }
                );
            };

            $scope.$watch('filter.type', function() {
                getData();
            });

            $scope.$watch('filter.date', function() {
                getData();
            });
        }]
    )
    .controller('CompanyUsersCtrl', ['$scope', '$routeParams', 'companyUsers',
        function($scope, $routeParams, companyUsers) {
            $scope.filter = {date: 'today', type: 'createdAt'};
            $scope.users = [];
            $scope.status = 'loading';
            $scope.type = 'companyUsers';

            var getData = function() {
                var filter = {};
                filter.to = moment().format('DD.MM.YYYY');
                if ($scope.filter.date === 'today') {
                    if ($scope.filter.type === 'createdAt') {
                        filter.from = moment().format('DD.MM.YYYY');
                    } else {
                        filter.lastHitFrom = moment().format('DD.MM.YYYY');
                    }
                } else if ($scope.filter.date === 'week') {
                    if ($scope.filter.type === 'createdAt') {
                        filter.from = moment().subtract('w', 1).format('DD.MM.YYYY');
                    } else {
                        filter.lastHitFrom = moment().subtract('w', 1).format('DD.MM.YYYY');
                    }
                } else if ($scope.filter.date === 'month') {
                    if ($scope.filter.type === 'createdAt') {
                        filter.from = moment().subtract('M', 1).format('DD.MM.YYYY');
                    } else {
                        filter.lastHitFrom = moment().subtract('M', 1).format('DD.MM.YYYY');
                    }
                }

                companyUsers.query(_.extend(filter, {companyId: $routeParams.companyId}),
                    function(data) {
                        $scope.status = 'loaded';
                        $scope.users = data;
                    },
                    function(error) {
                        $scope.status = 'error';
                    }
                );
            };

            $scope.$watch('filter.type', function() {
                getData();
            });

            $scope.$watch('filter.date', function() {
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

            var getData = function() {
                var filter = {};
                filter.to = moment().format('DD.MM.YYYY');
                if ($scope.filter.date === 'today') {
                    filter.from = moment().format('DD.MM.YYYY');
                } else if ($scope.filter.date === 'week') {
                    filter.from = moment().subtract('w', 1).format('DD.MM.YYYY');
                } else if ($scope.filter.date === 'month') {
                    filter.from = moment().subtract('M', 1).format('DD.MM.YYYY');
                }

                eventUsers.query(_.extend(filter, {eventHash: $routeParams.eventHash}),
                    function(data) {
                        $scope.status = 'loaded';
                        $scope.users = data;
                    },
                    function(error) {
                        $scope.status = 'error';
                    }
                );
            };

            $scope.$watch('filter.date', function() {
                getData();
            });
        }]
    )
    .controller('CompaniesCtrl', ['$scope', 'companies',
        function($scope, companies) {
            $scope.filter = {date: 'today', type: 'createdAt'};
            $scope.companies = [];
            $scope.status = 'loading';

            var getData = function() {
                var filter = {};
                filter.to = moment().format('DD.MM.YYYY');
                if ($scope.filter.date === 'today') {
                    if ($scope.filter.type === 'createdAt') {
                        filter.from = moment().format('DD.MM.YYYY');
                    } else {
                        filter.lastHitFrom = moment().format('DD.MM.YYYY');
                    }
                } else if ($scope.filter.date === 'week') {
                    if ($scope.filter.type === 'createdAt') {
                        filter.from = moment().subtract('w', 1).format('DD.MM.YYYY');
                    } else {
                        filter.lastHitFrom = moment().subtract('w', 1).format('DD.MM.YYYY');
                    }
                } else if ($scope.filter.date === 'month') {
                    if ($scope.filter.type === 'createdAt') {
                        filter.from = moment().subtract('M', 1).format('DD.MM.YYYY');
                    } else {
                        filter.lastHitFrom = moment().subtract('M', 1).format('DD.MM.YYYY');
                    }
                }

                companies.query(_.extend(filter, {order: 'lastHitAt'}),
                    function(data) {
                        $scope.status = 'loaded';
                        $scope.companies = data;
                    },
                    function(error) {
                        $scope.status = 'error';
                    }
                );
            };

            $scope.$watch('filter.type', function() {
                getData();
            });

            $scope.$watch('filter.date', function() {
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

            var getData = function() {
                var filter = {};
                filter.to = moment().format('DD.MM.YYYY');
                if ($scope.filter.date === 'today') {
                    filter.from = moment().format('DD.MM.YYYY');
                } else if ($scope.filter.date === 'week') {
                    filter.from = moment().subtract('w', 1).format('DD.MM.YYYY');
                } else if ($scope.filter.date === 'month') {
                    filter.from = moment().subtract('M', 1).format('DD.MM.YYYY');
                }

                events.query(filter,
                    function(data) {
                        $scope.status = 'loaded';
                        $scope.events = data;
                    },
                    function(error) {
                        $scope.status = 'error';
                    }
                );
            };

            $scope.$watch('filter.date', function() {
                getData();
            });
        }]
    )
    .controller('HitsCtrl', ['$scope', 'hits',
        function($scope, hits) {
            $scope.filter = {date: 'today'};
            $scope.hits = [];
            $scope.status = 'loading';

            var getData = function() {
                var filter = {};
                filter.to = moment().format('DD.MM.YYYY');
                if ($scope.filter.date === 'today') {
                    filter.from = moment().format('DD.MM.YYYY');
                } else if ($scope.filter.date === 'week') {
                    filter.from = moment().subtract('w', 1).format('DD.MM.YYYY');
                } else if ($scope.filter.date === 'month') {
                    filter.from = moment().subtract('M', 1).format('DD.MM.YYYY');
                }

                hits.query(filter,
                    function(data) {
                        $scope.status = 'loaded';
                        $scope.hits = data;
                    },
                    function(error) {
                        $scope.status = 'error';
                    }
                );
            };

            $scope.$watch('filter.date', function() {
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
    })
;

function strpos (haystack, needle, offset) {
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}
