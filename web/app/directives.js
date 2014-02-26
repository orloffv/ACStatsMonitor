'use strict';

monitorApp
    .directive('usersCompanies', ['usersCompaniesByDate', function(usersCompaniesByDate) {
        return {
            templateUrl: '/templates/dashboard/users_companies.html',
            replace: true,
            scope: true,
            controller: function($scope) {
                $scope.counts = {
                    users_last_hit: 0,
                    users_new: 0,
                    companies: 0,
                    companies_new: 0
                };

                var getData = function() {
                    if ($scope.queryFilter) {
                        usersCompaniesByDate.get(_.extend($scope.queryFilter, {}),
                            function(data) {
                                $scope.status = 'loaded';
                                $scope.counts = data;
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
            }
        }}]
    )
    .directive('threeWithGraphic', ['groupedByPartDate', function(groupedByPartDate) {
        return {
            templateUrl: '/templates/dashboard/three_with_graphic.html',
            replace: true,
            controller: function($scope) {
                $scope.counts = {
                    hits: 0,
                    sessions: 0,
                    events: 0
                };

                $scope.hideTypeFilter = true;
                $scope.queryFilter = null;

                var getData = function() {
                    if ($scope.queryFilter) {
                        groupedByPartDate.get(_.extend($scope.queryFilter, {}),
                            function(data) {
                                $scope.status = 'loaded';
                                $scope.graphic = data;
                                $scope.counts = {};
                                _.each(data, function(items, key) {
                                    $scope.counts[key] = _.reduce(items, function(memo, num) {return memo + num;}, 0);
                                });
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
            },
            link: function($scope, element) {
                var lineOptions = {
                    series: {
                        lines: {
                            show: true,
                            fill: true
                        },
                        points: {
                            show: true
                        },
                        hoverable: true
                    },
                    grid: {
                        backgroundColor: '#FFFFFF',
                        borderWidth: 0,
                        borderColor: '#CDCDCD',
                        hoverable: true
                    },
                    legend: {
                        show: false
                    },
                    xaxis: {
                        mode: "categories",
                        tickLength: 0,
                        position: "bottom"
                    },
                    yaxis: {
                        show:false
                    }
                };

                var chartOptions = {
                    sessions: {
                        color: '#1aae1a'
                    },
                    events: {
                        color: '#3f94ed'
                    },
                    hits: {
                        color: '#ff6868'
                    }
                };

                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css( {
                        position: 'absolute',
                        display: 'none',
                        top: y + 5,
                        left: x + 5,
                        border: '0px',
                        padding: '2px 10px 2px 10px',
                        opacity: 0.8
                    }).appendTo("body").fadeIn(200);
                }

                var getYtitle = function(type, part, size) {
                    if (type === 'week') {
                        return moment().subtract('d', size - part).format('DD.MM');
                    } else if (type === 'month') {
                        return moment().subtract('d', 30 - Math.floor((30/size) * part)).format('DD.MM');
                    } else if (type === 'today') {
                        return moment().set('h', 24).subtract('h', Math.floor(24 - ((24/size) * (part - 1)) - (24/size/2))).format('HH');
                    }

                    return part;
                };

                $scope.$watch("graphic", function() {
                    if ($scope.graphic) {
                        _.each(chartOptions, function(options, chartName) {
                            var data = _.map($scope.graphic[chartName], function(value, key) {
                                return [getYtitle($scope.filter.date, key, _.size($scope.graphic[chartName])), value];
                            });

                            $.plot(
                                $('[data-chart="' + chartName + '"]', element),
                                [{
                                    data: data,
                                    color: options.color
                                }],
                                lineOptions
                            );
                        });

                        var chartsSelector = _.reduce(chartOptions, function(memo, options, chartName) {
                            return memo + ', ' + '[data-chart="' + chartName + '"]';
                        }, '');

                        var previousPoint = null;

                        $(chartsSelector, element).unbind("plothover").bind("plothover", function (event, pos, item) {
                            if (item) {
                                if (previousPoint != item.dataIndex) {
                                    previousPoint = item.dataIndex;

                                    $("#tooltip").remove();
                                    var x = item.datapoint[0],
                                        y = item.datapoint[1],
                                    label = item.series.xaxis.ticks[item.datapoint[0]].label;

                                    showTooltip(item.pageX, item.pageY, y);
                                }
                            }
                            else {
                                $("#tooltip").remove();
                                previousPoint = null;
                            }

                        });
                    }
                });
            }
        }}]
    )
    .directive('hitSlowest', ['hitSlowestByDate', function(hitSlowestByDate) {
        return {
            templateUrl: '/templates/dashboard/hit_slowest.html',
            replace: true,
            scope: {},
            controller: function($scope) {
                $scope.filter = {date: 'today'};
                $scope.hideTypeFilter = true;
                $scope.queryFilter = null;

                var getData = function() {
                    if ($scope.queryFilter) {
                        hitSlowestByDate.query(_.extend($scope.queryFilter, {limit: 10}),
                            function(data) {
                                $scope.status = 'loaded';
                                $scope.urls = data;
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
            }
        }}]
    )
    .directive('activeUsers', ['usersGroupByHitsDate', function(usersGroupByHitsDate) {
        return {
            templateUrl: '/templates/dashboard/active_users.html',
            replace: true,
            scope: {},
            controller: function($scope) {
                $scope.filter = {date: 'today'};
                $scope.hideTypeFilter = true;
                $scope.queryFilter = null;

                var getData = function() {
                    if ($scope.queryFilter) {
                        usersGroupByHitsDate.query(_.extend($scope.queryFilter, {limit: 10}),
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
            }
        }}]
    )
    .directive('eventPopular', ['eventPopularByDate', function(eventPopularByDate) {
        return {
            templateUrl: '/templates/dashboard/event_popular.html',
            replace: true,
            scope: {},
            controller: function($scope) {
                $scope.filter = {date: 'today'};
                $scope.hideTypeFilter = true;
                $scope.queryFilter = null;

                var getData = function() {
                    if ($scope.queryFilter) {
                        eventPopularByDate.query(_.extend($scope.queryFilter, {limit: 10}),
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
            }
        }}]
    )
    .directive('countBrowsers', ['countBrowsers', function(countBrowsers) {
        return {
            templateUrl: '/templates/dashboard/count_browsers.html',
            replace: true,
            scope: {},
            controller: function($scope) {
                $scope.filter = {date: 'today'};
                $scope.hideTypeFilter = true;
                $scope.queryFilter = null;

                var getData = function() {
                    if ($scope.queryFilter) {
                        countBrowsers.query(_.extend($scope.queryFilter, {limit: 10}),
                            function(data) {
                                $scope.status = 'loaded';
                                $scope.browsers = data;
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
            }
        }}]
    )
    .directive('countCities', ['countCities', function(countCities) {
        return {
            templateUrl: '/templates/dashboard/count_cities.html',
            replace: true,
            scope: {},
            controller: function($scope) {
                $scope.filter = {date: 'today'};
                $scope.hideTypeFilter = true;
                $scope.queryFilter = null;

                var getData = function() {
                    if ($scope.queryFilter) {
                        countCities.query(_.extend($scope.queryFilter, {limit: 10}),
                            function(data) {
                                $scope.status = 'loaded';
                                $scope.cities = data;
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
            }
        }}]
    )
    .directive('usersCompaniesActiveInAll', ['usersCompaniesActiveInAllByDate', function(usersCompaniesActiveInAllByDate) {
        return {
            templateUrl: '/templates/dashboard/users_companies_active_in_all.html',
            replace: true,
            scope: {},
            controller: function($scope) {
                $scope.graphic = {
                    users: 0,
                    companies: 0,
                    users_last_hit: 0,
                    companies_last_hit: 0
                };

                $scope.filter = {date: 'today'};
                $scope.hideTypeFilter = true;
                $scope.queryFilter = null;

                var getData = function() {
                    if ($scope.queryFilter) {
                        usersCompaniesActiveInAllByDate.get(_.extend($scope.queryFilter, {}),
                            function(data) {
                                $scope.status = 'loaded';
                                $scope.graphic = data;
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
            },
            link: function($scope, element) {
                var pieOptions = {
                    series: {
                        pie: {
                            innerRadius: 0.4,
                            show: true,
                            label: {
                                show: true,
                                radius: 4/7,
                                formatter: function(label, series){
                                    return '<div style="font-size:18px;text-align:center;padding:2px;color:white;">'+Math.round(series.percent)+'%</div>';
                                },
                                threshold: 0.1
                            }
                        }
                    },
                    legend: {
                        show: false
                    }
                };

                $scope.$watch("graphic", function() {
                    if ($scope.graphic) {
                        var activeUserPercent = 0, allUserPercent = 0;
                        if ($scope.graphic.users_last_hit !== 0 && $scope.graphic.users !== 0) {
                            activeUserPercent = Math.ceil($scope.graphic.users_last_hit / ($scope.graphic.users / 100));
                        }
                        if ($scope.graphic.users !== 0) {
                            allUserPercent = 100 - activeUserPercent;
                        }
                        $.plot(
                            $('[data-chart="users"]', element),
                            [
                                {label: 'Всего', data: allUserPercent, color: '#d4ecfd'},
                                {label: 'Активные', data: activeUserPercent, color: '#3b91eb'}
                            ],
                            pieOptions
                        );

                        var activeCompanyPercent = 0, allCompanyPercent = 0;
                        if ($scope.graphic.companies_last_hit !== 0 && $scope.graphic.companies !== 0) {
                            activeCompanyPercent = Math.ceil($scope.graphic.companies_last_hit / ($scope.graphic.companies / 100));
                        }
                        if ($scope.graphic.users !== 0) {
                            allCompanyPercent = 100 - activeCompanyPercent;
                        }

                        $.plot(
                            $('[data-chart="companies"]', element),
                            [
                                {label: 'Всего', data: allCompanyPercent, color: '#d4ecfd'},
                                {label: 'Активные', data: activeCompanyPercent, color: '#3b91eb'}
                            ],
                            pieOptions
                        );
                    }
                });
            }
        }}]
    )
    .directive('sessionTiming', ['sessionTimingByPartDate', function(sessionTimingByPartDate) {
        return {
            templateUrl: '/templates/dashboard/session_timing.html',
            replace: true,
            scope: true,
            controller: function($scope) {
                $scope.graphic = [];
                $scope.filter = {date: 'today'};
                $scope.hideTypeFilter = true;
                $scope.queryFilter = null;

                var getData = function() {
                    if ($scope.queryFilter) {
                        sessionTimingByPartDate.query(_.extend($scope.queryFilter, {parts: 7}),
                            function(data) {
                                $scope.status = 'loaded';
                                $scope.graphic = data;
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
            },
            link: function($scope, element) {
                var getYtitle = function(type, part, size) {
                    if (type === 'week') {
                        return moment().subtract('d', size - part).format('DD.MM');
                    } else if (type === 'month') {
                        return moment().subtract('d', 30 - Math.floor((30/size) * part)).format('DD.MM');
                    } else if (type === 'today') {
                        return moment().set('h', 24).subtract('h', Math.floor(24 - ((24/size) * (part - 1)) - (24/size/2))).format('HH');
                    }

                    return part;
                };

                $scope.$watch("graphic", function() {
                    if ($scope.graphic) {
                        var loadJS = [], loadPage = [], loadSecurity = [], ticks = [];
                        var sizeGraphic = _.size($scope.graphic);
                        _.each($scope.graphic, function(timings, part) {
                            if (_.has(timings, 'count')) {
                                loadJS.push([part, timings.loadJS / timings.count]);
                                loadPage.push([part, timings.loadPage / timings.count]);
                                loadSecurity.push([part, timings.loadSecurity / timings.count]);
                            } else {
                                loadJS.push([part, 0]);
                                loadPage.push([part, 0]);
                                loadSecurity.push([part, 0]);
                            }

                            ticks.push([part, getYtitle($scope.filter.date, part, sizeGraphic)]);
                        });

                        $.plot(
                            $('[data-chart="timing"]', element),
                            [
                                { data: loadJS, label: "Загрузка JS"},
                                { data: loadPage, label: "Полная загрузка страницы" },
                                { data: loadSecurity, label: "Загрузка пользователя"}
                            ],
                            {
                                series: {
                                    lines: {
                                        show: true,
                                        lineWidth: 1,
                                        fill: true,
                                        fillColor: { colors: [ { opacity: 0.1 }, { opacity: 0.13 } ] }
                                    },
                                    points: { show: true,
                                        lineWidth: 2,
                                        radius: 3
                                    },
                                    shadowSize: 0,
                                    stack: true
                                },
                                grid: {
                                    hoverable: true,
                                    clickable: true,
                                    tickColor: "#f9f9f9",
                                    borderWidth: 0
                                },
                                legend: {
                                    // show: false
                                    labelBoxBorderColor: "#fff"
                                },
                                colors: ["#ff6868", "#2d8aeb", "#ffa93c"],
                                xaxis: {
                                    ticks: ticks,
                                    font: {
                                        size: 12,
                                        family: "Open Sans, Arial",
                                        variant: "small-caps",
                                        color: "#697695"
                                    }
                                },
                                yaxis: {
                                    ticks:3,
                                    tickDecimals: 0,
                                    font: {size:12, color: "#9da3a9"}
                                }
                            }
                        );
                    }
                });
            }
        }}]
    )
    .directive('filter', [function() {
        return {
            templateUrl: '/templates/block/filter.html',
            replace: true,
            controller: function($scope) {
                $scope.$watch('filter.type', function() {
                    getFilter();
                });

                $scope.$watch('filter.date', function() {
                    getFilter();
                });

                var getFilter = function() {
                    var filter = {};
                    filter.to = moment().format('DD.MM.YYYY');

                    if ($scope.filter.date === 'today') {
                        if (!$scope.filter.type || $scope.filter.type === 'createdAt') {
                            filter.from = moment().format('DD.MM.YYYY');
                        } else {
                            filter.lastHitFrom = moment().format('DD.MM.YYYY');
                        }
                    } else if ($scope.filter.date === 'yesterday') {
                        if (!$scope.filter.type || $scope.filter.type === 'createdAt') {
                            filter.from = moment().subtract('d', 1).format('DD.MM.YYYY');
                            filter.to = moment().subtract('d', 1).format('DD.MM.YYYY');
                        } else {
                            filter.lastHitFrom = moment().subtract('d', 1).format('DD.MM.YYYY');
                        }
                    } else if ($scope.filter.date === 'week') {
                        if (!$scope.filter.type || $scope.filter.type === 'createdAt') {
                            filter.from = moment().subtract('w', 1).format('DD.MM.YYYY');
                        } else {
                            filter.lastHitFrom = moment().subtract('w', 1).format('DD.MM.YYYY');
                        }
                    } else if ($scope.filter.date === 'month') {
                        if (!$scope.filter.type || $scope.filter.type === 'createdAt') {
                            filter.from = moment().subtract('M', 1).format('DD.MM.YYYY');
                        } else {
                            filter.lastHitFrom = moment().subtract('M', 1).format('DD.MM.YYYY');
                        }
                    }

                    $scope.queryFilter = filter;
                };
            }
        }}]
    )
;
