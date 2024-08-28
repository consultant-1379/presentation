var fs = require('fs');
var appsJSON = "apps/apps.json";


var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function(fileName) {
            var file = dir + '/' + fileName;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else if (fileName == 'package.json'){
                    results.push(file);
                    if (!--pending) done(null, results);
                } else {
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

var apps = [];

walk('apps', function(err, results) {
    if (err) throw err;
    results.forEach(function(fileName) {
        var json = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        apps.push(json['metadata']);
    });

    var string = JSON.stringify(apps, null, 4);

    fs.writeFile(appsJSON, string, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(appsJSON + " was created");
        }
    });
});
