/*global module:false,require:false,console:false */
var webroot = "./web";
var port = Number(process.argv[2]) || 8000;
var assetTypes = [".js", ".css", ".txt", ".ico", ".html", ".png", ".woff", ".ttf", ".svg"];

var nodeStatic = require("node-static");
var http = require("http");
var util = require("util");

function isStaticResource(url) {
    return assetTypes.reduce(function(memo, assetType) {
        return memo || url.indexOf(assetType) !== -1;
    }, false);
}

module.exports.startServer = function() {
    var file = new(nodeStatic.Server)(webroot, {
        cache: 0
    });

    http.createServer(function(req, res) {
        req.addListener("end", function() {
            if (!isStaticResource(req.url)) {
                req.url = "/index.html";
            }

            file.serve(req, res, function(err, result) {
                if (err) {
                    console.error("Error serving %s - %s", req.url, err.message);
                    res.writeHead(err.status, err.headers);
                    res.end();
                }
            });
        });
    }).listen(port);

    console.log("Development server running at http://localhost:%d", port);
}();
