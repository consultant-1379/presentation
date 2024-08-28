/*jslint regexp: true */
/*global require: false, XMLHttpRequest: false, ActiveXObject: false,
 define: false, window: false, process: false, location: false */
define('template', ['module'], function (module) {
    'use strict';

    var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        buildMap = [],
        masterConfig = (module.config && module.config()) || {},
        text, fs, Handlebars;

    text = {
        version: '2.0.1',

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        createXhr: masterConfig.createXhr || function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext".
         */
        parseName: function (name) {
            var index = name.indexOf("."),
                modName = name.substring(0, index),
                ext = name.substring(index + 1, name.length);

            return {
                moduleName: modName,
                ext: ext
            };
        },

        preCompile:function (content) {
            var options = {};

            var ast = Handlebars.parse(content);
            var environment = new Handlebars.Compiler().compile(ast, options);
            return new Handlebars.JavaScriptCompiler().compile(environment, options);
        },

        compile:function (content) {
            var options = {};

            var ast = Handlebars.parse(content);
            var environment = new Handlebars.Compiler().compile(ast, options);
            var templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, undefined, true);
            return Handlebars.template(templateSpec);
        },

        finishLoad: function (name, content, onLoad) {
            if (masterConfig.isBuild) {
                buildMap[name] = text.preCompile(content);
            } else {
                content = text.compile(content);
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {

            // Do not bother with the work if a build and text will
            // not be inlined.
            if (config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName + '.' + parsed.ext,
                url = req.toUrl(nonStripName);

            text.get(url, function (content) {
                text.finishLoad(name, content, onLoad);
            }, function (err) {
                if (onLoad.error) {
                    onLoad.error(err);
                }
            });
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = buildMap[moduleName];
                write.asModule(pluginName + "!" + moduleName,
                    "define(function () { return Handlebars.template(" +
                        content +
                        ");});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                nonStripName = parsed.moduleName + '.' + parsed.ext,
            //Use a '.js' file name so that it indicates it is a
            //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + '.' +
                    parsed.ext) + '.js';

            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };

    if (typeof process !== "undefined" &&
        process.versions &&
        !!process.versions.node) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');
        Handlebars = require.nodeRequire('handlebars');

        text.get = function (url, callback) {
            var file = fs.readFileSync(url, 'utf8');
            //Remove BOM (Byte Mark Order) from utf8 files if it is there.
            if (file.indexOf('\uFEFF') === 0) {
                file = file.substring(1);
            }
            callback(file);
        };
    } else if (text.createXhr()) {
        Handlebars = window.Handlebars;

        text.get = function (url, callback, errback) {
            var xhr = text.createXhr();
            xhr.open('GET', url, true);

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        errback(err);
                    } else {
                        callback(xhr.responseText);
                    }
                }
            };
            xhr.send(null);
        };
    }

    return text;
});