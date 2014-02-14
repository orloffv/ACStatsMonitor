'use strict';

monitorApp
    .directive('visitors', ['CountAll', function(CountAll) {
        return {
            templateUrl: 'templates/dashboard/visitors.html',
            replace: true,
            scope: {},
            controller: function($scope) {
                $scope.filterDate = 'today';

                $scope.getData = function() {
                    var filter = {};
                    filter.to = moment().format('DD.MM.YYYY');
                    if ($scope.filterDate === 'today') {
                        filter.from = moment().format('DD.MM.YYYY');
                    } else if ($scope.filterDate === 'week') {
                        filter.from = moment().subtract('w', 1).format('DD.MM.YYYY');
                    } else if ($scope.filterDate === 'month') {
                        filter.from = moment().subtract('M', 1).format('DD.MM.YYYY');
                    }

                    CountAll.get(filter, function(data){
                        $scope.counts = data;
                    });
                };

                $scope.refresh = $scope.getData;
                $scope.getData();
            }
        }}]
    )
    .directive('threeWithGraphic', ['ThreeGrouped', function(ThreeGrouped) {
        return {
            templateUrl: 'templates/dashboard/three_with_graphic.html',
            replace: true,
            scope: {},
            controller: function($scope) {
                $scope.filterDate = 'today';

                $scope.getData = function() {
                    var filter = {};
                    filter.to = moment().format('DD.MM.YYYY');
                    if ($scope.filterDate === 'today') {
                        filter.from = moment().format('DD.MM.YYYY');
                    } else if ($scope.filterDate === 'week') {
                        filter.from = moment().subtract('w', 1).format('DD.MM.YYYY');
                    } else if ($scope.filterDate === 'month') {
                        filter.from = moment().subtract('M', 1).format('DD.MM.YYYY');
                    }

                    ThreeGrouped.get(filter, function(data){
                        $scope.graphic = data;
                        $scope.counts = {};
                        _.each(data, function(items, key) {
                            $scope.counts[key] = _.reduce(items, function(memo, num) {return memo + num;}, 0);
                        });
                    });
                };

                $scope.refresh = $scope.getData;
                $scope.getData();
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
                                return [getYtitle($scope.filterDate, key, _.size($scope.graphic[chartName])), value];
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
    );
