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
            $scope.filter = {}, $scope.users = [];
            $scope.status = 'loading';
            $scope.type = 'users';
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
    .controller('CompanyUsersCtrl', ['$scope', '$routeParams', 'companyUsers',
        function($scope, $routeParams, companyUsers) {
            $scope.filter = {}, $scope.users = [];
            $scope.status = 'loading';
            $scope.type = 'companyUsers';
            companyUsers.query(_.extend($scope.filter, {companyId: $routeParams.companyId}),
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
            companies.query($scope.filter,
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
            $scope.filter = {}, $scope.events = [];
            $scope.status = 'loading';
            events.query($scope.filter,
                function(data) {
                    $scope.status = 'loaded';
                    $scope.events = data;
                },
                function(error) {
                    $scope.status = 'error';
                }
            );
        }]
    )
    .controller('HitsCtrl', ['$scope', 'hits',
        function($scope, hits) {
            $scope.filter = {}, $scope.hits = [];
            $scope.status = 'loading';
            hits.query($scope.filter,
                function(data) {
                    $scope.status = 'loaded';
                    $scope.hits = data;
                },
                function(error) {
                    $scope.status = 'error';
                }
            );
        }]
    )
    .controller('ServersCtrl', ['$scope', 'servers', '$rootScope', 'localStorageService',
        function($scope, servers, $rootScope, localStorageService) {
            $scope.setServerId = function(id) {
                localStorageService.add('serverId', id);
                $rootScope.getServerId = function() {
                    return id;
                };
            };

            $scope.reloadPage = function() {
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
