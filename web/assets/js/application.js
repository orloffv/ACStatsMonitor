//*********************   Charts   *********************//
$(document).ready(function() {


    /* ---------- Chart with points ---------- */
    if($("#sincos").length)
    {
        var sin = [], cos = [];

        for (var i = 0; i < 14; i += 0.5) {
            sin.push([i, Math.sin(i)/i]);
            cos.push([i, Math.cos(i)]);
        }

        var plot = $.plot($("#sincos"),
            [ { data: sin, label: "sin(x)/x"}, { data: cos, label: "cos(x)" } ], {
                series: {
                    lines: { show: true,
                        lineWidth: 2,
                    },
                    points: { show: true },
                    shadowSize: 2
                },
                grid: { hoverable: true,
                    clickable: true,
                    tickColor: "#dddddd",
                    borderWidth: 0
                },
                yaxis: { min: -1.2, max: 1.2 },
                colors: ["#FA5833", "#2FABE9"]
            });

        function showTooltip(x, y, contents) {
            $('<div id="tooltip">' + contents + '</div>').css( {
                position: 'absolute',
                display: 'none',
                top: y + 5,
                left: x + 5,
                border: '1px solid #fdd',
                padding: '2px',
                'background-color': '#dfeffc',
                opacity: 0.80
            }).appendTo("body").fadeIn(200);
        }

        var previousPoint = null;
        $("#sincos").bind("plothover", function (event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));

            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;

                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);

                    showTooltip(item.pageX, item.pageY,
                        item.series.label + " of " + x + " = " + y);
                }
            }
            else {
                $("#tooltip").remove();
                previousPoint = null;
            }
        });



        $("#sincos").bind("plotclick", function (event, pos, item) {
            if (item) {
                $("#clickdata").text("You clicked point " + item.dataIndex + " in " + item.series.label + ".");
                plot.highlight(item.series, item.datapoint);
            }
        });

    }

    /* ---------- Flot chart ---------- */
    if($("#flotchart").length)
    {
        var d1 = [];
        for (var i = 0; i < Math.PI * 2; i += 0.25)
            d1.push([i, Math.sin(i)]);

        var d2 = [];
        for (var i = 0; i < Math.PI * 2; i += 0.25)
            d2.push([i, Math.cos(i)]);

        var d3 = [];
        for (var i = 0; i < Math.PI * 2; i += 0.1)
            d3.push([i, Math.tan(i)]);

        $.plot($("#flotchart"), [
            { label: "sin(x)",  data: d1},
            { label: "cos(x)",  data: d2},
            { label: "tan(x)",  data: d3}
        ], {
            series: {
                lines: { show: true },
                points: { show: true }
            },
            xaxis: {
                ticks: [0, [Math.PI/2, "\u03c0/2"], [Math.PI, "\u03c0"], [Math.PI * 3/2, "3\u03c0/2"], [Math.PI * 2, "2\u03c0"]]
            },
            yaxis: {
                ticks: 10,
                min: -2,
                max: 2
            },
            grid: {	tickColor: "#dddddd",
                borderWidth: 0
            },
            colors: ["#FA5833", "#2FABE9", "#FABB3D"]
        });
    }

    /* ---------- Stack chart ---------- */
    if($("#stackchart").length)
    {
        var d1 = [];
        for (var i = 0; i <= 10; i += 1)
            d1.push([i, parseInt(Math.random() * 30)]);

        var d2 = [];
        for (var i = 0; i <= 10; i += 1)
            d2.push([i, parseInt(Math.random() * 30)]);

        var d3 = [];
        for (var i = 0; i <= 10; i += 1)
            d3.push([i, parseInt(Math.random() * 30)]);

        var stack = 0, bars = true, lines = false, steps = false;

        function plotWithOptions() {
            $.plot($("#stackchart"), [ d1, d2, d3 ], {
                series: {
                    stack: stack,
                    lines: { show: lines, fill: true, steps: steps },
                    bars: { show: bars, barWidth: 0.6 },
                },
                colors: ["#FA5833", "#2FABE9", "#FABB3D"]
            });
        }

        plotWithOptions();

        $(".stackControls input").click(function (e) {
            e.preventDefault();
            stack = $(this).val() == "With stacking" ? true : null;
            plotWithOptions();
        });
        $(".graphControls input").click(function (e) {
            e.preventDefault();
            bars = $(this).val().indexOf("Bars") != -1;
            lines = $(this).val().indexOf("Lines") != -1;
            steps = $(this).val().indexOf("steps") != -1;
            plotWithOptions();
        });
    }


    // USER ACTIVE
    if($("#activeUsers").length) {
        var d1 = [];

        for (var i = 0; i <= 160; i += 1) {
            d1.push([i, parseInt(Math.random() * 123120)]);
        }

        var stack = 0, bars = true, lines = false, steps = false;

        function plotWithOptions2() {

            $.plot($("#activeUsers"), [ d1 ], {
                series: {
                    bars: { show: bars,
                        fill: true,
                        barWidth: 0.1,
                        align: "center",
                        lineWidth: 5,
                        fillColor: { colors: [ { opacity: 1 }, { opacity: 0.5 } ] }
                    },
                },
                grid: { hoverable: true,
                    clickable: true,
                    tickColor: "#dddddd",
                    borderWidth: 0,
                },
                colors: ["#2d8aeb"],
                xaxis: {ticks:0, tickDecimals: 0, tickFormatter: function(v, a) {return v }},
                yaxis: {ticks:5, tickDecimals: 0, tickFormatter: function (v) { return v }},

            });
        }

        plotWithOptions2();

    }
});



//////////////////////
/* ---------- Sparkline Charts ---------- */
$(document).ready(function() {
    $('.linecustom').sparkline('html',
        {height: '26px', width: '100px', lineColor: '#4d9ced', fillColor: '#cfe6ef',
            minSpotColor: false, maxSpotColor: false, spotColor: '#467e8c', spotRadius: 3});
    $(".sparkbar").sparkline('html', {
        type: 'bar',
        height: '26px',
        barColor: '#80b031'});
});




/* Pie charts */
$(document).ready(function() {
    if($("#graph1").length) {
        $(function () {
            var data = [];
            var series = Math.floor(Math.random()*10)+1;
            for( var i = 0; i<series; i++)
            {
                data[i] = { label: "Series"+(i+1), data: Math.floor(Math.random()*100)+1 }
            }

            $.plot($("#graph1"), data,
                {
                    series: {
                        pie: {
                            show: true,
                            radius: 1,
                            label: {
                                show: true,
                                radius: 2/3,
                                formatter: function(label, series){
                                    return '<div style="font-size:11px;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                                },
                                threshold: 0.1
                            }
                        }
                    },
                    legend: {
                        show: false
                    },
                    grid: {
                        hoverable: false,
                        clickable: true
                    },
                });

            $("#interactive").bind("plothover", pieHover);
            $("#interactive").bind("plotclick", pieClick);


        });

        function pieHover(event, pos, obj)
        {
            if (!obj)
                return;
            percent = parseFloat(obj.series.percent).toFixed(2);
            $("#hover").html('<span style="font-weight: bold; color: '+obj.series.color+'">'+obj.series.label+' ('+percent+'%)</span>');
        }
        function pieClick(event, pos, obj)
        {
            if (!obj)
                return;
            percent = parseFloat(obj.series.percent).toFixed(2);
            alert(''+obj.series.label+': '+percent+'%');
        }
    }
});

/* Pie charts 2*/
$(document).ready(function() {
    if($("#graph2").length) {
        $(function () {
            var data = [];
            var series = Math.floor(Math.random()*10)+1;
            for( var i = 0; i<series; i++)
            {
                data[i] = { label: "Series"+(i+1), data: Math.floor(Math.random()*100)+1 }
            }

            $.plot($("#graph2"), data,
                {
                    series: {
                        pie: {
                            show: true,
                            radius:300,
                            label: {
                                show: true,
                                formatter: function(label, series){
                                    return '<div style="font-size:11px;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                                },
                                threshold: 0.1
                            }
                        }
                    },
                    legend: {
                        show: false
                    },
                    grid: {
                        hoverable: false,
                        clickable: true
                    },
                });

            $("#interactive").bind("plothover", pieHover);
            $("#interactive").bind("plotclick", pieClick);


        });

        function pieHover(event, pos, obj)
        {
            if (!obj)
                return;
            percent = parseFloat(obj.series.percent).toFixed(2);
            $("#hover").html('<span style="font-weight: bold; color: '+obj.series.color+'">'+obj.series.label+' ('+percent+'%)</span>');
        }
        function pieClick(event, pos, obj)
        {
            if (!obj)
                return;
            percent = parseFloat(obj.series.percent).toFixed(2);
            alert(''+obj.series.label+': '+percent+'%');
        }
    }
});


/* Updating graphs real-time */
$(document).ready(function() {
    if($("#updateInterval").length) {
        $(function () {
            // we use an inline data source in the example, usually data would
            // be fetched from a server
            var data = [], totalPoints = 300;
            function getRandomData() {
                if (data.length > 0)
                    data = data.slice(1);

                // do a random walk
                while (data.length < totalPoints) {
                    var prev = data.length > 0 ? data[data.length - 1] : 50;
                    var y = prev + Math.random() * 10 - 5;
                    if (y < 0)
                        y = 0;
                    if (y > 100)
                        y = 100;
                    data.push(y);
                }

                // zip the generated y values with the x values
                var res = [];
                for (var i = 0; i < data.length; ++i)
                    res.push([i, data[i]])
                return res;
            }

            // setup control widget
            var updateInterval = 1000;
            $("#updateInterval").val(updateInterval).change(function () {
                var v = $(this).val();
                if (v && !isNaN(+v)) {
                    updateInterval = +v;
                    if (updateInterval < 1)
                        updateInterval = 1;
                    if (updateInterval > 2000)
                        updateInterval = 2000;
                    $(this).val("" + updateInterval);
                }
            });

            // setup plot
            var options = {
                series: { shadowSize: 0 }, // drawing is faster without shadows
                yaxis: { min: 0, max: 120 },
                xaxis: { show: false },

                colors: ["#2686d2"],
                series: {
                    lines: {
                        lineWidth: 1,
                        fill: true,
                        fillColor: { colors: [ { opacity: 0.5 }, { opacity: 1.0 } ] },
                        steps: false ,
                        show:true

                    },points: {show: false }
                }
            };
            var plot = $.plot($(".autoUpdate"), [ getRandomData() ], options);

            function update() {
                plot.setData([ getRandomData() ]);
                // since the axes don't change, we don't need to call plot.setupGrid()
                plot.draw();

                setTimeout(update, updateInterval);
            }

            update();

        });
    }
});
